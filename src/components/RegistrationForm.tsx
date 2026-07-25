"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { RegistrationFormData } from "@/types";
import { Send, Loader2, AlertCircle } from "lucide-react";

const certificationsOptions = [
  "Pratique Juridique",
  "Pratique Immobilière",
];

export default function RegistrationForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<RegistrationFormData>({
    nom: "",
    prenom: "",
    email: "",
    whatsapp: "",
    ville: "",
    qualite: "",
    certifications: [],
    demande_bourse: false,
    nombre_bourses: 0,
    justification_bourse: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "demande_bourse") {
        setForm((prev) => ({
          ...prev,
          demande_bourse: checked,
          nombre_bourses: checked ? 1 : 0,
        }));
        return;
      }
      if (name === "certifications") {
        const val = value;
        setForm((prev) => {
          const updated = checked
            ? [...prev.certifications, val]
            : prev.certifications.filter((c) => c !== val);
          return { ...prev, certifications: updated };
        });
        return;
      }
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.certifications.length === 0) {
      setError("Veuillez choisir au moins une certification.");
      return;
    }

    const prixUnitaire = 450000;
    const totalStandard = form.certifications.length * prixUnitaire;

    setLoading(true);
    const { error: insertError } = await supabase.from("inscriptions").insert([
      {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        whatsapp: form.whatsapp,
        ville: form.ville,
        qualite: form.qualite,
        certifications: form.certifications,
        demande_bourse: form.demande_bourse,
        nombre_bourses: form.demande_bourse ? form.nombre_bourses : 0,
        justification_bourse: form.justification_bourse,
        montant_total: totalStandard,
      },
    ]);

    setLoading(false);

    if (insertError) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error(insertError);
    } else {
      onSuccess();
    }
  };

  return (
    <form
      id="inscription"
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-[#0f172a] border border-[#1E293B] rounded-2xl p-8 space-y-6"
    >
      <h3 className="font-heading text-2xl font-bold text-white text-center">
        Formulaire d’inscription
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Nom</label>
          <input
            name="nom"
            required
            value={form.nom}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Prénom</label>
          <input
            name="prenom"
            required
            value={form.prenom}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">WhatsApp</label>
          <input
            name="whatsapp"
            required
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="+225 01 02 03 04"
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ville</label>
          <input
            name="ville"
            required
            value={form.ville}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Qualité</label>
          <select
            name="qualite"
            required
            value={form.qualite}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">Sélectionnez...</option>
            <option value="Étudiant">Étudiant</option>
            <option value="Professionnel">Professionnel</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm text-gray-300 mb-2">Certifications souhaitées</legend>
        <div className="space-y-2">
          {certificationsOptions.map((cert) => (
            <label key={cert} className="flex items-center gap-3 text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                name="certifications"
                value={cert}
                checked={form.certifications.includes(cert)}
                onChange={handleChange}
                className="accent-[#D4AF37] w-4 h-4"
              />
              {cert}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="demande_bourse"
          checked={form.demande_bourse}
          onChange={handleChange}
          className="accent-[#D4AF37] w-4 h-4"
        />
        <label className="text-gray-200 text-sm">
          Je souhaite bénéficier de la <strong>Bourse Mamadou TOURÉ</strong>
        </label>
      </div>

      {form.demande_bourse && (
        <div className="space-y-4 pl-4 border-l-2 border-[#D4AF37]/30">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Nombre de bourses sollicitées
            </label>
            <input
              type="number"
              name="nombre_bourses"
              min={1}
              max={form.certifications.length}
              value={form.nombre_bourses}
              onChange={handleChange}
              className="w-24 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Justification (quelques mots)
            </label>
            <textarea
              name="justification_bourse"
              rows={2}
              value={form.justification_bourse}
              onChange={handleChange}
              className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>
      )}

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
          <Send className="w-5 h-5" />
        )}
        {loading ? "Envoi en cours..." : "Soumettre ma candidature"}
      </button>
    </form>
  );
}