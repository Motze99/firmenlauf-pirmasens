"use client";

import Image from "next/image";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[#b4e1f0]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image src="/logo.png" alt="MVZ Südwest" width={110} height={36} className="object-contain h-9 w-auto" />
        <a
          href="#anmeldung"
          className="bg-[#2d78c3] hover:bg-[#3ca5e1] text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
        >
          Ich bin dabei!
        </a>
      </div>
    </header>
  );
}
