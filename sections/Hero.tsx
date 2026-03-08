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

  const leftY = useTransform(smoothProgress, [0, 1], [0, -180]);
  const leftOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={heroRef} className="relative w-screen h-screen overflow-hidden bg-black">

      {/* Background Image */}
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

        {/* LEFT: Text */}
        <motion.div
          className="max-w-lg"
          style={{ y: leftY, opacity: leftOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p
            className="text-xs tracking-[0.22em] uppercase text-white/40 mb-3 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Interior Architecture
          </motion.p>

          <motion.h1
            className="text-6xl font-light leading-[1.05] text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "-0.01em" }}
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
            className="text-sm font-light leading-relaxed text-white/45 max-w-md mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Transform your space with our expert interior design services. We craft
            environments that reflect your style and elevate your lifestyle.
          </motion.p>

          <motion.button
            className="inline-flex hover:cursor-pointer items-center gap-3 px-7 py-4 text-xs tracking-widest uppercase text-white"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              fontFamily: "'DM Sans', sans-serif",
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

        {/* Card 1 — Notification with thumbnail image on left */}
        <motion.div
          className="flex items-center gap-3 rounded-2xl p-3 pointer-events-auto"
          style={{
            width: 260,
            background: "rgba(12,10,9,0.72)",
            backdropFilter: "blur(24px) saturate(1.5)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Thumbnail */}
          <div
            className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: 52, height: 52 }}
          >
            <img
              src="hero_c2.jpg"
              alt="interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-semibold leading-snug mb-0.5"
              style={{ color: "#f0ebe3", fontFamily: "'DM Sans', sans-serif" }}
            >
              Top 10 Interior Designer
              <br />across the globe
            </p>
            <p
              className="text-[10px]"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Tap to see the best
            </p>
          </div>
        </motion.div>

        {/* Card 2 — Feature card: text on top, room photo with rounded corners + padding */}
        <motion.div
          className="pointer-events-auto flex flex-col p-3"
          style={{
            width: 240,
            background: "rgba(18,16,14,0.55)",
            backdropFilter: "blur(28px) saturate(1.6)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            borderRadius: "22px",
          }}
        >
          {/* Text on top with padding */}
          <div className="px-2 pt-2 pb-3">
            <p
              className="text-base font-semibold leading-snug"
              style={{ color: "#f0ebe3", fontFamily: "'DM Sans', sans-serif" }}
            >
              Create interior
              <br />design seamlessly
            </p>
          </div>

          {/* Room photo — rounded, inset with gap from card edges */}
          <div
            className="overflow-hidden"
            style={{ borderRadius: "14px", height: 170 }}
          >
            <img
              src="hero_card.jpg"
              alt="room"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}