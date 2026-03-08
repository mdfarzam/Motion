"use client"
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Showcase", href: "#showcase" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="font-dm text-white/70 text-xs tracking-widest uppercase"
        >
          Interitual
        </span>
      </div>

      {/* Center Nav Links */}
      <ul className="flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-dm text-xs text-white/50 tracking-widest uppercase transition-colors duration-200 hover:text-white/90"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right CTA */}
      <button
        type="button"
        onClick={() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="font-dm flex items-center gap-2 text-xs tracking-widest uppercase text-white/60 transition-all duration-300 hover:text-white"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Connect
      </button>
    </nav>
  );
}