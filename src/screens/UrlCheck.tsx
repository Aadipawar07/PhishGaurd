import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ResultCard } from '@/components/ui/ResultCard';
import { Link as LinkIcon, Scan, ExternalLink } from 'lucide-react';
import { analyzeContent } from '@/services/phishingApi';
import type { RiskLevel } from '@/components/ui/RiskBadge';

interface AnalysisResult {
  risk: RiskLevel;
  reason: string;
  source: string;
}

export const UrlCheck: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    try {
      const analysis = await analyzeContent(url, 'url');
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
    setUrl('');
    setResult(null);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="px-4 pt-8">
        {/* Header */}
        <div className="mb-6 fade-in">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <LinkIcon className="text-primary" />
            URL Check
          </h1>
          <p className="text-muted-foreground">
            Verify suspicious links before clicking them
          </p>
        </div>

        {/* Input Card */}
        <Card className="mb-6 bg-gradient-card">
          <CardHeader>
            <CardTitle>Enter URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type="url"
                placeholder="https://suspicious-website.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-10 bg-input/50 border-border/50 focus:border-primary/50"
              />
              {url && isValidUrl(url) && (
                <ExternalLink 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              )}
            </div>
            
            <div className="flex gap-3">
              <PrimaryButton
                variant="hero"
                onClick={handleAnalyze}
                disabled={!url.trim()}
                loading={loading}
                className="flex-1"
              >
                <Scan size={18} />
                Check URL
              </PrimaryButton>
              
              {(url || result) && (
                <PrimaryButton
                  variant="default"
                  onClick={handleClear}
                  className="px-6"
                >
                  Clear
                </PrimaryButton>
              )}
            </div>

            {url && !isValidUrl(url) && (
              <p className="text-sm text-suspicious">
                Please enter a valid URL (e.g., https://example.com)
              </p>
            )}
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

        {/* URL Security Tips */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>URL Security Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-safe font-bold">🔒</span>
                Look for HTTPS (secure connection) in legitimate sites
              </p>
              <p className="flex items-start gap-2">
                <span className="text-danger font-bold">⚠️</span>
                Be wary of misspelled domain names (e.g., "gmai1.com")
              </p>
              <p className="flex items-start gap-2">
                <span className="text-danger font-bold">🔗</span>
                Avoid clicking shortened URLs from unknown sources
              </p>
              <p className="flex items-start gap-2">
                <span className="text-safe font-bold">👀</span>
                Hover over links to preview the actual destination
              </p>
              <p className="flex items-start gap-2">
                <span className="text-safe font-bold">🛡️</span>
                When in doubt, type the URL manually in a new tab
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};