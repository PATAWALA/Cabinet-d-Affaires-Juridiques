import { BookOpen, Building2, Clock, ShieldAlert } from "lucide-react";

export default function ProgramsSection() {
  return (
    <section id="programmes" className="py-24 px-4 bg-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Deux piliers, une promesse : l’emploi
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Session <strong className="text-[#D4AF37]">100% en ligne</strong> – Début le 08 Août 2026.
            <br />
            <span className="text-[#D4AF37] font-bold">Bourse Mamadou TOURÉ</span> : parce que votre talent mérite d’éclore, quels que soient vos moyens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Juridique */}
          <div className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-8 hover:border-[#D4AF37]/40 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white">Pratique Juridique</h3>
            </div>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Rédaction de contrats</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Actes de justice</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Constitution de sociétés</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Conclusions, mémoires et plaidoyers</li>
            </ul>
            <div className="border-t border-[#1E293B] pt-4 space-y-2">
              <p className="text-gray-400 line-through text-sm">Sans bourse : 50 000 FCFA</p>
              <p className="text-[#D4AF37] font-bold text-2xl">30 000 FCFA <span className="text-sm font-normal">avec la Bourse</span></p>
              <p className="text-xs text-red-400 flex items-center gap-1"><Clock className="w-4 h-4" /> Offre valable jusqu’au 25 Juillet</p>
            </div>
          </div>

          {/* Immobilier */}
          <div className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-8 hover:border-[#D4AF37]/40 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white">Pratique Immobilière</h3>
            </div>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Agent immobilier</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Gérant immobilier</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Promoteur constructeur</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Aménageur foncier / lotissement</li>
              <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">▹</span> Syndic</li>
            </ul>
            <div className="border-t border-[#1E293B] pt-4 space-y-2">
              <p className="text-gray-400 line-through text-sm">Sans bourse : 99 000 FCFA</p>
              <p className="text-[#D4AF37] font-bold text-2xl">50 000 FCFA <span className="text-sm font-normal">avec la Bourse</span></p>
              <p className="text-xs text-red-400 flex items-center gap-1"><Clock className="w-4 h-4" /> Offre valable jusqu’au 25 Juillet</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-red-900/30 border border-red-500/30 rounded-full px-6 py-3 text-red-300 font-medium">
            <ShieldAlert className="w-5 h-5" />
            Attention : la Bourse Mamadou TOURÉ est attribuée uniquement aux 100 premiers inscrits. Ne laissez pas passer votre tour.
          </div>
        </div>
      </div>
    </section>
  );
}