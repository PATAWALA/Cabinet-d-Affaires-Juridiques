"use client";

import { CandidateRecord } from "@/types";
import { Eye, MessageCircle, Mail } from "lucide-react";

interface InscritsTableProps {
  candidates: CandidateRecord[];
  onDetails: (c: CandidateRecord) => void;
  onWhatsApp: (c: CandidateRecord) => void;
  onEmail: (c: CandidateRecord) => void;
}

export default function InscritsTable({ candidates, onDetails, onWhatsApp, onEmail }: InscritsTableProps) {
  return (
    <div className="overflow-x-auto border border-[#1E293B] rounded-xl">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="bg-[#0f172a] text-gray-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Certifications</th>
            <th className="px-4 py-3">Bourse</th>
            <th className="px-4 py-3">Montant</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id} className="border-t border-[#1E293B] hover:bg-[#0f172a]/50">
              <td className="px-4 py-3">
                <div className="font-medium text-white">
                  {c.prenom} {c.nom}
                </div>
                <div className="text-xs text-gray-400">
                  {c.qualite} • {c.ville}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-xs">{c.email}</div>
                <div className="text-xs text-gray-400">{c.whatsapp}</div>
              </td>
              <td className="px-4 py-3 text-xs max-w-[200px] truncate">
                {c.certifications?.join(", ")}
              </td>
              <td className="px-4 py-3">
                {c.demande_bourse ? (
                  <span className="text-[#D4AF37] font-medium">Oui</span>
                ) : (
                  "Non"
                )}
              </td>
              <td className="px-4 py-3">{c.montant_total?.toLocaleString()} FCFA</td>
              <td className="px-4 py-3 text-xs">
                {new Date(c.created_at).toLocaleDateString("fr-FR")}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDetails(c)}
                    className="p-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                    title="Détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onWhatsApp(c)}
                    className="p-1.5 bg-green-700 hover:bg-green-600 text-white rounded-lg"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEmail(c)}
                    className="p-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                Aucun inscrit trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}