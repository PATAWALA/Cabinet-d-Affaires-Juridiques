"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LogIn, Loader2, AlertCircle, Shield } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
    // Si succès, la session est mise à jour automatiquement, le composant parent réagira.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
      <div className="max-w-md w-full bg-[#0f172a] border border-[#1E293B] rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Accès Administrateur
          </h2>
          <p className="text-gray-400 mt-2">
            Cabinet d’Affaires Juridiques – Dr Lobé
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              placeholder="admin@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 rounded-lg px-4 py-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-6 py-3 rounded-xl transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}