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
  link: string;
  artistLink: string;
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
    <div className={className}>
      <span className="card-title-section">
      <MusicIcon/>
      {!song && !error ? "Connecting to spotify..." : <span>Music.</span>}
      </span>
      {song ? (
        <SpotifyAudioPlayer
          isPlaying={song.isPlaying}
          preview_url={song.preview_url || ""}
          albumArt={song.albumArt}
          name={song.name}
          artist={song.artist}
          link={song.link}
          artistLink={song.artistLink}
        />
      ) : error ? (
        <>
          <h2>No song is currently playing.</h2>
        </>
      ) : null}
    </div>
  );
}

function MusicIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="35" height="35" className="section-icons"><path d="M21,12.424V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2,5,5,0,0,0,2-9.576Z" fill="#fff"/></svg>
}
