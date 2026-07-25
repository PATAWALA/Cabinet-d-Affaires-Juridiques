"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Certifications from "@/components/Certifications";
import RegistrationForm from "@/components/RegistrationForm";
import ConfirmationModal from "@/components/ConfirmationModal";
import { ArrowUpRight, GraduationCap } from "lucide-react";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Header desktop */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1E293B] px-8 py-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-[#D4AF37]" />
          <span className="font-heading text-xl text-white font-bold tracking-wide">
            Cabinet Dr Lobé
          </span>
        </div>
        <nav className="flex items-center gap-8 text-sm text-gray-300">
          <a href="#programmes" className="hover:text-[#D4AF37] transition">
            Programmes
          </a>
          <a href="#inscription" className="hover:text-[#D4AF37] transition">
            Inscription
          </a>
          <a
            href="#inscription"
            className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-6 py-2 rounded-full flex items-center gap-2"
          >
            Postuler à la Bourse
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <Certifications />

        {/* Preuve sociale rapide */}
        <section className="py-16 px-4 bg-[#0B0F19]">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#D4AF37]">15+</div>
              <div className="text-gray-400 text-sm">années d’expertise</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#D4AF37]">+5000</div>
              <div className="text-gray-400 text-sm">professionnels certifiés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#D4AF37]">100%</div>
              <div className="text-gray-400 text-sm">reconnaissance internationale</div>
            </div>
          </div>
        </section>

        <section className="py-24 px-4" id="inscription">
          <div className="max-w-6xl mx-auto">
            <RegistrationForm onSuccess={() => setModalOpen(true)} />
          </div>
        </section>

        {/* Sticky Button Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/95 to-transparent">
          <a
            href="#inscription"
            className="block w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-center py-4 rounded-xl shadow-2xl shadow-[#D4AF37]/30 text-lg"
          >
            Postuler à la Bourse – Places limitées
          </a>
        </div>
      </main>

      <ConfirmationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}