import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download,
  Upload,
  Send,
  Wallet,
  History,
  UserCheck,
  DollarSign,
  Shield,
  Smartphone,
  CreditCard,
  QrCode,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// Type definitions
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  featured?: boolean;
}

interface FeatureStats {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface FeaturesPageProps {
  className?: string;
}

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, benefits, featured = false }) => (
  <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card ${
    featured ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-card' : ''
  }`}>
    <CardHeader className="text-center pb-4">
      <div className={`mx-auto mb-4 p-4 rounded-full w-fit transition-colors duration-300 ${
        featured 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
      }`}>
        {icon}
      </div>
      {featured && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-2 w-fit mx-auto">
          <Star size={12} />
          Popular
        </div>
      )}
      <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <CardDescription className="text-muted-foreground text-center leading-relaxed">
        {description}
      </CardDescription>
      <div className="space-y-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-foreground">{benefit}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Stats Component
const StatsCard: React.FC<FeatureStats> = ({ icon, value, label }) => (
  <div className="text-center p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
    <div className="mx-auto mb-3 p-2 rounded-full bg-primary/10 text-primary w-fit">
      {icon}
    </div>
    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Main Features Page Component
const Feature: React.FC<FeaturesPageProps> = ({ className = "" }) => {
  const features: FeatureCardProps[] = [
    {
      icon: <Download size={32} />,
      title: "Cash In",
      description: "Add money to your wallet instantly through multiple secure channels with competitive rates.",
      benefits: [
        "Bank transfers & card payments",
        "50,000+ agent locations",
        "Instant processing",
        "Low transaction fees",
        "Multiple currency support"
      ]
    },
    {
      icon: <Upload size={32} />,
      title: "Cash Out",
      description: "Withdraw your money anytime, anywhere with flexible payout options and fast processing.",
      benefits: [
        "ATM withdrawals worldwide",
        "Direct bank transfers",
        "Agent cash pickup",
        "Same-day processing",
        "24/7 availability"
      ]
    },
    {
      icon: <Send size={32} />,
      title: "Send Money",
      description: "Transfer money to friends, family, and businesses instantly with just a few taps.",
      benefits: [
        "Instant peer-to-peer transfers",
        "International remittance",
        "QR code payments",
        "Bulk payments for businesses",
        "Free transfers to E-Wallet users"
      ],
      featured: true
    },
    {
      icon: <Wallet size={32} />,
      title: "Track Wallet",
      description: "Monitor your wallet balance, spending patterns, and financial health in real-time.",
      benefits: [
        "Real-time balance updates",
        "Spending analytics",
        "Budget tracking tools",
        "Monthly reports",
        "Smart notifications"
      ]
    },
    {
      icon: <History size={32} />,
      title: "Track History",
      description: "Access detailed transaction history with powerful search and filtering capabilities.",
      benefits: [
        "Complete transaction records",
        "Advanced search filters",
        "Export statements",
        "Receipt management",
        "Dispute resolution tools"
      ]
    },
    {
      icon: <UserCheck size={32} />,
      title: "Be an Agent",
      description: "Join our agent network and earn commissions by helping others with their financial needs.",
      benefits: [
        "Earn up to 5% commission",
        "Flexible working hours",
        "Training & support provided",
        "Multiple income streams",
        "Growing customer base"
      ],
      featured: true
    }
  ];

  const additionalFeatures = [
    {
      icon: <Shield size={24} />,
      title: "Bank-Level Security",
      description: "Advanced encryption and fraud protection"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile-First Design",
      description: "Intuitive app for iOS and Android"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Multi-Payment Support",
      description: "Accept all major cards and payment methods"
    },
    {
      icon: <QrCode size={24} />,
      title: "QR Code Payments",
      description: "Quick and contactless transactions"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Investment Options",
      description: "Grow your money with smart investments"
    },
    {
      icon: <Users size={24} />,
      title: "Business Solutions",
      description: "Complete payment solutions for merchants"
    }
  ];

  const stats: FeatureStats[] = [
    { icon: <Users size={24} />, value: "10M+", label: "Active Users" },
    { icon: <MapPin size={24} />, value: "50K+", label: "Agent Locations" },
    { icon: <DollarSign size={24} />, value: "$5B+", label: "Transactions Processed" },
    { icon: <Clock size={24} />, value: "24/7", label: "Customer Support" }
  ];

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-primary/10 to-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
    
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Everything You Need in
            <span className="block text-primary">One Digital Wallet</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover all the powerful features that make E-Wallet the complete financial solution for individuals and businesses.
          </p>
        
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive financial tools designed to simplify your money management and grow your wealth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                benefits={feature.benefits}
                featured={feature.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Additional Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Even more ways E-Wallet enhances your financial experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Program Spotlight */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mx-auto mb-6 p-4 rounded-full bg-primary text-primary-foreground w-fit">
                <UserCheck size={48} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Become an E-Wallet Agent
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of agents earning commissions by providing essential financial services to your community. 
                Start your entrepreneurial journey with E-Wallet today.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Up to 5%</div>
                  <div className="text-sm text-muted-foreground">Commission Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">$500+</div>
                  <div className="text-sm text-muted-foreground">Monthly Earning Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Business Support</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Apply to be an Agent
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
             
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

  
    </div>
  );
};

export default Feature;