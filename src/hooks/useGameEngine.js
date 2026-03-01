import { useState, useRef, useCallback, useEffect } from 'react';
import {
  getThreats,
  getConfig,
  GAME_MODES,
  TZEVA_ADOM_DURATION,
  DIMONA_PENALTY_DURATION,
} from '../config/threats.js';

export const GAME_STATES = {
  PRE_GAME: 'pre_game',
  STUDY: 'study',
  ACTIVE: 'active',
  TZEVA_ADOM: 'tzeva_adom',
  SUMMARY: 'summary',
};

// Leaderboard localStorage key
const LB_KEY = 'missile_defense_leaderboard';

export function calculateScore(stats) {
  const base = (stats.correctIntercepts * 100) + (stats.correctHolds * 50);
  const penalties = (stats.sirenCount * -200) + (stats.wastedIntercepts * -30) + (stats.wrongIntercepts * -20);
  const ammoTotal = Object.values(stats.ammoRemaining).reduce((sum, v) => sum + v, 0);
  const bonuses = (stats.bestStreak * 25) + (ammoTotal * 10);
  return Math.max(0, base + penalties + bonuses);
}

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LB_KEY)) || [];
  } catch { return []; }
}

export function saveToLeaderboard(entry) {
  const lb = getLeaderboard();
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem(LB_KEY, JSON.stringify(lb.slice(0, 50)));
  return lb;
}

export function clearLeaderboard() {
  localStorage.removeItem(LB_KEY);
}

