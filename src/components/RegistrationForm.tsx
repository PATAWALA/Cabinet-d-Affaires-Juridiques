"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { RegistrationFormData } from "@/types";
import { Send, Loader2, AlertCircle, Clock, Award, ChevronDown } from "lucide-react";

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

const countries = [
  { code: "+225", name: "Côte d'Ivoire" },
  { code: "+33", name: "France" },
  { code: "+221", name: "Sénégal" },
  { code: "+237", name: "Cameroun" },
  { code: "+223", name: "Mali" },
  { code: "+226", name: "Burkina Faso" },
  { code: "+227", name: "Niger" },
  { code: "+228", name: "Togo" },
  { code: "+229", name: "Bénin" },
  { code: "+241", name: "Gabon" },
  { code: "+242", name: "Congo" },
  { code: "+243", name: "RDC" },
  { code: "+261", name: "Madagascar" },
  { code: "+212", name: "Maroc" },
  { code: "+213", name: "Algérie" },
  { code: "+216", name: "Tunisie" },
  { code: "+222", name: "Mauritanie" },
  { code: "+224", name: "Guinée" },
  { code: "+235", name: "Tchad" },
  { code: "+236", name: "Centrafrique" },
  { code: "+253", name: "Djibouti" },
  { code: "+269", name: "Comores" },
  { code: "+1", name: "Canada (Québec)" },
  { code: "+32", name: "Belgique" },
  { code: "+41", name: "Suisse" },
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
  const [countryCode, setCountryCode] = useState("+225");
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
      if (name === "whatsapp") {
        const cleaned = value.replace(/\D/g, "");
        return { ...prev, whatsapp: cleaned };
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

    const fullWhatsapp = countryCode + form.whatsapp;

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
        whatsapp: fullWhatsapp,
        ville: form.ville,
        qualite: form.qualite,
        certifications: form.certifications,
        demande_bourse: form.demande_bourse,
        nombre_bourses: form.demande_bourse ? form.nombre_bourses : 0,
        justification_bourse: "",
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
          <div className="flex items-stretch bg-[#0B0F19] border border-[#1E293B] rounded-lg overflow-hidden focus-within:border-[#D4AF37]">
            <div className="relative flex items-center border-r border-[#1E293B]">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-transparent text-white pl-3 pr-7 py-2 text-sm focus:outline-none cursor-pointer w-16 md:w-20"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code} className="text-gray-900">
                    {country.code}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
            <input
              name="whatsapp"
              required
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="07 57 27 96 76"
              className="flex-1 min-w-0 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Sélectionnez votre pays et saisissez votre numéro local.
          </p>
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

      {/* BLOC BOURSE MIS EN AVANT */}
      <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <span className="text-white font-bold text-lg">
              Bourse Mamadou TOURÉ
            </span>
            <p className="text-gray-300 text-sm">
              Réduction exceptionnelle pour les plus motivés. Places limitées.
            </p>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="demande_bourse"
            checked={form.demande_bourse}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
              form.demande_bourse
                ? "bg-[#D4AF37] border-[#D4AF37] scale-105"
                : "border-gray-500 hover:border-gray-400"
            }`}
          >
            {form.demande_bourse && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-[#0B0F19]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="text-white text-lg font-semibold">
            Oui, je veux bénéficier de la Bourse *
          </span>
        </label>

        {form.demande_bourse && (
          <div className="pl-4 border-l-2 border-[#D4AF37]/30">
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
        )}
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