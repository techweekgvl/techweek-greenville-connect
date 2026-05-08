import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CalendarDays, MapPin, Clock } from "lucide-react";

interface EventDetails {
  event: string;
  theme: string;
  location: string;
  time: string;
  description: string;
  panels?: string[];
  includes: string[];
}

interface DayData {
  date: string;
  key: string;
  day: string;
  events: EventDetails[];
}

const days: DayData[] = [
  {
    date: "Sun 9/20", key: "sun", day: "Sunday",
    events: [{
      theme: "Level-Up Launch",
      event: "Opening Social Mixer (Free)",
      location: "Yee-Haw Brewing",
      time: "4:00 PM – 8:00 PM",
      description: "Kick off Tech Week with an unforgettable opening experience designed to spark connections and set the tone for the days ahead. The Level-Up Launch is where the community comes together—founders, creatives, tech professionals, and curious minds—to begin the journey. Enjoy a high-energy atmosphere featuring a kickoff video, live panel discussions with professionals in tech, and your first opportunity to network with attendees from across the ecosystem.",
      panels: ["5:15 PM – 5:40 PM", "6:00 PM – 6:30 PM"],
      includes: ["Networking mixer access", "Panel discussions", "Light food & beverages"],
    }],
  },
  {
    date: "Mon 9/21", key: "mon", day: "Monday",
    events: [
      {
        theme: "Founders Fuel",
        event: "Conversation & Coffee",
        location: "Starbucks (Outdoor Patio)",
        time: "10:00 AM – 11:35 AM",
        description: "Start your day with intentional conversations and meaningful connections. Founders Fuel is a relaxed, open-format gathering where entrepreneurs, builders, and tech enthusiasts come together over coffee to exchange ideas, share challenges, and talk through what's next in tech.",
        includes: ["Curated experience", "Coffee & light breakfast bites"],
      },
      {
        theme: "Innovation on Display",
        event: "Pitch Competition + Panels",
        location: "Camelot Theater",
        time: "5:30 PM – 8:15 PM",
        description: "Step into a curated, high-energy environment where innovation takes center stage. Hosted inside a theater setting, this event reimagines the traditional pitch competition with a more immersive and elevated experience. Watch founders present their ideas live for a chance to win the Tech Innovation Grant.",
        panels: ["6:15 PM – 6:30 PM", "6:35 PM – 7:00 PM"],
        includes: ["Pitch competition access", "Panel discussions", "Food & beverages"],
      },
    ],
  },
  {
    date: "Tue 9/22", key: "tue", day: "Tuesday",
    events: [{
      theme: "Deal Flow & Connections",
      event: "Tech & Brews",
      location: "Business & Brews",
      time: "5:30 PM – 8:15 PM",
      description: "Where conversations turn into opportunities. Deal Flow & Connections Night is designed to bring founders, investors, operators, and professionals into one room to build real relationships and explore what's next. This experience goes beyond traditional networking—creating an environment where ideas are exchanged, partnerships are formed, and deals begin to take shape.",
      includes: ["Keynote speaker session", "Curated experience", "Food & beverages"],
    }],
  },
  {
    date: "Wed 9/23", key: "wed", day: "Wednesday",
    events: [
      {
        theme: "Future Forward",
        event: "Invite-Only Breakfast",
        location: "Downtown (Private Venue)",
        time: "9:30 AM – 11:30 AM",
        description: "An exclusive, invite-only experience curated for speakers, sponsors, and select founders. This intimate breakfast is designed to foster meaningful conversations, build deeper relationships, and create alignment among key contributors shaping Tech Week.",
        includes: ["Private networking experience", "Breakfast & beverages"],
      },
      {
        theme: "Future Forward",
        event: "Tech Connect",
        location: "SynergyMill",
        time: "5:30 PM – 8:30 PM",
        description: "Tech Connect is where the broader community comes together. Designed for all levels—from students to seasoned professionals—this event highlights opportunities in STEM, showcases local tech companies, and creates space to discover who's who in the ecosystem.",
        panels: ["6:35 PM – 7:15 PM"],
        includes: ["Access to tech showcases & exhibits", "Panel discussion", "Food & beverages"],
      },
    ],
  },
  {
    date: "Thu 9/24", key: "thu", day: "Thursday",
    events: [
      {
        theme: "Trailblazers in Tech",
        event: "Women in Tech Brunch",
        location: "Urbana Churro Café",
        time: "10:30 AM – 1:30 PM",
        description: "An empowering and intentional space for women to connect, share, and grow. This brunch experience brings together women across industries to discuss how technology impacts their careers, businesses, and everyday lives. Expect meaningful dialogue, authentic connection, and a supportive environment designed to uplift and inspire.",
        includes: ["Curated brunch experience", "Community discussions", "Food & beverages"],
      },
      {
        theme: "Trailblazers in Tech",
        event: "AI Experience (Details Coming Soon)",
        location: "TBD",
        time: "TBD",
        description: "Step into the future with an immersive event centered around artificial intelligence. This experience will blend innovation, creativity, and conversation—designed to feel both cutting-edge and accessible. More details to be announced soon.",
        includes: ["Interactive AI-focused experience", "Food & beverages"],
      },
    ],
  },
  {
    date: "Fri 9/25", key: "fri", day: "Friday",
    events: [{
      theme: "Tech Unleashed: Live & Loud",
      event: "Tech Unleashed: Live & Loud",
      location: "Flywheel Co-Working",
      time: "5:30 PM – 9:00 PM",
      description: "As the week builds toward its finale, Tech Unleashed brings energy, music, and celebration together. Featuring a live performance, keynote speaker, and Tech Week Awards, this event is all about recognizing impact while keeping the momentum going.",
      includes: ["Live music experience", "Keynote speaker", "Awards presentation", "Food & beverages"],
    }],
  },
  {
    date: "Sat 9/26", key: "sat", day: "Saturday",
    events: [
      {
        theme: "Elevate Excellence",
        event: "Working Room x Mixer",
        location: "K's Bistro",
        time: "11:30 AM – 2:30 PM",
        description: "Celebrate culture, community, and impact at this outdoor panel and mixer experience. Focused on excellence, this event highlights leaders, innovators, and voices making a difference. Enjoy a vibrant atmosphere with music, meaningful conversation, and community recognition.",
        includes: ["Panel discussion", "Workshop mixer", "Food & beverages"],
      },
      {
        theme: "Tech On Top",
        event: "Tech on Top",
        location: "TBD (Rooftop)",
        time: "7:30 PM – 11:00 PM",
        description: "Close out Tech Week in style. Tech on Top is a laid-back rooftop social designed to celebrate the connections, ideas, and energy built throughout the week. With a DJ, giveaways, and a relaxed vibe, this is your final chance to connect, unwind, and leave inspired.",
        includes: ["Rooftop social experience", "DJ & entertainment", "Giveaways & swag bags", "Food & beverages"],
      },
    ],
  },
];

