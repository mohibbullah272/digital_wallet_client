import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { 
  Shield, 
  CreditCard, 
  Smartphone, 
  Users, 
  MapPin, 
  Phone, 
  Mail,

  CheckCircle
} from 'lucide-react';


// Type definitions
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface AboutPageProps {
  className?: string;
}

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card">
    <CardHeader className="text-center pb-4">
      <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
      </div>
      <CardTitle className="text-xl font-semibold text-card-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <CardDescription className="text-muted-foreground leading-relaxed">
        {description}
      </CardDescription>
    </CardContent>
  </Card>
);

// Contact Info Component
const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value, href }) => (
  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
    <div className="flex-shrink-0 p-2 rounded-full bg-primary text-primary-foreground">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      {href ? (
        <a 
          href={href} 
          className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
          aria-label={`${label}: ${value}`}
        >
          {value}
        </a>
      ) : (
        <p className="text-foreground font-medium">{value}</p>
      )}
    </div>
  </div>
);

// Main About Page Component
const About: React.FC<AboutPageProps> = ({ className = "" }) => {


  const services: ServiceCardProps[] = [
    {
      icon: <Shield size={32} />,
      title: "Secure Transactions",
      description: "Bank-level security with end-to-end encryption ensures your financial data and transactions are always protected with advanced fraud detection."
    },
    {
      icon: <CreditCard size={32} />,
      title: "Multi-Currency Support",
      description: "Manage multiple currencies seamlessly with real-time exchange rates, international transfers, and support for 150+ currencies worldwide."
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile-First Design",
      description: "Access your wallet anywhere with our intuitive mobile app featuring biometric authentication, offline mode, and instant notifications."
    }
  ];

  const contactInfo: ContactInfoProps[] = [
    {
      icon: <MapPin size={20} />,
      label: "Address",
      value: "123 Digital Finance Street, Tech District, Silicon Valley, CA 94105"
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "support@ewallet.com",
      href: "mailto:support@ewallet.com"
    }
  ];

  const features = [
    "24/7 Customer Support",
    "Instant Money Transfers",
    "Budget Tracking Tools",
    "Investment Portfolio Management",
    "Merchant Payment Solutions",
    "Rewards & Cashback Program"
  ];

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="relative max-w-6xl mt-20 mx-auto text-center">
      
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Future of
            <span className="block text-primary">Digital Payments</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience seamless, secure, and smart financial management with E-Wallet. 
            We're revolutionizing how people interact with their money in the digital age.
          </p>
      
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About E-Wallet</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empowering financial freedom through innovative technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                At E-Wallet, we believe that everyone deserves access to simple, secure, and powerful financial tools. 
                Founded in 2020, we've been at the forefront of the digital payment revolution, serving millions of 
                users across the globe with our cutting-edge wallet management system.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform combines advanced security protocols with intuitive user experience design, making 
                digital finance accessible to everyone from tech-savvy millennials to first-time digital payment users.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where financial transactions are instantaneous, secure, and accessible to everyone, 
                regardless of their location or economic background. Through continuous innovation and user-centric design, 
                we're building the infrastructure for the next generation of digital commerce.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive financial solutions designed for the modern digital lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions or need support? Our team is here to help you 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((contact, index) => (
              <ContactInfo
                key={index}
                icon={contact.icon}
                label={contact.label}
                value={contact.value}
                href={contact.href}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <Users size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Join Our Community</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with millions of users who trust E-Wallet for their daily financial needs
                </p>
           
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;