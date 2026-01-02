import { Song } from "@/lib/types";
import { url } from "inspector"
import { format } from "path";
import { use, useState } from "react"

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
]

export const useMusic = () => {
    const [allSongs, SetAllSongs] = useState(songs);
    const [currentTrack, SetCurrentTrack] = useState<Song>(songs[0]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const handlePlaySong = ( {song, index}: {song: Song, index: number} ) => {
        SetCurrentTrack(song);
        setCurrentTrackIndex(index);
    }

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length;
            SetCurrentTrack(allSongs[nextIndex]);
            return nextIndex;
        });    
        setIsPlaying(false);  
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            SetCurrentTrack(allSongs[nextIndex]);
            return nextIndex;
        }); 
        setIsPlaying(false);  
    };


    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)

        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const play = () => {
        setIsPlaying(true);
    }

    const pause = () => setIsPlaying(false);

    return { 
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
        
    }
}