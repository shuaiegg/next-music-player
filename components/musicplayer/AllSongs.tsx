"use client";

import { useMusic } from "@/hooks/useMusic";
import { Play, Music2 } from "lucide-react";

export const AllSongs = () => {
  const { allSongs, handlePlaySong, currentTrackIndex } = useMusic();

  return (
    <div className="flex flex-col">
      <h2 className="section-header">All Songs ({allSongs.length})</h2>
      <div className="flex flex-col gap-3">
        {allSongs.map((song, index) => (
          <div
            key={index}
            onClick={() => handlePlaySong({ song, index })}
            className={`song-card ${currentTrackIndex === index ? "active" : ""}`}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-white">{song.title}</h3>
              <p className="text-sm text-muted">{song.artist}</p>
              <span className="text-xs text-muted-dark">{song.duration}</span>
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
