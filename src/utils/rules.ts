import type { RiskLevel } from '@/components/ui/RiskBadge';

export interface PhishingRule {
  pattern: RegExp;
  weight: number;
  description: string;
  category: 'urgent' | 'financial' | 'suspicious_link' | 'grammar' | 'impersonation';
}

// Phishing detection rules with weighted scoring
const phishingRules: PhishingRule[] = [
  // Urgency indicators
  {
    pattern: /\b(urgent|immediate|expire|suspend|verify now|act now|limited time)\b/i,
    weight: 3,
    description: 'Uses urgency tactics',
    category: 'urgent'
  },
  {
    pattern: /\b(within \d+ hours?|expires? (today|tomorrow))\b/i,
    weight: 2,
    description: 'Creates time pressure',
    category: 'urgent'
  },

  // Financial/prize scams
  {
    pattern: /\b(won|winner|prize|jackpot|\$\d+|cash|reward|refund)\b/i,
    weight: 4,
    description: 'Promises money or prizes',
    category: 'financial'
  },
  {
    pattern: /\b(tax refund|irs|government|stimulus)\b/i,
    weight: 4,
    description: 'Impersonates government agencies',
    category: 'impersonation'
  },

  // Suspicious links
  {
    pattern: /\b(bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly)\b/i,
    weight: 2,
    description: 'Uses URL shorteners',
    category: 'suspicious_link'
  },
  {
    pattern: /https?:\/\/[^\s]*[^\w\s-\.]/i,
    weight: 3,
    description: 'Contains suspicious URL characters',
    category: 'suspicious_link'
  },

  // Misspelled domains (common targets)
  {
    pattern: /\b(gmai1|payp4l|amazo0n|microsft|applе|bankofamerica)\b/i,
    weight: 5,
    description: 'Contains misspelled brand names',
    category: 'impersonation'
  },

  // Account security threats
  {
    pattern: /\b(account (suspended|locked|compromised)|security alert|unusual activity)\b/i,
    weight: 3,
    description: 'Claims account security issues',
    category: 'urgent'
  },
  {
    pattern: /\b(verify (your )?account|confirm (your )?identity|update payment)\b/i,
    weight: 3,
    description: 'Requests account verification',
    category: 'urgent'
  },

  // Poor grammar/spelling indicators
  {
    pattern: /\b(recieve|seperate|loose|there account|your eligible)\b/i,
    weight: 1,
    description: 'Contains common misspellings',
    category: 'grammar'
  },

  // Generic greetings (lack of personalization)
  {
    pattern: /^(dear (customer|sir\/madam|valued customer)|hello (user|customer))/i,
    weight: 1,
    description: 'Uses generic greeting',
    category: 'impersonation'
  }
];

// URL-specific rules
const urlRules: PhishingRule[] = [
  {
    pattern: /^https?:\/\/[^\/]*\.(tk|ml|ga|cf)($|\/)/i,
    weight: 4,
    description: 'Uses suspicious free domain',
    category: 'suspicious_link'
  },
  {
    pattern: /^https?:\/\/\d+\.\d+\.\d+\.\d+/i,
    weight: 3,
    description: 'Uses IP address instead of domain',
    category: 'suspicious_link'
  },
  {
    pattern: /[0-9]{4,}/,
    weight: 2,
    description: 'Contains long number sequences',
    category: 'suspicious_link'
  },
  {
    pattern: /[a-z][\d][a-z]|[a-z]{20,}/i,
    weight: 2,
    description: 'Unusual character patterns in domain',
    category: 'suspicious_link'
  }
];

/**
 * Analyzes content for phishing indicators using rule-based detection
 */
export function detectPhishing(
  content: string, 
  type: 'sms' | 'url' | 'email' = 'sms'
): {
  risk: RiskLevel;
  reason: string;
  source: string;
} {
  let totalScore = 0;
  const matchedRules: PhishingRule[] = [];
  
  // Apply general rules
  phishingRules.forEach(rule => {
    if (rule.pattern.test(content)) {
      totalScore += rule.weight;
      matchedRules.push(rule);
    }
  });

  // Apply URL-specific rules for URLs
  if (type === 'url') {
    urlRules.forEach(rule => {
      if (rule.pattern.test(content)) {
        totalScore += rule.weight;
        matchedRules.push(rule);
      }
    });
  }

  // Determine risk level based on score
  let risk: RiskLevel;
  let reason: string;

  if (totalScore >= 8) {
    risk = 'High Risk';
    reason = `Strong phishing indicators detected: ${matchedRules.map(r => r.description.toLowerCase()).join(', ')}. Do not interact with this content.`;
  } else if (totalScore >= 4) {
    risk = 'Suspicious';
    reason = `Multiple warning signs found: ${matchedRules.map(r => r.description.toLowerCase()).join(', ')}. Exercise caution and verify independently.`;
  } else if (totalScore >= 1) {
    risk = 'Suspicious';
    reason = `Some concerning elements detected: ${matchedRules.map(r => r.description.toLowerCase()).join(', ')}. Be cautious.`;
  } else {
    risk = 'Safe';
    reason = 'No obvious phishing indicators detected. However, always remain vigilant with unexpected messages.';
  }

  return {
    risk,
    reason,
    source: 'Local Rule Engine'
  };
}

/**
 * Checks if a URL appears to be legitimate based on common patterns
 */
export function isLegitimateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Check for well-known legitimate domains
    const legitimateDomains = [
      'google.com', 'microsoft.com', 'apple.com', 'amazon.com',
      'paypal.com', 'ebay.com', 'facebook.com', 'twitter.com',
      'instagram.com', 'linkedin.com', 'github.com', 'stackoverflow.com'
    ];
    
    const domain = urlObj.hostname.toLowerCase();
    
    // Check if it's a known legitimate domain or subdomain
    return legitimateDomains.some(legitDomain => 
      domain === legitDomain || domain.endsWith('.' + legitDomain)
    );
  } catch (error) {
    return false;
  }
}

/**
 * Extracts all URLs from text content
 */
export function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s]+/gi;
  return text.match(urlRegex) || [];
}