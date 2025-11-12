import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight">
            <span className="relative inline-block">
              <span className="absolute inset-0 text-primary blur-2xl opacity-50 animate-glow-pulse">
                InflectiveX
              </span>
              <span 
                className="relative text-primary animate-glow-pulse"
                style={{
                  textShadow: `
                    0 0 10px hsl(var(--primary)),
                    0 0 20px hsl(var(--primary)),
                    0 0 40px hsl(var(--primary)),
                    0 0 80px hsl(var(--primary)),
                    0 0 120px hsl(var(--primary))
                  `,
                  WebkitTextStroke: '2px hsl(var(--primary) / 0.3)'
                }}
              >
                InflectiveX
              </span>
            </span>
          </h1>
          
          <motion.p 
            className="text-2xl md:text-3xl lg:text-4xl mb-4 text-foreground/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Empowering Innovation Through Technology
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Where Ideas Transform into Digital Reality
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow px-8 py-6 text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary neon-glow" />
      </motion.div>
    </section>
  );
};
