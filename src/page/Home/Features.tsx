"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Smartphone, CreditCard, QrCode, TrendingUp, Building } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FeatureProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  icon: React.ReactNode;
};

const features: FeatureProps[] = [
  {
    title: "Bank-Level Security",
    description: "Advanced encryption and fraud protection",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    url: "/security",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Mobile-First Design",
    description: "Intuitive app for iOS and Android",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w-800&auto=format&fit=crop",
    url: "/mobile-app",
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    title: "Multi-Payment Support",
    description: "Accept all major cards and payment methods",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    url: "/payments",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    title: "QR Code Payments",
    description: "Quick and contactless transactions",
    image: "https://i.pinimg.com/736x/c2/1f/05/c21f052a1d089f8a0b2ab27694be5d88.jpg",
    url: "/qr-payments",
    icon: <QrCode className="h-6 w-6" />,
  },
  {
    title: "Investment Options",
    description: "Grow your money with smart investments",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    url: "/investments",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: "Business Solutions",
    description: "Complete payment solutions for merchants",
    image: "https://i.pinimg.com/1200x/62/c9/3e/62c93e366a8339b3f001a899543153c3.jpg",
    url: "/business",
    icon: <Building className="h-6 w-6" />,
  },
];

interface FeaturesSectionProps {
  className?: string;
}

const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  return (
    <section className={cn("py-32 max-w-7xl px-4 mx-auto bg-gradient-to-b from-background to-muted/20", className)}>
      <div className="container ">
        {/* Header Section */}
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Empowering Financial Freedom
          </h2>
          <p className="text-lg text-muted-foreground">
            At E-Wallet, we believe that everyone deserves access to simple, secure, and powerful 
            financial tools. Founded in 2020, we've been at the forefront of the digital payment 
            revolution, serving millions of users across the globe with our cutting-edge wallet 
            management system.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform combines advanced security protocols with intuitive user experience design, 
            making digital finance accessible to everyone from tech-savvy millennials to first-time 
            digital payment users.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Column - Mission Statement */}
          <div className="flex flex-col justify-between lg:col-span-1">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Shield className="h-4 w-4" />
                Trusted by Millions Worldwide
              </div>
              <h3 className="mb-4 text-3xl font-semibold text-foreground">
                Innovative Technology for Everyone
              </h3>
              <p className="text-base text-muted-foreground">
                We're revolutionizing digital finance with features designed to enhance your 
                financial experience and provide you with complete control over your money.
              </p>
              
              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-card p-4">
                  <div className="text-2xl font-bold text-primary">5M+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>
       
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {/* Main Features - First 2 */}
            {features.slice(0, 2).map((feature, idx) => (
              <motion.a
                key={idx}
                href={feature.url}
                whileHover={{ y: -4 }}
                className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg"
              >
                <Card className="relative aspect-[4/3] overflow-hidden p-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/20 p-2 backdrop-blur-sm">
                      <div className="rounded-full bg-primary p-1.5 text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="mb-1 text-xl font-bold text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-white/90">
                      {feature.description}
                    </p>
                  </CardContent>
                  <ArrowUpRight className="absolute top-6 right-6 h-5 w-5 text-white transition-transform group-hover:scale-110" />
                </Card>
              </motion.a>
            ))}

            {/* Secondary Features - Remaining 4 */}
            <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.slice(2).map((feature, idx) => (
                <motion.a
                  key={idx + 2}
                  href={feature.url}
                  whileHover={{ y: -4 }}
                  className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg"
                >
                  <Card className="relative aspect-square overflow-hidden p-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="mb-2 rounded-full bg-primary/20 p-1.5 backdrop-blur-sm w-fit">
                        <div className="rounded-full bg-primary p-1 text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <h4 className="mb-1 font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-white/90">
                        {feature.description}
                      </p>
                    </CardContent>
                    <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-white transition-transform group-hover:scale-110" />
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export { FeaturesSection };