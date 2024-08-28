"use server";

import { PrismaClient } from "@prisma/client";
import axios, { AxiosResponse } from "axios";

const prisma = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") (global as any).prisma = prisma;
const getAccessToken = async () => {
  const existingToken = await prisma.token.findFirst();
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!existingToken?.refreshToken) {
    return null; // No refresh token available, likely not authenticated
  }

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", existingToken?.refreshToken);
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    return null;
  }
};

export const fetchSpotifyData = async () => {
  const token = await getAccessToken();
  if (!token) {
    return { error: "Failed to retrieve Spotify token", status: 401 };
  }

  try {
    const currentlyPlayingData = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (currentlyPlayingData.data && currentlyPlayingData.data.is_playing) {
      return {
        name: currentlyPlayingData.data.item.name,
        artist: currentlyPlayingData.data.item.artists
          .map((artist: any) => artist.name)
          .join(", "),
        albumArt: currentlyPlayingData.data.item.album.images[0].url,
        link: currentlyPlayingData.data.item.external_urls?.spotify,
        artistLink:
          currentlyPlayingData.data.item.artists[0].external_urls?.spotify,
        preview_url: currentlyPlayingData.data.item.preview_url,
        isPlaying: true,
      };
    }

    const recentlyPlayedResponse: AxiosResponse = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 1,
        },
      }
    );

    if (recentlyPlayedResponse.data) {
      if (
        recentlyPlayedResponse.data &&
        recentlyPlayedResponse.data.items.length > 0
      ) {
        const lastPlayed = recentlyPlayedResponse.data.items[0].track;
        return {
          name: lastPlayed.name,
          artist: lastPlayed.artists
            .map((artist: any) => artist.name)
            .join(", "),
          albumArt: lastPlayed.album.images[0].url,
          link: lastPlayed.external_urls.spotify,
          artistLink: lastPlayed.artists[0].external_urls.spotify,
          preview_url: lastPlayed.preview_url,
          isPlaying: false,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return { error: "Failed to fetch Spotify data", status: 500 };
  }

  return { error: "No song data available", status: 204 };
};
