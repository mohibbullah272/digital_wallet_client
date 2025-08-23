import React, { useState } from 'react';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';

import { 
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,

  Send,
  Download,
  Upload,
  Shield,
  Clock,
  Users,
  MessageCircle
} from 'lucide-react';

// Type definitions
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategoryProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  faqs: FAQItem[];
  searchTerm: string;
}

interface FAQAccordionProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

interface FAQPageProps {
  className?: string;
}

// FAQ Accordion Component
const FAQAccordion: React.FC<FAQAccordionProps> = ({ faq, isOpen, onToggle }) => (
  <Card className="border-border bg-card hover:shadow-md transition-all duration-200">
    <CardHeader 
      className="cursor-pointer p-4 hover:bg-muted/30 transition-colors duration-200"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={`faq-${faq.id}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <CardTitle className="text-base md:text-lg font-medium text-foreground pr-4 leading-relaxed">
          {faq.question}
        </CardTitle>
        <div className="flex-shrink-0 p-1 rounded-full hover:bg-primary/10 transition-colors duration-200">
          {isOpen ? (
            <ChevronUp size={20} className="text-primary" />
          ) : (
            <ChevronDown size={20} className="text-muted-foreground" />
          )}
        </div>
      </div>
    </CardHeader>
    {isOpen && (
      <CardContent 
        id={`faq-${faq.id}`}
        className="pt-0 pb-4 px-4 animate-in slide-in-from-top-1 duration-200"
      >
        <div className="border-l-2 border-primary/20 pl-4 ml-2">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {faq.answer}
          </p>
        </div>
      </CardContent>
    )}
  </Card>
);

// FAQ Category Section Component
const FAQCategory: React.FC<FAQCategoryProps> = ({ title, icon, description, faqs, searchTerm }) => {
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (faqId: string) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(faqId)) {
      newOpenFAQs.delete(faqId);
    } else {
      newOpenFAQs.add(faqId);
    }
    setOpenFAQs(newOpenFAQs);
  };

  if (filteredFAQs.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm md:text-base">{description}</p>
        </div>
      </div>
      <div className="space-y-3">
        {filteredFAQs.map((faq) => (
          <FAQAccordion
            key={faq.id}
            faq={faq}
            isOpen={openFAQs.has(faq.id)}
            onToggle={() => toggleFAQ(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Main FAQ Page Component
const FAQ: React.FC<FAQPageProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // FAQ Data organized by categories
  const faqData: { [key: string]: { title: string; icon: React.ReactNode; description: string; faqs: FAQItem[] } } = {
    account: {
      title: "Account & Getting Started",
      icon: <Users size={24} />,
      description: "Everything you need to know about creating and managing your E-Wallet account",
      faqs: [
        {
          id: "account-1",
          category: "account",
          question: "How do I create an E-Wallet account?",
          answer: "Creating an E-Wallet account is simple:\n\n1. Download the E-Wallet app from App Store or Google Play\n2. Click 'Sign Up' and enter your mobile number\n3. Verify your phone number with the OTP sent via SMS\n4. Complete your profile by adding your name and email\n5. Set up a secure PIN or enable biometric authentication\n6. Your account is ready to use!"
        },
        {
          id: "account-2",
          category: "account",
          question: "What documents are required for account verification?",
          answer: "For full account verification, you'll need:\n\n• A valid government-issued photo ID (Driver's License, Passport, or National ID)\n• Proof of address (Utility bill, Bank statement, or Lease agreement - not older than 3 months)\n• Clear selfie for identity verification\n\nVerification typically takes 24-48 hours. You can use basic features immediately, but verification is required for higher transaction limits."
        },
        {
          id: "account-3",
          category: "account",
          question: "How do I reset my PIN or password?",
          answer: "To reset your PIN or password:\n\n1. Open the E-Wallet app and tap 'Forgot PIN/Password' on the login screen\n2. Enter your registered mobile number or email\n3. You'll receive a verification code via SMS or email\n4. Enter the verification code and create a new PIN/password\n5. Confirm your new credentials and you're all set!\n\nFor security, you can only reset your PIN/password 3 times within 24 hours."
        }
      ]
    },
    cashin: {
      title: "Cash In & Deposit",
      icon: <Download size={24} />,
      description: "Learn how to add money to your E-Wallet from various sources",
      faqs: [
        {
          id: "cashin-1",
          category: "cashin",
          question: "What are the different ways to cash in money?",
          answer: "You can add money to your E-Wallet through multiple methods:\n\n• Bank Transfer: Direct transfer from your bank account (instant)\n• Debit/Credit Card: Add funds using any major card (instant)\n• Agent Locations: Visit any of our 50,000+ agent locations nationwide\n• ATM Cash-In: Use designated ATMs with cash deposit feature\n• Mobile Banking: Link your mobile banking app for seamless transfers\n• Cryptocurrency: Convert crypto to wallet balance (selected currencies)\n\nAll methods are secure and most are processed instantly."
        },
        {
          id: "cashin-2",
          category: "cashin",
          question: "Are there any fees for adding money to my wallet?",
          answer: "Our cash-in fees are transparent and competitive:\n\n• Bank Transfer: FREE for amounts above $10\n• Debit Card: FREE for first 3 transactions per month, then 1.5%\n• Credit Card: 2.5% processing fee\n• Agent Locations: $0.50 flat fee for amounts up to $500\n• ATM Cash-In: $1.00 flat fee\n• Mobile Banking: FREE\n• Cryptocurrency: 1% conversion fee\n\nNo hidden charges - all fees are displayed before you confirm any transaction."
        },
        {
          id: "cashin-3",
          category: "cashin",
          question: "What are the minimum and maximum cash-in limits?",
          answer: "Cash-in limits vary by method and verification level:\n\n**Basic Account (Phone verified):**\n• Minimum: $5 per transaction\n• Maximum: $500 per day, $2,000 per month\n\n**Verified Account (Full KYC):**\n• Minimum: $5 per transaction\n• Maximum: $5,000 per day, $25,000 per month\n\n**Premium Account (Additional verification):**\n• Minimum: $10 per transaction\n• Maximum: $10,000 per day, $50,000 per month\n\nLimits reset daily at midnight and monthly on the 1st of each month."
        }
      ]
    },
    cashout: {
      title: "Cash Out & Withdrawal",
      icon: <Upload size={24} />,
      description: "Withdraw your money safely and conveniently from your E-Wallet",
      faqs: [
        {
          id: "cashout-1",
          category: "cashout",
          question: "How can I withdraw money from my E-Wallet?",
          answer: "Withdrawing money is quick and convenient:\n\n• Bank Transfer: Send money directly to your bank account (1-3 business days)\n• ATM Withdrawal: Use your E-Wallet card at any ATM worldwide\n• Agent Locations: Get cash instantly at any of our partner locations\n• Instant Bank Transfer: Same-day transfer to select banks (premium feature)\n• Prepaid Card: Load money onto your E-Wallet prepaid card\n\nAll withdrawal methods are secured with PIN verification and transaction limits."
        },
        {
          id: "cashout-2",
          category: "cashout",
          question: "What are the withdrawal fees and limits?",
          answer: "Withdrawal fees and limits by method:\n\n**Bank Transfer:**\n• Fee: $2.00 flat fee\n• Limit: $500-$5,000 per day (based on account level)\n• Processing: 1-3 business days\n\n**ATM Withdrawal:**\n• Fee: $1.50 per transaction + ATM operator fees\n• Limit: $500 per day, $2,000 per week\n• Available: 24/7 at millions of ATMs\n\n**Agent Locations:**\n• Fee: $1.00 flat fee for amounts up to $500\n• Limit: $1,000 per transaction, $3,000 per day\n• Available: Business hours only\n\n**Instant Bank Transfer:**\n• Fee: $5.00 premium fee\n• Limit: $2,500 per day\n• Processing: Within 30 minutes"
        },
        {
          id: "cashout-3",
          category: "cashout",
          question: "How long does it take to withdraw money?",
          answer: "Withdrawal processing times vary by method:\n\n• **Agent Cash-Out**: Instant (during business hours)\n• **ATM Withdrawal**: Instant (24/7 availability)\n• **Instant Bank Transfer**: 15-30 minutes (premium service)\n• **Regular Bank Transfer**: 1-3 business days\n• **International Transfer**: 3-5 business days\n\nFactors affecting processing time:\n• Your bank's processing schedule\n• Time of request (business hours vs. weekends)\n• Account verification level\n• Amount being withdrawn\n\nYou'll receive SMS and email notifications for all withdrawal status updates."
        }
      ]
    },
    sendmoney: {
      title: "Send Money & Transfers",
      icon: <Send size={24} />,
      description: "Transfer money to friends, family, and businesses instantly",
      faqs: [
        {
          id: "send-1",
          category: "sendmoney",
          question: "How do I send money to another E-Wallet user?",
          answer: "Sending money to other E-Wallet users is instant and free:\n\n1. Open the app and tap 'Send Money'\n2. Enter recipient's phone number, email, or scan their QR code\n3. Enter the amount you want to send\n4. Add an optional message or note\n5. Review the transaction details\n6. Confirm with your PIN or biometric authentication\n7. Money is transferred instantly!\n\nThe recipient will receive an instant notification and the money appears in their wallet immediately."
        },
        {
          id: "send-2",
          category: "sendmoney",
          question: "Can I send money to someone who doesn't have E-Wallet?",
          answer: "Yes! You can send money to non-E-Wallet users through several methods:\n\n• **SMS Cash**: Recipient gets a secure link to claim cash at any agent location\n• **Bank Transfer**: Send directly to their bank account\n• **Email Transfer**: Recipient can create an E-Wallet account to claim money\n• **Cash Pickup**: Recipient shows ID at partner locations to collect cash\n\nFees apply for non-E-Wallet transfers:\n• SMS Cash: $1.00 per transaction\n• Bank Transfer: $2.50 per transaction\n• Email Transfer: FREE (recipient has 7 days to claim)\n• Cash Pickup: $1.50 per transaction"
        },
        {
          id: "send-3",
          category: "sendmoney",
          question: "Are there limits on how much money I can send?",
          answer: "Send money limits depend on your account verification level:\n\n**Basic Account:**\n• Per transaction: $100\n• Daily limit: $500\n• Monthly limit: $2,000\n\n**Verified Account:**\n• Per transaction: $1,000\n• Daily limit: $2,500\n• Monthly limit: $10,000\n\n**Premium Account:**\n• Per transaction: $5,000\n• Daily limit: $10,000\n• Monthly limit: $50,000\n\n**International Transfers:**\n• Additional verification required\n• Higher fees apply (2.5-5% depending on destination)\n• Processing time: 1-5 business days\n\nUpgrade your account for higher limits by completing identity verification."
        }
      ]
    },
    security: {
      title: "Security & Safety",
      icon: <Shield size={24} />,
      description: "Learn about our security measures and how to protect your account",
      faqs: [
        {
          id: "security-1",
          category: "security",
          question: "How secure is my money in E-Wallet?",
          answer: "Your security is our top priority. We employ multiple layers of protection:\n\n• **Bank-Level Encryption**: All data encrypted with AES-256 encryption\n• **Two-Factor Authentication**: SMS and email verification for sensitive operations\n• **Biometric Security**: Fingerprint and facial recognition support\n• **Real-Time Monitoring**: AI-powered fraud detection system\n• **Insurance Coverage**: All funds insured up to $250,000 per account\n• **Secure Servers**: Data stored in SOC 2 compliant, geographically distributed servers\n• **Regular Audits**: Third-party security audits conducted quarterly\n\nYour funds are held in segregated accounts separate from company operations."
        },
        {
          id: "security-2",
          category: "security",
          question: "What should I do if I suspect fraudulent activity?",
          answer: "If you suspect unauthorized activity on your account:\n\n**Immediate Steps:**\n1. Change your PIN immediately in the app settings\n2. Report the incident through the app's 'Report Fraud' feature\n3. Call our 24/7 fraud hotline: 1-800-EWALLET-FRAUD\n4. Review your transaction history for any unauthorized transactions\n\n**Our Response:**\n• We'll temporarily freeze your account to prevent further unauthorized access\n• Investigation begins within 1 hour of report\n• You'll receive updates every 24 hours during investigation\n• Fraudulent transactions are reversed within 5 business days\n• New security credentials provided once investigation is complete\n\n**Prevention Tips:**\n• Never share your PIN or passwords\n• Always log out when using public devices\n• Enable transaction notifications\n• Regularly review your transaction history"
        },
        {
          id: "security-3",
          category: "security",
          question: "How do I enable two-factor authentication?",
          answer: "Enable 2FA for enhanced security:\n\n**To Enable 2FA:**\n1. Go to 'Settings' > 'Security' in your app\n2. Tap 'Two-Factor Authentication'\n3. Choose your preferred method:\n   • SMS verification (default)\n   • Email verification\n   • Authenticator app (Google Authenticator, Authy)\n4. Follow the setup instructions for your chosen method\n5. Verify the setup with a test code\n\n**When 2FA is Required:**\n• Login from new device\n• Transactions above $500\n• Changing security settings\n• Password/PIN reset\n• Adding new payment methods\n\n**Backup Codes:**\nWe'll provide 10 backup codes during setup - store them safely! These codes can be used if your primary 2FA method is unavailable."
        }
      ]
    },
    support: {
      title: "Support & Troubleshooting",
      icon: <HelpCircle size={24} />,
      description: "Get help with common issues and contact our support team",
      faqs: [
        {
          id: "support-1",
          category: "support",
          question: "How can I contact customer support?",
          answer: "We offer multiple ways to get help when you need it:\n\n**24/7 Support Channels:**\n• In-App Chat: Tap 'Help' in the app for instant messaging\n• Phone: 1-800-EWALLET (1-800-392-5538)\n• Email: support@ewallet.com\n• WhatsApp: +1-555-EWALLET for quick questions\n\n**Business Hours Support:**\n• Live Video Call: Available Mon-Fri 9AM-6PM\n• Social Media: @EWalletSupport on Twitter and Facebook\n\n**Self-Service Options:**\n• FAQ Section (this page)\n• Video Tutorials: Available in the app's Help section\n• Community Forum: Connect with other users\n• Knowledge Base: Comprehensive guides and articles\n\n**Average Response Times:**\n• In-App Chat: Under 2 minutes\n• Phone: Under 30 seconds\n• Email: Within 2 hours\n• Social Media: Within 1 hour"
        },
        {
          id: "support-2",
          category: "support",
          question: "My transaction is stuck or pending. What should I do?",
          answer: "Don't worry - most pending transactions resolve automatically. Here's what to do:\n\n**Check Transaction Status:**\n1. Go to 'Transaction History' in your app\n2. Tap on the pending transaction for details\n3. Note the transaction ID and timestamp\n\n**Common Causes & Solutions:**\n• **Network Issues**: Wait 15-30 minutes, transaction will complete automatically\n• **Recipient Bank Delays**: Bank transfers may take 1-3 business days\n• **Insufficient Funds**: Top up your wallet and transaction will retry\n• **Verification Required**: Check for any pending verification requests\n\n**When to Contact Support:**\n• Transaction pending for more than 24 hours\n• Money debited but recipient didn't receive it\n• Error messages during transaction\n• Duplicate transactions\n\n**What Support Needs:**\n• Transaction ID\n• Screenshot of the issue\n• Recipient details (if applicable)\n• Exact error message received\n\nMost issues are resolved within 2 hours of contacting support."
        },
        {
          id: "support-3",
          category: "support",
          question: "The app is not working properly. How do I fix it?",
          answer: "Try these troubleshooting steps to resolve common app issues:\n\n**Basic Troubleshooting:**\n1. **Force Close & Restart**: Close the app completely and reopen\n2. **Check Internet**: Ensure stable WiFi or mobile data connection\n3. **Update App**: Download latest version from App Store/Google Play\n4. **Restart Device**: Turn your phone off and on again\n5. **Clear App Cache**: Go to phone settings > Apps > E-Wallet > Storage > Clear Cache\n\n**Advanced Solutions:**\n• **Reinstall App**: Delete and reinstall (your account data is safe)\n• **Free Up Storage**: Ensure at least 1GB free space on device\n• **Check OS Version**: Update to latest iOS/Android version\n• **Disable VPN**: Turn off VPN or proxy services temporarily\n\n**Still Having Issues?**\n• Contact support with:\n  - Device model and OS version\n  - App version number\n  - Screenshot of error message\n  - Description of what you were trying to do\n\n**Known Issues:**\nCheck our status page at status.ewallet.com for any ongoing service disruptions or maintenance schedules."
        }
      ]
    }
  };


  const allFAQs = Object.values(faqData).flatMap(category => category.faqs);

  // Stats data
  const stats = [
    { icon: <MessageCircle size={24} />, value: "50,000+", label: "Questions Answered Monthly" },
    { icon: <Clock size={24} />, value: "< 2 min", label: "Average Response Time" },
    { icon: <Users size={24} />, value: "24/7", label: "Customer Support" }
  ];

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-20 px-4">
        <div className="max-w-4xl mx-auto mt-20 text-center">
     
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How Can We <span className="text-primary">Help You?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about E-Wallet features, security, and troubleshooting
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              aria-label="Search FAQ"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {searchTerm && (
            <div className="mb-8 p-4 rounded-lg bg-muted/30">
              <p className="text-muted-foreground">
                Showing results for "<span className="font-medium text-foreground">{searchTerm}</span>"
                {allFAQs.filter(faq =>
                  faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <span className="block mt-2 text-sm">
                    No results found. Try different keywords or browse categories below.
                  </span>
                )}
              </p>
            </div>
          )}

          <div className="space-y-16">
            {Object.entries(faqData).map(([key, category]) => (
              <FAQCategory
                key={key}
                title={category.title}
                icon={category.icon}
                description={category.description}
                faqs={category.faqs}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default FAQ;