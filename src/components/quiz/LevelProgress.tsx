import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target } from 'lucide-react';
import { QuizLevel } from '@/data/quizLevels';

interface LevelProgressProps {
  level: QuizLevel;
  currentQuestion: number;
  totalQuestions: number;
  currentScore: number;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  currentQuestion,
  totalQuestions,
  currentScore
}) => {
  const questionProgress = ((currentQuestion + 1) / totalQuestions) * 100;
  const scoreProgress = (currentScore / level.maxPoints) * 100;
  const questionsAnswered = currentQuestion;

  return (
    <div className="bg-gradient-card rounded-lg p-4 mb-6 space-y-4">
      {/* Level Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{level.icon}</span>
          <div>
            <h3 className="font-semibold text-sm">{level.title}</h3>
            <p className="text-xs text-muted-foreground">{level.difficulty} level</p>
          </div>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Trophy size={12} />
          {currentScore}/{level.maxPoints}
        </Badge>
      </div>

      {/* Question Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium flex items-center gap-1">
            <Target size={14} />
            Question Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {totalQuestions}
          </span>
        </div>
        <Progress value={questionProgress} className="h-2 mb-1" />
        <div className="text-xs text-muted-foreground">
          {questionsAnswered} questions completed
        </div>
      </div>

      {/* Score Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium flex items-center gap-1">
            <Trophy size={14} />
            Score Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(scoreProgress)}%
          </span>
        </div>
        <Progress 
          value={scoreProgress} 
          className="h-2 mb-1"
        />
        <div className="text-xs text-muted-foreground">
          {currentScore} points earned • {level.maxPoints - currentScore} remaining
        </div>
      </div>
    </div>
  );
};