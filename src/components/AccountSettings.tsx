"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2 } from "lucide-react";

export default function AccountSettings() {
  const [newEmail, setNewEmail] = useState("");
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
    else setMessage("Email mis à jour. Vérifiez votre boîte mail.");
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
          <label className="block text-sm text-gray-300 mb-1">Nouvel email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white"
          />
          <button onClick={handleUpdateEmail} disabled={loading} className="mt-2 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-4 py-2 rounded-lg text-sm">
            <Save className="w-4 h-4" /> Mettre à jour l'email
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
          <button onClick={handleUpdatePassword} disabled={loading} className="mt-2 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-4 py-2 rounded-lg text-sm">
            <Save className="w-4 h-4" /> Changer le mot de passe
          </button>
        </div>
        {message && <p className="text-green-400 text-sm">{message}</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}