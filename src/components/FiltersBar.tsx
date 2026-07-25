"use client";

import { useState } from "react";
import { Search, Calendar, Filter } from "lucide-react";

type Period = "today" | "week" | "month" | "all";

interface FiltersBarProps {
  onSearch: (term: string) => void;
  onPeriodChange: (period: Period) => void;
  onBourseFilter: (boursier: boolean | null) => void;
  activeBourse: boolean | null;
  activePeriod: Period;
}

export default function FiltersBar({
  onSearch,
  onPeriodChange,
  onBourseFilter,
  activeBourse,
  activePeriod,
}: FiltersBarProps) {
  const periods: { value: Period; label: string }[] = [
    { value: "today", label: "Aujourd'hui" },
    { value: "week", label: "Cette semaine" },
    { value: "month", label: "Ce mois" },
    { value: "all", label: "Tout" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un inscrit..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[#0f172a] border border-[#1E293B] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      <div className="flex items-center gap-2 bg-[#0f172a] border border-[#1E293B] rounded-lg p-1">
        <Calendar className="w-4 h-4 text-gray-400 ml-2" />
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => onPeriodChange(p.value)}
            className={`px-3 py-1 text-xs rounded-md transition ${
              activePeriod === p.value
                ? "bg-[#D4AF37] text-[#0B0F19] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-[#0f172a] border border-[#1E293B] rounded-lg p-1">
        <Filter className="w-4 h-4 text-gray-400 ml-2" />
        <button
          onClick={() => onBourseFilter(null)}
          className={`px-3 py-1 text-xs rounded-md transition ${
            activeBourse === null ? "bg-[#D4AF37] text-[#0B0F19] font-bold" : "text-gray-400 hover:text-white"
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => onBourseFilter(true)}
          className={`px-3 py-1 text-xs rounded-md transition ${
            activeBourse === true ? "bg-[#D4AF37] text-[#0B0F19] font-bold" : "text-gray-400 hover:text-white"
          }`}
        >
          Boursiers
        </button>
        <button
          onClick={() => onBourseFilter(false)}
          className={`px-3 py-1 text-xs rounded-md transition ${
            activeBourse === false ? "bg-[#D4AF37] text-[#0B0F19] font-bold" : "text-gray-400 hover:text-white"
          }`}
        >
          Non boursiers
        </button>
      </div>
    </div>
  );
}