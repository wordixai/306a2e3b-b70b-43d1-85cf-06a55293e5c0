import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language, GameMode, GameStats } from '@/types/games';
import { vocabularyData } from '@/data/vocabulary';
import { grammarData } from '@/data/grammar';
import VocabularyGame from '@/components/VocabularyGame';
import GrammarGame from '@/components/GrammarGame';
import PronunciationGame from '@/components/PronunciationGame';
import ListeningGame from '@/components/ListeningGame';
import { BookOpen, Brain, Mic, Headphones, Trophy, Flame, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('spanish');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [stats, setStats] = useState<GameStats>({
    correct: 0,
    incorrect: 0,
    streak: 0,
    totalPoints: 0,
  });

  const handleScoreUpdate = (correct: boolean) => {
    setStats((prev) => {
      const newStreak = correct ? prev.streak + 1 : 0;
      const points = correct ? 10 + newStreak * 2 : 0;

      if (correct) {
        toast.success('Correct! +' + points + ' points', {
          description: newStreak > 2 ? `🔥 ${newStreak} streak!` : undefined,
        });
      }

      return {
        correct: correct ? prev.correct + 1 : prev.correct,
        incorrect: correct ? prev.incorrect : prev.incorrect + 1,
        streak: newStreak,
        totalPoints: prev.totalPoints + points,
      };
    });
  };

  const gameModes = [
    {
      id: 'vocabulary' as GameMode,
      title: 'Vocabulary',
      description: 'Learn new words with flashcards',
      icon: BookOpen,
      color: 'text-primary',
    },
    {
      id: 'grammar' as GameMode,
      title: 'Grammar',
      description: 'Master grammar rules',
      icon: Brain,
      color: 'text-secondary',
    },
    {
      id: 'pronunciation' as GameMode,
      title: 'Pronunciation',
      description: 'Practice speaking',
      icon: Mic,
      color: 'text-accent',
    },
    {
      id: 'listening' as GameMode,
      title: 'Listening',
      description: 'Train your ear',
      icon: Headphones,
      color: 'text-info',
    },
  ];

  const languages = [
    { value: 'spanish', label: 'Spanish', flag: '🇪🇸' },
    { value: 'french', label: 'French', flag: '🇫🇷' },
    { value: 'german', label: 'German', flag: '🇩🇪' },
    { value: 'italian', label: 'Italian', flag: '🇮🇹' },
    { value: 'japanese', label: 'Japanese', flag: '🇯🇵' },
  ];

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="text-7xl mb-4">🌍</div>
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Language Learning Games
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Master vocabulary, grammar, and pronunciation through interactive games
            </p>

            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-foreground">
                  {stats.totalPoints}
                </span>
                <span className="text-muted-foreground">points</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-destructive" />
                <span className="text-2xl font-bold text-foreground">{stats.streak}</span>
                <span className="text-muted-foreground">streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{stats.correct}</span>
                <span className="text-muted-foreground">correct</span>
              </div>
            </div>

            <div className="max-w-xs mx-auto mb-12">
              <Select
                value={selectedLanguage}
                onValueChange={(value) => setSelectedLanguage(value as Language)}
              >
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-lg">
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {gameModes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary group"
                    onClick={() => setGameMode(mode.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className={`h-8 w-8 ${mode.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 text-foreground">
                          {mode.title}
                        </h3>
                        <p className="text-muted-foreground">{mode.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                🎯 Your Progress Today
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-bold text-secondary">{stats.correct}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-destructive">{stats.incorrect}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {stats.correct + stats.incorrect > 0
                      ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={() => setGameMode(null)} variant="outline" size="lg">
            ← Back to Menu
          </Button>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="text-xl font-bold">{stats.totalPoints}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-destructive" />
              <span className="text-xl font-bold">{stats.streak}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <Badge variant="outline" className="text-lg px-4 py-2 mb-4">
            {languages.find((l) => l.value === selectedLanguage)?.flag}{' '}
            {languages.find((l) => l.value === selectedLanguage)?.label}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground">
            {gameModes.find((m) => m.id === gameMode)?.title}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={gameMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {gameMode === 'vocabulary' && (
              <VocabularyGame
                words={vocabularyData[selectedLanguage] || []}
                onScoreUpdate={handleScoreUpdate}
              />
            )}
            {gameMode === 'grammar' && (
              <GrammarGame
                questions={grammarData[selectedLanguage] || []}
                onScoreUpdate={handleScoreUpdate}
              />
            )}
            {gameMode === 'pronunciation' && (
              <PronunciationGame
                words={vocabularyData[selectedLanguage] || []}
                onScoreUpdate={handleScoreUpdate}
              />
            )}
            {gameMode === 'listening' && (
              <ListeningGame
                words={vocabularyData[selectedLanguage] || []}
                onScoreUpdate={handleScoreUpdate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
