import { motion } from "framer-motion";
import { Lightbulb, Shield, Target, Users, Zap, Leaf } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation", description: "Pushing boundaries with cutting-edge solutions" },
  { icon: Shield, title: "Integrity", description: "Building trust through transparency" },
  { icon: Target, title: "Excellence", description: "Delivering quality in every project" },
  { icon: Users, title: "Collaboration", description: "Working together to achieve greatness" },
  { icon: Zap, title: "Adaptability", description: "Evolving with technology trends" },
  { icon: Leaf, title: "Sustainability", description: "Creating lasting positive impact" },
];

export const CompanyOverview = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12 neon-glow" />
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-lg hover:neon-border transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">Vision</h3>
            <p className="text-foreground/80 leading-relaxed">
              To redefine how technology empowers people and businesses — creating intelligent, 
              scalable, and future-ready digital ecosystems that drive global innovation and sustainability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-lg hover:neon-border transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">Mission</h3>
            <p className="text-foreground/80 leading-relaxed">
              To deliver impactful digital solutions through innovation, precision, and collaboration — 
              enabling clients to thrive in a connected world by leveraging AI, software development, 
              and seamless digital transformations.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-lg hover:neon-border transition-all duration-300 group cursor-pointer"
              >
                <value.icon className="w-12 h-12 text-primary mb-4 group-hover:animate-float" />
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-lg"
        >
          <h3 className="text-3xl font-bold mb-6 text-center">Our Story</h3>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Founded in 2025 by passionate engineers in Colombo, Sri Lanka, InflectiveX emerged from 
            a vision to bridge the gap between innovative technology and real-world business challenges. 
            From our beginnings in a co-working space, we've grown into a full-service AI and software 
            partner, delivering cutting-edge solutions that drive measurable results.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2025 Q1</div>
              <div className="text-sm text-muted-foreground">Founded</div>
            </div>
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Pilot Projects</div>
            </div>
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">200%</div>
              <div className="text-sm text-muted-foreground">Client Growth</div>
            </div>
            <div className="text-center p-4 border border-primary/20 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">Q4</div>
              <div className="text-sm text-muted-foreground">Tech Award</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
