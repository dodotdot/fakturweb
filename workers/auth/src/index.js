import { handleOptions } from './middleware/cors.js';
import { handleSignUp } from './routes/signup.js';
import { handleSignIn } from './routes/signin.js';
import { handleSignOut } from './routes/signout.js';
import { handleGetUser } from './routes/user.js';
import { corsHeaders } from './utils/headers.js';

// Main worker function
async function handleRequest(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  try {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle different auth endpoints
    switch (path) {
      case '/auth/signup':
        return handleSignUp(request);
      case '/auth/signin':
        return handleSignIn(request);
      case '/auth/signout':
        return handleSignOut(request);
      case '/auth/user':
        return handleGetUser(request);
      default:
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
    }
  } catch (error) {
    console.error('Request error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}

// Register the worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
}); 