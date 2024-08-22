"use client";
import { useEffect, useState } from "react";
import SpotifyAudioPlayer from "./SpotifyAudioPlayer";

interface SpotifySong {
  preview_url: string;
  name: string;
  artist: string;
  albumArt: string;
  isPlaying: boolean;
  className?: string;
}

export default function SpotifyPlayer({ className }: { className: string }) {
  const [song, setSong] = useState<SpotifySong | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await fetch("/api/my-music");
        if (response.ok) {
          const data = await response.json();
          setSong(data);
        } else {
          setError(true);
          console.error("Failed to fetch song data");
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching song:", error);
      }
    }

    fetchSong();
  }, []);

  return (
    <>
      {song ? (
        <SpotifyAudioPlayer
          className={className}
          isPlaying={song.isPlaying}
          preview_url={song.preview_url || ""}
          albumArt={song.albumArt}
          name={song.name}
          artist={song.artist}
        />
      ) : error ? (
        <div className={"bottom-two-two"}>
          <h2>No song is currently playing.</h2>
        </div>
      ) : (
        <div className={"bottom-two-two"}>
          <h2>Connecting to spotify...</h2>
        </div>
      )}
    </>
  );
}
