import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(() => {
          // If no audio file exists yet or autoplay blocked
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio
        ref={audioRef}
        src="./audio/romantic-bgm.mp3"
        loop
        preload="none"
        onError={() => setHasError(true)}
      />

      <button
        onClick={togglePlay}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik Latar'}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-soft-lg border transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-rose-500/90 text-white border-rose-400 ring-2 ring-rose-200'
            : 'bg-white/90 text-gray-700 border-rose-200 hover:text-blush-600 hover:bg-rose-50'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse text-white" />
            <span className="text-xs font-medium pr-1">Musik Aktif</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">Musik</span>
          </>
        )}
      </button>

      {hasError && (
        <span className="hidden sm:inline-block text-[11px] bg-rose-50 border border-rose-200 text-rose-600 px-2 py-1 rounded-md shadow-xs">
          Audio opsional
        </span>
      )}
    </div>
  );
};
