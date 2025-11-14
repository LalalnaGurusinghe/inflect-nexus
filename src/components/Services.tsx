import { motion } from "framer-motion";
import { Code2, Brain, Smartphone, Cloud, Database, Cpu } from "lucide-react";

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
  return (
    <section className="py-24 relative" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 neon-glow" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge solutions that blend innovation with practical business
            impact
          </p>
        </motion.div>

        {/* Main Services */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="glass p-8 rounded-lg interactive-card flash-hover glow-border shine-sweep group cursor-pointer"
            >
              <service.icon className="w-16 h-16 text-primary mb-6 group-hover:animate-float icon-hover-compatible transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-4 group-hover:text-shimmer">
                {service.title}
              </h3>
              <p className="text-foreground/80 mb-6 group-hover:text-foreground/90 transition-colors duration-300">
                {service.description}
              </p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                  >
                    <span className="text-primary mr-2 group-hover:animate-pulse">
                      ▸
                    </span>
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + techIndex * 0.05 }}
                    className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 btn-shine magnetic-hover"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="glass p-6 rounded-lg text-center interactive-card diagonal-shine glow-border cursor-pointer group"
            >
              <cap.icon className="w-12 h-12 text-primary mx-auto mb-3 group-hover:animate-float icon-hover-compatible transition-all duration-300" />
              <p className="font-semibold group-hover:text-shimmer transition-all duration-300">
                {cap.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
