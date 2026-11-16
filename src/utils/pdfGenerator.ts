import { jsPDF } from 'jspdf';
import { TargetCalculationResult, CapacityCalculationResult } from '../types/financial';
import { BudgetItem } from '../types/budget';
import { formatRupiah, formatPercent } from './currencyFormatter';

interface PDFExportData {
  mode: 'target' | 'capacity';
  targetResult?: TargetCalculationResult;
  capacityResult?: CapacityCalculationResult;
  budgetCategories: BudgetItem[];
  totalWeddingBudget: number;
  startDate?: string;
  targetDate?: string;
}

export function generateFinancialPlanPDF(data: PDFExportData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner - Rose Blush
  doc.setFillColor(252, 238, 242); // blush-100
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Decorative border line
  doc.setDrawColor(220, 116, 147); // blush-500
  doc.setLineWidth(1);
  doc.line(margin, 42, pageWidth - margin, 42);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(162, 62, 91); // blush-700
  doc.text('Our Journey — Financial & Wedding Plan', margin, 18);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(117, 49, 68); // blush-900
  doc.text('Rencana Masa Depan & Pernikahan: Raihan Fadhlurahman & Arum Mutiasari', margin, 26);

  // Timestamp
  doc.setFontSize(8.5);
  doc.setTextColor(140, 140, 140);
  const now = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Dokumen dibuat secara interaktif pada: ${now}`, margin, 34);

  let currentY = 52;

  // SECTION 1: FINANCIAL OVERVIEW
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(197, 82, 115); // blush-600
  doc.text('1. Ringkasan Perencanaan Tabungan Bersama', margin, currentY);
  currentY += 6;

  // Overview box
  doc.setFillColor(253, 248, 249);
  doc.setDrawColor(244, 195, 209);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, currentY, contentWidth, 54, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);

  const col1X = margin + 6;
  const col2X = margin + (contentWidth / 2) + 4;
  let boxY = currentY + 8;

  if (data.mode === 'target' && data.targetResult) {
    const res = data.targetResult;
    doc.text(`Mode Perencanaan: Target-Based Planning`, col1X, boxY);
    doc.text(`Periode Perencanaan: ${data.startDate || '2027-01'} s/d ${data.targetDate || '2029-12'}`, col2X, boxY);
    boxY += 8;

    doc.text(`Target Total Dana: ${formatRupiah(res.targetAmount)}`, col1X, boxY);
    doc.text(`Total Durasi: ${res.durationMonths} Bulan`, col2X, boxY);
    boxY += 8;

    doc.text(`Tabungan Awal: ${formatRupiah(res.initialSavings)}`, col1X, boxY);
    doc.text(`Sisa Dana Perlu Dikumpulkan: ${formatRupiah(res.netRequired)}`, col2X, boxY);
    boxY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(162, 62, 91);
    doc.text(`Kebutuhan Tabungan Total: ${formatRupiah(res.monthlyTotal)} / bulan`, col1X, boxY);
    doc.text(`Progress Target Awal: ${formatPercent(res.progressPercent)}`, col2X, boxY);
    boxY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`• Kontribusi Raihan: ${formatRupiah(res.raihanMonthly)} / bulan`, col1X + 4, boxY);
    doc.text(`• Kontribusi Arum: ${formatRupiah(res.arumMonthly)} / bulan`, col2X + 4, boxY);
  } else if (data.capacityResult) {
    const res = data.capacityResult;
    doc.text(`Mode Perencanaan: Capacity-Based Planning`, col1X, boxY);
    doc.text(`Durasi Waktu: ${res.durationMonths} Bulan`, col2X, boxY);
    boxY += 8;

    doc.text(`Target Total Acuan: ${formatRupiah(res.targetAmount)}`, col1X, boxY);
    doc.text(`Tabungan Awal: ${formatRupiah(res.initialSavings)}`, col2X, boxY);
    boxY += 8;

    doc.text(`Kemampuan Raihan: ${formatRupiah(res.raihanMonthly)} / bulan`, col1X, boxY);
    doc.text(`Kemampuan Arum: ${formatRupiah(res.arumMonthly)} / bulan`, col2X, boxY);
    boxY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(162, 62, 91);
    doc.text(`Total Tabungan Bulanan: ${formatRupiah(res.monthlyTotal)} / bulan`, col1X, boxY);
    doc.text(`Proyeksi Terkumpul: ${formatRupiah(res.projectedTotal)} (${formatPercent(res.progressPercent)})`, col2X, boxY);
    boxY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const estText = res.estimatedMonthsToTarget ? `${res.estimatedMonthsToTarget} bulan` : 'Tercapai';
    doc.text(`Sisa Kekurangan: ${formatRupiah(res.deficit)}`, col1X + 4, boxY);
    doc.text(`Estimasi Waktu Sampai Target: ${estText}`, col2X + 4, boxY);
  }

  currentY += 64;

  // SECTION 2: WEDDING BUDGET ALLOCATION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(197, 82, 115);
  doc.text('2. Rincian Alokasi Anggaran Pernikahan (Wedding Budget)', margin, currentY);
  currentY += 6;

  // Budget Table Header
  const tableHeaderY = currentY;
  doc.setFillColor(237, 226, 206); // champagne-200
  doc.rect(margin, tableHeaderY, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(80, 50, 20);

  doc.text('Kategori Kebutuhan', margin + 4, tableHeaderY + 5.5);
  doc.text('Alokasi (%)', margin + 95, tableHeaderY + 5.5);
  doc.text('Estimasi Nominal (Rp)', margin + 130, tableHeaderY + 5.5);

  currentY += 8;

  // Budget Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  let totalAllocatedPct = 0;
  let totalAllocatedNominal = 0;

  data.budgetCategories.forEach((cat, idx) => {
    totalAllocatedPct += cat.percentage;
    totalAllocatedNominal += cat.amount;

    if (idx % 2 === 1) {
      doc.setFillColor(254, 250, 251);
      doc.rect(margin, currentY, contentWidth, 7, 'F');
    }

    doc.text(cat.name, margin + 4, currentY + 5);
    doc.text(`${cat.percentage.toFixed(1)}%`, margin + 100, currentY + 5);
    doc.text(formatRupiah(cat.amount), margin + 130, currentY + 5);

    currentY += 7;
  });

  // Table Total Line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, currentY, margin + contentWidth, currentY);

  currentY += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Total Anggaran', margin + 4, currentY + 5);
  doc.text(`${totalAllocatedPct.toFixed(1)}%`, margin + 100, currentY + 5);
  doc.text(formatRupiah(totalAllocatedNominal), margin + 130, currentY + 5);

  currentY += 15;

  // Notes & Commitments Box
  doc.setFillColor(253, 249, 245); // champagne-50
  doc.setDrawColor(225, 206, 169);
  doc.roundedRect(margin, currentY, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(150, 109, 63); // champagne-700
  doc.text('Catatan & Komitmen Bersama:', margin + 6, currentY + 7);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('1. Perhitungan ini merupakan simulasi tabungan riil yang dapat disesuaikan seiring waktu.', margin + 6, currentY + 14);
  doc.text('2. Kebutuhan tempat tinggal dan pernikahan diikhtiarkan bersama secara seimbang dan realistis.', margin + 6, currentY + 20);
  doc.text('3. Semoga Allah SWT memudahkan setiap rupiah tabungan ini menjadi berkah bagi masa depan kita. Aamiin.', margin + 6, currentY + 26);

  // Footer Signature
  const footerY = pageHeight - 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text('Our Journey — Raihan Fadhlurahman & Arum Mutiasari', margin, footerY);
  doc.text('Halaman 1 dari 1', pageWidth - margin - 22, footerY);

  // Save PDF
  doc.save('Our-Journey-Financial-Plan-Raihan-Arum.pdf');
}
