import { NextResponse } from 'next/server';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const spotifyToken = await prisma.token.findFirst();


  if (spotifyToken?.expiresAt < new Date())  {
    return NextResponse.json({ error: 'No refresh token found' }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: spotifyToken.refreshToken,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    const token = response.data;

    if (spotifyToken && token) {
      await prisma.token.update({
        where: { id: spotifyToken.id },
        data: {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    } else {
      await prisma.token.create({
        data: {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    return NextResponse.json({ access_token: token.access_token });
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    return NextResponse.error();
  }
}
