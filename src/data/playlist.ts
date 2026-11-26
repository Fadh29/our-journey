export interface Track {
  id: string;
  title: string;
  artist?: string;
  src: string;
  badge: string;
}

/**
 * Urutan pemutaran musik latar:
 * 1. Beautiful In White
 * 2. Nothing's Gonna Change My Love for You
 * 3. Lagu-lagu berikutnya yang ingin Anda tambahkan tinggal dimasukkan ke array di bawah ini.
 */
export const romanticPlaylist: Track[] = [
  {
    id: 'beautiful-in-white',
    title: 'Beautiful In White',
    artist: 'Saxophone Cover by Dori Wirawan',
    src: './audio/romantic-bgm.mp3',
    badge: '💍',
  },
  {
    id: 'nothings-gonna-change',
    title: "Nothing's Gonna Change My Love for You",
    artist: 'George Benson - Saxophone Cover',
    src: './audio/nothings-gonna-change.mp3',
    badge: '🎷',
  },
];
