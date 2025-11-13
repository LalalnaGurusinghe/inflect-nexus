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
              className="glass p-8 rounded-lg hover:neon-border transition-all duration-300 group"
            >
              <service.icon className="w-16 h-16 text-primary mb-6 group-hover:animate-float" />
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-foreground/80 mb-6">{service.description}</p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {service.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/30 rounded-full"
                  >
                    {tech}
                  </span>
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
              className="glass p-6 rounded-lg text-center hover:neon-border transition-all duration-300 cursor-pointer group"
            >
              <cap.icon className="w-12 h-12 text-primary mx-auto mb-3 group-hover:animate-glow-pulse" />
              <p className="font-semibold">{cap.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
