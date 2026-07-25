"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CandidateRecord } from "@/types";
import { MessageCircle, PhoneForwarded, RefreshCw, Search } from "lucide-react";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCandidates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCandidates(data as CandidateRecord[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const incrementRelance = async (id: string) => {
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) return;

    const newCount = (candidate.nombre_relances || 0) + 1;
    const { error } = await supabase
      .from("inscriptions")
      .update({
        nombre_relances: newCount,
        derniere_relance: new Date().toISOString(),
      })
      .eq("id", id);

    if (!error) {
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, nombre_relances: newCount, derniere_relance: new Date().toISOString() }
            : c
        )
      );
    }
  };

  const generateWhatsAppMessage = (c: CandidateRecord) => {
    const base = `Bonjour ${c.prenom} ${c.nom}, ici le Cabinet d’Affaires Juridiques du Dr Lobé.`;
    const bourse = c.demande_bourse
      ? ` Nous avons bien reçu votre demande de Bourse Mamadou TOURÉ.`
      : "";
    const relance = c.nombre_relances > 0 ? ` (Relance n°${c.nombre_relances + 1})` : "";
    const message = `${base}${bourse} Votre inscription aux certifications [${c.certifications.join(", ")}] a été enregistrée. Nous sommes à votre disposition pour finaliser votre dossier.${relance}`;
    return message;
  };

  const openWhatsApp = (c: CandidateRecord) => {
    const phone = c.whatsapp.replace(/\D/g, "");
    const message = generateWhatsAppMessage(c);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const filtered = candidates.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.nom.toLowerCase().includes(term) ||
      c.prenom.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.whatsapp.includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="font-heading text-2xl font-bold text-white">
          Tableau de bord – Candidats ({candidates.length})
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0f172a] border border-[#1E293B] rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D4AF37] w-64"
            />
          </div>
          <button
            onClick={fetchCandidates}
            className="p-2 bg-[#0f172a] border border-[#1E293B] rounded-lg text-gray-300 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="overflow-x-auto border border-[#1E293B] rounded-xl">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#0f172a] text-gray-200 uppercase">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Certifications</th>
                <th className="px-4 py-3">Bourse</th>
                <th className="px-4 py-3">Relances</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-[#1E293B] hover:bg-[#0f172a]/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">
                      {c.prenom} {c.nom}
                    </div>
                    <div className="text-xs text-gray-400">{c.qualite} • {c.ville}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{c.email}</div>
                    <div className="text-xs text-gray-400">{c.whatsapp}</div>
                  </td>
                  <td className="px-4 py-3">
                    {c.certifications?.join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    {c.demande_bourse ? (
                      <span className="text-[#D4AF37] font-medium">
                        Oui ({c.nombre_bourses})
                      </span>
                    ) : (
                      "Non"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded-full text-xs">
                      <PhoneForwarded className="w-3 h-3" />
                      {c.nombre_relances || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openWhatsApp(c)}
                        className="flex items-center gap-1 bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => incrementRelance(c.id)}
                        className="text-gray-400 hover:text-white text-xs border border-[#1E293B] rounded-lg px-2 py-1.5"
                      >
                        +1 relance
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Aucun candidat trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}