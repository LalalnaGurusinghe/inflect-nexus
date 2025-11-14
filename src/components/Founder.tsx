import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const Founder = () => {
  return (
    <section className="py-24 relative" id="founder">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Minds Behind InflectiveX
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto neon-glow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-lg max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Avatar Placeholder */}
            <div className="mx-auto">
              <div className="w-48 h-48 rounded-full border-4 border-primary neon-glow flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="text-center">
                  <div className="text-6xl mb-2">🚀</div>
                  <div className="text-sm text-primary font-bold">
                    Engineers
                  </div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="md:col-span-2">
              <Quote className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                Founded by a team of passionate engineers in Colombo, Sri Lanka,
                InflectiveX was born from a shared vision to revolutionize how
                businesses leverage technology. Our journey began in a modest
                co-working space, fueled by endless coffee and the belief that
                Sri Lankan talent can compete on the global stage.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Today, we're proud to be a full-service AI and software partner,
                working with clients across industries to build intelligent,
                scalable solutions that drive real business value. Our team
                combines deep technical expertise with a genuine passion for
                innovation and client success.
              </p>
              <div className="border-t border-primary/20 pt-6 mt-6">
                <p className="text-muted-foreground italic">
                  From co-working space to cutting-edge solutions — powered by
                  Sri Lankan innovation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
