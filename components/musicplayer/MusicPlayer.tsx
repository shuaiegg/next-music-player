"use client"
import { useMusic } from "@/hooks/useMusic";
import { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const MusicPlayer = () => {
    const { currentTrack, currentTime, setCurrentTime, formatTime, duration, setDuration, nextTrack, prevTrack, isPlaying, play, pause, volume, setVolume } = useMusic();
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleTimeChange = (e: { target: { value: string } }) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e: { target: { value: string } }) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(error => console.log(error));
        } else {
            audio.pause();
        }
    }, [isPlaying])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
    }, [volume])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        }

        const handleEnded = () => {
            nextTrack();
        }

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [setDuration, setCurrentTime, currentTrack, nextTrack])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.load();
        setCurrentTime(0);
        setDuration(0);
    }, [currentTrack, setCurrentTime, setDuration])

    return (
        <div className="glass-card p-6 flex flex-col gap-5">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous" />

            {/* Track info */}
            <div className="text-center">
                <h3 className="text-xl font-bold mb-1 gradient-text-accent">
                    {currentTrack?.title}
                </h3>
                <p className="text-muted text-sm">{currentTrack?.artist}</p>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted min-w-10">{formatTime(currentTime)}</span>
                <input
                    onChange={handleTimeChange}
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime || 0}
                    className="flex-1"
                />
                <span className="text-xs text-muted min-w-10">{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4">
                <button onClick={prevTrack} className="control-btn">
                    <SkipBack size={20} />
                </button>
                <button onClick={() => isPlaying ? pause() : play()} className="play-btn">
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </button>
                <button onClick={nextTrack} className="control-btn">
                    <SkipForward size={20} />
                </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 px-2">
                <Volume2 size={18} className="text-muted" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={handleVolumeChange}
                    value={volume}
                    className="flex-1"
                />
            </div>
        </div>
    )
}

export default MusicPlayer
