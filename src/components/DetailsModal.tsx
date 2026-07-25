"use client";

import { CandidateRecord } from "@/types";
import { X } from "lucide-react";

interface DetailsModalProps {
  candidate: CandidateRecord;
  onClose: () => void;
}

export default function DetailsModal({ candidate, onClose }: DetailsModalProps) {
  const getWhatsAppMessage = (c: CandidateRecord) => {
    const nbBourses = c.demande_bourse ? c.certifications.length : 0;
    const montant = c.montant_total || 0;
    return `Bonjour Monsieur/Madame ${c.prenom} ${c.nom}. Vous avez été sélectionné(e) pour l'obtention de la Bourse Mamadou TOURÉ. Vous avez choisi d'obtenir ${nbBourses} bourse(s) sur vos certifications. Votre montant de paiement est désormais de ${montant.toLocaleString()} FCFA. Le paiement se fait au +225 07 57 27 96 76. Vous voulez payer par d'autres moyens ? Cliquez sur https://paiement.cabinet-lobe.com. Le délai de paiement est jusqu'au ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString("fr-FR")}. Nous espérons votre retour impatiemment. Pour toute question, contactez-nous sur WhatsApp.`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-[#1E293B] rounded-2xl max-w-md w-full p-6 text-left space-y-3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Détails du candidat</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-gray-300 space-y-1">
          <p><span className="text-gray-400">Nom :</span> {candidate.nom} {candidate.prenom}</p>
          <p><span className="text-gray-400">Email :</span> {candidate.email}</p>
          <p><span className="text-gray-400">WhatsApp :</span> {candidate.whatsapp}</p>
          <p><span className="text-gray-400">Ville :</span> {candidate.ville}</p>
          <p><span className="text-gray-400">Qualité :</span> {candidate.qualite}</p>
          <p><span className="text-gray-400">Certifications :</span></p>
          <ul className="list-disc pl-5">
            {candidate.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
          <p><span className="text-gray-400">Bourse demandée :</span> {candidate.demande_bourse ? "Oui" : "Non"}</p>
          <p><span className="text-gray-400">Montant total :</span> {candidate.montant_total?.toLocaleString()} FCFA</p>
          <p><span className="text-gray-400">Date inscription :</span> {new Date(candidate.created_at).toLocaleString("fr-FR")}</p>
        </div>
        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-1">Aperçu message WhatsApp :</p>
          <p className="text-xs text-gray-400 bg-[#0B0F19] p-2 rounded-lg whitespace-pre-wrap">
            {getWhatsAppMessage(candidate)}
          </p>
        </div>
      </div>
    </div>
  );
}