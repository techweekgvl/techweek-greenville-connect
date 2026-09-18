import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

interface Partner {
  name: string;
  logo: string;
  /** Monochrome light-on-transparent marks need inverting to read on a white tile. */
  invert?: boolean;
  /** Partners with a landing page get a linked tile, flagged as clickable. */
  url?: string;
}

const sponsors: Partner[] = [
  { name: "The Tech Store", logo: "/sponsors/tech-store.png", url: "https://thetechstoresc.com/gnvl/" },
  { name: "SynergyMill", logo: "/sponsors/synergymill.png", url: "https://www.synergymill.com/" },
  { name: "Internet Solutions Co.", logo: "/sponsors/internet-solutions.png", url: "https://internetdiscounts4u.com/contact/" },
  { name: "DL6", logo: "/sponsors/dl6.png", url: "https://www.dl6sports.com/" },
  { name: "Sports Data Collective", logo: "/sponsors/sports-data-collective.png", url: "https://sportsdatacollective.com/" },
  { name: "Rollin' Birdies", logo: "/sponsors/rollin-birdies.png", url: "https://rollinbirdiesgolf.com/" },
];

const communityPartners: Partner[] = [
  { name: "i4 Series", logo: "/sponsors/i4-series.png" },
  { name: "Furman — The Hill Institute for Innovation and Entrepreneurship", logo: "/sponsors/hill-institute.png" },
  { name: "Furman — Center for Innovative Leadership", logo: "/sponsors/furman-cil.png" },
  { name: "Business & Brews", logo: "/sponsors/business-brews.png", invert: true },
  { name: "Carolina Code Conference", logo: "/sponsors/carolina-code.webp" },
  { name: "Startup GVL", logo: "/sponsors/startup-gvl.png" },
  { name: "nextGEN", logo: "/sponsors/nextgen.png" },
];

const GroupHeading = ({ label }: { label: string }) => (
  <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground font-display mb-8 flex items-center justify-center gap-2">
    <Star className="w-4 h-4 text-primary" />
    {label}
    <Star className="w-4 h-4 text-primary" />
  </h3>
);

const LogoTile = ({ partner, size }: { partner: Partner; size: "lg" | "sm" }) => {
  const tile = `relative flex items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300 ${
    size === "lg" ? "h-24 w-48 sm:w-56 px-6" : "h-20 w-36 px-4"
  }`;

  const logo = (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      className={`max-w-full w-auto object-contain ${
        size === "lg" ? "max-h-14" : "max-h-11"
      } ${partner.invert ? "invert" : ""}`}
    />
  );

  if (!partner.url) {
    return <div className={`${tile} hover:shadow-lg hover:-translate-y-0.5`}>{logo}</div>;
  }

  // Hover alone reads as static on touch, so the ring and badge stay visible at rest.
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${partner.name} (opens in a new tab)`}
      className={`${tile} group ring-2 ring-primary/50 hover:ring-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary`}
    >
      {logo}
      <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    </a>
  );
};

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
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

        {/* Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GroupHeading label="Sponsors" />
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {sponsors.map((partner) => (
              <LogoTile key={partner.name} partner={partner} size="lg" />
            ))}
          </div>
        </motion.div>

        {/* Community Partners */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GroupHeading label="Community Partners" />
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6">
            {communityPartners.map((partner) => (
              <LogoTile key={partner.name} partner={partner} size="sm" />
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
