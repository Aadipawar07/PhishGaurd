import React from 'react';
import { Card, CardContent, CardHeader } from './card';
import { RiskBadge, RiskLevel } from './RiskBadge';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  risk: RiskLevel;
  reason: string;
  source?: string;
  className?: string;
  animated?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  risk,
  reason,
  source,
  className,
  animated = true
}) => {
  const getRiskStyle = (risk: RiskLevel) => {
    switch (risk) {
      case 'Safe':
        return 'border-safe/30 bg-gradient-to-br from-safe/5 to-safe/10';
      case 'Suspicious':
        return 'border-suspicious/30 bg-gradient-to-br from-suspicious/5 to-suspicious/10';
      case 'High Risk':
        return 'border-danger/30 bg-gradient-to-br from-danger/5 to-danger/10';
      default:
        return '';
    }
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden',
        getRiskStyle(risk),
        animated && 'card-slide-up',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          <RiskBadge risk={risk} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium text-muted-foreground mb-1">Assessment</h4>
          <p className="text-sm leading-relaxed">{reason}</p>
        </div>
        
        {source && (
          <div>
            <h4 className="font-medium text-muted-foreground mb-1">Detection Source</h4>
            <p className="text-xs text-muted-foreground">{source}</p>
          </div>
        )}
      </CardContent>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50 pointer-events-none" />
    </Card>
  );
};