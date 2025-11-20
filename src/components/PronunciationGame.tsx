import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Word } from '@/types/games';
import { Mic, Volume2, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface PronunciationGameProps {
  words: Word[];
  onScoreUpdate: (correct: boolean) => void;
}

export default function PronunciationGame({ words, onScoreUpdate }: PronunciationGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [attempts, setAttempts] = useState(0);

  const currentWord = words[currentWordIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);

    setTimeout(() => {
      setIsRecording(false);
      // Simulate pronunciation check (in real app, use speech recognition API)
      const isCorrect = Math.random() > 0.3;
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      onScoreUpdate(isCorrect);
      setAttempts(attempts + 1);

      if (isCorrect) {
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    }, 2000);
  };

  const handleNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
    setFeedback(null);
    setAttempts(0);
  };

  const handleTryAgain = () => {
    setFeedback(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Word {currentWordIndex + 1} / {words.length}
        </Badge>
        <Badge variant="secondary">
          Attempts: {attempts}
        </Badge>
      </div>

      <Card className="p-8">
        <div className="text-center space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Pronounce this word:</p>
            <h2 className="text-6xl font-bold text-foreground mb-4">
              {currentWord.word}
            </h2>
            <p className="text-2xl text-muted-foreground">
              {currentWord.pronunciation}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => speak(currentWord.word)}
              variant="outline"
              size="lg"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              Listen
            </Button>
          </div>

          <div className="py-8">
            {isRecording ? (
              <div className="space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-32 h-32 mx-auto rounded-full bg-destructive/20 flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-destructive/40 flex items-center justify-center">
                    <Mic className="h-12 w-12 text-destructive" />
                  </div>
                </motion.div>
                <p className="text-lg text-muted-foreground">Recording...</p>
                <Progress value={66} className="w-64 mx-auto" />
              </div>
            ) : feedback === null ? (
              <Button
                onClick={simulateRecording}
                size="lg"
                className="w-32 h-32 rounded-full text-lg"
              >
                <Mic className="h-8 w-8" />
              </Button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                {feedback === 'correct' ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
                      <div className="text-6xl">🎉</div>
                    </div>
                    <p className="text-2xl font-semibold text-secondary">
                      Perfect pronunciation!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                      <div className="text-6xl">🔄</div>
                    </div>
                    <p className="text-2xl font-semibold text-destructive">
                      Try again!
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleTryAgain} variant="outline" size="lg">
                        <RotateCw className="h-5 w-5 mr-2" />
                        Retry
                      </Button>
                      <Button onClick={handleNext} variant="secondary" size="lg">
                        Skip
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Example sentence:</p>
            <p className="text-lg text-foreground">{currentWord.example}</p>
            <p className="text-muted-foreground mt-2">{currentWord.translation}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
