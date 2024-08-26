import { NextResponse } from 'next/server';
import axios, { AxiosResponse }  from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAccessToken = async () => {

  const existingToken = await prisma.token.findFirst();
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!existingToken?.refreshToken) {
    return null; // No refresh token available, likely not authenticated
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: existingToken?.refreshToken,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    return null;
  }
};

export async function GET() {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ error: 'Failed to retrieve Spotify token' }, { status: 401 });
  }

  try {
    const currentlyPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (currentlyPlayingResponse.data && currentlyPlayingResponse.data.is_playing) {
      return NextResponse.json({
        name: currentlyPlayingResponse.data.item.name,
        artist: currentlyPlayingResponse.data.item.artists.map((artist: any) => artist.name).join(', '),
        albumArt: currentlyPlayingResponse.data.item.album.images[0].url,
        isPlaying: true,
      });
    }
    
    const recentlyPlayedResponse: AxiosResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 1,
      },
    });

    if (recentlyPlayedResponse.data && recentlyPlayedResponse.data.items.length > 0) {
      const lastPlayed = recentlyPlayedResponse.data.items[0].track;
      return NextResponse.json({
        name: lastPlayed.name,
        artist: lastPlayed.artists.map((artist: any) => artist.name).join(', '),
        albumArt: lastPlayed.album.images[0].url,
        link: lastPlayed.external_urls.spotify,
        artistLink: lastPlayed.artists[0].external_urls.spotify,
        isPlaying: false,
      });
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ error: 'Failed to fetch Spotify data' }, { status: 500 });
  }

  return NextResponse.json({ error: 'No song data available' }, { status: 204 });
}
