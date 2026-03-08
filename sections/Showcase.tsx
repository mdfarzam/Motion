"use client"
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const rooms = [
  {
    label: "Bed",
    img: "/room_bed.jpg",
    yOffset: 32,
    width: 380,
    height: 380,
  },
  {
    label: "Luxury Smoking Room\nfor Men",
    img: "/room_smoking.jpg",
    yOffset: -24,
    width: 440,
    height: 460,
  },
  {
    label: "Wooden Cabin\nBathroom",
    img: "/room_cabin.jpg",
    yOffset: 48,
    width: 380,
    height: 380,
  },
];

const gradients = [
  "linear-gradient(135deg, #2a1f14, #1a1208)",
  "linear-gradient(135deg, #0d1a14, #0a1510)",
  "linear-gradient(135deg, #1a1408, #2a1e0a)",
];

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  });

  const titleY       = useTransform(smoothProgress, [0, 1], [50, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const cardsScale   = useTransform(smoothProgress, [0.1, 1], [0.92, 1]);
  const cardsOpacity = useTransform(smoothProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="relative z-10 text-center mb-20"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h2 className="font-dm text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Interior{" "}
          <span className="font-semibold">Magic</span>
        </h2>
      </motion.div>

      <motion.div
        className="relative z-10 flex items-center justify-center gap-6 w-full max-w-5xl"
        style={{ scale: cardsScale, opacity: cardsOpacity }}
      >
        {rooms.map((room, i) => (
          <motion.div
            key={i}
            className="flex flex-col gap-3"
            style={{ y: room.yOffset }}
            initial={{ opacity: 0, y: room.yOffset + 30 }}
            whileInView={{ opacity: 1, y: room.yOffset }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="relative overflow-hidden rounded-xl cursor-pointer"
              style={{
                width: room.width,
                height: room.height,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${room.img}')`,
                  background: room.img ? undefined : gradients[i],
                }}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
                }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
            <motion.p
              className="font-dm text-xs text-white/50 leading-snug pl-1"
              style={{ whiteSpace: "pre-line" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
            >
              {room.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))" }}
      />
    </section>
  );
}
