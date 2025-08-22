import {  Zap } from "lucide-react";

import { Button } from "@/components/ui/button";


interface Hero115Props {

  heading?: string;
  description?: string;
  button?: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };


}

const Hero = ({
 
  heading = "The Smarter Way to Manage Your Money",
  description = "With E-Wallet, you can deposit, withdraw, and transfer money anytime, anywhere. Experience seamless digital transactions built for speed, security, and convenience",
  button = {
    text: "Create Account",
    icon: <Zap className="ml-2 size-4" />,
    url: "https://www.shadcnblocks.com",
  },

 
}: Hero115Props) => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-primary/10 via-primary/10 to-background min-h-screen flex justify-center  py-32">
      <div className="container ">
        <div className="flex flex-col   gap-5">
          <div className="relative flex flex-col   gap-5">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border  [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="size-full  rounded-full border p-16 md:p-32">
                <div className="size-full  rounded-full border"></div>
              </div>
            </div>
  
            <h2 className="mx-auto max-w-5xl mt-32 text-center text-3xl font-medium text-balance md:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" asChild>
                <a href={button.url}>
                  {button.text} {button.icon}
                </a>
              </Button>
             
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export { Hero  };
