export interface RegistrationFormData {
  nom: string;
  prenom: string;
  email: string;
  whatsapp: string;
  ville: string;
  qualite: string;
  certifications: string[];
  demande_bourse: boolean;
  nombre_bourses: number;
  justification_bourse: string;
}

export interface CandidateRecord extends RegistrationFormData {
  id: string;
  created_at: string;
  montant_total: number;
  statut_paiement: string;
  nombre_relances: number;
  derniere_relance: string | null;
}

export type CertificationOption =
  | "CERTIFICATION EN REDACTION DES CONTRATS"
  | "CERTIFICATION EN REDACTION DES ACTES DE JUSTICE"
  | "CERTIFICATION EN CONSTITUTION DE SOCIETES"
  | "CERTIFICATION EN REDACTION DES CONCLUSIONS, MEMOIRES ET ACTES DE PLAIDOIRIE"
  | "PRATIQUE DU METIER D'AGENT IMMOBILIER"
  | "PRATIQUE DU METIER DE GERANT IMMOBILIER"
  | "PRATIQUE DU METIER DE PROMOTEUR CONSTRUCTEUR"
  | "PRATIQUE DU METIER D'AMENAGEUR FONCIER ET DE LOTISSEMENT"
  | "PRATIQUE DU METIER DE SYNDIC";