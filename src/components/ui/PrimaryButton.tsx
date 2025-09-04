import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'hero' | 'danger' | 'safe';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  variant = 'default',
  size = 'default',
  children,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const variants = {
    default: 'bg-gradient-primary hover:shadow-glow',
    hero: 'bg-gradient-primary hover:shadow-glow text-primary-foreground font-semibold',
    danger: 'bg-danger hover:bg-danger/90 hover:shadow-danger text-danger-foreground',
    safe: 'bg-safe hover:bg-safe/90 text-safe-foreground'
  };

  return (
    <Button
      className={cn(
        'rounded-xl transition-all duration-300 font-medium',
        variants[variant],
        size === 'lg' && 'px-8 py-6 text-lg',
        loading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};