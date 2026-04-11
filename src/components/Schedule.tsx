import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CalendarDays } from "lucide-react";

const days = [
  { date: "Mon 9/21", key: "mon", day: "Monday", theme: "🚀 Level-Up Launch" },
  { date: "Tue 9/22", key: "tue", day: "Tuesday", theme: "💡 Innovation on Display" },
  { date: "Wed 9/23", key: "wed", day: "Wednesday", theme: "🔮 Future Forward" },
  { date: "Thu 9/24", key: "thu", day: "Thursday", theme: "🏆 Trailblazers in Tech" },
  { date: "Fri 9/25", key: "fri", day: "Friday", theme: "🔥 Tech Unleashed: Live & Loud" },
  { date: "Sat AM", key: "sat-am", day: "Saturday Pt.1", theme: "✊🏿 Elevate Black Excellence" },
  { date: "Sat PM", key: "sat-pm", day: "Saturday Pt.2", theme: "🎉 Tech On Top" },
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState("mon");
  const active = days.find(d => d.key === activeDay)!;

  return (
    <section id="schedule" className="py-24 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, hsl(var(--primary)) 0px, transparent 1px, transparent 80px)`,
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            The <span className="gradient-text">Week</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">Sept 21 – 26 • Six days. Ten experiences. One community.</p>
        </motion.div>

        {/* Day selector — pill style */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`relative px-5 py-3 rounded-xl font-display text-sm font-medium transition-all duration-300 ${
                activeDay === d.key
                  ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)] scale-105"
                  : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span className="block font-semibold">{d.date}</span>
            </button>
          ))}
        </div>

        {/* Active day theme — big and bold */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-10 md:p-14 max-w-2xl mx-auto relative overflow-hidden">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-body text-sm mb-6">
                  <CalendarDays className="w-4 h-4" />
                  {active.day}
                </span>

                <h3 className="text-3xl md:text-4xl font-bold font-display mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="w-7 h-7 text-primary" />
                  <span className="gradient-text">{active.theme.replace(/^.+?\s/, '')}</span>
                </h3>

                <p className="text-muted-foreground font-body text-base max-w-md mx-auto mb-6">
                  Full event details dropping soon. Follow us to be the first to know.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm text-muted-foreground font-body">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Lineup coming soon
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Schedule;
