import { parseCookies } from 'nookies';
import { IncomingMessage } from 'http';

// This function checks both client-side and server-side for the token
export function getAccessToken(ctx?: { req?: IncomingMessage | null }) {
  // Server-side or API route
  if (ctx?.req) {
    const cookies = parseCookies(ctx as { req: IncomingMessage });
    return cookies.spotifyAccessToken || null;
  }

  // Client-side
  const cookies = parseCookies();
  return cookies.spotifyAccessToken || null;
}
