"use client";

import { useState, useMemo } from "react";
import { CandidateRecord } from "@/types";

interface ChartProps {
  candidates: CandidateRecord[];
}

type Period = "7j" | "30j" | "12m";

export default function InscriptionsChart({ candidates }: ChartProps) {
  const [period, setPeriod] = useState<Period>("7j");

  const data = useMemo(() => {
    const now = new Date();
    const labels: string[] = [];
    const values: number[] = [];

    if (period === "7j") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
        labels.push(dateStr);
        const count = candidates.filter((c) => {
          const cDate = new Date(c.created_at);
          return cDate.toDateString() === d.toDateString();
        }).length;
        values.push(count);
      }
    } else if (period === "30j") {
      // Regrouper par semaine sur les 30 derniers jours
      for (let w = 3; w >= 0; w--) {
        const start = new Date(now);
        start.setDate(start.getDate() - (w + 1) * 7);
        const end = new Date(now);
        end.setDate(end.getDate() - w * 7);
        labels.push(`Sem. ${4 - w}`);
        const count = candidates.filter((c) => {
          const d = new Date(c.created_at);
          return d >= start && d < end;
        }).length;
        values.push(count);
      }
    } else {
      // 12 derniers mois
      for (let m = 11; m >= 0; m--) {
        const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const monthStr = d.toLocaleDateString("fr-FR", { month: "short" });
        labels.push(monthStr);
        const count = candidates.filter((c) => {
          const cDate = new Date(c.created_at);
          return cDate.getMonth() === d.getMonth() && cDate.getFullYear() === d.getFullYear();
        }).length;
        values.push(count);
      }
    }

    const maxVal = Math.max(...values, 1);
    return { labels, values, maxVal };
  }, [candidates, period]);

  return (
    <div className="bg-[#0f172a] border border-[#1E293B] rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">Inscriptions</h3>
        <div className="flex gap-2">
          {(["7j", "30j", "12m"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs rounded-lg ${
                period === p
                  ? "bg-[#D4AF37] text-[#0B0F19] font-bold"
                  : "bg-[#0B0F19] text-gray-400 border border-[#1E293B]"
              }`}
            >
              {p === "7j" ? "7 jours" : p === "30j" ? "30 jours" : "12 mois"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-2 h-40">
        {data.labels.map((label, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-[#1E293B] rounded-t relative" style={{ height: "120px" }}>
              <div
                className="absolute bottom-0 w-full bg-[#D4AF37] rounded-t transition-all"
                style={{ height: `${(data.values[i] / data.maxVal) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 mt-1">{label}</span>
            <span className="text-xs text-white font-bold">{data.values[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}