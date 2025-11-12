import { motion } from "framer-motion";
import { Award, TrendingUp, Rocket } from "lucide-react";

const achievements = [
  {
    icon: Rocket,
    title: "5 Pilot Projects",
    description: "Successfully delivered in Q2 2025",
    metric: "100%",
    label: "Client Satisfaction"
  },
  {
    icon: TrendingUp,
    title: "200% Growth",
    description: "Client base expansion in first year",
    metric: "3x",
    label: "Revenue Growth"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Emerging Tech Startup Award 2025",
    metric: "Top 10",
    label: "Sri Lankan Startups"
  }
];

export const Portfolio = () => {
  return (
    <section className="py-24 relative">
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
              className="glass p-8 rounded-lg hover:neon-border transition-all duration-300 group text-center"
            >
              <achievement.icon className="w-16 h-16 text-primary mx-auto mb-6 group-hover:animate-float" />
              <h3 className="text-2xl font-bold mb-3">{achievement.title}</h3>
              <p className="text-muted-foreground mb-6">{achievement.description}</p>
              <div className="border-t border-primary/20 pt-6">
                <div className="text-4xl font-black text-primary mb-2">{achievement.metric}</div>
                <div className="text-sm text-foreground/60">{achievement.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-lg mt-16"
        >
          <h3 className="text-3xl font-bold mb-6 text-center">Featured Success Story</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-primary">AI-Powered Analytics Platform</h4>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                Developed a comprehensive machine learning solution for a leading Sri Lankan enterprise, 
                enabling real-time predictive analytics and reducing operational costs by 45%.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Real-time data processing</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Custom ML models with 94% accuracy</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span>Scalable cloud infrastructure</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="border border-primary/30 rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">45%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="border border-primary/30 rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Model Accuracy</div>
              </div>
              <div className="border border-primary/30 rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">3 Months</div>
                <div className="text-sm text-muted-foreground">Delivery Time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
