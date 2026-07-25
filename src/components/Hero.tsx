"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Award, Clock, ShieldCheck, Star, Users } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const deadline = new Date("2026-07-25T23:59:59").getTime();
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

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Urgence */}
        <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/30 rounded-full px-5 py-2 text-sm text-red-300 font-semibold animate-pulse">
          <Clock className="w-4 h-4" />
          Plus que quelques jours – Inscriptions closes le 25 Juillet à minuit
        </div>

        {/* Compte à rebours */}
        <div className="mt-4 text-3xl md:text-4xl font-bold text-[#D4AF37] font-heading">
          {timeLeft}
        </div>

        {/* Autorité */}
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-2 text-sm text-[#D4AF37] font-medium">
          <Award className="w-4 h-4" />
          Cabinet d’Affaires Juridiques – Dr Lobé
        </div>

        {/* Accroche choc */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
          Votre diplôme en Droit ou en Immobilier ne vaut rien sans la pratique.
        </h1>

        {/* Storytelling */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          <span className="text-[#D4AF37] font-semibold">
            “Pendant 15 ans, j’ai vu des talents mourir derrière des cabines téléphoniques.”
          </span>
          <br />
          Aujourd’hui, le Dr Lobé vous ouvre la porte qui transforme un diplômé en professionnel recherché.
        </p>

        {/* Promesse */}
        <p className="text-base text-gray-400 max-w-xl mx-auto">
          Obtenez une{" "}
          <strong className="text-white">Certification Internationale en Pratique Juridique ou Immobilière</strong>{" "}
          et prouvez enfin ce que vous valez.
          <br />
          Bourse <strong className="text-[#D4AF37]">Mamadou TOURÉ</strong> – Places limitées pour les plus déterminés.
        </p>

        {/* Preuve sociale */}
        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D4AF37]" />+500 carrières métamorphosées
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            Anciens auditeurs devenus Magistrats, Avocats, Notaires
          </div>
        </div>

        {/* CTA principal */}
        <div className="pt-8">
          <a
            href="#inscription"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-10 py-5 rounded-full text-xl transition-transform hover:scale-105 shadow-xl shadow-[#D4AF37]/20"
          >
            Je veux débloquer ma carrière – Je m’inscris
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}