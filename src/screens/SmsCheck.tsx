import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ResultCard } from '@/components/ui/ResultCard';
import { MessageSquare, Scan } from 'lucide-react';
import { analyzeContent } from '@/services/phishingApi';
import type { RiskLevel } from '@/components/ui/RiskBadge';

interface AnalysisResult {
  risk: RiskLevel;
  reason: string;
  source: string;
}

export const SmsCheck: React.FC = () => {
  const [smsText, setSmsText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!smsText.trim()) return;

    setLoading(true);
    try {
      const analysis = await analyzeContent(smsText, 'sms');
      setResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
      setResult({
        risk: 'Suspicious',
        reason: 'Unable to complete analysis. Please check your connection and try again.',
        source: 'Error Handler'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSmsText('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="px-4 pt-8">
        {/* Header */}
        <div className="mb-6 fade-in">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <MessageSquare className="text-primary" />
            SMS Check
          </h1>
          <p className="text-muted-foreground">
            Paste suspicious SMS messages to check for phishing attempts
          </p>
        </div>

        {/* Input Card */}
        <Card className="mb-6 bg-gradient-card">
          <CardHeader>
            <CardTitle>Enter SMS Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste the suspicious SMS message here..."
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
              className="min-h-[120px] resize-none bg-input/50 border-border/50 focus:border-primary/50"
            />
            
            <div className="flex gap-3">
              <PrimaryButton
                variant="hero"
                onClick={handleAnalyze}
                disabled={!smsText.trim()}
                loading={loading}
                className="flex-1"
              >
                <Scan size={18} />
                Analyze Message
              </PrimaryButton>
              
              {(smsText || result) && (
                <PrimaryButton
                  variant="default"
                  onClick={handleClear}
                  className="px-6"
                >
                  Clear
                </PrimaryButton>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <ResultCard
            risk={result.risk}
            reason={result.reason}
            source={result.source}
            className="mb-6"
          />
        )}

        {/* Tips Card */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>SMS Phishing Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-danger font-bold">⚠️</span>
                Be suspicious of urgent messages asking for personal information
              </p>
              <p className="flex items-start gap-2">
                <span className="text-danger font-bold">🔗</span>
                Never click links from unknown senders
              </p>
              <p className="flex items-start gap-2">
                <span className="text-safe font-bold">✅</span>
                Verify sender identity through official channels
              </p>
              <p className="flex items-start gap-2">
                <span className="text-safe font-bold">🛡️</span>
                When in doubt, don't respond or click anything
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};