import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

interface Track {
  title: string;
  src: string;
  badge: string;
}

const playlist: Track[] = [
  {
    title: "Nothing's Gonna Change My Love for You",
    src: './audio/nothings-gonna-change.mp3',
    badge: '🎷',
  },
  {
    title: 'Beautiful In White',
    src: './audio/romantic-bgm.mp3',
    badge: '💍',
  },
];

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex];

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  const handleNextTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
  };

  // When track changes, if it was playing, play the new one
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        playAudio();
      }
    }
  }, [currentTrackIndex]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none"
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
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik Latar'}
          className="flex items-center gap-2 cursor-pointer focus:outline-hidden"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-white shrink-0" />
              <span className="text-xs font-medium max-w-[150px] sm:max-w-[200px] truncate">
                {currentTrack.title} {currentTrack.badge}
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs font-medium text-gray-600">Putar Musik 🎵</span>
            </>
          )}
        </button>

        {/* Next track switch button */}
        <button
          onClick={handleNextTrack}
          title={`Ganti ke: ${playlist[(currentTrackIndex + 1) % playlist.length].title}`}
          className={`p-1 rounded-full transition-colors cursor-pointer ${
            isPlaying
              ? 'hover:bg-rose-600 text-rose-100 hover:text-white'
              : 'hover:bg-rose-100 text-gray-400 hover:text-blush-600'
          }`}
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {hasError && (
        <span className="hidden sm:inline-block text-[11px] bg-rose-50 border border-rose-200 text-rose-600 px-2 py-1 rounded-md shadow-xs">
          Audio opsional
        </span>
      )}
    </div>
  );
};
