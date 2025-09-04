import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Scan, Clock, TrendingUp } from 'lucide-react';

// Mock data for recent checks
const recentChecks = [
  {
    id: 1,
    type: 'SMS',
    content: 'Congratulations! You won $1000...',
    risk: 'High Risk' as const,
    timestamp: '2 min ago'
  },
  {
    id: 2,
    type: 'URL',
    content: 'https://secure-bank-login.com',
    risk: 'Suspicious' as const,
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    type: 'SMS',
    content: 'Your package delivery update...',
    risk: 'Safe' as const,
    timestamp: '3 hours ago'
  }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock safety score (would come from user's analysis history)
  const safetyScore = 78;

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="px-4 pt-8 pb-6">
        {/* Header */}
        <div className="mb-8 fade-in">
          <h1 className="text-3xl font-bold mb-2">PhishGuard</h1>
          <p className="text-muted-foreground">Stay protected from phishing attacks</p>
        </div>

        {/* Safety Score Card */}
        <Card className="mb-6 bg-gradient-card card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              Safety Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Your phishing awareness level
              </p>
              <div className="text-2xl font-bold">
                {safetyScore >= 80 ? '🛡️' : safetyScore >= 60 ? '⚠️' : '🚨'} {safetyScore}%
              </div>
            </div>
            <ProgressRing progress={safetyScore} size={80}>
              <div className="text-center">
                <div className="text-lg font-bold">{safetyScore}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </ProgressRing>
          </CardContent>
        </Card>

        {/* Quick Scan Button */}
        <div className="mb-6">
          <PrimaryButton
            variant="hero"
            size="lg"
            className="w-full"
            onClick={() => navigate('/url-check')}
          >
            <Scan size={20} />
            Run Quick Scan
          </PrimaryButton>
        </div>

        {/* Recent Checks */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              Recent Checks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentChecks.map((check, index) => (
              <div
                key={check.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary">
                      {check.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {check.timestamp}
                    </span>
                  </div>
                  <p className="text-sm truncate">{check.content}</p>
                </div>
                <RiskBadge risk={check.risk} size="sm" />
              </div>
            ))}
            
            {recentChecks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Scan size={48} className="mx-auto mb-2 opacity-50" />
                <p>No recent scans</p>
                <p className="text-sm">Start by checking a suspicious message</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};