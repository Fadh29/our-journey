/**
 * Format a number into standard Indonesian Rupiah currency string.
 * Example: 60000000 -> "Rp 60.000.000"
 */
export function formatRupiah(amount: number, withDecimals: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'Rp 0';
  }
  
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  }).format(rounded);

  // Clean format to "Rp X.XXX.XXX"
  return formatted.replace(/\s+/g, ' ');
}

/**
 * Short/compact format for mobile or chart labels.
 * Example: 60000000 -> "60 Jt", 1500000 -> "1,5 Jt"
 */
export function formatCompactRupiah(amount: number): string {
  if (Math.abs(amount) >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    return `Rp ${val} M`;
  }
  if (Math.abs(amount) >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    return `Rp ${val} Jt`;
  }
  if (Math.abs(amount) >= 1_000) {
    const val = (amount / 1_000).toFixed(0);
    return `Rp ${val} Rb`;
  }
  return formatRupiah(amount);
}

/**
 * Format percentage cleanly
 */
export function formatPercent(value: number): string {
  if (isNaN(value)) return '0%';
  return `${Math.round(value * 10) / 10}%`;
}
