import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { romanticPlaylist } from '../../data/playlist';

interface AudioPlayerProps {
  autoPlay?: boolean;
}

const TARGET_VOLUME = 0.7; // Volume normal standar sistem

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const playlist = romanticPlaylist;
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  const clearFade = () => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  /**
   * Transisi Fade-In yang halus:
   * Volume mulai dari 0, perlahan naik sampai TARGET_VOLUME (0.7)
   */
  const fadeIn = (
    audio: HTMLAudioElement,
    durationMs = 2500,
    targetVol = TARGET_VOLUME
  ): Promise<void> => {
    clearFade();
    audio.volume = 0;

    return new Promise((resolve) => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);

          const stepTime = 35; // Update setiap 35ms
          const totalSteps = durationMs / stepTime;
          const volumeIncrement = targetVol / totalSteps;
          let currentVol = 0;

          fadeIntervalRef.current = window.setInterval(() => {
            currentVol += volumeIncrement;
            if (currentVol >= targetVol) {
              audio.volume = targetVol;
              clearFade();
              resolve();
            } else {
              audio.volume = Math.min(targetVol, currentVol);
            }
          }, stepTime);
        })
        .catch(() => {
          setIsPlaying(false);
          setHasError(true);
          resolve();
        });
    });
  };

  /**
   * Transisi Fade-Out yang halus:
   * Volume perlahan turun dari volume saat ini menuju 0 sebelum berganti lagu atau jeda
   */
  const fadeOut = (audio: HTMLAudioElement, durationMs = 1500): Promise<void> => {
    clearFade();

    return new Promise((resolve) => {
      const stepTime = 30;
      const initialVol = audio.volume;
      const totalSteps = durationMs / stepTime;
      const volumeDecrement = initialVol / totalSteps;
      let currentVol = initialVol;

      fadeIntervalRef.current = window.setInterval(() => {
        currentVol -= volumeDecrement;
        if (currentVol <= 0.02) {
          audio.volume = 0;
          clearFade();
          resolve();
        } else {
          audio.volume = Math.max(0, currentVol);
        }
      }, stepTime);
    });
  };

  /**
   * Ganti lagu dengan transisi: Fade-Out lagu lama -> Muat lagu baru -> Fade-In lagu baru
   */
  const transitionToTrack = async (nextIndex: number) => {
    if (!audioRef.current || isTransitioning) return;
    setIsTransitioning(true);

    if (isPlaying) {
      // 1. Fade out lagu sekarang
      await fadeOut(audioRef.current, 1400);
      // 2. Ganti index lagu
      setCurrentTrackIndex(nextIndex);
      // 3. Efek di bawah akan memuat audio dan melakukan fade-in
    } else {
      setCurrentTrackIndex(nextIndex);
      setIsTransitioning(false);
    }
  };

  const handleNextTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    transitionToTrack(nextIndex);
  };

  const handlePrevTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    transitionToTrack(prevIndex);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Lembutkan suara keluar sebelum jeda
      await fadeOut(audioRef.current, 800);
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Lembutkan suara masuk dari rendah ke normal
      fadeIn(audioRef.current, 2000);
    }
  };

  // Autoplay saat password berhasil dimasukkan
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      fadeIn(audioRef.current, 3000); // 3 detik transisi lembut dari hening ke normal
    }
  }, [autoPlay]);

  // Ketika track berganti dan status sedang memutar, jalankan fade-in
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        fadeIn(audioRef.current, 2500).then(() => {
          setIsTransitioning(false);
        });
      } else {
        setIsTransitioning(false);
      }
    }
  }, [currentTrackIndex]);

  // Bersihkan interval saat unmount
  useEffect(() => {
    return () => {
      clearFade();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onEnded={() => handleNextTrack()}
        onError={() => setHasError(true)}
      />

      <div
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full shadow-soft-lg border transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-rose-500/95 text-white border-rose-400 ring-2 ring-rose-200'
            : 'bg-white/95 text-gray-700 border-rose-200 hover:text-blush-600 hover:bg-rose-50'
        }`}
      >
        {playlist.length > 1 && (
          <button
            onClick={handlePrevTrack}
            disabled={isTransitioning}
            title="Lagu Sebelumnya"
            className={`p-1 rounded-full transition-colors cursor-pointer ${
              isPlaying
                ? 'hover:bg-rose-600 text-rose-100 hover:text-white'
                : 'hover:bg-rose-100 text-gray-400 hover:text-blush-600'
            } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={togglePlay}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik Latar'}
          className="flex items-center gap-2 cursor-pointer focus:outline-hidden"
        >
          {isPlaying ? (
            <>
              <Volume2
                className={`w-4 h-4 text-white shrink-0 ${
                  isTransitioning ? 'opacity-50' : 'animate-pulse'
                }`}
              />
              <span className="text-xs font-medium max-w-[140px] sm:max-w-[180px] truncate">
                {isTransitioning ? 'Transisi...' : `${currentTrack.title} ${currentTrack.badge}`}
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs font-medium text-gray-600">Putar Musik 🎵</span>
            </>
          )}
        </button>

        {playlist.length > 1 && (
          <button
            onClick={handleNextTrack}
            disabled={isTransitioning}
            title={`Lagu Berikutnya: ${
              playlist[(currentTrackIndex + 1) % playlist.length].title
            }`}
            className={`p-1 rounded-full transition-colors cursor-pointer ${
              isPlaying
                ? 'hover:bg-rose-600 text-rose-100 hover:text-white'
                : 'hover:bg-rose-100 text-gray-400 hover:text-blush-600'
            } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {hasError && (
        <span className="hidden sm:inline-block text-[11px] bg-rose-50 border border-rose-200 text-rose-600 px-2 py-1 rounded-md shadow-xs">
          Audio opsional
        </span>
      )}
    </div>
  );
};
