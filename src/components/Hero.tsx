import { ArrowDown, Award, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0B0F19] to-[#0B0F19] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-2 text-sm text-[#D4AF37] font-medium">
          <Award className="w-4 h-4" />
          15 ans d’expertise au service de l’excellence
        </div>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
          Transformez votre carrière avec une{" "}
          <span className="text-[#D4AF37]">Certification Internationale</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Le Cabinet d’Affaires Juridiques du <strong>Dr Lobé</strong> vous ouvre
          les portes de l’élite professionnelle. Bourse <strong>Mamadou TOURÉ</strong> disponible – places limitées.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Certification reconnue à l'international
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            +5000 professionnels certifiés
          </div>
        </div>

        <div className="pt-8">
          <a
            href="#inscription"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-10 py-4 rounded-full text-lg transition-transform hover:scale-105 shadow-xl shadow-[#D4AF37]/20"
          >
            Postuler à la Bourse
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}