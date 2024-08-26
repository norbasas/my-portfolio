"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SpotifyAudioPlayerProps {
  albumArt: string;
  preview_url: string;
  name: string;
  artist: string;
  isPlaying: any;
  className?: string;
  link: string;
  artistLink: string;
}

const SpotifyAudioPlayer: React.FC<SpotifyAudioPlayerProps> = ({
  preview_url,
  albumArt,
  name,
  artist,
  isPlaying,
  className = "",
  link,
  artistLink,
}) => {
  const [bgColor, setBgColor] = useState<string>("transparent");
  const imgRef = useRef<HTMLImageElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  useEffect(() => {
    const img = document.createElement("img");
    img.src = albumArt;
    img.crossOrigin = "Anonymous"; // Handle CORS issues if the image is from another domain

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imgData = context.getImageData(0, 0, img.width, img.height);
        const data = imgData.data;

        // Create a map to count color occurrences
        const colorMap = new Map<string, number>();

        // Loop through each pixel to quantize colors
        for (let i = 0; i < data.length; i += 4) {
          const r = Math.floor(data[i] / 64) * 64; // Reduce color depth
          const g = Math.floor(data[i + 1] / 64) * 64; // Reduce color depth
          const b = Math.floor(data[i + 2] / 64) * 64; // Reduce color depth

          // Skip black and white colors
          if (
            (r === 0 && g === 0 && b === 0) ||
            (r === 255 && g === 255 && b === 255)
          ) {
            continue;
          }

          const colorKey = `${r},${g},${b}`;
          if (colorMap.has(colorKey)) {
            colorMap.set(colorKey, colorMap.get(colorKey)! + 1);
          } else {
            colorMap.set(colorKey, 1);
          }
        }

        // Find the most common non-black, non-white color
        let dominantColor = "";
        let maxCount = 0;

        colorMap.forEach((count, color) => {
          if (count > maxCount) {
            maxCount = count;
            dominantColor = color;
          }
        });

        setBgColor(`rgb(${dominantColor})`);
      }
    };
  }, [albumArt]);

  return (
    <div
      className={
        className ? `${className} spotify-audio-player` : "spotify-audio-player"
      }
      style={
        {
          backgroundColor: bgColor,
          "--spotify-bg": bgColor,
        } as React.CSSProperties
      }
    >
      <h3>
        {isPlaying ? "What Im currently listening..." : "Last played song"}
      
      <span className="powered-by">
        Powered by{" "}
        <a
          href="https://www.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/spotify-logo.png"
            alt="Spotify"
            style={{ height: "14px", verticalAlign: "middle" }}
            width={50}
            height={15}
          />
        </a>
      </span>
      </h3>
      <audio ref={audioRef}>
        <source src={preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Image
        className="song-cover mt-auto"
        ref={imgRef}
        src={albumArt}
        alt={name}
        width={300}
        height={300}
      />
      <div className="song-info flex align-middle gap-1 w-full">
        <button onClick={handlePlayPause}>
          {isAudioPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={35}
              height={35}
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className="song-meta">
          <Link href={link}>
            <h3>{name}</h3>
          </Link>
          <Link href={artistLink}>
            <p>{artist}</p>
          </Link>
        </div>
      </div>

      {/* {!isPlaying && <p style={{ fontStyle: 'italic' }}>Last played song</p>} */}
    </div>
  );
};

export default SpotifyAudioPlayer;
