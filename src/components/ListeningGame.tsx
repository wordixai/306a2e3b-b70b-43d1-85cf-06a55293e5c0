import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Word } from '@/types/games';
import { Volume2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ListeningGameProps {
  words: Word[];
  onScoreUpdate: (correct: boolean) => void;
}

export default function ListeningGame({ words, onScoreUpdate }: ListeningGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentWord = words[currentWordIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);
    onScoreUpdate(correct);
  };

  const handleNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
    setUserInput('');
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Word {currentWordIndex + 1} / {words.length}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="p-8">
            <div className="text-center space-y-8">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  Listen carefully and type what you hear:
                </p>

                <Button
                  onClick={() => speak(currentWord.word)}
                  size="lg"
                  variant="outline"
                  className="w-32 h-32 rounded-full"
                >
                  <Volume2 className="h-12 w-12" />
                </Button>

                <p className="text-sm text-muted-foreground mt-4">
                  Click to play the audio
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type what you hear..."
                  disabled={showFeedback}
                  className="text-center text-2xl h-16"
                />

                {!showFeedback && (
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="w-full h-14 text-lg"
                    disabled={!userInput.trim()}
                  >
                    Check Answer
                  </Button>
                )}
              </div>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-lg ${
                    isCorrect ? 'bg-secondary/20' : 'bg-destructive/20'
                  }`}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {isCorrect ? (
                        <>
                          <Check className="h-8 w-8 text-secondary" />
                          <p className="text-2xl font-semibold text-secondary">Correct!</p>
                        </>
                      ) : (
                        <>
                          <X className="h-8 w-8 text-destructive" />
                          <p className="text-2xl font-semibold text-destructive">Not quite</p>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-muted-foreground">Correct answer:</p>
                      <p className="text-3xl font-bold text-foreground">
                        {currentWord.word}
                      </p>
                      <p className="text-lg text-muted-foreground">
                        ({currentWord.pronunciation})
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border text-left">
                    <p className="text-sm text-muted-foreground mb-2">Translation:</p>
                    <p className="text-xl font-semibold text-foreground mb-4">
                      {currentWord.translation}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">Example:</p>
                    <p className="text-foreground italic">{currentWord.example}</p>
                  </div>

                  <Button onClick={handleNext} size="lg" className="w-full h-14 text-lg">
                    {currentWordIndex < words.length - 1 ? 'Next Word' : 'Restart'}
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
