"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { CandidateRecord } from "@/types";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AdminStatsCards from "@/components/AdminStatsCards";
import InscriptionsChart from "@/components/InscriptionsChart";
import FiltersBar from "@/components/FiltersBar";
import InscritsTable from "@/components/InscritsTable";
import DetailsModal from "@/components/DetailsModal";
import AccountSettings from "@/components/AccountSettings";
import ManageAdmins from "@/components/ManageAdmins";

type Period = "today" | "week" | "month" | "all";

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "inscrits" | "parametres">("dashboard");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord | null>(null);

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState<Period>("all");
  const [bourseFilter, setBourseFilter] = useState<boolean | null>(null);

  const router = useRouter();

  const fetchCandidates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setCandidates(data as CandidateRecord[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Filtrage des candidats selon les critères
  const filteredCandidates = useMemo(() => {
    let result = [...candidates];

    // Période
    const now = new Date();
    if (period === "today") {
      result = result.filter((c) => {
        const d = new Date(c.created_at);
        return d.toDateString() === now.toDateString();
      });
    } else if (period === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      result = result.filter((c) => new Date(c.created_at) >= startOfWeek);
    } else if (period === "month") {
      result = result.filter((c) => {
        const d = new Date(c.created_at);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
    }

    // Bourse
    if (bourseFilter !== null) {
      result = result.filter((c) => c.demande_bourse === bourseFilter);
    }

    // Recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.nom.toLowerCase().includes(term) ||
          c.prenom.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.whatsapp.includes(term) ||
          c.ville.toLowerCase().includes(term)
      );
    }

    return result;
  }, [candidates, period, bourseFilter, searchTerm]);

  // Fonctions de contact
  const generateWhatsAppMessage = (c: CandidateRecord) => {
    const nbBourses = c.demande_bourse ? c.certifications.length : 0;
    const montant = c.montant_total || 0;
    return `Bonjour Monsieur/Madame ${c.prenom} ${c.nom}. Vous avez été sélectionné(e) pour l'obtention de la Bourse Mamadou TOURÉ. Vous avez choisi d'obtenir ${nbBourses} bourse(s) sur vos certifications. Votre montant de paiement est désormais de ${montant.toLocaleString()} FCFA. Le paiement se fait au +225 07 57 27 96 76. Vous voulez payer par d'autres moyens ? Cliquez sur https://paiement.cabinet-lobe.com. Le délai de paiement est jusqu'au ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString("fr-FR")}. Nous espérons votre retour impatiemment. Pour toute question, contactez-nous sur WhatsApp.`;
  };

  const openWhatsApp = (c: CandidateRecord) => {
    const phone = c.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(generateWhatsAppMessage(c))}`, "_blank");
  };

  const generateEmailBody = (c: CandidateRecord) => {
    const nbBourses = c.demande_bourse ? c.certifications.length : 0;
    const montant = c.montant_total || 0;
    return `Bonjour Monsieur/Madame ${c.prenom} ${c.nom},\n\nVous avez été sélectionné(e) pour l'obtention de la Bourse Mamadou TOURÉ. Vous avez choisi d'obtenir ${nbBourses} bourse(s) sur vos certifications.\n\nVotre montant de paiement est désormais de ${montant.toLocaleString()} FCFA.\n\nLe paiement se fait au +225 07 57 27 96 76.\n\nVous voulez payer par d'autres moyens ? Cliquez sur https://paiement.cabinet-lobe.com.\n\nLe délai de paiement est jusqu'au ${new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString("fr-FR")}.\n\nNous espérons votre retour impatiemment. Pour toute question, contactez-nous sur WhatsApp.\n\nCordialement,\nCabinet Dr Lobé`;
  };

  const openEmail = (c: CandidateRecord) => {
    window.open(`mailto:${c.email}?subject=Inscription Cabinet Dr Lobé - Bourse&body=${encodeURIComponent(generateEmailBody(c))}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-8">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Administration</h1>
          <p className="text-gray-400 text-sm">Cabinet d'Affaires Juridiques – Dr Lobé</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-900/30 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg hover:bg-red-900/50 transition self-end md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>

      {/* Navigation par onglets */}
      <div className="flex border-b border-[#1E293B] mb-8">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === "dashboard" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Tableau de bord
        </button>
        <button
          onClick={() => setActiveTab("inscrits")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === "inscrits" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          Inscrits ({candidates.length})
        </button>
        <button
          onClick={() => setActiveTab("parametres")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === "parametres" ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          Paramètres
        </button>
      </div>

      {/* Contenu */}
      {activeTab === "dashboard" && (
        <>
          <AdminStatsCards candidates={candidates} onFilterBourse={setBourseFilter} />
          <InscriptionsChart candidates={candidates} />
        </>
      )}

      {activeTab === "inscrits" && (
        <>
          <FiltersBar
            onSearch={setSearchTerm}
            onPeriodChange={setPeriod}
            onBourseFilter={setBourseFilter}
            activeBourse={bourseFilter}
            activePeriod={period}
          />
          <InscritsTable
            candidates={filteredCandidates}
            onDetails={setSelectedCandidate}
            onWhatsApp={openWhatsApp}
            onEmail={openEmail}
          />
        </>
      )}

      {activeTab === "parametres" && (
        <div className="space-y-8">
          <AccountSettings />
          <ManageAdmins />
        </div>
      )}

      {selectedCandidate && (
        <DetailsModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  );
}