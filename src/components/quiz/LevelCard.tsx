import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Lock, CheckCircle } from 'lucide-react';
import { QuizLevel, calculateLevelProgress } from '@/data/quizLevels';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  level: QuizLevel;
  onStart: (levelId: number) => void;
  totalUserPoints: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({ level, onStart, totalUserPoints }) => {
  const progress = calculateLevelProgress(level, level.userScore);
  const canPlay = level.unlocked;
  const pointsNeeded = Math.max(0, level.pointsRequired - totalUserPoints);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-safe text-safe-foreground';
      case 'intermediate': return 'bg-suspicious text-suspicious-foreground';
      case 'advanced': return 'bg-primary text-primary-foreground';
      case 'expert': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300',
      canPlay ? 'bg-gradient-card hover:shadow-glow cursor-pointer' : 'bg-muted/20 opacity-60',
      level.completed && 'border-safe/50 bg-gradient-to-br from-safe/10 to-safe/5'
    )}>
      {!canPlay && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Lock size={32} className="text-muted-foreground mx-auto" />
            <p className="text-sm font-medium">Locked</p>
            <p className="text-xs text-muted-foreground">
              Need {pointsNeeded} more points
            </p>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{level.icon}</div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {level.title}
                {level.completed && <CheckCircle size={20} className="text-safe" />}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {level.description}
              </p>
            </div>
          </div>
          <Badge className={getDifficultyColor(level.difficulty)}>
            {level.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        {level.userScore !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {level.userScore}/{level.maxPoints} points
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {level.article.readTime + level.questions.length * 2} min
          </div>
          <div className="flex items-center gap-1">
            <Trophy size={14} />
            {level.maxPoints} max points
          </div>
        </div>

        {/* Action Button */}
        <PrimaryButton
          variant={level.completed ? "safe" : "hero"}
          size="lg"
          onClick={() => onStart(level.id)}
          disabled={!canPlay}
          className="w-full"
        >
          {level.completed ? (
            <>
              <CheckCircle size={16} />
              Review Level
            </>
          ) : level.userScore !== undefined ? (
            'Continue Level'
          ) : (
            'Start Level'
          )}
        </PrimaryButton>

        {/* Requirements */}
        {level.pointsRequired > 0 && (
          <div className="text-xs text-muted-foreground text-center">
            Requires {level.pointsRequired} total points to unlock
          </div>
        )}
      </CardContent>
    </Card>
  );
};