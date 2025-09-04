export interface QuizQuestion {
  id: number;
  content: string;
  type: 'sms' | 'email' | 'call';
  isPhishing: boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Article {
  id: number;
  title: string;
  content: string;
  tips: string[];
  readTime: number;
}

export interface QuizLevel {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  pointsRequired: number;
  maxPoints: number;
  article: Article;
  questions: QuizQuestion[];
  unlocked: boolean;
  completed: boolean;
  userScore?: number;
}

export const quizLevels: QuizLevel[] = [
  {
    id: 1,
    title: "Basic Phishing Awareness",
    description: "Learn to identify common phishing attempts",
    icon: "🎯",
    difficulty: "beginner",
    pointsRequired: 0,
    maxPoints: 100,
    unlocked: true,
    completed: false,
    article: {
      id: 1,
      title: "Understanding Phishing Attacks",
      content: `Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information like passwords, credit card numbers, or personal data.

**Common Signs of Phishing:**
- Urgent or threatening language
- Requests for personal information
- Suspicious sender addresses
- Generic greetings like "Dear Customer"
- Unusual links or attachments

**Why Phishing Works:**
Phishing attacks exploit human psychology rather than technical vulnerabilities. They create a sense of urgency or fear to make victims act quickly without thinking.`,
      tips: [
        "Always verify the sender's identity through official channels",
        "Look for spelling and grammar mistakes in messages",
        "Hover over links to see the actual destination",
        "Be suspicious of urgent requests for personal information",
        "When in doubt, contact the organization directly"
      ],
      readTime: 3
    },
    questions: [
      {
        id: 1,
        content: "🎉 CONGRATULATIONS! You've won $5,000! Click here to claim your prize: http://bit.ly/win5k",
        type: 'sms',
        isPhishing: true,
        difficulty: 'easy',
        explanation: "This is a classic lottery scam. Legitimate prizes don't require clicking suspicious links, and you can't win contests you never entered."
      },
      {
        id: 2,
        content: "Hi John, your Netflix subscription expires tomorrow. Please update your payment method at: https://netflix.com/account",
        type: 'email',
        isPhishing: false,
        difficulty: 'easy',
        explanation: "This appears legitimate with Netflix's official domain and a reasonable request. However, always verify by logging in directly to your account."
      },
      {
        id: 3,
        content: "URGENT: Your bank account has been compromised. Verify your details immediately: https://secure-bank-verification.net",
        type: 'email',
        isPhishing: true,
        difficulty: 'easy',
        explanation: "Banks don't send urgent emails asking for verification through external links. The domain 'secure-bank-verification.net' is suspicious and not a bank's official domain."
      }
    ]
  },
  {
    id: 2,
    title: "Email Security",
    description: "Master email-based threat detection",
    icon: "📧",
    difficulty: "intermediate",
    pointsRequired: 70,
    maxPoints: 150,
    unlocked: false,
    completed: false,
    article: {
      id: 2,
      title: "Advanced Email Security",
      content: `Email remains the primary vector for phishing attacks. Advanced phishing emails often look incredibly convincing and use sophisticated techniques.

**Advanced Phishing Techniques:**
- Domain spoofing (using similar-looking domains)
- Email header manipulation
- HTML formatting to hide malicious links
- Social engineering based on public information
- Business Email Compromise (BEC) attacks

**Email Authentication:**
Modern email systems use SPF, DKIM, and DMARC to authenticate legitimate emails. However, these aren't foolproof, and attackers constantly evolve their techniques.`,
      tips: [
        "Check the email headers for authentication failures",
        "Be extra cautious with emails requesting wire transfers",
        "Verify requests through phone calls, not email replies",
        "Look for inconsistencies in sender names and addresses",
        "Be wary of emails that bypass your usual spam filters"
      ],
      readTime: 4
    },
    questions: [
      {
        id: 4,
        content: "From: security@paypal.com\nSubject: Account Limitation\n\nYour PayPal account has been limited due to suspicious activity. Please verify your account immediately by clicking here: https://paypal-security.verify-account.com/login",
        type: 'email',
        isPhishing: true,
        difficulty: 'medium',
        explanation: "While the sender appears to be from PayPal, the link goes to 'paypal-security.verify-account.com' which is not PayPal's official domain. PayPal would use paypal.com for legitimate communications."
      },
      {
        id: 5,
        content: "From: noreply@amazon.com\nYour order #112-8745632-1234567 has been shipped and will arrive tomorrow. Track your package: https://amazon.com/gp/your-account/order-history",
        type: 'email',
        isPhishing: false,
        difficulty: 'medium',
        explanation: "This email uses Amazon's official domain and provides a specific order number. The link goes to Amazon's legitimate order tracking page."
      },
      {
        id: 6,
        content: "From: IT-Support@yourcompany.com\nSubject: Password Expiry Notice\n\nYour password will expire in 24 hours. Click here to update: http://password-reset.temp-site.com/update",
        type: 'email',
        isPhishing: true,
        difficulty: 'medium',
        explanation: "Internal IT emails for password resets should go to your organization's official domain, not to external sites like 'temp-site.com'. Always verify with your IT department directly."
      }
    ]
  },
  {
    id: 3,
    title: "Social Engineering",
    description: "Recognize manipulation tactics",
    icon: "🎭",
    difficulty: "advanced",
    pointsRequired: 200,
    maxPoints: 200,
    unlocked: false,
    completed: false,
    article: {
      id: 3,
      title: "Social Engineering Tactics",
      content: `Social engineering exploits human psychology to manipulate people into divulging confidential information or performing actions that compromise security.

**Common Social Engineering Tactics:**
- Authority (impersonating bosses or officials)
- Urgency (creating time pressure)
- Fear (threats of consequences)
- Reciprocity (offering something first)
- Social proof (claiming others have complied)
- Scarcity (limited time offers)

**Vishing and Smishing:**
Voice phishing (vishing) uses phone calls, while SMS phishing (smishing) uses text messages. Both can be highly effective as they seem more personal and immediate than emails.`,
      tips: [
        "Take time to think before acting on urgent requests",
        "Verify the identity of callers through official channels",
        "Be suspicious of unsolicited calls requesting information",
        "Don't let authority figures pressure you into quick decisions",
        "Trust your instincts - if something feels wrong, it probably is"
      ],
      readTime: 5
    },
    questions: [
      {
        id: 7,
        content: "CALL: 'Hi, this is Officer Johnson from the IRS. You have unpaid taxes of $3,247. If you don't pay immediately, we'll issue a warrant for your arrest. Please stay on the line while I transfer you to our payment department.'",
        type: 'call',
        isPhishing: true,
        difficulty: 'hard',
        explanation: "The IRS never calls taxpayers directly about unpaid taxes without first sending written notices. They also don't threaten immediate arrest or demand immediate payment over the phone."
      },
      {
        id: 8,
        content: "SMS: Hi! This is Sarah from your IT department. We're updating our security systems. Can you quickly confirm your login credentials? Reply with username and password. Thanks!",
        type: 'sms',
        isPhishing: true,
        difficulty: 'hard',
        explanation: "Legitimate IT departments never ask for passwords via SMS. This uses a casual, friendly tone to lower defenses, but real IT staff would never request credentials this way."
      },
      {
        id: 9,
        content: "CALL: 'Hello, this is Dr. Martinez's office calling to confirm your appointment tomorrow at 2 PM. If you need to reschedule, please call us back at 555-0123.'",
        type: 'call',
        isPhishing: false,
        difficulty: 'hard',
        explanation: "This appears to be a legitimate appointment confirmation. It provides specific details and asks you to call back rather than providing sensitive information over the phone."
      }
    ]
  },
  {
    id: 4,
    title: "Advanced Threats",
    description: "Handle sophisticated attacks",
    icon: "🛡️",
    difficulty: "expert",
    pointsRequired: 350,
    maxPoints: 250,
    unlocked: false,
    completed: false,
    article: {
      id: 4,
      title: "Advanced Persistent Threats",
      content: `Advanced threats use sophisticated techniques and often target specific individuals or organizations. These attacks may combine multiple methods and can persist over long periods.

**Spear Phishing:**
Highly targeted attacks using personal information gathered from social media, company websites, or previous data breaches. These emails appear to come from trusted contacts.

**Whaling:**
Attacks specifically targeting high-profile individuals like executives or celebrities. These often involve extensive research and highly convincing impersonation.

**Supply Chain Attacks:**
Compromising trusted software or services to reach the ultimate target. These attacks can affect thousands of organizations through a single compromised vendor.`,
      tips: [
        "Verify unusual requests from colleagues through alternative channels",
        "Be extra cautious with financial or sensitive data requests",
        "Monitor your digital footprint and limit public information",
        "Implement multi-factor authentication wherever possible",
        "Regularly update and patch all software and systems"
      ],
      readTime: 6
    },
    questions: [
      {
        id: 10,
        content: "From: john.smith@company.com (your colleague)\nSubject: Urgent: Wire Transfer Needed\n\nI'm stuck in a meeting with the client in Germany. We need to send a wire transfer of $45,000 to secure the contract. Can you initiate this immediately? Here are the details: [bank details]. Time sensitive - client leaves in 2 hours.",
        type: 'email',
        isPhishing: true,
        difficulty: 'hard',
        explanation: "This is a Business Email Compromise (BEC) attack. Even though it appears to come from a colleague, attackers can spoof email addresses. Always verify large financial requests through phone calls or in-person confirmation."
      },
      {
        id: 11,
        content: "From: security@microsoft.com\nSubject: Microsoft 365 Security Alert\n\nWe've detected unusual activity on your account from IP address 192.168.1.100 in China. If this wasn't you, please secure your account: https://account.microsoft.com/security",
        type: 'email',
        isPhishing: false,
        difficulty: 'hard',
        explanation: "This appears legitimate with Microsoft's official domain and directs to their real security page. However, you should still verify by logging in directly to your Microsoft account rather than clicking the link."
      },
      {
        id: 12,
        content: "From: support@docusign.com\nYou have a document to sign from Legal Department. This document expires in 24 hours. Sign here: https://docusign-secure.documents-online.net/sign/abc123",
        type: 'email',
        isPhishing: true,
        difficulty: 'hard',
        explanation: "While the sender appears to be DocuSign, the link goes to 'docusign-secure.documents-online.net' which is not DocuSign's official domain. Legitimate DocuSign emails use docusign.com or docusign.net."
      }
    ]
  }
];

// Helper functions for level management
export const calculateLevelProgress = (level: QuizLevel, userScore: number = 0): number => {
  return Math.round((userScore / level.maxPoints) * 100);
};

export const calculateTotalPoints = (levels: QuizLevel[]): number => {
  return levels.reduce((total, level) => total + (level.userScore || 0), 0);
};

export const getNextUnlockedLevel = (levels: QuizLevel[]): QuizLevel | null => {
  return levels.find(level => !level.unlocked && canUnlockLevel(level, levels)) || null;
};

export const canUnlockLevel = (level: QuizLevel, levels: QuizLevel[]): boolean => {
  const totalPoints = calculateTotalPoints(levels);
  return totalPoints >= level.pointsRequired;
};

export const updateLevelProgress = (levels: QuizLevel[], levelId: number, score: number): QuizLevel[] => {
  return levels.map(level => {
    if (level.id === levelId) {
      const updatedLevel = {
        ...level,
        userScore: score,
        completed: score >= level.maxPoints * 0.7 // 70% to complete
      };
      
      // Check if next level should be unlocked
      const nextLevel = levels.find(l => l.id === levelId + 1);
      if (nextLevel && canUnlockLevel(nextLevel, levels)) {
        const nextLevelIndex = levels.findIndex(l => l.id === levelId + 1);
        if (nextLevelIndex !== -1) {
          levels[nextLevelIndex] = { ...levels[nextLevelIndex], unlocked: true };
        }
      }
      
      return updatedLevel;
    }
    return level;
  });
};