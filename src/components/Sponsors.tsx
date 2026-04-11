import { motion } from "framer-motion";
import { Star } from "lucide-react";

const sponsors = [
  { name: "Porsche", logo: "/porsche.png" },
  { name: "Land Rover", logo: "/landrover-removebg-preview.png" },
  { name: "SynergyMill", logo: "/synergymill-removebg-preview.png" },
];

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Sponsors & <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">Powered by the companies building Greenville's future</p>
        </motion.div>

        {/* Key Program Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground font-display mb-8 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Key Program Sponsors
            <Star className="w-4 h-4 text-primary" />
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center p-6 opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                <img src={sponsor.logo} alt={sponsor.name} className="h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-center mt-12 text-muted-foreground font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Interested in sponsoring?{" "}
          <a href="#register" className="text-primary hover:underline font-medium">Let's talk →</a>
        </motion.p>
      </div>
    </section>
  );
};

export default Sponsors;
