"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import ProgramsSection from "@/components/ProgramsSection";
import RegistrationForm from "@/components/RegistrationForm";
import ConfirmationModal from "@/components/ConfirmationModal";
import { GraduationCap, ArrowUpRight } from "lucide-react";

export default function LandingPageClient() {
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
            Débloquer ma carrière
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <StorySection />
        <ProgramsSection />

        <section className="py-24 px-4" id="inscription">
          <RegistrationForm onSuccess={() => setModalOpen(true)} />
        </section>

        {/* Sticky Button Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/95 to-transparent">
          <a
            href="#inscription"
            className="block w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold text-center py-4 rounded-xl shadow-2xl shadow-[#D4AF37]/30 text-lg"
          >
            Je débloque ma bourse – Je m’inscris
          </a>
        </div>
      </main>

      <ConfirmationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}