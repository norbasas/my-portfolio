import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID || '';
  const redirectUri = `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'}/api/auth/spotify/callback`;
  const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
  ].join(' ');

  const generateRandomStateString = () => {
    const stateLength = 32;
    return crypto.randomBytes(stateLength).toString('hex');
};

  const url = new URL('https://accounts.spotify.com/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scopes);
  url.searchParams.set('state', generateRandomStateString()); // Add a state parameter for security

  return NextResponse.redirect(url.toString());
}
