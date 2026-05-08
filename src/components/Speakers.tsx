import { motion } from "framer-motion";
import { Mic2 } from "lucide-react";

const team = [
  { name: "Nick Dennis", role: "Founder", image: "/nick.jpg" },
  { name: "Daijah Surratt", role: "CoFounder", image: "/daijah.jpg" },
  { name: "Samson Baldwin", role: "CoFounder", image: "/samson.jpg" },
  { name: "Andrew Farrell", role: "CoFounder", image: "/andrew.jpg" },
];


const Speakers = () => {
  return (
    <section id="speakers" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Team */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">The people behind Tech Week Greenville</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl mx-auto mb-4 overflow-hidden ring-2 ring-primary/40">
                <img src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.name === "Daijah Surratt" ? "object-[center_20%]" : "object-top"}`} />
              </div>
              <h3 className="text-base font-semibold font-display">{member.name}</h3>
              <p className="text-sm text-primary font-body font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Speakers */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Featured <span className="gradient-text">Speakers</span>
          </h2>
        </motion.div>

        <motion.div
          className="glass-card rounded-2xl p-10 md:p-14 max-w-2xl mx-auto text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mic2 className="w-7 h-7 text-primary" />
            </motion.div>

            <h3 className="text-xl md:text-2xl font-bold font-display mb-3">Lineup Dropping Soon</h3>
            <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
              We're lining up an incredible roster of founders, innovators, and industry leaders. Be the first to know when speakers are announced.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm text-muted-foreground font-body mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Announcements coming soon
            </div>

            <p className="text-muted-foreground font-body text-sm">
              Interested in speaking?{" "}
              <a href="#register" className="text-primary hover:underline font-medium">Get in touch →</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Speakers;
