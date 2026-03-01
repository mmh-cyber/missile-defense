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
