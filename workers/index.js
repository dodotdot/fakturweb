import { handleRequest } from './routes/index.js';
import { handleOptions } from './middleware/cors.js';

// Register the worker
addEventListener('fetch', event => {
  const request = event.request;
  
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    event.respondWith(handleOptions(request));
    return;
  }
  
  // Handle all other requests
  event.respondWith(handleRequest(request));
}); 