import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a2a3a] border-t border-[#2d78c3]/30 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="MVZ Südwest Logo" width={100} height={34} className="object-contain h-9 w-auto opacity-80" />
            <div className="text-[#b4e1f0] text-sm">
              <div className="font-bold text-white">Park Firmenlauf Pirmasens 2026</div>
              <div>11. September 2026 · Messehalle Pirmasens</div>
            </div>
          </div>

          <div className="text-[#b4e1f0]/60 text-sm text-center md:text-right">
            <div>Teil des 20. Pfälzerwald-Marathon-Wochenendes</div>
            <div className="mt-1">© 2026 Park Firmenlauf Pirmasens</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
