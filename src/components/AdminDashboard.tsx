"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CandidateRecord } from "@/types";
import {
  LayoutDashboard,
  Users,
  Settings,
  Search,
  RefreshCw,
  PhoneForwarded,
  MessageCircle,
  Mail,
  Eye,
  LogOut,
  Plus,
  TrendingUp,
  DollarSign,
  Award,
  Clock,
  Trash2,
  Save,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ---------- Statistiques ----------
function StatsCards({ candidates }: { candidates: CandidateRecord[] }) {
  const totalMontant = candidates.reduce((acc, c) => acc + (c.montant_total || 0), 0);
  const bourses = candidates.filter((c) => c.demande_bourse).length;
  const relancesTotal = candidates.reduce((acc, c) => acc + (c.nombre_relances || 0), 0);
  const juridique = candidates.filter((c) =>
    c.certifications.some((cert) => cert.includes("JURIDIQUE") || cert.includes("CONTRATS") || cert.includes("JUSTICE") || cert.includes("SOCIETE") || cert.includes("PLAIDOIRIE"))
  ).length;
  const immobilier = candidates.filter((c) =>
    c.certifications.some((cert) => cert.includes("IMMOBILIER") || cert.includes("AGENT") || cert.includes("GERANT") || cert.includes("PROMOTEUR") || cert.includes("AMENAGEUR") || cert.includes("SYNDIC"))
  ).length;

  const stats = [
    { label: "Total inscrits", value: candidates.length, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Chiffre d'affaires", value: `${totalMontant.toLocaleString()} FCFA`, icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Demandes de bourse", value: bourses, icon: Award, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Total relances", value: relancesTotal, icon: PhoneForwarded, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Tableau des inscrits ----------
function InscritsTable({
  candidates,
  onRelance,
  onDetails,
  onWhatsApp,
  onEmail,
}: {
  candidates: CandidateRecord[];
  onRelance: (id: string) => void;
  onDetails: (c: CandidateRecord) => void;
  onWhatsApp: (c: CandidateRecord) => void;
  onEmail: (c: CandidateRecord) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = candidates.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.nom.toLowerCase().includes(term) ||
      c.prenom.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.whatsapp.includes(term) ||
      c.ville.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un inscrit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#1E293B] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-[#1E293B] rounded-xl">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-[#0f172a] text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Certifications</th>
              <th className="px-4 py-3">Bourse</th>
              <th className="px-4 py-3">Montant</th>
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
                  <div className="text-xs text-gray-400">
                    {c.qualite} • {c.ville}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs">{c.email}</div>
                  <div className="text-xs text-gray-400">{c.whatsapp}</div>
                </td>
                <td className="px-4 py-3 text-xs">
                  {c.certifications?.join(", ")}
                </td>
                <td className="px-4 py-3">
                  {c.demande_bourse ? (
                    <span className="text-[#D4AF37] font-medium">Oui ({c.nombre_bourses})</span>
                  ) : (
                    "Non"
                  )}
                </td>
                <td className="px-4 py-3">{c.montant_total?.toLocaleString()} FCFA</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded-full text-xs">
                    <PhoneForwarded className="w-3 h-3" />
                    {c.nombre_relances || 0}
                  </span>
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
                    <button
                      onClick={() => onRelance(c.id)}
                      className="px-2 py-1 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold rounded text-xs"
                      title="+1 relance"
                    >
                      +1
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  Aucun inscrit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Modal Détails ----------
function DetailsModal({ candidate, onClose }: { candidate: CandidateRecord; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-[#1E293B] rounded-2xl max-w-md w-full p-6 text-left space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Détails du candidat</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="text-sm text-gray-300 space-y-1">
          <p><span className="text-gray-400">Nom :</span> {candidate.nom} {candidate.prenom}</p>
          <p><span className="text-gray-400">Email :</span> {candidate.email}</p>
          <p><span className="text-gray-400">WhatsApp :</span> {candidate.whatsapp}</p>
          <p><span className="text-gray-400">Ville :</span> {candidate.ville}</p>
          <p><span className="text-gray-400">Qualité :</span> {candidate.qualite}</p>
          <p><span className="text-gray-400">Certifications :</span> {candidate.certifications.join(", ")}</p>
          <p><span className="text-gray-400">Bourse demandée :</span> {candidate.demande_bourse ? `Oui (${candidate.nombre_bourses})` : "Non"}</p>
          {candidate.justification_bourse && (
            <p><span className="text-gray-400">Justification :</span> {candidate.justification_bourse}</p>
          )}
          <p><span className="text-gray-400">Montant total :</span> {candidate.montant_total?.toLocaleString()} FCFA</p>
          <p><span className="text-gray-400">Relances :</span> {candidate.nombre_relances}</p>
        </div>
      </div>
    </div>
  );
}

// ---------- Paramètres du compte admin ----------
function AccountSettings({ session }: { session: any }) {
  const [newEmail, setNewEmail] = useState(session.user.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setLoading(false);
    if (error) setError(error.message);
    else setMessage("Email mis à jour. Vérifiez votre boîte mail pour confirmer.");
  };

  const handleUpdatePassword = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) setError(error.message);
    else setMessage("Mot de passe modifié avec succès.");
  };

  return (
    <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 max-w-2xl">
      <h3 className="text-lg font-bold text-white mb-4">Paramètres du compte</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white"
          />
          <button
            onClick={handleUpdateEmail}
            disabled={loading}
            className="mt-2 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-4 py-2 rounded-lg text-sm"
          >
            <Save className="w-4 h-4" />
            Mettre à jour l'email
          </button>
        </div>

        <div className="border-t border-[#1E293B] pt-4">
          <label className="block text-sm text-gray-300 mb-1">Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white"
          />
          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="mt-2 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-4 py-2 rounded-lg text-sm"
          >
            <Save className="w-4 h-4" />
            Changer le mot de passe
          </button>
        </div>

        {message && <p className="text-green-400 text-sm">{message}</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}

// ---------- Gestion des admins ----------
function ManageAdmins() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    setError("");
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: newEmail, password: newPassword }),
    });
    if (res.ok) {
      setNewEmail("");
      setNewPassword("");
      fetchUsers();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la création");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet administrateur ?")) return;
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  return (
    <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 max-w-2xl">
      <h3 className="text-lg font-bold text-white mb-4">Administrateurs</h3>
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      ) : (
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between bg-[#0B0F19] p-2 rounded-lg">
              <div className="text-sm text-gray-300">{u.email}</div>
              <button
                onClick={() => handleDelete(u.id)}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-[#1E293B] pt-4">
        <h4 className="text-white font-medium mb-2">Ajouter un administrateur</h4>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}

// ---------- Composant principal ----------
export default function AdminDashboard() {
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "inscrits" | "parametres">("dashboard");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord | null>(null);
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

  const incrementRelance = async (id: string) => {
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) return;
    const newCount = (candidate.nombre_relances || 0) + 1;
    const { error } = await supabase
      .from("inscriptions")
      .update({ nombre_relances: newCount, derniere_relance: new Date().toISOString() })
      .eq("id", id);
    if (!error) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, nombre_relances: newCount, derniere_relance: new Date().toISOString() } : c))
      );
    }
  };

  const generateWhatsAppMessage = (c: CandidateRecord) => {
    const base = `Bonjour ${c.prenom} ${c.nom}, Cabinet Dr Lobé.`;
    const bourse = c.demande_bourse ? " Votre demande de bourse Mamadou TOURÉ a bien été reçue." : "";
    return `${base}${bourse} Nous sommes disponibles pour finaliser votre inscription.`;
  };

  const openWhatsApp = (c: CandidateRecord) => {
    const phone = c.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(generateWhatsAppMessage(c))}`, "_blank");
  };

  const openEmail = (c: CandidateRecord) => {
    window.open(`mailto:${c.email}?subject=Inscription Cabinet Dr Lobé&body=Bonjour ${c.prenom} ${c.nom},`);
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
          Inscrits
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

      {/* Contenu de l'onglet */}
      {activeTab === "dashboard" && <StatsCards candidates={candidates} />}
      {activeTab === "inscrits" && (
        <InscritsTable
          candidates={candidates}
          onRelance={incrementRelance}
          onDetails={setSelectedCandidate}
          onWhatsApp={openWhatsApp}
          onEmail={openEmail}
        />
      )}
      {activeTab === "parametres" && (
        <div className="space-y-8">
          <AccountSettings session={{ user: { email: "admin@cabinet-lobe.com" } }} />
          <ManageAdmins />
        </div>
      )}

      {selectedCandidate && (
        <DetailsModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  );
}