"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#team", label: "Mitmachen" },
  { href: "#strecke", label: "Strecke" },
  { href: "#anmeldung", label: "Anmeldung" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur shadow-sm border-b border-[#b4e1f0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="MVZ Südwest"
          width={110}
          height={36}
          className={`object-contain h-9 w-auto transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors duration-200 ${
                scrolled
                  ? "text-[#1a2a3a] hover:text-[#2d78c3]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#anmeldung"
          className="bg-[#2d78c3] hover:bg-[#3ca5e1] text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-lg shadow-[#2d78c3]/30"
        >
          Ich bin dabei!
        </a>
      </div>
    </header>
  );
}
