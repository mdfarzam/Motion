"use client"
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const topTextY       = useTransform(smooth, [0, 0.5], [130, 0]);
  const topTextOpacity = useTransform(smooth, [0, 0.4], [0, 1]);
  const bottomY = useTransform(smooth, [0.2, 0.8], [60, -10]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden px-12 py-24 flex flex-col gap-32"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="relative z-10"
        style={{ y: topTextY, opacity: topTextOpacity }}
      >
        <motion.p
          className="font-dm text-xs tracking-[0.2em] uppercase text-white/40 mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          About Us
        </motion.p>

        <div className="max-w-3xl mx-auto text-left">
          <p className="font-dm text-3xl md:text-4xl leading-snug text-white/60 font-light">
            <span className="text-white font-semibold">Design</span> plays a crucial role in a
            house as it{" "}
            <span className="text-white font-semibold">
              shapes the way we experience our living spaces.
            </span>{" "}
            A well-thought-out design enhances functionality, making everyday tasks easier and more enjoyable.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 flex justify-between items-end"
        style={{ y: bottomY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <p className="font-dm text-sm font-medium text-white/70 mb-1">
            Interior Design
          </p>
          <p className="font-dm text-xs text-white/30">
            Project description
          </p>
        </motion.div>

        <motion.div
          className="flex gap-8 items-end"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-[220px]">
            <h3 className="font-dm text-2xl md:text-3xl font-semibold text-white leading-tight mb-3">
              All your ideas,
              <br />
              One Platform
            </h3>
            <p className="font-dm text-xs text-white/35 leading-relaxed">
              We create personalised environments that reflects your lifestyle.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
