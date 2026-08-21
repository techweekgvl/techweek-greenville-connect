import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const team = [
  { name: "Nick Dennis", role: "Founder", image: "/nick.jpg" },
  { name: "Daijah Surratt", role: "CoFounder", image: "/daijah.jpg" },
  { name: "Samson Baldwin", role: "CoFounder", image: "/samson.jpg" },
  { name: "Andrew Farrell", role: "CoFounder", image: "/andrew.jpg" },
];

interface Speaker {
  name: string;
  role?: string;
  day: string;
  image: string;
}

const speakers: Speaker[] = [
  { name: "Eric Weissmann", role: "Ecosystem Builder & Economic Development Leader", day: "Sun 9/20", image: "/speakers/eric-weissmann.jpg" },
  { name: "Benten Woodring", role: "CEO, NOOON Studio", day: "Sun 9/20", image: "/speakers/benten-woodring.jpg" },
  { name: "Alecia Brewster", role: "Founder, Eligible", day: "Sun 9/20", image: "/speakers/alecia-brewster.jpg" },
  { name: "Really Rykki", role: "Host & Data Analyst", day: "Sun 9/20", image: "/speakers/really-rykki.jpg" },
  { name: "Barry Jones", role: "VP of IT, ThoroughCare · Carolina Code Conference", day: "Mon 9/21", image: "/speakers/barry-jones.jpg" },
  { name: "Kenzie Biggins", day: "Mon 9/21", image: "/speakers/kenzie-biggins.jpg" },
  { name: "Lelia King", role: "Executive Director, Build Carolina", day: "Mon 9/21", image: "/speakers/lelia-king.jpg" },
  { name: "Shaler Houser", role: "Founder, Founderville Podcast · Pitch Judge", day: "Mon 9/21", image: "/speakers/shaler-houser.jpg" },
  { name: "Bryan Davis", role: "Executive Director, The Hill Institute — Furman University", day: "Mon 9/21", image: "/speakers/bryan-davis.jpg" },
  { name: "Tim Johnson", role: "Business Development Manager, PDIG", day: "Mon 9/21", image: "/speakers/tim-johnson.jpg" },
  { name: "Mayor Knox White", role: "Mayor of Greenville", day: "Tue 9/22", image: "/speakers/knox-white.jpg" },
  { name: "Samantha Cooks", role: "Carolina Women in Tech", day: "Thu 9/24", image: "/speakers/samantha-cooks.jpg" },
  { name: "Cherish Benton", role: "Founder, The OrangeByte", day: "Thu 9/24", image: "/speakers/cherish-benton.jpg" },
  { name: "Jada Samuel", day: "Thu 9/24", image: "/speakers/jada-samuel.jpg" },
  { name: "Lilyn Hester", role: "Regional Lead, Community & Workforce Development — Google", day: "Thu 9/24", image: "/speakers/lilyn-hester.jpg" },
  { name: "Danny Dorsel", role: "President, SC Governor's School for Science & Mathematics", day: "Thu 9/24", image: "/speakers/danny-dorsel.jpg" },
  { name: "Sam Konduros", role: "President & CEO, Greenville City Economic Development Corp.", day: "Fri 9/25", image: "/speakers/sam-konduros.jpg" },
  { name: "Harold Hughes", role: "Angel Investor & Startup Advisor — Clemson University", day: "Sat 9/26", image: "/speakers/harold-hughes.jpg" },
  { name: "Micki Blendz", role: "Host & DJ", day: "Sat 9/26", image: "/speakers/micki-blendz.jpg" },
];

// Two speakers per column so the row reads as two swipeable rows.
const speakerColumns = Array.from(
  { length: Math.ceil(speakers.length / 2) },
  (_, i) => speakers.slice(i * 2, i * 2 + 2),
);

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => (
  <div className="text-center flex flex-col h-full">
    <div className="aspect-square w-full rounded-2xl mb-3 overflow-hidden ring-2 ring-primary/40 bg-secondary">
      <img
        src={speaker.image}
        alt={speaker.name}
        loading="lazy"
        className="w-full h-full object-cover object-top"
      />
    </div>
    <h3 className="text-sm sm:text-base font-semibold font-display leading-tight">{speaker.name}</h3>
    {speaker.role && (
      <p className="mt-1 text-xs text-muted-foreground font-body leading-snug">{speaker.role}</p>
    )}
    {/* Spacing lives on the wrapper so the pill keeps its own symmetric padding. */}
    <div className="mt-auto pt-2 flex justify-center">
      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] leading-none text-primary font-body">
        {speaker.day}
      </span>
    </div>
  </div>
);

/**
 * Native CSS scroll-snap rather than a carousel library: it swipes on touch for
 * free, and scrollLeft gives exact progress without depending on the library
 * having measured correctly.
 */
const SpeakerCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>();
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(max > 0 && el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  useEffect(() => () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const page = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const from = el.scrollLeft;
    const target = Math.min(max, Math.max(0, from + direction * el.clientWidth * 0.8));
    const delta = target - from;
    if (Math.abs(delta) < 1) return;

    // Native smooth scrolling (both scrollBy({behavior}) and CSS scroll-behavior)
    // silently refuses to move this container, and mandatory snap fights per-frame
    // writes, so tween by hand with snapping suspended for the duration.
    if (animRef.current) cancelAnimationFrame(animRef.current);
    el.style.scrollSnapType = "none";
    const startedAt = performance.now();
    const duration = 450;
    let ticked = false;

    const finish = () => {
      el.style.scrollSnapType = "";
      animRef.current = undefined;
      // Don't rely on the scroll event alone for programmatic scrolls, and
      // re-read once more after snapping has nudged scrollLeft to its snap point.
      update();
      window.setTimeout(update, 80);
    };

    const step = (now: number) => {
      ticked = true;
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.scrollLeft = from + delta * eased;
      update();
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    animRef.current = requestAnimationFrame(step);

    // Some embedded/automated browsers suspend rAF entirely. If no frame ever
    // ran, jump straight to the target so the arrows still work.
    window.setTimeout(() => {
      if (ticked) return;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      el.scrollLeft = target;
      finish();
    }, 100);
  };

  const arrowClass =
    "inline-flex items-center justify-center h-10 w-10 shrink-0 rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 hover:border-primary/40 disabled:opacity-25 disabled:hover:bg-primary/10";

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={update}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {speakerColumns.map((column, i) => (
          <div
            key={i}
            className="snap-start shrink-0 grid grid-rows-2 gap-y-8 w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)]"
          >
            {column.map((speaker) => (
              <SpeakerCard key={speaker.name} speaker={speaker} />
            ))}
          </div>
        ))}
      </div>

      {/* Controls sit in the space below the cards rather than floating over them. */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={!canPrev}
            aria-label="Previous speakers"
            className={arrowClass}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="h-1 w-32 sm:w-48 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
              style={{ width: `${20 + progress * 80}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => page(1)}
            disabled={!canNext}
            aria-label="More speakers"
            className={arrowClass}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground font-body">
          {speakers.length} speakers
          <span aria-hidden> · </span>
          <span className="md:hidden">swipe or tap the arrows</span>
          <span className="hidden md:inline">use the arrows to see more</span>
        </p>
      </div>
    </div>
  );
};

const Speakers = () => {
  return (
    <section id="speakers" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
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
          <p className="text-muted-foreground text-lg font-body">
            Founders, investors, and community leaders taking the stage Sept 20 – 26
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SpeakerCarousel />
        </motion.div>

        <motion.p
          className="text-center mt-14 text-muted-foreground font-body text-sm"
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
