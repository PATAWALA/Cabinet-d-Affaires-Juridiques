"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Clock, Users, Star } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Date limite : 26 août 2026 à minuit
    const deadline = new Date("2026-08-26T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = deadline - now;
      if (distance < 0) {
        setTimeLeft("INSCRIPTIONS CLÔTURÉES");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0B0F19] to-[#0B0F19] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

      <div className="space-y-8 max-w-3xl mx-auto select-text">
        {/* Urgence */}
        <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-300 font-semibold animate-pulse">
          <Clock className="w-4 h-4" />
          Inscriptions fermées le 26 août à minuit
        </div>

        {/* Compte à rebours */}
        <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] font-heading tracking-wider select-all">
          {timeLeft}
        </div>

        {/* Accroche principale */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white select-text">
          Votre diplôme ne suffit pas.
          <br />
          <span className="text-[#D4AF37]">La pratique, oui.</span>
        </h1>

        {/* Sous-titre clair */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto select-text">
          Obtenez une Certification Internationale en Pratique Juridique ou Immobilière
          et accédez enfin aux postes que vous méritez.
        </p>

        {/* Preuve sociale condensée */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 select-text">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D4AF37]" />+500 carrières transformées
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            Certification reconnue internationalement
          </div>
        </div>

        {/* CTA */}
        <div>
          <a
            href="#inscription"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-10 py-5 rounded-full text-xl transition-transform hover:scale-105 shadow-xl shadow-[#D4AF37]/20"
          >
            Je m’inscris et j’obtiens ma bourse
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}