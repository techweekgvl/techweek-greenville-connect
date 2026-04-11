import { motion } from "framer-motion";

const team = [
  { name: "Nick Dennis", role: "CoFounder", image: "/nick.jpg" },
  { name: "Daijah Surratt", role: "CoFounder", image: "/daijah.jpg" },
  { name: "Samson Baldwin", role: "CoFounder", image: "/samson.jpg" },
  { name: "Andrew Farrell", role: "CoFounder", image: "/andrew.jpg" },
];

const speakerSlots = Array.from({ length: 6 }, (_, i) => i);

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
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl mx-auto mb-4 overflow-hidden ring-2 ring-primary/40">
                <img src={member.image} alt={member.name} className={`w-full h-full object-cover ${member.name === "Daijah Surratt" ? "object-[center_20%]" : "object-top"}`} />
              </div>
              <h3 className="text-base font-semibold font-display">{member.name}</h3>
              <p className="text-sm text-primary font-body font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Speakers */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Featured <span className="gradient-text">Speakers</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">Speaker lineup coming soon — stay tuned!</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-xl mx-auto">
          {speakerSlots.map((id, i) => (
            <motion.div
              key={id}
              className="glass-card rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-muted-foreground">?</span>
              </div>
              <p className="text-xs text-muted-foreground font-body">TBA</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-10 text-muted-foreground font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Interested in speaking?{" "}
          <a href="#register" className="text-primary hover:underline font-medium">Get in touch →</a>
        </motion.p>
      </div>
    </section>
  );
};

export default Speakers;
