import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { BudgetItem } from '../../types/budget';
import { formatRupiah } from '../../utils/currencyFormatter';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { initialBudgetCategories } from '../../data/budget';

interface WeddingBudgetPlannerProps {
  categories: BudgetItem[];
  setCategories: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
  totalBudget: number;
  setTotalBudget: (total: number) => void;
}

export const WeddingBudgetPlanner: React.FC<WeddingBudgetPlannerProps> = ({
  categories,
  setCategories,
  totalBudget,
  setTotalBudget,
}) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatPct, setNewCatPct] = useState(5);

  // Calculate totals
  const totalPercentage = Math.round(
    categories.reduce((acc, cat) => acc + cat.percentage, 0) * 10
  ) / 10;
  const totalAllocatedNominal = categories.reduce((acc, cat) => acc + cat.amount, 0);
  const remainingBudget = totalBudget - totalAllocatedNominal;
  const remainingPercentage = Math.round((100 - totalPercentage) * 10) / 10;
  const isValid = Math.abs(totalPercentage - 100) < 0.1;

  // When total budget changes, recalculate nominals
  const handleTotalBudgetChange = (newTotal: number) => {
    const safeTotal = Math.max(0, newTotal);
    setTotalBudget(safeTotal);
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        amount: Math.round((safeTotal * cat.percentage) / 100),
      }))
    );
  };

  // When percentage of an item changes
  const handlePercentageChange = (id: string, newPct: number) => {
    const safePct = Math.max(0, Math.min(100, newPct));
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          return {
            ...cat,
            percentage: safePct,
            amount: Math.round((totalBudget * safePct) / 100),
          };
        }
        return cat;
      })
    );
  };

  // When nominal amount changes directly
  const handleAmountChange = (id: string, newAmt: number) => {
    const safeAmt = Math.max(0, newAmt);
    const newPct =
      totalBudget > 0 ? Math.round((safeAmt / totalBudget) * 1000) / 10 : 0;

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          return {
            ...cat,
            amount: safeAmt,
            percentage: newPct,
          };
        }
        return cat;
      })
    );
  };

  // Add category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const colors = ['#dc7493', '#c59f5e', '#a36777', '#f43f5e', '#b4884c', '#753144'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const pct = Math.max(0, newCatPct);

    const newItem: BudgetItem = {
      id: `custom-${Date.now()}`,
      name: newCatName.trim(),
      percentage: pct,
      amount: Math.round((totalBudget * pct) / 100),
      color: randomColor,
      isCustom: true,
    };

    setCategories((prev) => [...prev, newItem]);
    setNewCatName('');
    setNewCatPct(5);
  };

  // Delete category
  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  // Reset to default
  const handleResetToDefault = () => {
    setCategories(initialBudgetCategories);
    setTotalBudget(60000000);
  };

  const chartData = categories.map((cat) => ({
    name: cat.name,
    value: cat.amount,
    percentage: cat.percentage,
    color: cat.color || '#dc7493',
  }));

  return (
    <section id="budget" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        subtitle="Alokasi Pos Kebutuhan Pernikahan Impian"
        title="Wedding Budget Planner"
        description="Rancang dan sesuaikan pembagian anggaran pernikahan secara detail, mulai dari venue, dekorasi, hingga pos tak terduga."
      />

      {/* Top Controls Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-soft border border-rose-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Total Target Anggaran Pernikahan
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 font-serif">
              {formatRupiah(totalBudget)}
            </span>
            <input
              type="number"
              min={0}
              step={1000000}
              value={totalBudget}
              onChange={(e) => handleTotalBudgetChange(Number(e.target.value))}
              className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 focus:outline-hidden focus:ring-2 focus:ring-blush-400 w-36 sm:w-44"
              placeholder="Ubah nominal"
            />
          </div>
        </div>

        {/* Validation & Reset */}
        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-2 rounded-2xl flex items-center gap-2 border text-xs sm:text-sm font-medium ${
              isValid
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
            }`}
          >
            {isValid ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Alokasi Pas 100% ({formatRupiah(totalAllocatedNominal)})</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Total: {totalPercentage}% (
                  {remainingPercentage > 0
                    ? `Sisa ${remainingPercentage}%`
                    : `Kelebihan ${Math.abs(remainingPercentage)}%`}
                  )
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleResetToDefault}
            title="Kembalikan ke Alokasi Awal"
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Category Items List & Add Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-soft border border-rose-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
                Daftar Pos Anggaran ({categories.length} Kategori)
              </h4>
              <span className="text-xs text-gray-500">
                Ubah % atau nominal langsung
              </span>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/40 border border-rose-100/80 hover:bg-white hover:border-blush-200 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color || '#dc7493' }}
                      />
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
                        title="Hapus kategori"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Dual Input Controls: % and Rp */}
                  <div className="grid grid-cols-2 gap-3 items-center">
                    <div>
                      <div className="flex items-center gap-1.5 bg-white border border-rose-200 rounded-xl px-2.5 py-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step={0.5}
                          value={cat.percentage}
                          onChange={(e) =>
                            handlePercentageChange(cat.id, Number(e.target.value))
                          }
                          className="w-full text-xs font-bold text-gray-800 focus:outline-hidden text-right"
                        />
                        <span className="text-xs text-gray-500 font-semibold">%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 bg-white border border-rose-200 rounded-xl px-2.5 py-1">
                        <span className="text-xs text-gray-400 font-medium">Rp</span>
                        <input
                          type="number"
                          min={0}
                          step={500000}
                          value={cat.amount}
                          onChange={(e) =>
                            handleAmountChange(cat.id, Number(e.target.value))
                          }
                          className="w-full text-xs font-bold text-gray-800 focus:outline-hidden text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="mt-5 pt-4 border-t border-rose-100 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nama kategori baru (contoh: Souvenir Khusus)"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blush-400"
              />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white border border-rose-200 rounded-xl px-2.5 py-2 w-24">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newCatPct}
                    onChange={(e) => setNewCatPct(Number(e.target.value))}
                    className="w-full text-xs font-bold text-right focus:outline-hidden"
                  />
                  <span className="text-xs text-gray-400 font-semibold">%</span>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blush-500 hover:bg-blush-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Pos</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Visualization Donut & Allocation Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-soft border border-rose-100">
            <h4 className="font-serif font-bold text-gray-900 text-base sm:text-lg mb-1">
              Visualisasi Distribusi Anggaran
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Komposisi alokasi dana pernikahan
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [
                      formatRupiah(Number(val)),
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Legend List */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] pt-3 border-t border-rose-100">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: c.color || '#dc7493' }}
                  />
                  <span className="truncate text-gray-700">{c.name}:</span>
                  <span className="font-bold text-gray-900 ml-auto">{c.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Health Card */}
          <div className="bg-gradient-to-br from-champagne-50 to-rose-50/60 p-5 rounded-3xl border border-champagne-200/60 shadow-xs">
            <h5 className="font-serif font-bold text-gray-900 text-sm mb-2">
              Kondisi Alokasi Anggaran
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Dialokasikan:</span>
                <span className="font-bold text-gray-900">{formatRupiah(totalAllocatedNominal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sisa / Selisih Dana:</span>
                <span
                  className={`font-bold ${
                    remainingBudget < 0 ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {formatRupiah(remainingBudget)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
