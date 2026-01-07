"use client";

import { Song } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

const songs = [
    {
        id: 1,
        title: "Audio_1",
        artist: "Artist A",
        url: "/songs/audio_1.wav",
        duration: "3:45"
    },
    {
        id: 2,
        title: "Audio_2",
        artist: "Artist A",
        url: "/songs/audio_2.wav",
        duration: "3:45"
    },
    {
        id: 3,
        title: "robot",
        artist: "Robot",
        url: "/songs/robot.wav",
        duration: "3:45"
    },
    {
        id: 4,
        title: "xinnian",
        artist: "Unknown",
        url: "/songs/xinnian.wav",
        duration: "3:45"
    }
];

interface MusicContextType {
    allSongs: Song[];
    currentTrack: Song;
    currentTrackIndex: number;
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    volume: number;
    handlePlaySong: (params: { song: Song; index: number }) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    play: () => void;
    pause: () => void;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    setVolume: (volume: number) => void;
    formatTime: (time: number) => string;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [allSongs] = useState(songs);
    const [currentTrack, setCurrentTrack] = useState<Song>(songs[0]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handlePlaySong = ({ song, index }: { song: Song; index: number }) => {
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length;
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex;
        });
        setIsPlaying(false);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex;
        });
        setIsPlaying(false);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => setIsPlaying(false);

    return (
        <MusicContext.Provider
            value={{
                allSongs,
                handlePlaySong,
                currentTrack,
                currentTrackIndex,
                setCurrentTime,
                formatTime,
                currentTime,
                duration,
                setDuration,
                nextTrack,
                prevTrack,
                play,
                pause,
                isPlaying,
                volume,
                setVolume,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error("useMusic must be used within a MusicProvider");
    }
    return context;
};
