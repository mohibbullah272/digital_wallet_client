import React, { useState } from 'react';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Mail,
  Clock,

  Send,
  User,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

// Type definitions
interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
  href?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactPageProps {
  className?: string;
}

// Contact Info Card Component
const ContactInfoCard: React.FC<ContactInfoProps> = ({ icon, title, details, href }) => (
  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card">
    <CardHeader className="text-center pb-4">
      <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 text-primary w-fit">
        {icon}
      </div>
      <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-center space-y-2">
      {details.map((detail, index) => (
        <div key={index}>
          {href && index === 0 ? (
            <a 
              href={href} 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              aria-label={`${title}: ${detail}`}
            >
              {detail}
            </a>
          ) : (
            <p className="text-muted-foreground">{detail}</p>
          )}
        </div>
      ))}
    </CardContent>
  </Card>
);

// Main Contact Page Component
const Contact: React.FC<ContactPageProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone size={32} />,
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "24/7 Support Available"],
      href: "tel:+15551234567"
    },
    {
      icon: <Mail size={32} />,
      title: "Email Support",
      details: ["support@ewallet.com", "Response within 2 hours"],
      href: "mailto:support@ewallet.com"
    },
    {
      icon: <MapPin size={32} />,
      title: "Head Office",
      details: [
        "123 Digital Finance Street",
        "Tech District, Silicon Valley",
        "CA 94105, United States"
      ]
    },
    {
      icon: <Clock size={32} />,
      title: "Business Hours",
      details: [
        "Mon - Fri: 9:00 AM - 6:00 PM",
        "Sat - Sun: 10:00 AM - 4:00 PM",
        "Emergency: 24/7 Available"
      ]
    }
  ];


  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-primary/10 to-background py-20 px-4">
        <div className="max-w-4xl mt-20 mx-auto text-center">
         
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Contact <span className="text-primary">E-Wallet</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Reach out to us through any of the channels below and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <ContactInfoCard
                key={index}
                icon={info.icon}
                title={info.title}
                details={info.details}
                href={info.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Send Us a Message
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a specific question or need personalized assistance? Fill out the form below and our team will respond within 24 hours.
            </p>
          </div>

          <Card className="border-border bg-card shadow-lg">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
            <form >
                    <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

               

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare size={20} className="absolute left-3 top-3 text-muted-foreground" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="write something ........"
                      />
                    </div>
                  </div>

                  <Button 
                  type='submit'
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-3 text-lg font-medium group"
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        Send Message
                        <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </Button>
                </div>
            </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

  
    </div>
  );
};

export default Contact;