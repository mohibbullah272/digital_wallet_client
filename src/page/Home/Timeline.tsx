
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

const timelineData: TimelineEntry[] = [
  {
    date: "2020",
    title: "Company Founding",
    content: "E-Wallet was founded with a mission to democratize digital finance. Our vision was to create simple, secure, and powerful financial tools accessible to everyone, regardless of their technical expertise or financial background.",
  },
  {
    date: "Q1 2021",
    title: "First Product Launch",
    content: "We launched our first digital wallet platform, focusing on intuitive user experience and robust security. The initial release included basic payment features, transaction history, and multi-currency support for early adopters.",
  },
  {
    date: "2022",
    title: "Global Expansion Begins",
    content: "E-Wallet expanded to serve users across 15 countries. We introduced advanced security protocols including biometric authentication and end-to-end encryption, while reaching our first 500,000 active users milestone.",
  },
  {
    date: "2023",
    title: "Platform Evolution",
    content: "Launched our cutting-edge wallet management system with AI-powered features. Added budgeting tools, investment options, and peer-to-peer payment enhancements. Reached 2 million users worldwide and formed strategic partnerships with major financial institutions.",
  },
  {
    date: "2024",
    title: "Innovation & Accessibility",
    content: "Introduced voice-activated transactions and accessibility features for first-time digital payment users. Expanded our service to include small business tools and launched financial literacy programs for underserved communities.",
  },
];

interface Timeline9Props {
  className?: string;
}

const Timeline = ({ className }: Timeline9Props) => {
  return (
    <section className={cn("bg-background py-32 max-w-7xl mx-auto" , className)}>
      <div className="container">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          Our Journey: Revolutionizing Digital Finance
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="absolute top-3.5 left-0 flex size-4 items-center justify-center rounded-full bg-foreground" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

              <h5 className="text-md top-3 -left-34 rounded-xl tracking-tight text-muted-foreground xl:absolute">
                {entry.date}
              </h5>

              <Card className="my-5  border-none shadow-none">
                <CardContent >
                  <div
                    className="prose  text-foreground dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            Today, E-Wallet serves <strong>millions of users globally</strong>, continuing our mission to empower financial freedom through innovative technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;