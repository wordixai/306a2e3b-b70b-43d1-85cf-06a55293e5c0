import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GrammarQuestion } from '@/types/games';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GrammarGameProps {
  questions: GrammarQuestion[];
  onScoreUpdate: (correct: boolean) => void;
}

export default function GrammarGame({ questions, onScoreUpdate }: GrammarGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    onScoreUpdate(isCorrect);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const getButtonVariant = (index: number) => {
    if (selectedAnswer === null) return 'outline';
    if (index === currentQuestion.correctAnswer) return 'default';
    if (index === selectedAnswer) return 'destructive';
    return 'outline';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Question {currentQuestionIndex + 1} / {questions.length}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              {currentQuestion.question}
            </h3>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  variant={getButtonVariant(index)}
                  disabled={selectedAnswer !== null}
                  className="h-auto py-4 px-6 text-left justify-start text-lg relative overflow-hidden"
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="flex-1">{option}</span>
                  {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 ml-2 text-secondary-foreground" />
                  )}
                  {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 ml-2" />
                  )}
                </Button>
              ))}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 bg-muted rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Explanation:</p>
                    <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button onClick={handleNext} size="lg" className="w-full h-14 text-lg">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Restart Quiz'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
