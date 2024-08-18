// pages/api/currently-playing.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const token = cookies.spotifyAccessToken;

  if (!token) {
    return res.status(401).json({ error: 'No access token found' });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.is_playing) {
      const currentlyPlaying = response.data.item;
      return res.status(200).json({
        name: currentlyPlaying.name,
        artist: currentlyPlaying.artists.map((artist: any) => artist.name).join(', '),
        albumArt: currentlyPlaying.album.images[0].url,
      });
    } else {
      return res.status(200).json({ message: 'No song currently playing' });
    }
  } catch (error) {
    console.error('Error fetching currently playing song:', error);
    return res.status(500).json({ error: 'Failed to fetch currently playing song' });
  }
}
