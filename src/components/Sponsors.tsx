import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

        {/* Sponsors to be announced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/30 px-6 py-3">
            <motion.span
              className="text-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.span>
            <span className="inline-flex items-end gap-1.5">
              <span className="text-lg md:text-xl font-bold font-display gradient-text leading-none">
                To Be Announced Soon
              </span>
              <span className="flex items-center gap-1 mb-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  />
                ))}
              </span>
            </span>
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
