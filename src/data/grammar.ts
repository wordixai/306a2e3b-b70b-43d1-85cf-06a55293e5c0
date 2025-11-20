import { GrammarQuestion } from '@/types/games';

export const grammarData: Record<string, GrammarQuestion[]> = {
  spanish: [
    {
      id: 'g1',
      question: 'Choose the correct verb: Yo ___ español.',
      options: ['habla', 'hablo', 'hablas', 'hablan'],
      correctAnswer: 1,
      explanation: '"Hablo" is the correct conjugation of "hablar" (to speak) for "yo" (I) in present tense.'
    },
    {
      id: 'g2',
      question: 'Complete: Ella ___ muy alta.',
      options: ['es', 'está', 'son', 'estar'],
      correctAnswer: 0,
      explanation: '"Es" (from "ser") is used for permanent characteristics like height.'
    },
    {
      id: 'g3',
      question: 'Which is correct? "I have a dog"',
      options: ['Tengo un perro', 'Tengo una perro', 'Tiene un perro', 'Tienes un perro'],
      correctAnswer: 0,
      explanation: '"Tengo" (I have) with "un" (masculine article) and "perro" (dog, masculine).'
    },
    {
      id: 'g4',
      question: 'Choose the plural form: La niña',
      options: ['Los niños', 'Las niñas', 'El niño', 'Los niña'],
      correctAnswer: 1,
      explanation: '"Las niñas" is the plural form of "la niña" (the girl).'
    }
  ],
  french: [
    {
      id: 'g5',
      question: 'Choose the correct article: ___ maison',
      options: ['le', 'la', 'les', 'un'],
      correctAnswer: 1,
      explanation: '"Maison" is feminine, so it uses "la".'
    },
    {
      id: 'g6',
      question: 'Complete: Je ___ français.',
      options: ['parle', 'parles', 'parlons', 'parlez'],
      correctAnswer: 0,
      explanation: '"Parle" is the correct conjugation for "je" (I) with "parler" (to speak).'
    }
  ],
  german: [
    {
      id: 'g7',
      question: 'Choose the correct article: ___ Haus',
      options: ['der', 'die', 'das', 'den'],
      correctAnswer: 2,
      explanation: '"Haus" is neuter in German, so it uses "das".'
    }
  ],
  italian: [
    {
      id: 'g8',
      question: 'Complete: Io ___ italiano.',
      options: ['parlo', 'parli', 'parla', 'parlano'],
      correctAnswer: 0,
      explanation: '"Parlo" is the first person singular conjugation of "parlare" (to speak).'
    }
  ],
  japanese: [
    {
      id: 'g9',
      question: 'Which particle is correct? 私___学生です。',
      options: ['は', 'が', 'を', 'に'],
      correctAnswer: 0,
      explanation: '"は" (wa) is the topic marker particle, used to introduce the subject.'
    }
  ]
};
