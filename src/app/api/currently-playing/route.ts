import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('spotifyAccessToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No access token found' }, { status: 401 });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.is_playing) {
      const currentlyPlaying = response.data.item;
      return NextResponse.json({
        name: currentlyPlaying.name,
        artist: currentlyPlaying.artists.map((artist: any) => artist.name).join(', '),
        albumArt: currentlyPlaying.album.images[0].url,
      });
    } else {
      return NextResponse.json({ message: 'No song currently playing' });
    }
  } catch (error) {
    console.error('Error fetching currently playing song:', error);
    return NextResponse.json({ error: 'Failed to fetch currently playing song' }, { status: 500 });
  }
}
