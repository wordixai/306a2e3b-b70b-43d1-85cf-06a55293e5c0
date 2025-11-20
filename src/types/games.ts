export type Language = 'spanish' | 'french' | 'german' | 'italian' | 'japanese';

export type GameMode = 'vocabulary' | 'grammar' | 'pronunciation' | 'listening';

export interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  category: string;
}

export interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PronunciationChallenge {
  id: string;
  word: string;
  phonetic: string;
  audioUrl?: string;
}

export interface GameStats {
  correct: number;
  incorrect: number;
  streak: number;
  totalPoints: number;
}
