export interface LoveLetterData {
  title: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  sender: string;
  date: string;
}

/**
 * Placeholder surat personal dari Raihan untuk Arum.
 * Konten final dapat diubah sewaktu-waktu dengan mengedit paragraf di bawah ini.
 */
export const letterForArum: LoveLetterData = {
  title: 'Surat Kecil dari Lubuk Hati Raihan',
  salutation: 'Untuk Arum Mutiasari, wanitaku yang paling manis...',
  paragraphs: [
    'Hai Arum sayang,',
    'Terima kasih telah hadir dan memberi warna paling cerah dalam hari-hari Raihan. Sejak pertama kali kita saling bertukar pesan di TikTok, berpindah ke WhatsApp, hingga akhirnya bertemu langsung dan bergandengan tangan, rasa ini selalu bertambah setiap harinya.',
    'Kamu adalah alasan mengapa Raihan selalu bersemangat menyambut hari esok. Senyum manismu, tatapan matamu yang ikut tersenyum, serta tutur katamu yang lembut selalu menjadi penenang di saat lelah.',
    'Website kecil dan rencana perjalanan ini Raihan persembahkan untukmu. Sebagai wujud kesungguhan, komitmen, dan tekad Raihan untuk mendampingimu, membahagiakanmu, dan membangun masa depan kita berdua hingga hari tua nanti.',
    'Raihan berjanji akan terus belajar menjadi pria terbaik untukmu, menjadi pendengar setia, dan menjadi imam yang amanah bagi keluarga kecil kita kelak.',
  ],
  closing: 'Dengan segenap cinta, ketulusan, dan doa terbaik,',
  sender: 'Raihan Fadhlurahman ❤️',
  date: 'November 2026',
};
