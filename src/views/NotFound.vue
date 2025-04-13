<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <h2 class="text-2xl font-semibold mt-4 mb-6">Page Not Found</h2>
      <p class="text-gray-500 mb-8">The page you are looking for does not exist or has been moved.</p>
      <router-link 
        to="/" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template> 