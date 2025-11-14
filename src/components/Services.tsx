import { motion } from "framer-motion";
import { Code2, Brain, Smartphone, Cloud, Database, Cpu } from "lucide-react";
import {
  useScrollAnimation,
  useStaggerAnimation,
} from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Code2,
    title: "Web & Mobile App Development",
    description:
      "Full-stack applications with real-time features and scalable architecture",
    features: [
      "React, Next.js, Flutter development",
      "Real-time data synchronization",
      "Cloud-native architecture",
      "Progressive Web Apps (PWA)",
      "API development & integration",
    ],
    tech: ["React", "Flutter", "Node.js", "MongoDB", "AWS"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    description:
      "Intelligent automation and predictive analytics to transform your business",
    features: [
      "Predictive analytics & forecasting",
      "Natural Language Processing (NLP)",
      "Computer Vision solutions",
      "Custom ML model development",
      "Intelligent process automation",
    ],
    tech: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Python"],
  },
];

const capabilities = [
  { icon: Smartphone, label: "Mobile First" },
  { icon: Cloud, label: "Cloud Native" },
  { icon: Database, label: "Big Data" },
  { icon: Cpu, label: "AI Powered" },
];

export const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: servicesRef, isVisible: servicesVisible } =
    useStaggerAnimation(200);
  const { ref: capsRef, isVisible: capsVisible } = useStaggerAnimation(150);

  return (
    <section className="py-24 relative" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.2,
          }}
          className={`text-center mb-16 ${
            headerVisible ? "reveal-on-scroll animate" : "reveal-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 neon-glow" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge solutions that blend innovation with practical business
            impact
          </p>
        </motion.div>

        {/* Main Services */}
        <div ref={servicesRef} className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.3,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="glass p-8 rounded-lg interactive-card flash-hover glow-border shine-sweep group cursor-pointer hover-tilt stagger-item"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -5, 0],
                  scale: [1, 1.1, 1.05, 1.1, 1.05],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <service.icon className="w-16 h-16 text-primary mb-6 group-hover:animate-float icon-hover-compatible rotate-on-hover transition-all duration-300" />
              </motion.div>
              <motion.h3
                className="text-2xl font-bold mb-4 group-hover:text-shimmer text-wave"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {service.title.split("").map((letter, i) =>
                  letter === " " ? (
                    <span key={i}>&nbsp;</span>
                  ) : (
                    <span
                      key={i}
                      className="wave-letter"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {letter}
                    </span>
                  )
                )}
              </motion.h3>
              <p className="text-foreground/80 mb-6 group-hover:text-foreground/90 transition-colors duration-300">
                {service.description}
              </p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2 + idx * 0.15,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      x: 5,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.span
                      className="text-primary mr-2 group-hover:animate-pulse"
                      whileHover={{
                        rotate: 90,
                        scale: 1.2,
                        transition: { duration: 0.3 },
                      }}
                    >
                      ▸
                    </motion.span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {service.tech.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2 + techIndex * 0.1,
                      duration: 0.5,
                      ease: [0.68, -0.55, 0.265, 1.55],
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      rotate: [0, -5, 5, 0],
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut",
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 btn-shine magnetic-hover morph-button hover-bounce"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <motion.div
          ref={capsRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateX: 10,
                rotateY: 10,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
              className="glass p-6 rounded-lg text-center interactive-card diagonal-shine glow-border cursor-pointer group hover-perspective stagger-item"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                whileHover={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1.1],
                  transition: { duration: 0.8, ease: "easeInOut" },
                }}
              >
                <cap.icon className="w-12 h-12 text-primary mx-auto mb-3 group-hover:animate-float icon-hover-compatible rotate-on-hover transition-all duration-300" />
              </motion.div>
              <motion.p
                className="font-semibold group-hover:text-shimmer transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                {cap.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
