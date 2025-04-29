import { handleSignUp } from './signup.js';
import { handleSignIn } from './signin.js';
import { handleSignOut } from './signout.js';
import { handleGetUser } from './user.js';
import { corsHeaders } from '../utils/headers.js';

// Route mapping object
const routes = {
  '/auth/signup': {
    handler: handleSignUp,
    method: 'POST'
  },
  '/auth/signin': {
    handler: handleSignIn,
    method: 'POST'
  },
  '/auth/signout': {
    handler: handleSignOut,
    method: 'POST'
  },
  '/auth/user': {
    handler: handleGetUser,
    method: 'GET'
  }
};

// Main request handler
export async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Get the route configuration
  const route = routes[path];
  
  // Check if route exists
  if (!route) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Check if method is allowed
  if (request.method !== route.method) {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // Handle the request
  return route.handler(request);
} 