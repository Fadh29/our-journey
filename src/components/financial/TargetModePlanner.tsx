import React from 'react';
import { TargetPlanningState, TargetCalculationResult } from '../../types/financial';
import { formatRupiah, formatPercent } from '../../utils/currencyFormatter';
import { Calendar, Wallet, Percent, UserCheck, ShieldCheck } from 'lucide-react';

interface TargetModePlannerProps {
  state: TargetPlanningState;
  onChange: (newState: TargetPlanningState) => void;
  result: TargetCalculationResult;
}

export const TargetModePlanner: React.FC<TargetModePlannerProps> = ({
  state,
  onChange,
  result,
}) => {
  const handleTargetChange = (val: number) => {
    onChange({ ...state, targetAmount: Math.max(0, val) });
  };

  const handleInitialChange = (val: number) => {
    onChange({ ...state, initialSavings: Math.max(0, val) });
  };

  const handleRaihanPercentChange = (raihanPct: number) => {
    const safeR = Math.max(0, Math.min(100, Math.round(raihanPct)));
    onChange({
      ...state,
      raihanPercent: safeR,
      arumPercent: 100 - safeR,
    });
  };

  const setSplitPreset = (r: number, a: number) => {
    onChange({
      ...state,
      raihanPercent: r,
      arumPercent: a,
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Target Dana */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-blush-500" />
            Target Total Dana (Rp)
          </label>
          <input
            type="number"
            min={0}
            step={1000000}
            value={state.targetAmount}
            onChange={(e) => handleTargetChange(Number(e.target.value))}
            className="w-full text-base font-bold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {formatRupiah(state.targetAmount)}
          </p>
        </div>

        {/* Tabungan Awal */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" />
            Tabungan Awal Tersedia (Rp)
          </label>
          <input
            type="number"
            min={0}
            step={500000}
            value={state.initialSavings}
            onChange={(e) => handleInitialChange(Number(e.target.value))}
            className="w-full text-base font-bold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {formatRupiah(state.initialSavings)}
          </p>
        </div>

        {/* Tanggal Mulai Menabung */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blush-500" />
            Mulai Menabung
          </label>
          <input
            type="month"
            value={state.startDate}
            onChange={(e) => onChange({ ...state, startDate: e.target.value })}
            className="w-full text-sm font-semibold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Awal komitmen bersama
          </p>
        </div>

        {/* Target Tanggal Selesai */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blush-500" />
            Target Tanggal Tercapai
          </label>
          <input
            type="month"
            value={state.targetDate}
            onChange={(e) => onChange({ ...state, targetDate: e.target.value })}
            className="w-full text-sm font-semibold text-gray-800 p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-hidden focus:ring-2 focus:ring-blush-400"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Durasi: <span className="font-bold text-blush-600">{result.durationMonths} Bulan</span>
          </p>
        </div>
      </div>

      {/* Contribution Split Selector */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="font-serif font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <Percent className="w-4 h-4 text-blush-500" />
              Pengaturan Pembagian Kontribusi (Total 100%)
            </h4>
            <p className="text-xs text-gray-500">
              Pilih rasio pembagian tabungan bulanan antara Raihan dan Arum
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-gray-400 mr-1">Preset:</span>
            {[
              { r: 70, a: 30, label: '70:30' },
              { r: 50, a: 50, label: '50:50' },
              { r: 60, a: 40, label: '60:40' },
              { r: 100, a: 0, label: '100:0' },
              { r: 0, a: 100, label: '0:100' },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setSplitPreset(p.r, p.a)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  state.raihanPercent === p.r && state.arumPercent === p.a
                    ? 'bg-blush-500 text-white shadow-xs'
                    : 'bg-rose-50 text-gray-600 hover:bg-rose-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Slider Control */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-blush-600">Raihan: {state.raihanPercent}%</span>
            <span className="text-champagne-700">Arum: {state.arumPercent}%</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={state.raihanPercent}
            onChange={(e) => handleRaihanPercentChange(Number(e.target.value))}
            className="w-full h-2.5 bg-champagne-200 rounded-lg appearance-none cursor-pointer accent-blush-500"
          />

          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>0% Raihan (100% Arum)</span>
            <span>50:50 Setara</span>
            <span>100% Raihan (0% Arum)</span>
          </div>
        </div>
      </div>

      {/* Calculated Results Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tabungan Bulanan */}
        <div className="bg-gradient-to-br from-rose-50 to-blush-50/60 p-4 rounded-2xl border border-rose-200/80">
          <span className="text-xs text-gray-500 block mb-1">Kebutuhan Tabungan / Bulan</span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            {formatRupiah(result.monthlyTotal)}
          </p>
          <p className="text-[11px] text-gray-600 mt-1">
            Untuk sisa dana {formatRupiah(result.netRequired)}
          </p>
        </div>

        {/* Setoran Bulanan Raihan */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Kontribusi Raihan ({state.raihanPercent}%)</span>
            <UserCheck className="w-3.5 h-3.5 text-blush-500" />
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-blush-600">
            {formatRupiah(result.raihanMonthly)}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            per bulan selama {result.durationMonths} bulan
          </p>
        </div>

        {/* Setoran Bulanan Arum */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Kontribusi Arum ({state.arumPercent}%)</span>
            <UserCheck className="w-3.5 h-3.5 text-champagne-600" />
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-champagne-700">
            {formatRupiah(result.arumMonthly)}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            per bulan selama {result.durationMonths} bulan
          </p>
        </div>

        {/* Proyeksi Total & Progress */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          <span className="text-xs text-gray-500 block mb-1">Proyeksi Akhir Periode</span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
            {formatRupiah(result.projectedTotal)}
          </p>
          <div className="w-full bg-rose-100 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blush-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, result.progressPercent)}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1 text-right">
            Progress awal: <span className="font-bold">{formatPercent(result.progressPercent)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
