import Image from "next/image";
import { GraduationCap } from "lucide-react";

const alumni = [
  "Magnigui Patrice Diabate",
  "Kadjocyrille Ane",
  "Assande Francis Osée Assande",
  "Michelle Moussé Séry",
  "Juriste Blessing",
];

export default function StorySection() {
  return (
    <section className="py-24 lg:py-32 px-4 bg-[#0B0F19]">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Portrait + citation */}
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <div className="rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] w-64 sm:w-80">
              <Image
                src="/images/portrait.jpg"
                alt="Dr Jean-Louis Lobé"
                width={320}
                height={400}
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 256px, 320px"
                priority
              />
            </div>
            <p className="text-[#D4AF37] font-semibold mt-5 text-base">Dr Jean-Louis Lobé</p>
          </div>

          <GraduationCap className="w-12 h-12 text-[#D4AF37]" />

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white max-w-3xl leading-snug">
            “Quand j’ai vu ces diplômés en Droit gâcher leur talent derrière un téléphone, j’ai décidé de créer une nouvelle voie.”
          </h2>
        </div>

        {/* Texte narratif */}
        <div className="text-gray-300 text-lg leading-loose space-y-6 max-w-3xl mx-auto text-left">
          <p>
            <span className="text-[#D4AF37] font-semibold">Dr Lobé</span> a bâti{" "}
            <strong>LA PRATIQUE DU DROIT</strong> pour combler le vide entre l’université et le monde professionnel.
          </p>
          <p>
            Une méthode unique qui inculque{" "}
            <strong className="text-white">
              les techniques de rédaction des actes, contrats, conclusions et plaidoyers
            </strong>{" "}
            attendus par les cabinets, les tribunaux, les entreprises.
          </p>

          <p className="text-white font-medium">
            Résultat immédiat : des centaines d’auditeurs ont décroché leur rêve.
          </p>

          <p>
            Parmi eux, <strong className="text-[#D4AF37]">{alumni.slice(0, 3).join(", ")}</strong>… aujourd’hui Magistrats,
            Avocats, Commissaires de justice.
          </p>
          <p className="text-white font-semibold italic">
            Et vous, où serez-vous dans 3 mois ?
          </p>
        </div>

        {/* Chiffres marquants */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#D4AF37]">+500</div>
            <div className="text-gray-300 mt-2">Professionnels placés avec succès</div>
          </div>
          <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#D4AF37]">15 ans</div>
            <div className="text-gray-300 mt-2">D’innovation pédagogique</div>
          </div>
          <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#D4AF37]">100%</div>
            <div className="text-gray-300 mt-2">De satisfaction et de transformation</div>
          </div>
        </div>
      </div>
    </section>
  );
}