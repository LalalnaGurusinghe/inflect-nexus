import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "@/hooks/useScrollAnimation";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({
    threshold: 0.1,
  });
  const { ref: socialRef, isVisible: socialVisible } = useStaggerAnimation(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-24 relative" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`text-center mb-16 ${
            headerVisible ? "reveal-on-scroll animate" : "reveal-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build the Future Together
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 neon-glow" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with us
            today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            className={`glass p-8 rounded-lg interactive-card shine-sweep glow-border hover-lift ${
              formVisible ? "slide-in-left animate" : "slide-in-left"
            }`}
            style={{ perspective: "1000px" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 text-shimmer"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  Name
                </motion.label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary focus:neon-glow transition-all duration-300 shimmer"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-shimmer"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary focus:neon-glow transition-all duration-300 shimmer"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2 text-shimmer"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-background/50 border-primary/30 focus:border-primary focus:neon-glow resize-none transition-all duration-300 shimmer"
                  placeholder="Tell us about your project..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.68, -0.55, 0.265, 1.55],
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow py-6 text-lg font-bold transition-all duration-300 btn-shine pulse-hover magnetic-hover morph-button hover-elastic"
                >
                  <motion.span
                    animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                      duration: 1,
                      repeat: isSubmitting ? Infinity : 0,
                      ease: "linear",
                    }}
                  >
                    {isSubmitting ? "Sending" : "Send Message"}
                    {isSubmitting && <span className="loading-dots"></span>}
                  </motion.span>
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="space-y-8 slide-in-right"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="glass p-6 rounded-lg interactive-card radial-shine glow-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Mail className="w-8 h-8 text-primary mb-3 icon-hover-compatible" />
              <h3 className="text-xl font-bold mb-2 text-shimmer">Email</h3>
              <a
                href="mailto:hello@inflectivex.com"
                className="text-muted-foreground hover:text-primary transition-all duration-300 shimmer"
              >
                hello@inflectivex.com
              </a>
            </motion.div>

            <motion.div
              className="glass p-6 rounded-lg interactive-card multi-shine glow-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <MapPin className="w-8 h-8 text-primary mb-3 icon-hover-compatible" />
              <h3 className="text-xl font-bold mb-2 text-shimmer">Location</h3>
              <p className="text-muted-foreground hover:text-foreground/90 transition-colors duration-300">
                Colombo, Sri Lanka
              </p>
            </motion.div>

            <motion.div
              className="glass p-6 rounded-lg interactive-card flash-hover glow-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-shimmer">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                  { icon: Github, label: "GitHub", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 hover:neon-glow btn-shine magnetic-hover pulse-hover"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
