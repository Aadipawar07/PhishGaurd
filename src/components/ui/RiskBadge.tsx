import React from 'react';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RiskLevel = 'Safe' | 'Suspicious' | 'High Risk';

interface RiskBadgeProps {
  risk: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  risk, 
  size = 'md', 
  className 
}) => {
  const config = {
    Safe: {
      color: 'bg-safe text-safe-foreground',
      icon: Shield,
      label: 'Safe'
    },
    Suspicious: {
      color: 'bg-suspicious text-suspicious-foreground',
      icon: AlertTriangle,
      label: 'Suspicious'
    },
    'High Risk': {
      color: 'bg-danger text-danger-foreground',
      icon: XCircle,
      label: 'High Risk'
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const { color, icon: Icon, label } = config[risk];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        color,
        sizeClasses[size],
        'bounce-in',
        className
      )}
    >
      <Icon size={iconSizes[size]} />
      {label}
    </div>
  );
};