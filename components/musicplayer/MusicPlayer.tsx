"use client"
import { useMusic } from "@/hooks/useMusic";
import next from "next";
import { useEffect, useRef } from "react";

const MusicPlayer = () => {
    const { currentTrack, currentTime, setCurrentTime, formatTime, duration, setDuration, nextTrack, prevTrack, isPlaying, play, pause, volume, setVolume } = useMusic();
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleTimeChange = (e: { target: { value: any; }; }) => {
        const audio = audioRef.current;
        if(!audio) return;
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e: { target: { value: any; }; }) => {
        const newVolume = parseFloat(e.target.value);

        setVolume(newVolume);
    }

    useEffect(()=> {

        const audio = audioRef.current;
        if(!audio) return;


        if(isPlaying) {
            audio.play().catch(error => console.log(error));
        }else {
            audio.pause();

        }
    },[isPlaying])

        useEffect(()=> {
        const audio = audioRef.current;
        if(!audio) return;
        audio.volume = volume;
    },[volume])

    useEffect(()=> {
        const audio = audioRef.current;
        if(!audio) return;

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

    useEffect(()=> {
        const audio = audioRef.current;
        if(!audio) return;
        audio.load();
        setCurrentTime(0);
        setDuration(0);
    }, [currentTrack, setCurrentTime, setDuration])
    
    

    return (
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous" />

            <div className="track-info">
                <h3>{currentTrack?.title}</h3>
                <p>{currentTrack?.artist}</p>
            </div>
            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input onChange={handleTimeChange} type="range" min="0" max={duration || 0} step="0.1" value={currentTime || 0} />
                <span className="time">{formatTime(duration)}</span>
            </div>

            <div className="controls items-center">
                <button onClick={prevTrack}>👈</button>
                <button className="play-btn" onClick={ () => isPlaying ? pause() : play()}>
                    {isPlaying ? "⏸" : "▶" }
                    </button>
                <button onClick={nextTrack}>👉</button>
            </div>


            <div className="volume-container">
            <span>🔊</span>
             <input type="range" min="0" max="1" step="0.1" onChange={handleVolumeChange} value={volume}  />
            </div>
        </div>
    )
}

export default MusicPlayer