import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Wallet, ArrowDownToLine, ArrowUpFromLine, Send, History, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  name: string;
  icon: React.ReactNode;
}

const servicesList: Service[] = [
  {
    name: "Cash In",
    icon: <ArrowDownToLine className="w-12 h-12" />
  },
  {
    name: "Cash Out",
    icon: <ArrowUpFromLine className="w-12 h-12" />
  },
  {
    name: "Send Money",
    icon: <Send className="w-12 h-12" />
  },
  {
    name: "Track Wallet",
    icon: <Wallet className="w-12 h-12" />
  },
  {
    name: "Track History",
    icon: <History className="w-12 h-12" />
  },
  {
    name: "Be a Agent",
    icon: <UserPlus className="w-12 h-12" />
  }
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, servicesList.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Services</h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Slides Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {servicesList.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group cursor-pointer">
                  <div className="bg-muted rounded-[50%] aspect-square flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-primary/10">
                    <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-center text-foreground">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-primary w-8'
                  : 'bg-muted hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;