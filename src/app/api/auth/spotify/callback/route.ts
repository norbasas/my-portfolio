import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'}/api/auth/spotify/callback`;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token } = response.data;

    // Check if token already exists in Prisma
    const existingToken = await prisma.token.findFirst();

    if (existingToken && existingToken.expiresAt > new Date()) {
      // Token exists and is not expired, update the data
      await prisma.token.update({
        where: { id: existingToken.id },
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from current date
        },
      });
    } else {
      // Token does not exist or is expired, create a new token
      await prisma.token.create({
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from current date
        },
      });
    }

    let token = await prisma.token.findFirst();
    console.log(token, '---------------');


    return NextResponse.json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error exchanging code:', error);
    return NextResponse.json({ error: 'Failed to exchange code' }, { status: 500 });
  }
}
