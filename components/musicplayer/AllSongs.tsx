"use client";

import { useMusic } from "@/hooks/useMusic";
import { Play, Music2 } from "lucide-react";

export const AllSongs = () => {
  const { allSongs, handlePlaySong, currentTrackIndex } = useMusic();

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        All Songs ({allSongs.length})
      </h2>
      <div className="flex flex-col gap-3">
        {allSongs.map((song, index) => (
          <div
            key={index}
            onClick={() => handlePlaySong({ song, index })}
            className={`
              p-4 flex items-center justify-between gap-4 cursor-pointer
              bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
              hover:translate-x-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_20px_rgba(138,43,226,0.5)]
              transition-all duration-300
              ${currentTrackIndex === index
                ? "bg-gradient-to-r from-purple-500/30 to-purple-700/30 border-purple-500/50"
                : ""
              }
            `}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-white">{song.title}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
              <span className="text-xs text-gray-500">{song.duration}</span>
            </div>
            <div className="text-purple-400">
              {currentTrackIndex === index ? (
                <Music2 size={24} className="animate-pulse" />
              ) : (
                <Play size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
