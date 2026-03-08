"use client"
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

function Field({
  label,
  name,
  id,
  textarea = false,
  autoComplete,
  type = "text",
}: {
  label: string;
  name: string;
  id: string;
  textarea?: boolean;
  autoComplete?: string;
  type?: string;
}) {
  const base =
    "font-dm w-full bg-transparent text-white/70 text-xs placeholder-white/20 outline-none resize-none py-3 border-b border-white/10 focus:border-white/30 transition-colors duration-300";

  return (
    <div className="flex-1 flex flex-col py-1">
      <label
        htmlFor={id}
        className="font-dm text-[10px] tracking-widest uppercase text-white/30 mb-1"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          placeholder=" "
          autoComplete={autoComplete}
          className={base}
          aria-label={label}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder=" "
          autoComplete={autoComplete}
          className={base}
          aria-label={label}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const imageY = useTransform(smooth, [0, 1], [60, -30]);
  const formY = useTransform(smooth, [0, 1], [80, 0]);
  const formOpacity = useTransform(smooth, [0, 0.5], [0, 1]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-stretch px-12 py-24 gap-12"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* LEFT — image, stretches to full section height */}
      <motion.div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: 440,
          alignSelf: "stretch",
          y: imageY,
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/contact.jpg')" }}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg,rgba(129, 129, 129, 0.4),rgba(144, 144, 144, 0.35))",
          }}
        />
        <div className="absolute bottom-5 left-5 flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span className="text-white text-[9px] font-semibold">I</span>
          </div>
          <span className="font-dm text-white/50 text-[10px] tracking-widest uppercase">
            Interitual
          </span>
        </div>
      </motion.div>

      {/* RIGHT — same height as image, heading top + footer bottom */}
      <motion.div
        className="flex-1 flex flex-col justify-between"
        style={{ y: formY, opacity: formOpacity, alignSelf: "stretch" }}
      >
        {/* TOP — heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-dm text-4xl md:text-5xl font-light text-white leading-tight mb-3">
            Get in contact,
            <br />
            <span className="font-semibold">Achieve perfection</span>
          </h2>
          <p className="font-dm text-xs text-white/35 max-w-sm leading-relaxed">
            Let&apos;s bring your ideas to life. Reach out to discuss your project or request
            a consultation today.
          </p>
        </motion.div>

        {/* MIDDLE — form fields */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-0 flex-1 justify-center py-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="flex gap-6">
            <Field label="First Name" name="firstName" id="contact-firstName" autoComplete="given-name" />
            <Field label="Last Name" name="lastName" id="contact-lastName" autoComplete="family-name" />
          </div>
          <div className="flex gap-6">
            <Field label="Phone Number" name="phone" id="contact-phone" type="tel" autoComplete="tel" />
            <Field label="Email" name="email" id="contact-email" type="email" autoComplete="email" />
          </div>
          <Field label="Your Message" name="message" id="contact-message" textarea />

          <motion.button
            type="submit"
            className="font-dm mt-6 w-full py-4 text-xs tracking-widest uppercase text-black font-medium transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.92)" }}
            whileHover={{ background: "rgba(255,255,255,1)", scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            Submit
          </motion.button>
        </motion.form>

        {/* BOTTOM — footer logo, aligned with image bottom */}
        <motion.div
          className="flex justify-end items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="font-dm text-[10px] tracking-widest uppercase text-white/30">
            Interitual
          </span>
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white/40 text-[10px]"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            ↗
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}