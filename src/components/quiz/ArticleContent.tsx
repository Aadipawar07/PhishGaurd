import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Article } from '@/data/quizLevels';

interface ArticleContentProps {
  article: Article;
  onComplete: () => void;
  levelTitle: string;
  levelIcon: string;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({
  article,
  onComplete,
  levelTitle,
  levelIcon
}) => {
  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      <div className="px-4 pt-8">
        {/* Header */}
        <div className="mb-6 fade-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{levelIcon}</span>
            <span>{levelTitle}</span>
            <ArrowRight size={14} />
            <span>Learning Content</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="text-primary" />
            {article.title}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock size={12} />
              {article.readTime} min read
            </Badge>
          </div>
        </div>

        {/* Article Content */}
        <Card className="mb-6 bg-gradient-card card-slide-up">
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  // Handle bold headings
                  return (
                    <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-foreground">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  // Handle bullet points
                  const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-1 mb-4 text-muted-foreground">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.substring(2)}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Tips */}
        <Card className="mb-6 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-safe" />
              Key Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {article.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <PrimaryButton
          variant="hero"
          size="lg"
          onClick={onComplete}
          className="w-full"
        >
          <ArrowRight size={20} />
          Continue to Quiz
        </PrimaryButton>
      </div>
    </div>
  );
};