const EventCard = ({ event }: { event: EventDetails }) => (
  <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden flex-1">
    <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

    <div className="relative z-10">
      <h3 className="text-xl sm:text-2xl font-bold font-display mb-2 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <span className="gradient-text">{event.theme}</span>
      </h3>

      <h4 className="text-base sm:text-lg font-semibold font-display mb-3 text-foreground">
        {event.event}
      </h4>

      <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm text-muted-foreground font-body">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-primary" />
          {event.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-primary" />
          {event.time}
        </span>
      </div>

      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 text-left">
        {event.description}
      </p>

      {event.panels && (
        <div className="mb-4">
          <p className="text-sm font-semibold font-display text-foreground mb-2">Panels:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {event.panels.map((panel, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-secondary text-xs text-muted-foreground font-body">
                {panel}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold font-display text-foreground mb-2">What's Included:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {event.includes.map((item, i) => (
            <span key={i} className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-body">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Schedule = () => {
  const [activeDay, setActiveDay] = useState("sun");
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
          <p className="text-muted-foreground text-lg font-body">Sept 20 – 27 • Seven days. Eleven experiences. One community.</p>
        </motion.div>

        {/* Day selector — pill style */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`relative px-3 py-2 sm:px-5 sm:py-3 rounded-xl font-display text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeDay === d.key
                  ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)] scale-105"
                  : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span className="block font-semibold">{d.date}</span>
            </button>
          ))}
        </div>

        {/* Active day content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-body text-sm">
                <CalendarDays className="w-4 h-4" />
                {active.day}
              </span>
            </div>

            <div className={`grid gap-6 ${active.events.length > 1 ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
              {active.events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Schedule;
