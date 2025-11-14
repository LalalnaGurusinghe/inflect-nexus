import { motion } from "framer-motion";
import { Award, TrendingUp, Rocket } from "lucide-react";

const achievements = [
  {
    icon: Rocket,
    title: "5 Pilot Projects",
    description: "Successfully delivered in Q2 2025",
    metric: "100%",
    label: "Client Satisfaction",
  },
  {
    icon: TrendingUp,
    title: "200% Growth",
    description: "Client base expansion in first year",
    metric: "3x",
    label: "Revenue Growth",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Emerging Tech Startup Award 2025",
    metric: "Top 10",
    label: "Sri Lankan Startups",
  },
];

export const Portfolio = () => {
  return (
    <section className="py-24 relative" id="portfolio">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 neon-glow" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming ideas into measurable success stories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="glass p-8 rounded-lg interactive-card multi-shine glow-border group text-center cursor-pointer"
            >
              <achievement.icon className="w-16 h-16 text-primary mx-auto mb-6 group-hover:animate-float icon-hover-compatible transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-3 group-hover:text-shimmer">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground mb-6 group-hover:text-foreground/90 transition-colors duration-300">
                {achievement.description}
              </p>
              <div className="border-t border-primary/20 pt-6 group-hover:border-primary/40 transition-colors duration-300">
                <motion.div
                  className="text-4xl font-black text-primary mb-2 group-hover:animate-pulse"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {achievement.metric}
                </motion.div>
                <div className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
                  {achievement.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-lg mt-16 interactive-card shine-sweep glow-border"
        >
          <motion.h3
            className="text-3xl font-bold mb-6 text-center text-shimmer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured Success Story
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-2xl font-bold mb-4 text-primary">
                AI-Powered Analytics Platform
              </h4>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Developed a comprehensive machine learning solution for a
                leading Sri Lankan enterprise, enabling real-time predictive
                analytics and reducing operational costs by 45%.
              </p>
              <ul className="space-y-2">
                {[
                  "Real-time data processing",
                  "Custom ML models with 94% accuracy",
                  "Scalable cloud infrastructure",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-primary mr-2 animate-pulse">✓</span>
                    <span className="hover:text-primary transition-colors duration-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { value: "45%", label: "Cost Reduction" },
                { value: "94%", label: "Model Accuracy" },
                { value: "3 Months", label: "Delivery Time" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="border border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 btn-shine magnetic-hover"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <motion.div
                    className="text-4xl font-bold text-primary mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
