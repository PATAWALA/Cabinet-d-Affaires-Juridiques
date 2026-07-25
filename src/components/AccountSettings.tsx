"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function AccountSettings({ userEmail }: { userEmail: string }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    // Vérifier l'ancien mot de passe en se reconnectant
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

    if (signInError) {
      setError("Mot de passe actuel incorrect.");
      setLoading(false);
      return;
    }

    // Changer le mot de passe
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess("Mot de passe modifié avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 max-w-2xl">
      <h3 className="text-lg font-bold text-white mb-4">Changer le mot de passe</h3>

      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Mot de passe actuel</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Nouveau mot de passe</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            placeholder="Min. 6 caractères"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Confirmer le nouveau mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
            placeholder="Répétez le nouveau mot de passe"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-900/20 rounded-lg px-4 py-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-green-400 bg-green-900/20 rounded-lg px-4 py-2">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? "Modification..." : "Mettre à jour le mot de passe"}
        </button>
      </form>
    </div>
  );
}