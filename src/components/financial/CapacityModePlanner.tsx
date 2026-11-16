import React from 'react';
import { CapacityPlanningState, CapacityCalculationResult } from '../../types/financial';
import { formatRupiah, formatPercent } from '../../utils/currencyFormatter';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface CapacityModePlannerProps {
  state: CapacityPlanningState;
  onChange: (newState: CapacityPlanningState) => void;
  result: CapacityCalculationResult;
}

export const CapacityModePlanner: React.FC<CapacityModePlannerProps> = ({
  state,
  onChange,
  result,
}) => {
  return (
    <div className="space-y-6">
      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kemampuan Raihan */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Kemampuan Nabung Raihan / Bulan
          </label>
          <input
            type="number"
            min={0}
            step={250000}
            value={state.raihanMonthly}
            onChange={(e) =>
              onChange({ ...state, raihanMonthly: Math.max(0, Number(e.target.value)) })
            }
            className="w-full text-base font-bold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-blush-600 font-medium mt-1">
            {formatRupiah(state.raihanMonthly)} / bulan
          </p>
        </div>

        {/* Kemampuan Arum */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Kemampuan Nabung Arum / Bulan
          </label>
          <input
            type="number"
            min={0}
            step={250000}
            value={state.arumMonthly}
            onChange={(e) =>
              onChange({ ...state, arumMonthly: Math.max(0, Number(e.target.value)) })
            }
            className="w-full text-base font-bold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-champagne-700 font-medium mt-1">
            {formatRupiah(state.arumMonthly)} / bulan
          </p>
        </div>

        {/* Durasi Bulan */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Durasi Periode Menabung
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={120}
              value={state.durationMonths}
              onChange={(e) =>
                onChange({ ...state, durationMonths: Math.max(1, Number(e.target.value)) })
              }
              className="w-full text-base font-bold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
            />
            <span className="text-xs font-semibold text-gray-500 shrink-0">Bulan</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Setara {(state.durationMonths / 12).toFixed(1)} Tahun
          </p>
        </div>

        {/* Target Acuan */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Target Dana Acuan (Rp)
          </label>
          <input
            type="number"
            min={0}
            step={1000000}
            value={state.targetAmount}
            onChange={(e) =>
              onChange({ ...state, targetAmount: Math.max(0, Number(e.target.value)) })
            }
            className="w-full text-base font-bold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {formatRupiah(state.targetAmount)}
          </p>
        </div>
      </div>

      {/* Capacity Results Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tabungan Bulanan */}
        <div className="bg-gradient-to-br from-rose-50 to-blush-50/60 p-4 rounded-2xl border border-rose-200/80">
          <span className="text-xs text-gray-500 block mb-1">Total Setoran / Bulan</span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            {formatRupiah(result.monthlyTotal)}
          </p>
          <p className="text-[11px] text-gray-600 mt-1">
            Raihan + Arum berdua
          </p>
        </div>

        {/* Proyeksi Total Terkumpul */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <span className="text-xs text-gray-500 block mb-1">
            Proyeksi Total ({state.durationMonths} Bulan)
          </span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-blush-600">
            {formatRupiah(result.projectedTotal)}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Pertumbuhan tahunan: ~{formatRupiah(result.monthlyTotal * 12)} / thn
          </p>
        </div>

        {/* Status Pencapaian Target */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <span className="text-xs text-gray-500 block mb-1">Pencapaian Target</span>
          <div className="flex items-center gap-2">
            <p className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
              {formatPercent(result.progressPercent)}
            </p>
            {result.progressPercent >= 100 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <div className="w-full bg-rose-100 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                result.progressPercent >= 100 ? 'bg-emerald-500' : 'bg-blush-500'
              }`}
              style={{ width: `${Math.min(100, result.progressPercent)}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            {result.deficit > 0
              ? `Kekurangan: ${formatRupiah(result.deficit)}`
              : 'Target Terlampaui! 🎉'}
          </p>
        </div>

        {/* Estimasi Waktu */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <span className="text-xs text-gray-500 block mb-1">Estimasi Waktu Capai Target</span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-champagne-800">
            {result.estimatedMonthsToTarget !== null
              ? `${result.estimatedMonthsToTarget} Bulan`
              : '—'}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            {result.estimatedMonthsToTarget !== null
              ? `Sekitar ${(result.estimatedMonthsToTarget / 12).toFixed(1)} tahun konsisten`
              : 'Target telah terpenuhi'}
          </p>
        </div>
      </div>
    </div>
  );
};
