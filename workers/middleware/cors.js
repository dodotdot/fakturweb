import { corsHeaders } from '../utils/headers.js';

export function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
} 