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

export type CertificationOption = "Pratique Juridique" | "Pratique Immobilière";