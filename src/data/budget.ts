import { BudgetItem } from '../types/budget';

export const defaultTotalBudget = 60000000; // Rp 60.000.000 default

export const initialBudgetCategories: BudgetItem[] = [
  {
    id: 'venue-catering',
    name: 'Venue & Catering',
    percentage: 40,
    amount: 24000000,
    color: '#e11d48', // rose-600
  },
  {
    id: 'dekorasi',
    name: 'Dekorasi Pelaminan & Ruangan',
    percentage: 15,
    amount: 9000000,
    color: '#f43f5e', // rose-500
  },
  {
    id: 'dokumentasi',
    name: 'Dokumentasi (Foto & Video)',
    percentage: 10,
    amount: 6000000,
    color: '#fb7185', // rose-400
  },
  {
    id: 'busana-makeup',
    name: 'Busana & Makeup (MUA)',
    percentage: 10,
    amount: 6000000,
    color: '#dc7493', // blush-500
  },
  {
    id: 'seserahan',
    name: 'Seserahan & Mas Kawin',
    percentage: 8,
    amount: 4800000,
    color: '#c59f5e', // champagne-500
  },
  {
    id: 'undangan-souvenir',
    name: 'Undangan & Souvenir',
    percentage: 5,
    amount: 3000000,
    color: '#e1cea9', // champagne-300
  },
  {
    id: 'dana-cadangan',
    name: 'Dana Cadangan / Tak Terduga',
    percentage: 12,
    amount: 7200000,
    color: '#a36777', // dusty-500
  },
];
