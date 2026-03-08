"use client"
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function HeroPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const leftY       = useTransform(smoothProgress, [0, 1], [0, -180]);
  const leftOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <div
      id="home"
      ref={heroRef}
      className="relative w-screen h-screen overflow-hidden bg-black"
    >
      {/* Background Image — zooms in on load */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          backgroundImage: "url('/hero_2.jpg')",
          filter: "brightness(0.5) saturate(0.85)",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-end justify-between px-12 pb-14">
        <motion.div
          className="max-w-lg"
          style={{ y: leftY, opacity: leftOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p
            className="font-dm text-xs tracking-[0.22em] uppercase text-white/40 mb-3 font-light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Interior Architecture
          </motion.p>

          <motion.h1
            className="font-cormorant text-6xl font-light leading-[1.05] text-white mb-4"
            style={{ letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Design Your
            <br />
            <span className="italic font-normal" style={{ color: "#d4c9b8" }}>
              Dream Home
            </span>
          </motion.h1>

          <motion.p
            className="font-dm text-sm font-light leading-relaxed text-white/45 max-w-md mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Transform your space with our expert interior design services. We craft
            environments that reflect your style and elevate your lifestyle.
          </motion.p>

          <motion.button
            type="button"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="font-dm inline-flex hover:cursor-pointer items-center gap-3 px-7 py-4 text-xs tracking-widest uppercase text-white"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.14)" }}
          >
            Explore Projects
            <motion.span className="text-base">→</motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* RIGHT CARDS */}
      <motion.div
        className="absolute top-0 right-12 h-full flex flex-col justify-between pt-24 pb-14 z-20 pointer-events-none"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="flex items-center gap-4 rounded-2xl p-4 w-70 pointer-events-auto"
          style={{
            background: "rgba(15,13,11,0.65)",
            backdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
            style={{ background: "linear-gradient(135deg, #7c6a52, #3d3028)" }}
          />
          <div>
            <p className="font-dm text-sm font-medium leading-snug mb-1" style={{ color: "#f0ebe3" }}>
              Top 10 Interior Designers
              <br />across the globe
            </p>
            <p className="font-dm text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Tap to see the best
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl overflow-hidden w-70 pointer-events-auto"
          style={{
            background: "rgba(15,13,11,0.65)",
            backdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="w-full h-36 flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, #4a3d30 0%, #1e1812 100%)" }}
          />
          <div className="p-4">
            <p className="font-dm text-[9px] tracking-[0.18em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              New Feature
            </p>
            <p className="font-cormorant text-base font-light leading-snug mb-3" style={{ color: "#f0ebe3" }}>
              Create interior design seamlessly
            </p>
            <button
              type="button"
              className="font-dm text-[10px] tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-200 hover:text-white bg-transparent border-none cursor-pointer"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Learn more <span>→</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
