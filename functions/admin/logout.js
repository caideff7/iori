// functions/admin/logout.js

import { getSessionToken, buildSessionCookie } from '../_middleware';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const token = getSessionToken(request);
  if (token) {
    await env.NAV_AUTH1.delete(`session_${token}`);
    await env.NAV_AUTH1.delete(`csrf_${token}`);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin',
      'Set-Cookie': buildSessionCookie('', { maxAge: 0 }),
    },
  });
}
