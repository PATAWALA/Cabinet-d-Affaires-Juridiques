import { BookOpen, Building2, CheckCircle, Clock, GraduationCap } from "lucide-react";

const programs = [
  {
    title: "Certification en Pratique Juridique",
    icon: <BookOpen className="w-8 h-8 text-[#D4AF37]" />,
    points: [
      "Maîtrise des fondamentaux du droit civil et pénal",
      "Rédaction d’actes et consultation juridique",
      "Déontologie et responsabilité professionnelle",
    ],
    price: "450 000 FCFA",
    bourse: "50 000 FCFA avec la Bourse Mamadou TOURÉ",
  },
  {
    title: "Certification en Pratique Immobilière",
    icon: <Building2 className="w-8 h-8 text-[#D4AF37]" />,
    points: [
      "Transactions immobilières et fiscalité",
      "Gestion locative et syndic",
      "Expertise en évaluation de biens",
    ],
    price: "450 000 FCFA",
    bourse: "50 000 FCFA avec la Bourse Mamadou TOURÉ",
  },
];

export default function Certifications() {
  return (
    <section id="programmes" className="py-24 px-4 bg-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Des programmes d’<span className="text-[#D4AF37]">élite</span> pour votre avenir
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Deux certifications conçues par le Dr Lobé pour allier théorie, pratique et reconnaissance internationale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-8 hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="mb-6">{prog.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{prog.title}</h3>
              <ul className="space-y-3 text-gray-300 mb-8">
                {prog.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#1E293B] pt-4 space-y-2">
                <p className="text-gray-400 line-through text-sm">{prog.price}</p>
                <p className="text-[#D4AF37] font-bold text-lg">{prog.bourse}</p>
                <div className="flex items-center gap-2 text-xs text-red-400 font-medium mt-2">
                  <Clock className="w-4 h-4" /> Offre limitée – Bourse Mamadou TOURÉ
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}