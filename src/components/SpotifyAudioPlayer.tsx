"use client";
import { useEffect, useRef, useState } from "react";

interface SpotifyAudioPlayerProps {
  albumArt: string;
  preview_url: string;
  name: string;
  artist: string;
  isPlaying: any;
  className?: string;
}

const SpotifyAudioPlayer: React.FC<SpotifyAudioPlayerProps> = ({
  preview_url,
  albumArt,
  name,
  artist,
  isPlaying,
  className = "",
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
    const img = new Image();
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
      className={className ? `${className} spotify-audio-player` : "spotify-audio-player"}
      style={{
        backgroundColor: bgColor,
        "--spotify-bg": bgColor,
      } as React.CSSProperties}
    >
      <h2>
        {isPlaying ? "What Im currently listening..." : "Last played song"}
      </h2>
      <audio ref={audioRef}>
        <source src={preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
     
      <img className="song-cover w-32 mt-auto" ref={imgRef} src={albumArt} alt={name} />
      <div className="song-info flex align-middle gap-1">
        <button onClick={handlePlayPause}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            width={40}
            height={40}
            className="spotify-play-icon"
            style={{ pointerEvents: "none" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
        </button>
        <div>
          <h3>{name}</h3>
          <p>{artist}</p>
        </div>
      </div>

      {/* {!isPlaying && <p style={{ fontStyle: 'italic' }}>Last played song</p>} */}
    </div>
  );
};

export default SpotifyAudioPlayer;
