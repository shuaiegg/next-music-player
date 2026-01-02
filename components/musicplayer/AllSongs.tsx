"use client";

import {useMusic } from "@/hooks/useMusic";

export const AllSongs = () => {

  const { allSongs, handlePlaySong, currentTrack, currentTrackIndex } = useMusic();
  return (
    <div className="flex flex-col items-center justify-center">
        <h2>All songs ({allSongs.length})</h2>
        <div className="grid">
            {allSongs.map((song, key) => (
                <div key={key} onClick={() => handlePlaySong({song, index: key})} className={`song-card ${currentTrackIndex === key ? "bg-blue-400" : ""} flex items-center justify-center border rounded-xl py-1 my-0.5 px-10 hover:bg-amber-700 cursor-pointer`}>
                    <div className="song-info">
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                        <span>{song.duration}</span>
                    </div>
                    <div>
                        {currentTrackIndex === key ? "🎵" : "▶️"}
                    </div>   
                </div>

            ))}
        </div>

    </div>
  );
};