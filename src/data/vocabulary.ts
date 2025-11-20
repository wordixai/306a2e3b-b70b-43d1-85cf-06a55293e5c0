import { Word } from '@/types/games';

export const vocabularyData: Record<string, Word[]> = {
  spanish: [
    {
      id: '1',
      word: 'Hola',
      translation: 'Hello',
      pronunciation: 'OH-lah',
      example: '¡Hola! ¿Cómo estás?',
      category: 'greetings'
    },
    {
      id: '2',
      word: 'Gracias',
      translation: 'Thank you',
      pronunciation: 'GRAH-see-ahs',
      example: 'Gracias por tu ayuda',
      category: 'courtesy'
    },
    {
      id: '3',
      word: 'Casa',
      translation: 'House',
      pronunciation: 'KAH-sah',
      example: 'Mi casa es grande',
      category: 'places'
    },
    {
      id: '4',
      word: 'Comida',
      translation: 'Food',
      pronunciation: 'koh-MEE-dah',
      example: 'La comida está deliciosa',
      category: 'food'
    },
    {
      id: '5',
      word: 'Agua',
      translation: 'Water',
      pronunciation: 'AH-gwah',
      example: 'Necesito agua fría',
      category: 'drinks'
    },
    {
      id: '6',
      word: 'Libro',
      translation: 'Book',
      pronunciation: 'LEE-broh',
      example: 'Leo un libro interesante',
      category: 'objects'
    },
    {
      id: '7',
      word: 'Amigo',
      translation: 'Friend',
      pronunciation: 'ah-MEE-goh',
      example: 'Mi amigo es muy simpático',
      category: 'people'
    },
    {
      id: '8',
      word: 'Tiempo',
      translation: 'Time / Weather',
      pronunciation: 'tee-EHM-poh',
      example: 'No tengo tiempo hoy',
      category: 'abstract'
    }
  ],
  french: [
    {
      id: '9',
      word: 'Bonjour',
      translation: 'Hello',
      pronunciation: 'bohn-ZHOOR',
      example: 'Bonjour, comment allez-vous?',
      category: 'greetings'
    },
    {
      id: '10',
      word: 'Merci',
      translation: 'Thank you',
      pronunciation: 'mehr-SEE',
      example: 'Merci beaucoup',
      category: 'courtesy'
    },
    {
      id: '11',
      word: 'Maison',
      translation: 'House',
      pronunciation: 'meh-ZOHN',
      example: 'Ma maison est belle',
      category: 'places'
    },
    {
      id: '12',
      word: 'Pain',
      translation: 'Bread',
      pronunciation: 'pan',
      example: 'Le pain est frais',
      category: 'food'
    }
  ],
  german: [
    {
      id: '13',
      word: 'Hallo',
      translation: 'Hello',
      pronunciation: 'HAH-loh',
      example: 'Hallo, wie geht es dir?',
      category: 'greetings'
    },
    {
      id: '14',
      word: 'Danke',
      translation: 'Thank you',
      pronunciation: 'DAHN-kuh',
      example: 'Danke schön',
      category: 'courtesy'
    },
    {
      id: '15',
      word: 'Haus',
      translation: 'House',
      pronunciation: 'house',
      example: 'Mein Haus ist groß',
      category: 'places'
    }
  ],
  italian: [
    {
      id: '16',
      word: 'Ciao',
      translation: 'Hello',
      pronunciation: 'CHOW',
      example: 'Ciao, come stai?',
      category: 'greetings'
    },
    {
      id: '17',
      word: 'Grazie',
      translation: 'Thank you',
      pronunciation: 'GRAH-tsee-eh',
      example: 'Grazie mille',
      category: 'courtesy'
    }
  ],
  japanese: [
    {
      id: '18',
      word: 'こんにちは',
      translation: 'Hello',
      pronunciation: 'kon-nee-chee-wah',
      example: 'こんにちは、元気ですか？',
      category: 'greetings'
    },
    {
      id: '19',
      word: 'ありがとう',
      translation: 'Thank you',
      pronunciation: 'ah-ree-gah-toh',
      example: 'ありがとうございます',
      category: 'courtesy'
    }
  ]
};
