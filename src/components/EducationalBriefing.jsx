import { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomQuestions, QUIZ_DATA } from '../config/quizData.js';

// ============================================================
// Phase progress bar at top of all briefing screens
// ============================================================
const PHASES = [
  { key: 'threat', label: 'THREAT BRIEFING' },
  { key: 'defense', label: 'DEFENSE BRIEFING' },
  { key: 'quiz', label: 'INTEL CHECK' },
  { key: 'exercise', label: 'FIELD EXERCISE' },
];

function PhaseBar({ currentPhase }) {
  const phaseIndex = PHASES.findIndex((p) => p.key === currentPhase);
  return (
    <div className="flex gap-1 mb-6">
      {PHASES.map((phase, i) => {
        const isComplete = i < phaseIndex;
        const isCurrent = i === phaseIndex;
        return (
          <div
            key={phase.key}
            className={`flex-1 py-1.5 text-center font-mono text-[10px] tracking-widest rounded-sm transition-all duration-500
              ${isCurrent ? 'bg-green-900/60 text-green-400 border border-green-700 phase-active-pulse' : ''}
              ${isComplete ? 'bg-green-900/30 text-green-700 border border-green-900' : ''}
              ${!isCurrent && !isComplete ? 'bg-gray-900/50 text-gray-700 border border-gray-800' : ''}
            `}
          >
            {phase.label}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Auto-advance countdown bar
// ============================================================
function CountdownBar({ duration, onComplete, paused }) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    if (paused) return;
    startRef.current = performance.now() - elapsed * 1000;

    const interval = setInterval(() => {
      const now = performance.now();
      const e = (now - startRef.current) / 1000;
      setElapsed(e);
      if (e >= duration) {
        clearInterval(interval);
        onComplete();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [duration, onComplete, paused]);

  const pct = Math.min(100, (elapsed / duration) * 100);
  const remaining = Math.max(0, Math.ceil(duration - elapsed));

  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-100 ease-linear rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-xs text-gray-500 tabular-nums w-6 text-right">{remaining}s</span>
    </div>
  );
}

// ============================================================
// PHASE 1: Threat Briefing (Drones)
// ============================================================
function DroneAnimation() {
  return (
    <div className="my-4 flex justify-center">
      <svg viewBox="0 0 300 80" width="300" height="80" className="overflow-visible">
        <line x1="0" y1="72" x2="300" y2="72" stroke="#22c55e" strokeWidth="0.3" opacity="0.15" />
        <line x1="0" y1="40" x2="300" y2="40" stroke="#eab308" strokeWidth="0.3" opacity="0.06" strokeDasharray="4,8" />
        <text x="6" y="38" fill="#eab308" fontSize="5" fontFamily="monospace" opacity="0.2">LOW ALT</text>
        <g className="drone-fly">
          <circle cx="-14" cy="0" r="4" fill="#eab308" opacity="0.12" className="drone-rotor-spin" />
          <line x1="-14" y1="-3.5" x2="-14" y2="3.5" stroke="#eab308" strokeWidth="0.8" opacity="0.3" className="drone-rotor-spin" />
          <path d="M16,0 L12,-1.2 L-10,-1.2 L-13,0 L-10,1.2 L12,1.2 Z" fill="#eab308" opacity="0.85" />
          <path d="M4,-1.2 L-2,-8 L-8,-7 L-6,-1.2" fill="#eab308" opacity="0.7" />
          <path d="M4,1.2 L-2,8 L-8,7 L-6,1.2" fill="#eab308" opacity="0.7" />
          <path d="M-10,-1.2 L-13,-5 L-11,-4.5 L-10,-1.2" fill="#eab308" opacity="0.6" />
          <path d="M-10,1.2 L-13,5 L-11,4.5 L-10,1.2" fill="#eab308" opacity="0.6" />
          <ellipse cx="15" cy="0" rx="2" ry="1" fill="#fbbf24" opacity="0.9" />
          <circle cx="16.5" cy="0" r="0.5" fill="#fef08a" opacity="0.8" />
          <circle cx="-15" cy="0" r="2" fill="#f59e0b" opacity="0.3" className="drone-exhaust-glow" />
        </g>
      </svg>
    </div>
  );
}

const THREAT_BULLETS = [
  { icon: '🇮🇷', text: 'Iran manufactures the Shahed-136 kamikaze drone' },
  { icon: '💥', text: 'Kamikaze drones ARE the weapon — they crash directly into their target' },
  { icon: '📡', text: 'They fly at low altitude and slow speed, making them hard to detect on radar' },
  { icon: '🎯', text: 'Cheap to produce (~$20,000 each) — enemies launch them in swarms' },
];

function ThreatBriefingPhase({ onComplete }) {
  const [visibleBullets, setVisibleBullets] = useState(0);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    const timers = THREAT_BULLETS.map((_, i) =>
      setTimeout(() => setVisibleBullets(i + 1), (i + 1) * 2500)
    );
    // Show CONTINUE only after all bullets are visible + 2s reading time
    const allBulletsTime = THREAT_BULLETS.length * 2500;
    const readyTimer = setTimeout(() => setCanContinue(true), allBulletsTime + 2000);
    return () => { timers.forEach(clearTimeout); clearTimeout(readyTimer); };
  }, []);

  return (
    <div>
      <div className="text-center mb-4">
        <div className="text-xs text-gray-500 font-mono tracking-[0.4em] mb-1">THREAT BRIEFING</div>
        <h2 className="text-2xl font-bold font-mono text-yellow-400 tracking-wider">DRONES</h2>
        <div className="text-xs text-gray-600 font-mono mt-1">Shahed-136 Kamikaze Drone</div>
      </div>

      <DroneAnimation />

      <div className="space-y-2 mt-3">
        {THREAT_BULLETS.map((bullet, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-2.5 rounded-lg bg-gray-900/50 border border-gray-800 transition-all duration-500 ${
              i < visibleBullets ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <span className="text-lg flex-shrink-0">{bullet.icon}</span>
            <span className="text-sm font-mono text-gray-300">{bullet.text}</span>
          </div>
        ))}
      </div>

      <CountdownBar duration={25} onComplete={onComplete} paused={false} />

      {canContinue && (
        <div className="text-center mt-4">
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-green-900/30 border border-green-700 text-green-400
              font-mono text-sm tracking-widest rounded-lg
              hover:bg-green-900/50 hover:border-green-400
              transition-all active:scale-95 cursor-pointer"
          >
            CONTINUE ▸
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PHASE 2: Defense Briefing (Iron Dome)
// ============================================================
function TamirInterceptAnimation() {
  return (
    <div className="my-4 flex justify-center">
      <svg viewBox="0 0 300 160" width="300" height="160" className="overflow-visible">
        {/* Ground */}
        <line x1="0" y1="150" x2="300" y2="150" stroke="#22c55e" strokeWidth="0.5" opacity="0.2" />

        {/* City silhouette */}
        <rect x="220" y="130" width="15" height="20" fill="#334155" opacity="0.5" rx="1" />
        <rect x="238" y="125" width="12" height="25" fill="#334155" opacity="0.5" rx="1" />
        <rect x="253" y="135" width="10" height="15" fill="#334155" opacity="0.5" rx="1" />
        <text x="230" y="145" fill="#94a3b8" fontSize="5" fontFamily="monospace" opacity="0.4" textAnchor="middle">CITY</text>

        {/* Iron Dome battery */}
        <rect x="40" y="140" width="30" height="10" fill="#22c55e" opacity="0.3" rx="2" />
        <rect x="48" y="135" width="14" height="8" fill="#22c55e" opacity="0.4" rx="1" />
        <line x1="55" y1="135" x2="55" y2="125" stroke="#22c55e" strokeWidth="2" opacity="0.6" />
        <text x="55" y="158" fill="#22c55e" fontSize="5" fontFamily="monospace" opacity="0.4" textAnchor="middle">IRON DOME</text>

        {/* Incoming drone */}
        <g className="brief-drone-approach">
          <circle r="3" fill="#eab308" opacity="0.8" />
          <circle r="6" fill="none" stroke="#eab308" strokeWidth="0.5" opacity="0.3" className="mini-radar-blip" />
        </g>

        {/* Tamir interceptor trail */}
        <line x1="55" y1="125" x2="170" y2="60" stroke="#22c55e" strokeWidth="1.5" opacity="0" className="tamir-launch-line" />

        {/* Intercept flash */}
        <circle cx="170" cy="60" r="0" fill="#22c55e" opacity="0" className="tamir-intercept-flash" />
      </svg>
    </div>
  );
}

const DEFENSE_BULLETS = [
  { icon: '🏭', text: 'Iron Dome was developed by Rafael Advanced Defense Systems' },
  { icon: '📅', text: 'Became operational in 2011, after the 2006 Lebanon War' },
  { icon: '🚀', text: 'Fires Tamir interceptor missiles — each costs approximately $50,000' },
  { icon: '🎯', text: 'Over 90% success rate against rockets and drones' },
  { icon: '📏', text: 'Effective range: 4-70 km (2-45 miles)' },
];

function DefenseBriefingPhase({ onComplete }) {
  const [visibleBullets, setVisibleBullets] = useState(0);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    const timers = DEFENSE_BULLETS.map((_, i) =>
      setTimeout(() => setVisibleBullets(i + 1), (i + 1) * 2000)
    );
    // Show CONTINUE only after all bullets are visible + 2s reading time
    const allBulletsTime = DEFENSE_BULLETS.length * 2000;
    const readyTimer = setTimeout(() => setCanContinue(true), allBulletsTime + 2000);
    return () => { timers.forEach(clearTimeout); clearTimeout(readyTimer); };
  }, []);

  return (
    <div>
      <div className="text-center mb-4">
        <div className="text-xs text-gray-500 font-mono tracking-[0.4em] mb-1">DEFENSE BRIEFING</div>
        <h2 className="text-2xl font-bold font-mono text-green-400 tracking-wider">IRON DOME</h2>
        <div className="text-xs text-gray-600 font-mono mt-1">Short-Range Air Defense System</div>
      </div>

      <TamirInterceptAnimation />

      <div className="space-y-2 mt-3">
        {DEFENSE_BULLETS.map((bullet, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-2.5 rounded-lg bg-gray-900/50 border border-gray-800 transition-all duration-500 ${
              i < visibleBullets ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <span className="text-lg flex-shrink-0">{bullet.icon}</span>
            <span className="text-sm font-mono text-gray-300">{bullet.text}</span>
          </div>
        ))}
      </div>

      <CountdownBar duration={25} onComplete={onComplete} paused={false} />

      {canContinue && (
        <div className="text-center mt-4">
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-green-900/30 border border-green-700 text-green-400
              font-mono text-sm tracking-widest rounded-lg
              hover:bg-green-900/50 hover:border-green-400
              transition-all active:scale-95 cursor-pointer"
          >
            CONTINUE ▸
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PHASE 3: Intel Check (Quiz)
// ============================================================
function IntelCheckPhase({ level, onComplete }) {
  const [questions] = useState(() => getRandomQuestions(level, 2));
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);
  const answeredRef = useRef(false);
  // Use refs for values needed in setTimeout callbacks to avoid stale closures
  const totalPointsRef = useRef(0);
  const currentQRef = useRef(0);

  const quizConfig = QUIZ_DATA[level] || { timePerQuestion: 15, pointsPerCorrect: 50 };

  // Advance to next question or complete quiz
  const doAdvance = useCallback((earnedPoints) => {
    const newTotal = totalPointsRef.current + earnedPoints;
    totalPointsRef.current = newTotal;
    setTotalPoints(newTotal);

    if (currentQRef.current + 1 >= questions.length) {
      onComplete(newTotal);
    } else {
      const nextQ = currentQRef.current + 1;
      currentQRef.current = nextQ;
      setCurrentQ(nextQ);
    }
  }, [questions, onComplete]);

  // Per-question timer
  useEffect(() => {
    answeredRef.current = false;
    setTimeLeft(quizConfig.timePerQuestion);
    setSelectedAnswer(null);
    setShowResult(false);

    const startTime = performance.now();
    timerRef.current = setInterval(() => {
      const elapsed = (performance.now() - startTime) / 1000;
      const remaining = Math.max(0, quizConfig.timePerQuestion - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0 && !answeredRef.current) {
        clearInterval(timerRef.current);
        answeredRef.current = true;
        setShowResult(true);
        // Auto-advance after showing timeout result (0 points earned)
        setTimeout(() => doAdvance(0), 2500);
      }
    }, 100);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQ, doAdvance, quizConfig]);

  const handleAnswer = useCallback((index) => {
    if (answeredRef.current) return;
    answeredRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(index);
    const q = questions[currentQRef.current];
    const correct = index === q.correctIndex;
    const earned = correct ? quizConfig.pointsPerCorrect : 0;

    setShowResult(true);
    setTimeout(() => doAdvance(earned), 2500);
  }, [questions, quizConfig, doAdvance]);

  if (questions.length === 0) {
    onComplete(0);
    return null;
  }

  const q = questions[currentQ];
  const isCorrect = selectedAnswer === q.correctIndex;
  const timedOut = showResult && selectedAnswer === null;
  const pct = (timeLeft / quizConfig.timePerQuestion) * 100;

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-xs text-gray-500 font-mono tracking-[0.4em] mb-1">INTEL CHECK</div>
        <h2 className="text-xl font-bold font-mono text-cyan-400 tracking-wider">
          QUESTION {currentQ + 1} OF {questions.length}
        </h2>
      </div>

      {/* Timer bar */}
      <div className="mb-6">
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-100 ease-linear ${
              timeLeft < 5 ? 'bg-red-500' : timeLeft < 10 ? 'bg-yellow-500' : 'bg-cyan-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-right mt-1">
          <span className={`font-mono text-xs tabular-nums ${
            timeLeft < 5 ? 'text-red-400' : 'text-gray-500'
          }`}>
            {Math.ceil(timeLeft)}s
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="text-lg font-mono text-gray-200 mb-6 text-center leading-relaxed">
        {q.question}
      </div>

      {/* Options */}
      <div className="space-y-2.5 max-w-lg mx-auto">
        {q.options.map((option, i) => {
          let btnClass = 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-500 cursor-pointer';

          if (showResult) {
            if (i === q.correctIndex) {
              btnClass = 'border-green-500 bg-green-900/40 text-green-300 quiz-correct-flash';
            } else if (i === selectedAnswer && !isCorrect) {
              btnClass = 'border-red-500 bg-red-900/40 text-red-300 quiz-wrong-flash';
            } else {
              btnClass = 'border-gray-800 bg-gray-900/30 text-gray-600';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={`w-full py-3 px-5 rounded-lg font-mono text-sm tracking-wide
                border-2 transition-all ${btnClass}
                ${showResult ? 'cursor-default' : 'active:scale-[0.98]'}
              `}
            >
              <span className="mr-3 text-gray-600">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`mt-5 p-4 rounded-lg text-center font-mono text-sm ${
          timedOut
            ? 'bg-yellow-900/30 border border-yellow-700 text-yellow-400'
            : isCorrect
            ? 'bg-green-900/30 border border-green-700 text-green-400'
            : 'bg-red-900/30 border border-red-700 text-red-400'
        }`}>
          {timedOut && (
            <>
              <div className="font-bold tracking-wider mb-1">TIME'S UP</div>
              <div className="text-xs text-gray-400">{q.explanation}</div>
            </>
          )}
          {!timedOut && isCorrect && (
            <>
              <div className="font-bold tracking-wider mb-1">✓ CORRECT — +{quizConfig.pointsPerCorrect} PTS</div>
              <div className="text-xs text-gray-400">{q.explanation}</div>
            </>
          )}
          {!timedOut && !isCorrect && (
            <>
              <div className="font-bold tracking-wider mb-1">✗ INCORRECT</div>
              <div className="text-xs text-gray-400">{q.explanation}</div>
            </>
          )}
        </div>
      )}

      {/* Points tracker */}
      <div className="mt-4 text-center">
        <span className="font-mono text-xs text-gray-600 tracking-widest">INTEL SCORE: </span>
        <span className="font-mono text-sm text-cyan-400 font-bold">{totalPoints} PTS</span>
      </div>
    </div>
  );
}

// ============================================================
// PHASE 4: Field Exercise (Mini-game)
// Two-step workflow: (1) click threat to select, (2) press 1 to fire
// Mimics actual game controls to orient the player
// ============================================================
function FieldExercisePhase({ onComplete }) {
  // State machine: waiting → selected → fired → intercepted → complete
  const [step, setStep] = useState('waiting'); // waiting | selected | fired | intercepted | complete
  const [droneProgress, setDroneProgress] = useState(0);
  const [trailProgress, setTrailProgress] = useState(0);
  const [showStepFlash, setShowStepFlash] = useState(false);
  const animRef = useRef(null);
  const stepRef = useRef('waiting');

  // Keep ref in sync
  useEffect(() => { stepRef.current = step; }, [step]);

  // Drone flies from left toward city — stops when fired
  const droneStopped = step === 'fired' || step === 'intercepted' || step === 'complete';
  useEffect(() => {
    if (droneStopped) return;
    const start = performance.now();
    const duration = 25000; // 25s to reach city — generous time for tutorial

    const animate = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / duration);
      setDroneProgress(p);

      if (p >= 1) {
        setTimeout(() => onComplete(), 2000);
        return;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [droneStopped]);

  // Trail animation after firing
  const isFired = step === 'fired';
  useEffect(() => {
    if (!isFired) return;
    const start = performance.now();
    const duration = 600;

    const animate = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / duration);
      setTrailProgress(p);

      if (p >= 1) {
        setStep('intercepted');
        setTimeout(() => {
          setStep('complete');
          setTimeout(() => onComplete(), 2500);
        }, 800);
        return;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isFired]);

  // Listen for keyboard "1" to fire (only when threat is selected)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1' && stepRef.current === 'selected') {
        e.preventDefault();
        setStep('fired');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click on drone to select it
  const handleSelectDrone = useCallback(() => {
    if (step !== 'waiting') return;
    setStep('selected');
    setShowStepFlash(true);
    setTimeout(() => setShowStepFlash(false), 600);
  }, [step]);

  // Click Iron Dome button to fire (fallback for keyboard)
  const handleFireClick = useCallback(() => {
    if (step !== 'selected') return;
    setStep('fired');
  }, [step]);

  // Drone position
  const droneX = 30 + droneProgress * 200;
  const droneY = 55;

  // Battery position
  const batteryX = 130;
  const batteryY = 145;

  // Trail endpoint (where drone currently is)
  const trailEndX = batteryX + (droneX - batteryX) * trailProgress;
  const trailEndY = batteryY + (droneY - batteryY) * trailProgress;

  const isSelected = step === 'selected';

  return (
    <div>
      <div className="text-center mb-3">
        <div className="text-xs text-gray-500 font-mono tracking-[0.4em] mb-1">FIELD EXERCISE</div>
        <h2 className="text-xl font-bold font-mono text-green-400 tracking-wider">WEAPONS TRAINING</h2>
        <div className="text-xs text-gray-600 font-mono mt-1">Practice the two-step intercept procedure</div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-4 max-w-sm mx-auto">
        <div className={`flex-1 py-1 text-center font-mono text-[10px] tracking-wider rounded-sm border transition-all duration-300 ${
          step === 'waiting'
            ? 'border-yellow-600 bg-yellow-900/30 text-yellow-400 phase-active-pulse'
            : step === 'selected' || step === 'fired' || step === 'intercepted' || step === 'complete'
            ? 'border-green-800 bg-green-900/20 text-green-700'
            : 'border-gray-800 bg-gray-900/30 text-gray-700'
        }`}>
          STEP 1: SELECT TARGET
        </div>
        <div className={`flex-1 py-1 text-center font-mono text-[10px] tracking-wider rounded-sm border transition-all duration-300 ${
          step === 'selected'
            ? 'border-yellow-600 bg-yellow-900/30 text-yellow-400 phase-active-pulse'
            : step === 'fired' || step === 'intercepted' || step === 'complete'
            ? 'border-green-800 bg-green-900/20 text-green-700'
            : 'border-gray-800 bg-gray-900/30 text-gray-700'
        }`}>
          STEP 2: FIRE
        </div>
      </div>

      {/* Instruction prompt — changes per step */}
      <div className={`mb-3 p-3 rounded-lg border text-center font-mono transition-all duration-300 ${
        step === 'waiting'
          ? 'border-yellow-700 bg-yellow-900/20'
          : step === 'selected'
          ? 'border-green-700 bg-green-900/20'
          : 'border-gray-800 bg-gray-900/20'
      } ${showStepFlash ? 'quiz-correct-flash' : ''}`}>
        {step === 'waiting' && (
          <>
            <div className="text-yellow-400 text-sm font-bold tracking-wider mb-1 animate-pulse">
              ▼ CLICK ON THE DRONE TO SELECT IT ▼
            </div>
            <div className="text-xs text-gray-500 tracking-wider">
              In the game, you must click a threat before you can fire
            </div>
          </>
        )}
        {step === 'selected' && (
          <>
            <div className="text-green-400 text-sm font-bold tracking-wider mb-1 animate-pulse">
              TARGET SELECTED — NOW PRESS 1 TO FIRE IRON DOME
            </div>
            <div className="text-xs text-gray-500 tracking-wider">
              Or click the IRON DOME button below
            </div>
          </>
        )}
        {step === 'fired' && (
          <div className="text-green-400 text-sm font-bold tracking-wider animate-pulse">
            TAMIR INTERCEPTOR LAUNCHED...
          </div>
        )}
        {step === 'intercepted' && (
          <>
            <div className="text-green-300 text-lg font-bold tracking-wider">
              ✓ TARGET DESTROYED
            </div>
            <div className="text-xs text-gray-500 mt-1 tracking-widest">
              IRON DOME INTERCEPTION SUCCESSFUL
            </div>
          </>
        )}
        {step === 'complete' && (
          <>
            <div className="text-green-400 text-lg font-bold tracking-wider">
              TRAINING COMPLETE
            </div>
            <div className="text-xs text-gray-500 mt-1 tracking-widest">
              PROCEEDING TO COMBAT OPERATIONS...
            </div>
          </>
        )}
      </div>

      {/* Mini radar */}
      <div className="flex justify-center mb-3">
        <svg viewBox="0 0 300 170" width="360" height="200" className="overflow-visible">
          {/* Background grid */}
          <rect x="0" y="0" width="300" height="170" fill="#0a0e1a" rx="8" stroke="#1e293b" strokeWidth="0.5" />

          {/* Range rings */}
          <circle cx="150" cy="100" r="40" fill="none" stroke="#1e293b" strokeWidth="0.3" />
          <circle cx="150" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="0.3" />
          <circle cx="150" cy="100" r="120" fill="none" stroke="#1e293b" strokeWidth="0.3" />

          {/* City target area */}
          <rect x="240" y="35" width="20" height="30" fill="#334155" opacity="0.4" rx="2" />
          <rect x="255" y="30" width="15" height="35" fill="#334155" opacity="0.4" rx="2" />
          <text x="252" y="80" fill="#ef4444" fontSize="7" fontFamily="monospace" opacity="0.6" textAnchor="middle">CITY</text>

          {/* Iron Dome battery */}
          <rect x={batteryX - 12} y={batteryY - 5} width="24" height="10" fill="#22c55e" opacity="0.4" rx="2" />
          <line x1={batteryX} y1={batteryY - 5} x2={batteryX} y2={batteryY - 15} stroke="#22c55e" strokeWidth="2" opacity="0.5" />
          <text x={batteryX} y={batteryY + 15} fill="#22c55e" fontSize="6" fontFamily="monospace" opacity="0.5" textAnchor="middle">IRON DOME</text>

          {/* Incoming drone blip — clickable in 'waiting' step */}
          {step !== 'intercepted' && step !== 'complete' && (
            <g
              onClick={handleSelectDrone}
              className={step === 'waiting' ? 'cursor-pointer' : ''}
            >
              {/* Larger invisible click target */}
              {step === 'waiting' && (
                <circle cx={droneX} cy={droneY} r="20" fill="transparent" />
              )}

              {/* Selection ring (appears when selected) */}
              {isSelected && (
                <>
                  <circle cx={droneX} cy={droneY} r="14" fill="none" stroke="#eab308" strokeWidth="1.5" opacity="0.6" className="mini-radar-blip" />
                  <circle cx={droneX} cy={droneY} r="18" fill="none" stroke="#eab308" strokeWidth="0.5" opacity="0.3" />
                </>
              )}

              {/* Drone blip */}
              <circle cx={droneX} cy={droneY} r="5" fill="#eab308" opacity="0.9" />
              <circle cx={droneX} cy={droneY} r="9" fill="none" stroke="#eab308" strokeWidth="0.5" opacity="0.4" className="mini-radar-blip" />

              {/* Drone label with threat ID (like real game) */}
              <text x={droneX} y={droneY - 14} fill="#eab308" fontSize="7" fontFamily="monospace" opacity="0.8" textAnchor="middle" fontWeight="bold">
                T1
              </text>
              <text x={droneX} y={droneY - 22} fill="#eab308" fontSize="5" fontFamily="monospace" opacity="0.5" textAnchor="middle">
                DRONE
              </text>

              {/* Trajectory line */}
              <line x1={droneX} y1={droneY} x2="260" y2="50" stroke="#eab308" strokeWidth="0.3" opacity="0.3" strokeDasharray="3,3" />

              {/* Click prompt arrow (only in waiting step) */}
              {step === 'waiting' && droneProgress > 0.05 && (
                <g className="exercise-click-prompt">
                  <text x={droneX} y={droneY + 28} fill="#eab308" fontSize="8" fontFamily="monospace" opacity="0.8" textAnchor="middle">
                    ▲ CLICK
                  </text>
                </g>
              )}
            </g>
          )}

          {/* Interceptor trail */}
          {step === 'fired' && (
            <line
              x1={batteryX}
              y1={batteryY - 15}
              x2={trailEndX}
              y2={trailEndY}
              stroke="#22c55e"
              strokeWidth="2"
              opacity="0.8"
            />
          )}

          {/* Intercept flash */}
          {(step === 'intercepted' || step === 'complete') && (
            <g>
              <circle cx={droneX} cy={droneY} r="12" fill="#22c55e" opacity="0.6" className="exercise-intercept-flash" />
              <circle cx={droneX} cy={droneY} r="6" fill="#fff" opacity="0.8" className="exercise-intercept-flash" />
              {/* Debris particles */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                return (
                  <circle
                    key={i}
                    cx={droneX + Math.cos(angle) * 15}
                    cy={droneY + Math.sin(angle) * 15}
                    r="1.5"
                    fill={i % 2 === 0 ? '#22c55e' : '#eab308'}
                    opacity="0.6"
                    className="exercise-debris"
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Iron Dome fire button — styled like real ControlPanel, only active when selected */}
      {step !== 'fired' && step !== 'intercepted' && step !== 'complete' && (
        <div className="max-w-xs mx-auto">
          <div className="text-xs text-gray-600 font-mono tracking-widest mb-2 text-center">
            {isSelected ? 'SELECT INTERCEPTOR' : 'SELECT A THREAT FIRST'}
          </div>
          <button
            onClick={handleFireClick}
            disabled={!isSelected}
            className={`
              w-full py-3 px-4 rounded-lg font-mono transition-all relative
              border-2
              ${!isSelected
                ? 'opacity-40 cursor-not-allowed border-gray-800 bg-gray-900/50'
                : 'cursor-pointer active:scale-95 border-gray-700 bg-gray-900/30 hover:border-green-500 hover:shadow-[0_0_15px_rgba(0,255,136,0.2)]'
              }
            `}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-bold tracking-wider ${isSelected ? 'text-green-400' : 'text-gray-600'}`}>
                IRON DOME
              </span>
              <span
                className={`w-7 h-7 rounded border-2 flex items-center justify-center text-sm font-mono font-bold ${
                  isSelected
                    ? 'border-green-400 text-green-400'
                    : 'border-gray-700 text-gray-700'
                }`}
              >
                1
              </span>
            </div>
            <div className="text-center">
              <span className={`text-lg font-bold ${isSelected ? 'text-green-400' : 'text-gray-700'}`}>
                FIRE
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Controls reminder */}
      <div className="mt-3 text-center text-[11px] text-gray-600 font-mono tracking-wider">
        CLICK TARGET &#x2022; PRESS 1 TO FIRE
      </div>

      <CountdownBar duration={35} onComplete={onComplete} paused={step === 'complete'} />
    </div>
  );
}

// ============================================================
// Main EducationalBriefing Orchestrator
// ============================================================
export default function EducationalBriefing({ level, onComplete }) {
  const [phase, setPhase] = useState('threat');
  const quizPointsRef = useRef(0);

  const handleThreatComplete = useCallback(() => {
    setPhase('defense');
  }, []);

  const handleDefenseComplete = useCallback(() => {
    setPhase('quiz');
  }, []);

  const handleQuizComplete = useCallback((points) => {
    quizPointsRef.current = points;
    setPhase('exercise');
  }, []);

  const handleExerciseComplete = useCallback(() => {
    onComplete({ quizPoints: quizPointsRef.current });
  }, [onComplete]);

  return (
    <div className="h-screen bg-[#0a0e1a] flex flex-col relative overflow-hidden">
      <div className="max-w-2xl w-full mx-auto px-4 pt-3 pb-2 flex-shrink-0">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="text-green-500/50 font-mono text-xs tracking-[0.4em]">
            MISSION BRIEFING — LEVEL {level}
          </div>
        </div>

        {/* Phase progress bar */}
        <PhaseBar currentPhase={phase} />
      </div>

      {/* Phase content — scrollable if needed */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto px-4 pb-4">
          {phase === 'threat' && <ThreatBriefingPhase onComplete={handleThreatComplete} />}
          {phase === 'defense' && <DefenseBriefingPhase onComplete={handleDefenseComplete} />}
          {phase === 'quiz' && <IntelCheckPhase level={level} onComplete={handleQuizComplete} />}
          {phase === 'exercise' && <FieldExercisePhase onComplete={handleExerciseComplete} />}
        </div>
      </div>
    </div>
  );
}
