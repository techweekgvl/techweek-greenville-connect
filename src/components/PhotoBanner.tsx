import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const row1 = Array.from({ length: 10 }, (_, i) => `/gallery/photo-${String(i + 1).padStart(2, "0")}.jpg`);
const row2 = Array.from({ length: 9 }, (_, i) => `/gallery/photo-${String(i + 11).padStart(2, "0")}.jpg`);
const allPhotos = [...row1, ...row2];

const MarqueeRow = ({ images, direction = "left", duration = 40 }: { images: string[]; direction?: "left" | "right"; duration?: number }) => {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-[400px] h-[260px] rounded-xl overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const PhotoBanner = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="py-10 overflow-hidden">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
          {allPhotos.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[75vw] h-[50vw] rounded-xl overflow-hidden snap-center">
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 overflow-hidden">
      <div className="flex flex-col gap-4">
        <MarqueeRow images={row1} direction="left" duration={45} />
        <MarqueeRow images={row2} direction="right" duration={50} />
      </div>
    </section>
  );
};

export default PhotoBanner;
