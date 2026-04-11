import { motion } from "framer-motion";
import { Calendar, Users, Mic, Zap } from "lucide-react";

const stats = [
  { icon: Calendar, value: "6", label: "Days", color: "text-primary" },
  { icon: Zap, value: "10", label: "Experiences", color: "text-accent" },
  { icon: Mic, value: "Dozens", label: "of Speakers", color: "text-primary" },
  { icon: Users, value: "400+", label: "Anticipated Attendees", color: "text-accent" },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            What is <span className="gradient-text">Tech Week</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-body leading-relaxed">
            Tech Week Greenville is a high-energy, week-long celebration of innovation,
            technology, and community. From Workshops and keynotes to block parties and
            fireside chats — we bring together Creatives, developers, designers, founders, and
            tech enthusiasts to connect, create, and level up across the Upstate.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl md:text-4xl font-bold font-display mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
