"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, X, MessageCircle } from "lucide-react";

export default function ConfirmationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#0B0F19", "#1E3A8A"],
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-[#0f172a] border border-[#D4AF37]/30 rounded-2xl max-w-md w-full p-8 text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />

        <h2 className="font-heading text-2xl font-bold text-white mb-4">
          Candidature enregistrée avec succès !
        </h2>
        <p className="text-gray-300 mb-6">
          Le Cabinet d’Affaires Juridiques va étudier votre dossier. Un conseiller vous contactera très rapidement par WhatsApp.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/2250000000000?text=${encodeURIComponent(
              "Bonjour, je viens de m’inscrire aux certifications du Cabinet d’Affaires Juridiques et je souhaite un suivi personnalisé."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition"
          >
            <MessageCircle className="w-5 h-5" />
            Échanger sur WhatsApp
          </a>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm py-2"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}