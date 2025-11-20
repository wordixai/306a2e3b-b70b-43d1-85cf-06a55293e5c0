import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Word } from '@/types/games';
import { Shuffle, Volume2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VocabularyGameProps {
  words: Word[];
  onScoreUpdate: (correct: boolean) => void;
}

export default function VocabularyGame({ words, onScoreUpdate }: VocabularyGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);

  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  const currentWord = shuffledWords[currentWordIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowTranslation(!showTranslation);
  };

  const handleKnow = (knows: boolean) => {
    onScoreUpdate(knows);

    setTimeout(() => {
      if (currentWordIndex < shuffledWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setIsFlipped(false);
        setShowTranslation(false);
      } else {
        setCurrentWordIndex(0);
        setShuffledWords([...words].sort(() => Math.random() - 0.5));
        setIsFlipped(false);
        setShowTranslation(false);
      }
    }, 500);
  };

  const handleShuffle = () => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
    setCurrentWordIndex(0);
    setIsFlipped(false);
    setShowTranslation(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between w-full">
        <Badge variant="outline" className="text-sm">
          {currentWordIndex + 1} / {shuffledWords.length}
        </Badge>
        <Button onClick={handleShuffle} variant="outline" size="sm">
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card
            className="p-8 cursor-pointer min-h-[300px] flex flex-col justify-center items-center relative"
            onClick={handleFlip}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Badge className="absolute top-4 right-4 bg-primary">
              {currentWord.category}
            </Badge>

            {!showTranslation ? (
              <div className="text-center space-y-6">
                <h2 className="text-5xl font-bold text-foreground">
                  {currentWord.word}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(currentWord.word);
                    }}
                    variant="outline"
                    size="lg"
                  >
                    <Volume2 className="h-5 w-5 mr-2" />
                    Pronunciation
                  </Button>
                  <p className="text-xl text-muted-foreground">
                    {currentWord.pronunciation}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-8">
                  Click to reveal translation
                </p>
              </div>
            ) : (
              <div className="text-center space-y-6" style={{ transform: 'rotateY(180deg)' }}>
                <h3 className="text-4xl font-bold text-primary">
                  {currentWord.translation}
                </h3>
                <div className="pt-6 border-t border-border">
                  <p className="text-muted-foreground text-sm mb-2">Example:</p>
                  <p className="text-lg text-foreground italic">
                    {currentWord.example}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {showTranslation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 w-full"
        >
          <Button
            onClick={() => handleKnow(false)}
            variant="outline"
            size="lg"
            className="flex-1 h-14 text-lg"
          >
            <X className="h-6 w-6 mr-2" />
            Need Practice
          </Button>
          <Button
            onClick={() => handleKnow(true)}
            size="lg"
            className="flex-1 h-14 text-lg bg-secondary hover:bg-secondary/90"
          >
            <Check className="h-6 w-6 mr-2" />
            I Know This
          </Button>
        </motion.div>
      )}
    </div>
  );
}
