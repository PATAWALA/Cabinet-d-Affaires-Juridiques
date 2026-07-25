"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Loader2 } from "lucide-react";

export default function ManageAdmins() {
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
              <button onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-red-300 p-1">
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
          <button onClick={handleAdd} className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-1">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}