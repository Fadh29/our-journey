import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { formatCompactRupiah, formatRupiah } from '../../utils/currencyFormatter';

interface FinancialChartsProps {
  timelineData: {
    year: number;
    monthIndex: number;
    label: string;
    raihanAccumulated: number;
    arumAccumulated: number;
    totalAccumulated: number;
    target: number;
  }[];
  raihanMonthly: number;
  arumMonthly: number;
}

export const FinancialCharts: React.FC<FinancialChartsProps> = ({
  timelineData,
  raihanMonthly,
  arumMonthly,
}) => {
  const pieData = [
    { name: 'Raihan', value: raihanMonthly, color: '#dc7493' },
    { name: 'Arum', value: arumMonthly, color: '#c59f5e' },
  ].filter((item) => item.value > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-rose-100 text-xs space-y-1.5">
          <p className="font-semibold text-gray-800 border-b border-rose-100 pb-1">
            Periode: {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-bold text-gray-800">
                {formatRupiah(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      {/* Area Chart: Akumulasi Tabungan vs Target */}
      <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-2xl shadow-soft border border-rose-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
              Grafik Proyeksi Akumulasi Tabungan
            </h4>
            <p className="text-xs text-gray-500">
              Pertumbuhan tabungan Raihan & Arum menuju target
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] px-2.5 py-1 rounded-full bg-rose-50 text-blush-600 font-medium">
            Simulasi Riil
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc7493" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#dc7493" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tickFormatter={(val) => formatCompactRupiah(val)}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="totalAccumulated"
                name="Total Tabungan"
                stroke="#dc7493"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
              <Area
                type="stepAfter"
                dataKey="target"
                name="Target Dana"
                stroke="#c59f5e"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Proporsi Kontribusi Bulanan */}
      <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-2xl shadow-soft border border-rose-100 flex flex-col justify-between">
        <div>
          <h4 className="font-serif font-bold text-gray-900 text-base sm:text-lg mb-1">
            Proporsi Kontribusi Bulanan
          </h4>
          <p className="text-xs text-gray-500 mb-2">
            Perbandingan setoran Raihan vs Arum
          </p>

          <div className="h-52 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [formatRupiah(Number(value)), 'Kontribusi/Bulan']}
                  />
                  <Legend
                    formatter={(val) => <span className="text-xs text-gray-700">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-gray-400">Belum ada nilai kontribusi</p>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-rose-50 text-center">
          <p className="text-[11px] text-gray-500 italic">
            "Saling melengkapi sesuai kemampuan & kesepakatan terbaik kita."
          </p>
        </div>
      </div>
    </div>
  );
};
