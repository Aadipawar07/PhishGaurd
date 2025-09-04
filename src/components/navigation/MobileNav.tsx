import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, MessageSquare, Link as LinkIcon, Brain, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Shield, label: 'Dashboard' },
  { path: '/sms-check', icon: MessageSquare, label: 'SMS' },
  { path: '/url-check', icon: LinkIcon, label: 'URL' },
  { path: '/quiz', icon: Brain, label: 'Quiz' },
  { path: '/monitor', icon: Bell, label: 'Monitor' }
];

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="mobile-nav">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200',
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon 
                size={20} 
                className={isActive ? 'animate-pulse' : ''}
              />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};