// ============================================================
// MISSILE DEFENSE — Quiz Question Bank
// ============================================================
//
// Each level has 8 questions; 2 are randomly selected per playthrough.
// Every answer to every question is explicitly taught in the briefing
// content that precedes it.
//
// correctIndex: 0-based index into the options array
// ============================================================

export const QUIZ_DATA = {
  // ─── LEVEL 1: Drones + Iron Dome ──────────────────────────
  1: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l1q1',
        question: 'What year did Iron Dome become operational?',
        options: ['2001', '2006', '2011', '2017'],
        correctIndex: 2,
        explanation: 'Iron Dome became operational in 2011.',
      },
      {
        id: 'l1q2',
        question: 'Iron Dome was developed in response to which conflict?',
        options: ['1967 Six-Day War', '1973 Yom Kippur War', '2006 Lebanon War', '2014 Gaza War'],
        correctIndex: 2,
        explanation: 'Development began after the 2006 Lebanon War, when Hezbollah launched thousands of rockets into northern Israel.',
      },
      {
        id: 'l1q3',
        question: "What is the name of Iron Dome's interceptor missile?",
        options: ['Arrow', 'Barak', 'Patriot', 'Tamir'],
        correctIndex: 3,
        explanation: 'The Tamir interceptor missile is used by Iron Dome.',
      },
      {
        id: 'l1q4',
        question: 'Which Israeli company developed Iron Dome?',
        options: ['Elbit Systems', 'Israel Aerospace Industries', 'Israel Military Industries', 'Rafael Advanced Defense Systems'],
        correctIndex: 3,
        explanation: 'Rafael Advanced Defense Systems developed Iron Dome.',
      },
      {
        id: 'l1q5',
        question: 'Approximately how much does a single Iron Dome interceptor cost?',
        options: ['~$5,000', '~$50,000', '~$500,000', '~$5,000,000'],
        correctIndex: 1,
        explanation: 'Each Tamir interceptor costs approximately $50,000.',
      },
      {
        id: 'l1q6',
        question: "What is Iron Dome's reported success rate against rockets?",
        options: ['About 50%', 'About 75%', 'Over 90%', '100%'],
        correctIndex: 2,
        explanation: 'Iron Dome has a reported success rate of over 90%.',
      },
      {
        id: 'l1q7',
        question: 'The Shahed-136 kamikaze drone is manufactured by which country?',
        options: ['China', 'Iran', 'Russia', 'Syria'],
        correctIndex: 1,
        explanation: 'The Shahed-136 is manufactured by Iran.',
      },
      {
        id: 'l1q8',
        question: 'What makes kamikaze drones different from traditional drones?',
        options: [
          'They are controlled by AI',
          'They carry multiple warheads',
          'They crash directly into the target',
          'They fly at higher altitudes',
        ],
        correctIndex: 2,
        explanation: 'Kamikaze drones ARE the weapon \u2014 they crash directly into their target.',
      },
    ],
  },

  // ─── LEVEL 2: Short-Range Rockets ─────────────────────────
  2: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l2q1',
        question: 'Where are Qassam rockets primarily manufactured?',
        options: ['Iran', 'Lebanon', 'Gaza', 'Syria'],
        correctIndex: 2,
        explanation: 'Qassam rockets are built in Gaza using basic materials like sugar and fertilizer.',
      },
      {
        id: 'l2q2',
        question: 'What is the approximate range of Qassam rockets?',
        options: ['1-3 km', '5-45 km', '100-200 km', '500+ km'],
        correctIndex: 1,
        explanation: 'Qassam rockets have a range of 5-45 km, designed to strike nearby Israeli cities.',
      },
      {
        id: 'l2q3',
        question: 'The Grad rocket was originally designed by which country?',
        options: ['Iran', 'China', 'Soviet Union', 'North Korea'],
        correctIndex: 2,
        explanation: 'Grad rockets are Soviet-designed and were smuggled into Gaza.',
      },
      {
        id: 'l2q4',
        question: 'What makes short-range rockets different from cruise missiles?',
        options: [
          'They are faster',
          'They are unguided \u2014 they cannot steer after launch',
          'They fly at higher altitudes',
          'They carry larger warheads',
        ],
        correctIndex: 1,
        explanation: 'Short-range rockets are unguided \u2014 they cannot steer after launch.',
      },
      {
        id: 'l2q5',
        question: 'Which Israeli city near Gaza has been most targeted by Qassam rockets?',
        options: ['Tel Aviv', 'Haifa', 'Sderot', 'Eilat'],
        correctIndex: 2,
        explanation: 'Sderot, located just 1 km from the Gaza border, has been the most frequently targeted city.',
      },
      {
        id: 'l2q6',
        question: 'Which defense system intercepts short-range rockets?',
        options: ['Arrow 2', "David's Sling", 'Iron Dome', 'Arrow 3'],
        correctIndex: 2,
        explanation: 'Iron Dome intercepts short-range rockets as well as drones.',
      },
      {
        id: 'l2q7',
        question: 'Approximately how much does a single Qassam rocket cost to build?',
        options: ['~$200-800', '~$5,000', '~$50,000', '~$500,000'],
        correctIndex: 0,
        explanation: 'Qassam rockets are extremely cheap \u2014 roughly $200-800 each, making them cost-effective for attackers.',
      },
      {
        id: 'l2q8',
        question: 'How are Grad rockets different from Qassam rockets?',
        options: [
          'Grads are guided, Qassams are not',
          'Grads are faster and have longer range',
          'Grads are built locally, Qassams are imported',
          'There is no difference',
        ],
        correctIndex: 1,
        explanation: 'Grad rockets are faster and have a longer range than Qassams, though both are unguided.',
      },
    ],
  },

  // ─── LEVEL 3: Cruise Missiles + David's Sling ────────────
  3: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l3q1',
        question: "Which companies jointly developed David's Sling?",
        options: [
          'IAI and Boeing',
          'Rafael and Raytheon',
          'Elbit and Lockheed Martin',
          'IMI and General Dynamics',
        ],
        correctIndex: 1,
        explanation: "David's Sling was jointly developed by Rafael (Israel) and Raytheon (US).",
      },
      {
        id: 'l3q2',
        question: "What year was David's Sling declared operational?",
        options: ['2007', '2011', '2014', '2017'],
        correctIndex: 3,
        explanation: "David's Sling was declared operational in 2017.",
      },
      {
        id: 'l3q3',
        question: "What is the name of David's Sling interceptor?",
        options: ['Tamir', 'Stunner', 'Arrow', 'Patriot'],
        correctIndex: 1,
        explanation: "David's Sling fires Stunner interceptors that use hit-to-kill technology.",
      },
      {
        id: 'l3q4',
        question: 'How do cruise missiles differ from ballistic missiles?',
        options: [
          'Cruise missiles fly faster',
          'Cruise missiles fly like aircraft at low altitude',
          'Cruise missiles follow a ballistic arc',
          'There is no difference',
        ],
        correctIndex: 1,
        explanation: 'Cruise missiles fly like small aircraft \u2014 jet-powered, with wings, at low altitude.',
      },
      {
        id: 'l3q5',
        question: 'Why are cruise missiles difficult to detect on radar?',
        options: [
          'They are made of stealth material',
          'They fly above radar range',
          'They hug the terrain at low altitude',
          'They emit jamming signals',
        ],
        correctIndex: 2,
        explanation: 'Cruise missiles hug the terrain at low altitude, making them difficult for radar to detect.',
      },
      {
        id: 'l3q6',
        question: 'Which country developed the Paveh and Quds cruise missiles?',
        options: ['Russia', 'China', 'Iran', 'North Korea'],
        correctIndex: 2,
        explanation: 'Iran developed the Paveh and Quds cruise missiles for long-range strikes.',
      },
      {
        id: 'l3q7',
        question: "What is the effective range of David's Sling?",
        options: ['4-70 km', '40-300 km', '100-1,000 km', '1,000+ km'],
        correctIndex: 1,
        explanation: "David's Sling has an effective range of 40-300 km.",
      },
      {
        id: 'l3q8',
        question: "What makes the Stunner interceptor's technology special?",
        options: [
          'It uses a nuclear warhead',
          'It uses hit-to-kill \u2014 no explosive warhead',
          'It can intercept multiple targets at once',
          'It is reusable',
        ],
        correctIndex: 1,
        explanation: 'The Stunner uses hit-to-kill technology \u2014 it destroys the target through direct impact, with no explosive warhead.',
      },
    ],
  },

  // ─── LEVEL 4: Ballistic Missiles + Arrow 2 ───────────────
  4: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l4q1',
        question: 'Which companies jointly developed Arrow 2?',
        options: [
          'Rafael and Raytheon',
          'Israel Aerospace Industries and Boeing',
          'Elbit and Lockheed Martin',
          'IMI and Northrop Grumman',
        ],
        correctIndex: 1,
        explanation: 'Arrow 2 was jointly developed by Israel Aerospace Industries (IAI) and Boeing.',
      },
      {
        id: 'l4q2',
        question: 'What was Arrow 2 the first in the world to achieve?',
        options: [
          'First hypersonic interceptor',
          'First deployed anti-ballistic missile system',
          'First space-based interceptor',
          'First AI-guided missile',
        ],
        correctIndex: 1,
        explanation: "Arrow 2 was the world's first operational anti-ballistic missile defense system, deployed in 2000.",
      },
      {
        id: 'l4q3',
        question: "What is the Shahab-3's approximate range?",
        options: ['100 km', '500 km', 'Over 1,300 km', 'Over 5,000 km'],
        correctIndex: 2,
        explanation: "Iran's Shahab-3 has a range over 1,300 km \u2014 enough to reach Israel from Iranian soil.",
      },
      {
        id: 'l4q4',
        question: 'At what speed do ballistic missiles reenter the atmosphere?',
        options: ['Mach 1-2', 'Mach 3-5', 'Mach 7-10', 'Mach 20+'],
        correctIndex: 2,
        explanation: 'Ballistic missiles reenter at Mach 7-10 \u2014 faster than any bullet.',
      },
      {
        id: 'l4q5',
        question: 'Where does Arrow 2 intercept ballistic missiles?',
        options: [
          'At ground level',
          'In the lower atmosphere',
          'In the upper atmosphere during descent',
          'In space',
        ],
        correctIndex: 2,
        explanation: 'Arrow 2 intercepts ballistic missiles in the upper atmosphere during their descent.',
      },
      {
        id: 'l4q6',
        question: 'Up to what altitude can Arrow 2 engage targets?',
        options: ['10 km', '50 km', '90 km', '200 km'],
        correctIndex: 2,
        explanation: 'Arrow 2 can engage targets at altitudes up to 90 km above populated areas.',
      },
      {
        id: 'l4q7',
        question: 'How does a ballistic missile reach its target?',
        options: [
          'It flies low along the terrain',
          'It launches on a high arc into space, then plunges down',
          'It glides at a constant altitude',
          'It uses jet engines for sustained flight',
        ],
        correctIndex: 1,
        explanation: 'Ballistic missiles launch on a high arc into space, then plunge toward the target.',
      },
      {
        id: 'l4q8',
        question: 'What type of warhead does Arrow 2 use?',
        options: [
          'Hit-to-kill (no explosive)',
          'Nuclear',
          'Directed fragmentation',
          'Electromagnetic pulse',
        ],
        correctIndex: 2,
        explanation: 'Arrow 2 uses a directed fragmentation warhead to destroy incoming ballistic missiles.',
      },
    ],
  },

  // ─── LEVEL 5: Hypersonic + Arrow 3 ───────────────────────
  5: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l5q1',
        question: 'At what minimum speed does a weapon qualify as hypersonic?',
        options: ['Mach 1', 'Mach 3', 'Mach 5', 'Mach 10'],
        correctIndex: 2,
        explanation: 'Hypersonic weapons travel at Mach 5 or above \u2014 over 6,000 km/h.',
      },
      {
        id: 'l5q2',
        question: 'What makes hypersonic glide vehicles especially dangerous?',
        options: [
          'They carry nuclear warheads',
          'They can change course mid-flight',
          'They are invisible to radar',
          'They travel through space only',
        ],
        correctIndex: 1,
        explanation: 'Their ability to change course mid-flight makes them nearly impossible to predict.',
      },
      {
        id: 'l5q3',
        question: 'Where does Arrow 3 intercept incoming threats?',
        options: [
          'At ground level',
          'In the lower atmosphere',
          'In the upper atmosphere',
          'In space, outside the atmosphere',
        ],
        correctIndex: 3,
        explanation: 'Arrow 3 intercepts targets in space \u2014 outside the atmosphere, before reentry.',
      },
      {
        id: 'l5q4',
        question: 'Which company developed Arrow 3?',
        options: ['Rafael', 'Israel Aerospace Industries', 'Elbit Systems', 'Boeing'],
        correctIndex: 1,
        explanation: 'Arrow 3 was developed by Israel Aerospace Industries with US support.',
      },
      {
        id: 'l5q5',
        question: 'What type of kill mechanism does Arrow 3 use?',
        options: [
          'Fragmentation warhead',
          'Hit-to-kill \u2014 pure kinetic energy',
          'Electromagnetic pulse',
          'Explosive blast',
        ],
        correctIndex: 1,
        explanation: 'Arrow 3 uses hit-to-kill technology \u2014 pure kinetic energy, no explosive warhead needed.',
      },
      {
        id: 'l5q6',
        question: 'In what year was Arrow 3 successfully tested against a real target in space?',
        options: ['2010', '2015', '2019', '2022'],
        correctIndex: 2,
        explanation: 'Arrow 3 was successfully tested against real ballistic targets in space in 2019.',
      },
      {
        id: 'l5q7',
        question: 'At what altitude can Arrow 3 engage threats?',
        options: ['Up to 10 km', 'Up to 50 km', 'Up to 90 km', 'Over 100 km'],
        correctIndex: 3,
        explanation: 'Arrow 3 can engage threats at altitudes over 100 km \u2014 the highest layer of Israeli defense.',
      },
      {
        id: 'l5q8',
        question: 'What flight profile do hypersonic glide vehicles follow?',
        options: [
          'Low altitude, terrain-following',
          'Straight and level at high altitude',
          'Boost to edge of space, then glide back at extreme speed',
          'Standard ballistic arc',
        ],
        correctIndex: 2,
        explanation: 'Hypersonic glide vehicles boost to the edge of space, then glide back at extreme speed while maneuvering.',
      },
    ],
  },

  // ─── LEVEL 6: Multi-Layered Defense ───────────────────────
  6: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l6q1',
        question: 'How many tiers does Israel\'s missile defense system have?',
        options: ['2', '3', '4', '5'],
        correctIndex: 2,
        explanation: 'Israel operates a 4-tier missile defense shield \u2014 Iron Dome, David\'s Sling, Arrow 2, and Arrow 3.',
      },
      {
        id: 'l6q2',
        question: 'Which system is the short-range layer (drones, rockets)?',
        options: ['Arrow 3', "David's Sling", 'Arrow 2', 'Iron Dome'],
        correctIndex: 3,
        explanation: 'Iron Dome is the short-range layer, handling drones, rockets, and mortars (4-70 km).',
      },
      {
        id: 'l6q3',
        question: 'Which system intercepts cruise missiles?',
        options: ['Iron Dome', "David's Sling", 'Arrow 2', 'Arrow 3'],
        correctIndex: 1,
        explanation: "David's Sling is the medium-range layer, designed for cruise missiles and large rockets (40-300 km).",
      },
      {
        id: 'l6q4',
        question: 'Which system intercepts ballistic missiles in the atmosphere?',
        options: ['Iron Dome', "David's Sling", 'Arrow 2', 'Arrow 3'],
        correctIndex: 2,
        explanation: 'Arrow 2 intercepts ballistic missiles in the upper atmosphere during descent.',
      },
      {
        id: 'l6q5',
        question: 'Which system operates in space (exo-atmospheric)?',
        options: ['Iron Dome', "David's Sling", 'Arrow 2', 'Arrow 3'],
        correctIndex: 3,
        explanation: 'Arrow 3 is the exo-atmospheric layer, intercepting threats in space before reentry.',
      },
      {
        id: 'l6q6',
        question: 'In a wave attack with mixed threats, what should you prioritize?',
        options: [
          'The fastest threat',
          'Threats targeting populated areas',
          'The closest threat',
          'The cheapest to intercept',
        ],
        correctIndex: 1,
        explanation: 'Prioritize threats targeting populated areas \u2014 open ground targets can be held.',
      },
      {
        id: 'l6q7',
        question: 'Which keyboard shortcut fires Iron Dome?',
        options: ['1', '2', '3', '4'],
        correctIndex: 0,
        explanation: 'Press 1 for Iron Dome, 2 for David\'s Sling, 3 for Arrow 2, 4 for Arrow 3.',
      },
      {
        id: 'l6q8',
        question: 'Why is Israel\'s multi-layered system more effective than a single system?',
        options: [
          'It is cheaper',
          'Different threats require different interception methods at different altitudes',
          'It uses only one type of interceptor',
          'It only defends one city',
        ],
        correctIndex: 1,
        explanation: 'Different threats fly at different altitudes and speeds, requiring specialized interceptors at each layer.',
      },
    ],
  },

  // ─── LEVEL 7: Strategy + Resource Management ──────────────
  7: {
    questionsPerQuiz: 2,
    timePerQuestion: 15,
    pointsPerCorrect: 50,
    questions: [
      {
        id: 'l7q1',
        question: 'When should you hold fire on a threat?',
        options: [
          'When the threat is fast',
          'When the threat targets unpopulated/open ground',
          'When you have plenty of ammo',
          'Never \u2014 always fire',
        ],
        correctIndex: 1,
        explanation: 'Hold fire on threats heading toward open ground \u2014 save interceptors for populated areas.',
      },
      {
        id: 'l7q2',
        question: 'What is the cost range of interceptors across all 4 systems?',
        options: [
          '$1,000 - $10,000',
          '$50,000 - $3 million',
          '$10 million - $100 million',
          'They are free',
        ],
        correctIndex: 1,
        explanation: 'Interceptors cost from ~$50,000 (Tamir) to ~$3 million (Arrow 3) \u2014 Israel cannot afford to waste them.',
      },
      {
        id: 'l7q3',
        question: 'During a massive salvo, what is the biggest risk of firing at everything?',
        options: [
          'Interceptors collide with each other',
          'You run out of ammo for threats that matter',
          'The radar overloads',
          'The system shuts down',
        ],
        correctIndex: 1,
        explanation: 'Firing at every threat wastes limited interceptors \u2014 you may run out when a threat to a city arrives.',
      },
      {
        id: 'l7q4',
        question: 'What does the "5" key or spacebar do in the game?',
        options: [
          'Fires all systems at once',
          'Pauses the game',
          'Holds fire \u2014 lets the threat pass without intercepting',
          'Activates a special weapon',
        ],
        correctIndex: 2,
        explanation: 'Press 5 or spacebar to hold fire \u2014 this lets a threat pass without wasting an interceptor.',
      },
      {
        id: 'l7q5',
        question: 'Which type of interceptor is the most expensive?',
        options: ['Tamir (Iron Dome)', 'Stunner (David\'s Sling)', 'Arrow 2', 'Arrow 3'],
        correctIndex: 3,
        explanation: 'Arrow 3 interceptors are the most expensive at approximately $3 million each.',
      },
      {
        id: 'l7q6',
        question: 'Why is a Qassam rocket ($800) vs. Tamir interceptor ($50,000) a strategic problem?',
        options: [
          'The rocket is too fast',
          'The economic imbalance favors the attacker',
          'The interceptor is too slow',
          'It is not a problem',
        ],
        correctIndex: 1,
        explanation: 'Attackers can launch cheap rockets to deplete expensive interceptors \u2014 the cost ratio favors the attacker.',
      },
      {
        id: 'l7q7',
        question: 'What is the correct response when a Dimona threat appears?',
        options: [
          'Hold fire \u2014 it might change course',
          'Wait until the last second',
          'Intercept immediately \u2014 Dimona is a priority target',
          'Ignore it',
        ],
        correctIndex: 2,
        explanation: 'Dimona is a critical priority target \u2014 threats to Dimona should always be intercepted.',
      },
      {
        id: 'l7q8',
        question: 'What is the best strategy when ammo is running low?',
        options: [
          'Fire at every threat regardless',
          'Only defend the largest cities',
          'Hold fire on open ground threats, defend populated areas only',
          'Stop firing entirely',
        ],
        correctIndex: 2,
        explanation: 'When ammo is low, hold fire on open ground threats and save interceptors for populated areas.',
      },
    ],
  },
};

/**
 * Get N random questions for a given level.
 * Returns a shuffled subset of the question bank.
 */
export function getRandomQuestions(level, count) {
  const data = QUIZ_DATA[level];
  if (!data) return [];
  const n = count || data.questionsPerQuiz;
  const shuffled = [...data.questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
