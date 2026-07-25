"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { RegistrationFormData } from "@/types";
import { Send, Loader2, AlertCircle, Clock } from "lucide-react";

const certificationsJuridiques = [
  "CERTIFICATION EN REDACTION DES CONTRATS",
  "CERTIFICATION EN REDACTION DES ACTES DE JUSTICE",
  "CERTIFICATION EN CONSTITUTION DE SOCIETES",
  "CERTIFICATION EN REDACTION DES CONCLUSIONS, MEMOIRES ET ACTES DE PLAIDOIRIE",
];

const certificationsImmobilieres = [
  "PRATIQUE DU METIER D'AGENT IMMOBILIER",
  "PRATIQUE DU METIER DE GERANT IMMOBILIER",
  "PRATIQUE DU METIER DE PROMOTEUR CONSTRUCTEUR",
  "PRATIQUE DU METIER D'AMENAGEUR FONCIER ET DE LOTISSEMENT",
  "PRATIQUE DU METIER DE SYNDIC",
];

const allCertifications = [...certificationsJuridiques, ...certificationsImmobilieres];

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
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setForm((prev) => {
      if (type === "checkbox") {
        if (name === "demande_bourse") {
          return { ...prev, demande_bourse: checked, nombre_bourses: checked ? 1 : 0 };
        }
        if (name === "certifications") {
          const updated = checked
            ? [...prev.certifications, value]
            : prev.certifications.filter((c) => c !== value);
          return { ...prev, certifications: updated };
        }
      }
      if (name === "nombre_bourses") {
        return { ...prev, nombre_bourses: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.certifications.length === 0) {
      setError("Veuillez sélectionner au moins une certification.");
      return;
    }

    let total = 0;
    form.certifications.forEach((cert) => {
      if (certificationsJuridiques.includes(cert)) {
        total += form.demande_bourse ? 30000 : 50000;
      } else {
        total += form.demande_bourse ? 50000 : 99000;
      }
    });

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
        montant_total: total,
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
      className="max-w-3xl mx-auto bg-[#0f172a] border border-[#1E293B] rounded-2xl p-8 space-y-6"
    >
      <div className="text-center">
        <h3 className="font-heading text-2xl font-bold text-white">
          Votre avenir commence ici – Demandez votre bourse
        </h3>
        <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-red-400" />
          Date limite : 25 Juillet 2026 à minuit
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Nom et Prénoms *</label>
          <input
            name="nom"
            required
            value={form.nom}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Prénom usuel</label>
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
          <label className="block text-sm text-gray-300 mb-1">Ville et Pays de Résidence *</label>
          <input
            name="ville"
            required
            value={form.ville}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Numéro WhatsApp *</label>
          <input
            name="whatsapp"
            required
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="+225 07 57 27 96 76"
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Adresse e-mail *</label>
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
          <label className="block text-sm text-gray-300 mb-1">Qualité *</label>
          <select
            name="qualite"
            required
            value={form.qualite}
            onChange={handleChange}
            className="w-full bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">Sélectionnez...</option>
            <option value="Etudiant">Étudiant</option>
            <option value="Stagiaire">Stagiaire</option>
            <option value="En activité dans le secteur juridique">En activité – secteur juridique</option>
            <option value="En activité dans le secteur immobilier">En activité – secteur immobilier</option>
            <option value="En quête d'emploi">En quête d’emploi</option>
            <option value="Autres">Autres</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm text-gray-300 mb-2 font-medium">
          Quelles certifications souhaitez-vous effectuer ? *
        </legend>
        <div className="grid md:grid-cols-2 gap-3">
          {allCertifications.map((cert) => (
            <label key={cert} className="flex items-start gap-2 text-gray-200 cursor-pointer text-sm">
              <input
                type="checkbox"
                name="certifications"
                value={cert}
                checked={form.certifications.includes(cert)}
                onChange={handleChange}
                className="accent-[#D4AF37] mt-1 w-4 h-4"
              />
              <span>{cert}</span>
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
        <label className="text-gray-200 text-sm font-medium">
          Je souhaite bénéficier de la Bourse <strong className="text-[#D4AF37]">Mamadou TOURÉ</strong> *
        </label>
      </div>

      {form.demande_bourse && (
        <div className="space-y-4 pl-4 border-l-2 border-[#D4AF37]/30">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Pour combien de certifications sollicitez-vous la bourse ? *
            </label>
            <input
              type="number"
              name="nombre_bourses"
              min={1}
              max={form.certifications.length || 1}
              value={form.nombre_bourses}
              onChange={handleChange}
              className="w-24 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Pourquoi sollicitez-vous la bourse ? (quelques mots)
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
        className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B0F19] font-bold px-6 py-4 rounded-xl text-lg transition"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
        {loading ? "Envoi en cours..." : "Je débloque ma bourse – Je m’inscris"}
      </button>

      <p className="text-center text-xs text-gray-500 mt-2">
        Début des certifications : 08 Août 2026. En ligne.
      </p>
    </form>
  );
}