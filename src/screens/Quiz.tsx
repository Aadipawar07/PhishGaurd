import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Trophy, RotateCcw, ArrowLeft, Star, Award } from 'lucide-react';
import { quizLevels, QuizLevel, QuizQuestion, updateLevelProgress, calculateTotalPoints } from '@/data/quizLevels';
import { LevelCard } from '@/components/quiz/LevelCard';
import { ArticleContent } from '@/components/quiz/ArticleContent';
import { LevelProgress } from '@/components/quiz/LevelProgress';

type QuizMode = 'levelSelect' | 'article' | 'quiz' | 'levelComplete';

export const Quiz: React.FC = () => {
  const [levels, setLevels] = useState<QuizLevel[]>(quizLevels);
  const [currentMode, setCurrentMode] = useState<QuizMode>('levelSelect');
  const [selectedLevel, setSelectedLevel] = useState<QuizLevel | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [levelScore, setLevelScore] = useState(0);

  const totalUserPoints = calculateTotalPoints(levels);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('phishguard-quiz-progress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        setLevels(parsedProgress);
      } catch (error) {
        console.error('Failed to load quiz progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (updatedLevels: QuizLevel[]) => {
    localStorage.setItem('phishguard-quiz-progress', JSON.stringify(updatedLevels));
    setLevels(updatedLevels);
  };

  const handleLevelStart = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level && level.unlocked) {
      setSelectedLevel(level);
      setCurrentMode('article');
      resetQuizState();
    }
  };

  const handleArticleComplete = () => {
    setCurrentMode('quiz');
  };

  const resetQuizState = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setLevelScore(0);
  };

  const handleAnswer = (isPhishing: boolean) => {
    if (!selectedLevel) return;
    
    setSelectedAnswer(isPhishing);
    setShowExplanation(true);
    
    const newAnswers = [...answers, isPhishing];
    setAnswers(newAnswers);
    
    const question = selectedLevel.questions[currentQuestion];
    if (isPhishing === question.isPhishing) {
      const points = getQuestionPoints(question.difficulty);
      setScore(score + 1);
      setLevelScore(levelScore + points);
    }
  };

  const getQuestionPoints = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy': return 20;
      case 'medium': return 30;
      case 'hard': return 40;
      default: return 20;
    }
  };

  const handleNext = () => {
    if (!selectedLevel) return;
    
    if (currentQuestion < selectedLevel.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Level completed
      const updatedLevels = updateLevelProgress(levels, selectedLevel.id, levelScore);
      saveProgress(updatedLevels);
      setCurrentMode('levelComplete');
    }
  };

  const handleBackToLevels = () => {
    setCurrentMode('levelSelect');
    setSelectedLevel(null);
    resetQuizState();
  };

  const getScoreMessage = (score: number, total: number, maxPoints: number) => {
    const percentage = (score / total) * 100;
    const pointsEarned = levelScore;
    
    if (percentage >= 80) return { 
      message: "Outstanding! You're a phishing detection expert!", 
      emoji: "🏆", 
      color: "text-safe",
      grade: "A+"
    };
    if (percentage >= 70) return { 
      message: "Great job! You've mastered this level!", 
      emoji: "🛡️", 
      color: "text-safe",
      grade: "A"
    };
    if (percentage >= 60) return { 
      message: "Good work! Keep practicing to improve!", 
      emoji: "⚠️", 
      color: "text-suspicious",
      grade: "B"
    };
    return { 
      message: "Keep learning to stay safe online!", 
      emoji: "🚨", 
      color: "text-danger",
      grade: "C"
    };
  };

  // Level Selection Screen
  if (currentMode === 'levelSelect') {
    return (
      <div className="min-h-screen bg-gradient-hero pb-20">
        <div className="px-4 pt-8">
          {/* Header */}
          <div className="mb-6 fade-in">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Brain className="text-primary" />
              Phishing Academy
            </h1>
            <p className="text-muted-foreground">
              Master cybersecurity through interactive learning
            </p>
          </div>

          {/* Overall Progress */}
          <Card className="mb-6 bg-gradient-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Your Progress</h3>
                  <p className="text-sm text-muted-foreground">Total points earned</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center gap-1">
                    <Trophy className="text-primary" size={24} />
                    {totalUserPoints}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {levels.filter(l => l.completed).length}/{levels.length} levels completed
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {levels.map((level) => (
                  <div key={level.id} className="flex-1">
                    <div className={`h-2 rounded-full ${
                      level.completed ? 'bg-safe' : 
                      level.unlocked ? 'bg-primary/30' : 'bg-muted'
                    }`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Levels */}
          <div className="space-y-4">
            {levels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                onStart={handleLevelStart}
                totalUserPoints={totalUserPoints}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Article Screen
  if (currentMode === 'article' && selectedLevel) {
    return (
      <ArticleContent
        article={selectedLevel.article}
        onComplete={handleArticleComplete}
        levelTitle={selectedLevel.title}
        levelIcon={selectedLevel.icon}
      />
    );
  }

  // Level Complete Screen
  if (currentMode === 'levelComplete' && selectedLevel) {
    const { message, emoji, color, grade } = getScoreMessage(score, selectedLevel.questions.length, selectedLevel.maxPoints);
    const completed = score >= selectedLevel.questions.length * 0.7;
    
    return (
      <div className="min-h-screen bg-gradient-hero pb-20">
        <div className="px-4 pt-8">
          <div className="text-center mb-8 bounce-in">
            <div className="text-6xl mb-4">{emoji}</div>
            <h1 className="text-3xl font-bold mb-2">Level Complete!</h1>
            <p className="text-muted-foreground">{selectedLevel.title}</p>
          </div>

          <Card className="mb-6 bg-gradient-card">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="flex items-center justify-center gap-8">
                <div>
                  <div className="text-3xl font-bold">{score}/{selectedLevel.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions Correct</div>
                </div>
                <div>
                  <div className="text-3xl font-bold flex items-center gap-1">
                    <Star className="text-primary" size={24} />
                    {levelScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{grade}</div>
                  <div className="text-sm text-muted-foreground">Grade</div>
                </div>
              </div>
              
              <div className={`text-lg font-medium ${color} p-4 rounded-lg bg-muted/20`}>
                {message}
              </div>

              {completed && (
                <div className="flex items-center justify-center gap-2 text-safe">
                  <Award size={20} />
                  <span className="font-medium">Level Completed!</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-3">
            <PrimaryButton
              variant="hero"
              size="lg"
              onClick={handleBackToLevels}
              className="w-full"
            >
              <Trophy size={20} />
              Continue Learning
            </PrimaryButton>
            
            <PrimaryButton
              variant="safe"
              onClick={() => {
                resetQuizState();
                setCurrentMode('quiz');
              }}
              className="w-full"
            >
              <RotateCcw size={16} />
              Retry Level
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (currentMode === 'quiz' && selectedLevel) {
    const question = selectedLevel.questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-hero pb-20">
        <div className="px-4 pt-8">
          {/* Header with Back Button */}
          <div className="mb-6 fade-in">
            <div className="flex items-center gap-3 mb-4">
              <PrimaryButton
                variant="default"
                onClick={handleBackToLevels}
                className="p-2"
              >
                <ArrowLeft size={16} />
              </PrimaryButton>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <span>{selectedLevel.icon}</span>
                  {selectedLevel.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {selectedLevel.questions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <LevelProgress
            level={selectedLevel}
            currentQuestion={currentQuestion}
            totalQuestions={selectedLevel.questions.length}
            currentScore={levelScore}
          />

          {/* Question */}
          <Card className="mb-6 bg-gradient-card card-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="uppercase text-xs">
                    {question.type}
                  </Badge>
                  <Badge className={
                    question.difficulty === 'easy' ? 'bg-safe text-safe-foreground' :
                    question.difficulty === 'medium' ? 'bg-suspicious text-suspicious-foreground' :
                    'bg-danger text-danger-foreground'
                  }>
                    {question.difficulty}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  +{getQuestionPoints(question.difficulty)} points
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary/50">
                <p className="text-sm leading-relaxed whitespace-pre-line">{question.content}</p>
              </div>

              {!showExplanation ? (
                <div className="grid grid-cols-2 gap-3">
                  <PrimaryButton
                    variant="safe"
                    onClick={() => handleAnswer(false)}
                    className="py-4"
                  >
                    ✅ Safe
                  </PrimaryButton>
                  <PrimaryButton
                    variant="danger"
                    onClick={() => handleAnswer(true)}
                    className="py-4"
                  >
                    🚨 Phishing
                  </PrimaryButton>
                </div>
              ) : (
                <div className="space-y-4 card-slide-up">
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === question.isPhishing 
                      ? 'bg-safe/20 border border-safe/30' 
                      : 'bg-danger/20 border border-danger/30'
                  }`}>
                    <div className="font-medium mb-2 flex items-center justify-between">
                      <span>
                        {selectedAnswer === question.isPhishing ? '✅ Correct!' : '❌ Incorrect'}
                      </span>
                      {selectedAnswer === question.isPhishing && (
                        <div className="flex items-center gap-1 text-sm text-safe">
                          <Star size={14} />
                          +{getQuestionPoints(question.difficulty)} points
                        </div>
                      )}
                    </div>
                    <div className="text-sm">
                      This message is <strong>{question.isPhishing ? 'phishing' : 'safe'}</strong>.
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="font-medium mb-2">Explanation:</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </div>
                  </div>

                  <PrimaryButton
                    variant="hero"
                    onClick={handleNext}
                    className="w-full"
                  >
                    {currentQuestion < selectedLevel.questions.length - 1 ? 'Next Question' : 'Complete Level'}
                  </PrimaryButton>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};