export default function useGameEngine() {
  const [gameMode, setGameMode] = useState('SHORT');
  const [gameState, setGameState] = useState(GAME_STATES.PRE_GAME);
  const [sessionTime, setSessionTime] = useState(0);
  const [ammo, setAmmo] = useState({ ...GAME_MODES.SHORT.ammo });
  const [activeThreats, setActiveThreats] = useState([]);
  const [selectedThreatId, setSelectedThreatId] = useState(null);
  const [tzevaAdomTimeLeft, setTzevaAdomTimeLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [resultLog, setResultLog] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [totalPenaltyTime, setTotalPenaltyTime] = useState(0);
  const [sirenCount, setSirenCount] = useState(0);
  const [wrongInterceptAttempts, setWrongInterceptAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [incomingCount, setIncomingCount] = useState(0);
  const [activeSalvoWarning, setActiveSalvoWarning] = useState(null);
  const [impactFlashes, setImpactFlashes] = useState([]);
  const [upcomingThreats, setUpcomingThreats] = useState([]);
  const [leaderboardMode, setLeaderboardMode] = useState(true);

  // Refs for stale closure avoidance
  const gameStateRef = useRef(gameState);
  const selectedThreatIdRef = useRef(selectedThreatId);
  const activeThreatsRef = useRef(activeThreats);
  const volumeRef = useRef(volume);
  const gameModeRef = useRef(gameMode);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { selectedThreatIdRef.current = selectedThreatId; }, [selectedThreatId]);
  useEffect(() => { activeThreatsRef.current = activeThreats; }, [activeThreats]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { gameModeRef.current = gameMode; }, [gameMode]);

  const animFrameRef = useRef(null);
  const lastTickRef = useRef(null);
  const spawnedIdsRef = useRef(new Set());
  const feedbackTimerRef = useRef(null);
  const tzevaAdomQueueRef = useRef([]);
  const allSpawnedRef = useRef(false);
  const autoEndTimerRef = useRef(null);

  // Audio refs
  const sirenRef = useRef(null);
  const pingRef = useRef(null);
  const successRef = useRef(null);
  const failRef = useRef(null);

  useEffect(() => {
    sirenRef.current = new Audio('/sounds/siren.mp3');
    sirenRef.current.loop = true;
    pingRef.current = new Audio('/sounds/ping.wav');
    successRef.current = new Audio('/sounds/success.wav');
    failRef.current = new Audio('/sounds/fail.wav');
  }, []);

  useEffect(() => {
    [sirenRef, pingRef, successRef, failRef].forEach((ref) => {
      if (ref.current) ref.current.volume = volume;
    });
  }, [volume]);

  const playSound = useCallback((ref, vol) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.volume = vol !== undefined ? vol : volumeRef.current;
      ref.current.play().catch(() => {});
    }
  }, []);

  const stopSiren = useCallback(() => {
    if (sirenRef.current) {
      sirenRef.current.pause();
      sirenRef.current.currentTime = 0;
    }
  }, []);

  const showFeedback = useCallback((text, type, duration = 3000) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedbackMessage({ text, type });
    feedbackTimerRef.current = setTimeout(() => {
      setFeedbackMessage(null);
    }, duration);
  }, []);

  // Impact flash: zone = impact zone name, type = 'intercept' | 'ground_impact' | 'city_hit'
  const addImpactFlash = useCallback((zone, type) => {
    const flashId = Date.now() + Math.random();
    setImpactFlashes((prev) => [...prev, { zone, type, id: flashId }]);
    setTimeout(() => {
      setImpactFlashes((prev) => prev.filter((f) => f.id !== flashId));
    }, 2000);
  }, []);

  // Trigger tzeva adom — Dimona priority = longer siren
  const triggerTzevaAdom = useCallback((isPriority = false) => {
    const duration = isPriority ? DIMONA_PENALTY_DURATION : TZEVA_ADOM_DURATION;
    setSirenCount((c) => c + 1);
    setTotalPenaltyTime((t) => t + duration);

    if (gameStateRef.current === GAME_STATES.TZEVA_ADOM) {
      tzevaAdomQueueRef.current.push(duration);
      return;
    }

    setGameState(GAME_STATES.TZEVA_ADOM);
    setTzevaAdomTimeLeft(duration);
    if (sirenRef.current) {
      sirenRef.current.currentTime = 0;
      sirenRef.current.loop = true;
      sirenRef.current.volume = volumeRef.current;
      sirenRef.current.play().catch(() => {});
    }
  }, []);

  // Handle threat timeout
  const handleThreatTimeout = useCallback((threat) => {
    setActiveThreats((prev) => prev.filter((t) => t.id !== threat.id));
    if (selectedThreatIdRef.current === threat.id) {
      setSelectedThreatId(null);
    }

    if (threat.is_populated) {
      setResultLog((prev) => [...prev, { ...threat, result: 'timeout', siren: true }]);
      playSound(failRef);
      addImpactFlash(threat.impact_zone, 'city_hit');
      setStreak(0);
      triggerTzevaAdom(threat.priority);
    } else {
      setResultLog((prev) => [...prev, { ...threat, result: 'timeout_open', siren: false }]);
      addImpactFlash(threat.impact_zone, 'ground_impact');
      // Quiet ping for ground impact
      playSound(pingRef, Math.max(0.1, volumeRef.current * 0.3));
      showFeedback(`Threat landed in ${threat.impact_zone} — no damage.`, 'neutral');
    }
  }, [triggerTzevaAdom, playSound, showFeedback, addImpactFlash]);

  // Handle player action
  const handleAction = useCallback((action) => {
    if (gameStateRef.current !== GAME_STATES.ACTIVE) return;

    const currentThreats = activeThreatsRef.current;
    const currentSelected = selectedThreatIdRef.current;
    const threat = currentThreats.find((t) => t.id === currentSelected);
    if (!threat) return;

    if (action === 'hold_fire') {
      setActiveThreats((prev) => prev.filter((t) => t.id !== threat.id));
      setSelectedThreatId(null);

      if (threat.is_populated) {
        setResultLog((prev) => [...prev, { ...threat, result: 'hold_populated', siren: true }]);
        playSound(failRef);
        addImpactFlash(threat.impact_zone, 'city_hit');
        setStreak(0);
        triggerTzevaAdom(threat.priority);
      } else {
        setResultLog((prev) => [...prev, { ...threat, result: 'correct_hold', siren: false }]);
        playSound(successRef);
        addImpactFlash(threat.impact_zone, 'ground_impact');
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
        showFeedback(`Threat landed in ${threat.impact_zone} — no damage. Ammo conserved.`, 'success');
      }
      return;
    }

    // Interceptor action — consume ammo
    setAmmo((prev) => ({ ...prev, [action]: prev[action] - 1 }));

    const isCorrect = action === threat.correct_action;

    if (isCorrect) {
      setActiveThreats((prev) => prev.filter((t) => t.id !== threat.id));
      setSelectedThreatId(null);

      if (threat.is_populated) {
        setResultLog((prev) => [...prev, { ...threat, result: 'correct_intercept', siren: false }]);
        playSound(successRef);
        addImpactFlash(threat.impact_zone, 'intercept');
        setStreak((s) => {
          const next = s + 1;
          setBestStreak((b) => Math.max(b, next));
          return next;
        });
        showFeedback('INTERCEPTION SUCCESSFUL', 'success');
      } else {
        setResultLog((prev) => [...prev, { ...threat, result: 'wasted_intercept', siren: false }]);
        addImpactFlash(threat.impact_zone, 'intercept');
        showFeedback('INTERCEPTION SUCCESSFUL — but open ground. Interceptor wasted.', 'warning');
      }
    } else {
      setWrongInterceptAttempts((c) => c + 1);
      playSound(failRef);
      setStreak(0);
      showFeedback('INTERCEPTION FAILED — wrong system!', 'error');
    }
  }, [triggerTzevaAdom, playSound, showFeedback, addImpactFlash]);

  // Main game loop — drives sessionTime
  const tick = useCallback((timestamp) => {
    if (!lastTickRef.current) lastTickRef.current = timestamp;
    const delta = (timestamp - lastTickRef.current) / 1000;
    lastTickRef.current = timestamp;

    const config = getConfig(gameModeRef.current);

    setSessionTime((prev) => {
      const newTime = prev + delta;
      return newTime >= config.game_duration ? config.game_duration : newTime;
    });

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  // Spawn threats + salvo warnings + upcoming threats
  useEffect(() => {
    if (gameState !== GAME_STATES.ACTIVE && gameState !== GAME_STATES.STUDY) return;

    const config = getConfig(gameMode);
    const threats = getThreats(gameMode);

    let spawned = false;
    let unspawnedCount = 0;
    const upcoming = [];

    threats.forEach((t) => {
      if (sessionTime >= t.appear_time && !spawnedIdsRef.current.has(t.id)) {
        spawnedIdsRef.current.add(t.id);
        spawned = true;
        setActiveThreats((prev) => {
          const newThreat = { ...t, timeLeft: t.countdown, impactRevealed: false };
          const newThreats = [...prev, newThreat];
          if (newThreats.length === 1) {
            setSelectedThreatId(newThreats[0].id);
          }
          return newThreats;
        });
        playSound(pingRef);
      }
      if (!spawnedIdsRef.current.has(t.id)) {
        unspawnedCount++;
        if (upcoming.length < 3) {
          upcoming.push({ ...t, timeUntil: t.appear_time - sessionTime });
        }
      }
    });

    setIncomingCount(unspawnedCount);
    setUpcomingThreats(upcoming);
    allSpawnedRef.current = unspawnedCount === 0;

    // Salvo warnings
    const warnings = config.salvo_warnings || [];
    const active = warnings.find((w) => sessionTime >= w.time && sessionTime < w.end_time);
    setActiveSalvoWarning(active || null);

    // Transition study → active
    if (gameState === GAME_STATES.STUDY && (spawned || sessionTime >= config.study_duration)) {
      setGameState(GAME_STATES.ACTIVE);
    }

    // End game on time
    if (sessionTime >= config.game_duration) {
      setGameState(GAME_STATES.SUMMARY);
      stopSiren();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  }, [sessionTime, gameState, gameMode, playSound, stopSiren]);

  // Auto-end when all threats resolved
  useEffect(() => {
    if (gameState !== GAME_STATES.ACTIVE) return;
    if (allSpawnedRef.current && activeThreats.length === 0) {
      if (!autoEndTimerRef.current) {
        autoEndTimerRef.current = setTimeout(() => {
          if (gameStateRef.current === GAME_STATES.ACTIVE) {
            setGameState(GAME_STATES.SUMMARY);
            stopSiren();
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
          }
        }, 8000);
      }
    } else {
      if (autoEndTimerRef.current) {
        clearTimeout(autoEndTimerRef.current);
        autoEndTimerRef.current = null;
      }
    }
    return () => {
      if (autoEndTimerRef.current) {
        clearTimeout(autoEndTimerRef.current);
        autoEndTimerRef.current = null;
      }
    };
  }, [gameState, activeThreats.length, stopSiren]);

  // Tick active threat countdowns + progressive reveal
  useEffect(() => {
    if (gameState !== GAME_STATES.ACTIVE) return;

    let lastTime = performance.now();
    const processedTimeouts = new Set();

    const interval = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setActiveThreats((prev) => {
        const updated = prev.map((t) => {
          const newTimeLeft = Math.max(0, t.timeLeft - dt);
          const pctRemaining = newTimeLeft / t.countdown;
          let updatedThreat = { ...t, timeLeft: newTimeLeft };

          // Progressive reveal
          if (!t.impactRevealed && t.reveal_pct && pctRemaining <= t.reveal_pct) {
            updatedThreat.impactRevealed = true;
          }

          return updatedThreat;
        });

        const timedOut = updated.filter(
          (t) => t.timeLeft <= 0 && !processedTimeouts.has(t.id)
        );

        if (timedOut.length > 0) {
          timedOut.forEach((t) => processedTimeouts.add(t.id));
          setTimeout(() => {
            timedOut.forEach((t) => handleThreatTimeout(t));
          }, 0);
        }

        return updated.filter((t) => t.timeLeft > 0);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, handleThreatTimeout]);

  // Tzeva adom countdown
  useEffect(() => {
    if (gameState !== GAME_STATES.TZEVA_ADOM) return;

    let lastTime = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setTzevaAdomTimeLeft((prev) => {
        const newVal = prev - dt;
        if (newVal <= 0) {
          clearInterval(interval);
          stopSiren();

          if (tzevaAdomQueueRef.current.length > 0) {
            const nextDuration = tzevaAdomQueueRef.current.shift();
            setTimeout(() => {
              setTzevaAdomTimeLeft(nextDuration);
              if (sirenRef.current) {
                sirenRef.current.currentTime = 0;
                sirenRef.current.loop = true;
                sirenRef.current.volume = volumeRef.current;
                sirenRef.current.play().catch(() => {});
              }
            }, 0);
            return nextDuration;
          }

          setGameState(GAME_STATES.ACTIVE);
          return 0;
        }
        return newVal;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, stopSiren]);

  // Start/stop animation frame
  useEffect(() => {
    if (
      (gameState === GAME_STATES.STUDY || gameState === GAME_STATES.ACTIVE) &&
      !paused
    ) {
      lastTickRef.current = null;
      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [gameState, paused, tick]);

  const startGame = useCallback((mode) => {
    const selectedMode = mode || gameModeRef.current;
    const config = getConfig(selectedMode);
    setGameMode(selectedMode);
    setGameState(GAME_STATES.STUDY);
    setSessionTime(0);
    setAmmo({ ...config.ammo });
    setActiveThreats([]);
    setSelectedThreatId(null);
    setResultLog([]);
    setFeedbackMessage(null);
    setTotalPenaltyTime(0);
    setSirenCount(0);
    setWrongInterceptAttempts(0);
    setStreak(0);
    setBestStreak(0);
    setIncomingCount(0);
    setActiveSalvoWarning(null);
    setImpactFlashes([]);
    setUpcomingThreats([]);
    setPaused(false);
    spawnedIdsRef.current = new Set();
    tzevaAdomQueueRef.current = [];
    allSpawnedRef.current = false;
    lastTickRef.current = null;
    if (autoEndTimerRef.current) {
      clearTimeout(autoEndTimerRef.current);
      autoEndTimerRef.current = null;
    }
  }, []);

  const resetGame = useCallback(() => {
    stopSiren();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (autoEndTimerRef.current) {
      clearTimeout(autoEndTimerRef.current);
      autoEndTimerRef.current = null;
    }
    setGameState(GAME_STATES.PRE_GAME);
    setSessionTime(0);
    setAmmo({ ...getConfig(gameModeRef.current).ammo });
    setActiveThreats([]);
    setSelectedThreatId(null);
    setResultLog([]);
    setFeedbackMessage(null);
    setTotalPenaltyTime(0);
    setSirenCount(0);
    setWrongInterceptAttempts(0);
    setStreak(0);
    setBestStreak(0);
    setIncomingCount(0);
    setActiveSalvoWarning(null);
    setImpactFlashes([]);
    setUpcomingThreats([]);
    setPaused(false);
    spawnedIdsRef.current = new Set();
    tzevaAdomQueueRef.current = [];
    allSpawnedRef.current = false;
    lastTickRef.current = null;
  }, [stopSiren]);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  const skipStudy = useCallback(() => {
    if (gameStateRef.current !== GAME_STATES.STUDY) return;
    const config = getConfig(gameModeRef.current);
    setSessionTime(config.study_duration);
  }, []);

  const getSummaryStats = useCallback(() => {
    const totalThreats = resultLog.length;
    const correctIntercepts = resultLog.filter((r) => r.result === 'correct_intercept').length;
    const populatedThreats = resultLog.filter((r) => r.is_populated).length;
    const correctHolds = resultLog.filter((r) => r.result === 'correct_hold').length;
    const openGroundThreats = resultLog.filter((r) => !r.is_populated).length;
    const timeouts = resultLog.filter((r) => r.result === 'timeout').length;
    const wastedIntercepts = resultLog.filter((r) => r.result === 'wasted_intercept').length;
    const holdOnPopulated = resultLog.filter((r) => r.result === 'hold_populated').length;

    let rating;
    if (sirenCount === 0) rating = { label: 'IRON WALL', stars: 5 };
    else if (sirenCount === 1) rating = { label: 'STEEL DOME', stars: 4 };
    else if (sirenCount <= 3) rating = { label: 'SOLID DEFENSE', stars: 3 };
    else if (sirenCount <= 5) rating = { label: 'BATTERED BUT STANDING', stars: 2 };
    else rating = { label: 'BREACH', stars: 1 };

    return {
      totalThreats,
      correctIntercepts,
      populatedThreats,
      correctHolds,
      openGroundThreats,
      wrongIntercepts: wrongInterceptAttempts,
      timeouts: timeouts + holdOnPopulated,
      wastedIntercepts,
      ammoRemaining: ammo,
      totalPenaltyTime,
      sirenCount,
      bestStreak,
      rating,
      resultLog,
      gameMode,
    };
  }, [resultLog, ammo, totalPenaltyTime, sirenCount, wrongInterceptAttempts, bestStreak, gameMode]);

  return {
    gameState,
    gameMode,
    sessionTime,
    ammo,
    activeThreats,
    selectedThreatId,
    tzevaAdomTimeLeft,
    paused,
    volume,
    resultLog,
    feedbackMessage,
    totalPenaltyTime,
    sirenCount,
    streak,
    bestStreak,
    incomingCount,
    activeSalvoWarning,
    impactFlashes,
    upcomingThreats,
    leaderboardMode,
    startGame,
    resetGame,
    togglePause,
    skipStudy,
    handleAction,
    setSelectedThreatId,
    setVolume,
    setGameMode,
    setLeaderboardMode,
    getSummaryStats,
    GAME_STATES,
  };
}
