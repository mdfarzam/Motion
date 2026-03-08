"use client"
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const services = [
  {
    title: "Interior Design",
    desc: "Project description",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Space Planning",
    desc: "Project description",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Furniture Styling",
    desc: "Project description",
    img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Consultation",
    desc: "Project description",
    img: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=800&auto=format&fit=crop",
  },
];

const ROW_HEIGHT = 80;
const ROW_GAP = 40;

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 18,
    damping: 35,
    mass: 2,
  });

  const imageY = useTransform(smooth, [0, 1], [-6, 6]);
  const imageRotate = useTransform(smooth, [0, 1], [-4, 4]);
  const imageScale = useTransform(smooth, [0, 1], [0.98, 1]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-black px-12 pt-34 pb-24 min-h-[90vh]"
    >
      {hoveredIndex !== null && (
        <div
          className="absolute left-0 right-0 pointer-events-none transition-all duration-500 ease-out"
          style={{
            top: `calc(8.5rem + ${hoveredIndex * (ROW_HEIGHT + ROW_GAP)}px)`,
            height: ROW_HEIGHT,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            zIndex: 0,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-10">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="flex items-center justify-between cursor-pointer w-full group"
            style={{ height: ROW_HEIGHT }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div>
              <p
                className="font-dm text-base font-semibold mb-1 transition-colors duration-500"
                style={{
                  color: hoveredIndex === i ? "white" : "rgba(255,255,255,0.6)",
                }}
              >
                {s.title}
              </p>
              <p className="font-dm text-xs text-white/20">{s.desc}</p>
            </div>

            <motion.button
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 transition-colors duration-500"
              style={{
                background: hoveredIndex === i ? "white" : "transparent",
                color: hoveredIndex === i ? "black" : "white",
              }}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        ))}
      </div>

      <div
        className="absolute inset-0 flex justify-end items-start pointer-events-none"
        style={{ paddingTop: "8.5rem", paddingRight: "14rem" }}
      >
        <div className="sticky top-[25vh] pointer-events-auto" style={{ zIndex: 20 }}>
          <motion.div
            className="overflow-hidden rounded-2xl relative shadow-2xl bg-[#0d0d0d]"
            style={{
              width: 340,
              height: 440,
              y: imageY,
              rotate: imageRotate,
              scale: imageScale,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {services.map((s, i) => (
              <motion.img
                key={s.title}
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={false}
                animate={{
                  opacity: activeIndex === i ? 1 : 0,
                  scale: activeIndex === i ? 1 : 1.05,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 60%)",
                mixBlendMode: "overlay",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
