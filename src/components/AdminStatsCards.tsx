"use client";

import { Users, DollarSign, Award, TrendingDown } from "lucide-react";
import { CandidateRecord } from "@/types";

interface StatsCardsProps {
  candidates: CandidateRecord[];
  onFilterBourse: (boursier: boolean | null) => void; // null = tous
}

export default function AdminStatsCards({ candidates, onFilterBourse }: StatsCardsProps) {
  const total = candidates.length;
  const boursiers = candidates.filter((c) => c.demande_bourse);
  const nonBoursiers = candidates.filter((c) => !c.demande_bourse);
  const caBoursiers = boursiers.reduce((acc, c) => acc + (c.montant_total || 0), 0);
  const caNonBoursiers = nonBoursiers.reduce((acc, c) => acc + (c.montant_total || 0), 0);
  const caTotal = caBoursiers + caNonBoursiers;

  const stats = [
    {
      label: "Total Inscrits",
      value: total,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      click: () => onFilterBourse(null),
    },
    {
      label: "Chiffre d'affaires",
      value: `${caTotal.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-400/10",
      sub: `Boursiers: ${caBoursiers.toLocaleString()} FCFA | Non boursiers: ${caNonBoursiers.toLocaleString()} FCFA`,
      click: () => {}, // on peut ouvrir un détail
    },
    {
      label: "Boursiers",
      value: boursiers.length,
      icon: Award,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      click: () => onFilterBourse(true),
    },
    {
      label: "Non Boursiers",
      value: nonBoursiers.length,
      icon: TrendingDown,
      color: "text-red-400",
      bg: "bg-red-400/10",
      click: () => onFilterBourse(false),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          onClick={stat.click}
          className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-5 cursor-pointer hover:border-[#D4AF37]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
              {stat.sub && <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>}
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