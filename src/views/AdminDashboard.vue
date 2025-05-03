<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 pb-2">Admin Dashboard</h1>
      <p class="text-gray-500">Monitor and manage system-wide data</p>
    </div>
    
    <!-- Dashboard Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'overview'"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Overview
          </button>
          <button
            @click="activeTab = 'members'"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'members'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Member Users
          </button>
          <button
            @click="activeTab = 'guests'"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'guests'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Guest Users
          </button>
          <button
            @click="activeTab = 'beta-testers'"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'beta-testers'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Beta Testers
          </button>
        </nav>
      </div>
    </div>
    
    <!-- Overview Tab -->
    <div v-if="activeTab === 'overview'">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Users</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ users.length }}</h2>
            </div>
            <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Invoices</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ invoices.length }}</h2>
            </div>
            <div class="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <h2 class="text-3xl font-semibold text-gray-900">
                {{ totalRevenue > 0 ? formatCurrency(totalRevenue) : 'Rp0' }}
              </h2>
            </div>
            <div class="h-12 w-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">New Users (30d)</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ newUsersCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Invoices Section -->
      <div class="mb-10">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Recent Invoices</h2>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody v-if="invoices.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="invoice in recentInvoices" :key="invoice.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ invoice.title }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ getUserEmail(invoice.user_id) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ invoice.to?.name || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ calculateInvoiceTotal(invoice) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Member Users Tab -->
    <div v-if="activeTab === 'members'">
      <!-- Member Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Member Users</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ memberUsers.length }}</h2>
            </div>
            <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Member Invoices</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ memberInvoices.length }}</h2>
            </div>
            <div class="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Member Revenue</p>
              <h2 class="text-3xl font-semibold text-gray-900">
                {{ memberRevenue > 0 ? formatCurrency(memberRevenue) : 'Rp0' }}
              </h2>
            </div>
            <div class="h-12 w-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">New Members (30d)</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ newMemberUsersCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Member Users Section -->
      <div class="mb-10">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Member Users</h2>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <div class="relative w-64">
              <input 
                type="text" 
                v-model="userSearch" 
                placeholder="Search users..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoices
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="filteredMemberUsers.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredMemberUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {{ getUserInitials(user.email) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.full_name || 'N/A' }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    ]"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ getUserInvoiceCount(user.id) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      v-if="user.role !== 'superadmin'"
                      @click="promoteToAdmin(user)" 
                      class="text-primary hover:text-primary-dark"
                    >
                      Promote
                    </button>
                    <button 
                      v-else
                      @click="demoteToUser(user)" 
                      class="text-gray-600 hover:text-gray-900"
                    >
                      Demote
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                  No member users found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Guest Users Tab -->
    <div v-if="activeTab === 'guests'">
      <!-- Guest Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total PDFs</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.total }}</h2>
            </div>
            <div class="h-12 w-12 bg-amber-100 text-amber-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Today</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.todayCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-red-100 text-red-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Last 7 Days</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.weeklyCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Last 30 Days</p>
              <h2 class="text-3xl font-semibold text-gray-900">{{ guestPdfStats.monthlyCount }}</h2>
            </div>
            <div class="h-12 w-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Guest PDF Generation Stats -->
      <div class="mb-10">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Guest PDF Generation</h2>
          <button 
            @click="refreshGuestStats" 
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        <!-- Recent Guest PDF Generations -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-4 border-b border-gray-100">
            <h3 class="text-base font-medium text-gray-900">Recent Guest PDFs</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Title</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                </tr>
              </thead>
              <tbody v-if="guestPdfStats.recentGenerations.length > 0" class="bg-white divide-y divide-gray-200">
                <tr v-for="gen in guestPdfStats.recentGenerations" :key="gen.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ gen.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ gen.guest_name || 'Anonymous' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a v-if="gen.guest_email" :href="`mailto:${gen.guest_email}`" class="text-primary hover:underline">
                      {{ gen.guest_email }}
                    </a>
                    <span v-else>-</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ gen.ip_address }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(gen.amount) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(gen.generated_at) }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    No guest PDFs have been generated yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Beta Testers Tab -->
    <div v-if="activeTab === 'beta-testers'">
      <BetaTesterList />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useInvoiceStore } from '../stores/invoice';
import { trackPageView } from '../utils/analytics';
import { getGuestPdfStats } from '../utils/guest-tracker';
import BetaTesterList from '../components/dashboard/BetaTesterList.vue';

const router = useRouter();
const authStore = useAuthStore();
const authInitialized = ref(false);
const isLoading = ref(true);
const users = ref([]);
const invoices = ref([]);
const userSearch = ref('');
const guestPdfStats = ref({
  total: 0,
  todayCount: 0,
  weeklyCount: 0,
  monthlyCount: 0,
  recentGenerations: []
});

// Active tab
const activeTab = ref('overview');

// Computed data
const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value;
  
  const search = userSearch.value.toLowerCase();
  return users.value.filter(user => 
    user.email?.toLowerCase().includes(search) || 
    user.full_name?.toLowerCase().includes(search)
  );
});

// Member users (registered users)
const memberUsers = computed(() => {
  return users.value.filter(user => user.id !== null);
});

// Filtered member users with search
const filteredMemberUsers = computed(() => {
  if (!userSearch.value) return memberUsers.value;
  
  const search = userSearch.value.toLowerCase();
  return memberUsers.value.filter(user => 
    user.email?.toLowerCase().includes(search) || 
    user.full_name?.toLowerCase().includes(search)
  );
});

// Member invoices (invoices created by registered users)
const memberInvoices = computed(() => {
  return invoices.value.filter(invoice => invoice.user_id !== null);
});

// Guest invoices (no user_id)
const guestInvoices = computed(() => {
  return invoices.value.filter(invoice => invoice.user_id === null);
});

// Recent invoices
const recentInvoices = computed(() => {
  return [...invoices.value]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);
});

// Total revenue
const totalRevenue = computed(() => {
  return invoices.value.reduce((sum, invoice) => {
    const total = calculateInvoiceTotal(invoice);
    return sum + (parseFloat(total.replace(/[^\d.-]/g, '')) || 0);
  }, 0);
});

// Member revenue
const memberRevenue = computed(() => {
  return memberInvoices.value.reduce((sum, invoice) => {
    const total = calculateInvoiceTotal(invoice);
    return sum + (parseFloat(total.replace(/[^\d.-]/g, '')) || 0);
  }, 0);
});

// Guest revenue
const guestRevenue = computed(() => {
  return guestInvoices.value.reduce((sum, invoice) => {
    const total = calculateInvoiceTotal(invoice);
    return sum + (parseFloat(total.replace(/[^\d.-]/g, '')) || 0);
  }, 0);
});

// New users count (last 30 days)
const newUsersCount = computed(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return users.value.filter(user => {
    const createdAt = new Date(user.created_at);
    return createdAt >= thirtyDaysAgo;
  }).length;
});

// New member users count (last 30 days)
const newMemberUsersCount = computed(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return memberUsers.value.filter(user => {
    const createdAt = new Date(user.created_at);
    return createdAt >= thirtyDaysAgo;
  }).length;
});

// Make sure only superadmin can access this page
onMounted(async () => {
  try {
    isLoading.value = true;
    
    // Make sure auth is initialized before checking permissions
    if (!authStore.isAuthenticated) {
      await authStore.initialize();
    }
    
    authInitialized.value = true;
    
    // Check if user is superadmin after auth is initialized
    if (!authStore.isSuperAdmin) {
      router.push('/dashboard');
      return;
    }
    
    // Track admin dashboard page view
    trackPageView('/admin', 'Admin Dashboard - System Monitoring');
    
    await Promise.all([
      fetchAllUsers(),
      fetchAllInvoices(),
      fetchGuestPdfStats()
    ]);
  } catch (error) {
    console.error('Error fetching admin data:', error);
  } finally {
    isLoading.value = false;
  }
});

async function fetchAllUsers() {
  try {
    const { data, error } = await authStore.supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    users.value = data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function fetchAllInvoices() {
  try {
    const { data, error } = await authStore.supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    invoices.value = data || [];
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}

async function fetchGuestPdfStats() {
  try {
    const stats = await getGuestPdfStats();
    guestPdfStats.value = stats;
  } catch (error) {
    console.error('Error fetching guest PDF stats:', error);
  }
}

async function refreshGuestStats() {
  await fetchGuestPdfStats();
}

// Helper functions
function getUserEmail(userId) {
  if (!userId) return 'Guest User';
  const user = users.value.find(u => u.id === userId);
  return user ? user.email : 'Unknown';
}

function getUserInvoiceCount(userId) {
  return invoices.value.filter(invoice => invoice.user_id === userId).length;
}

function calculateInvoiceTotal(invoice) {
  if (!invoice || !invoice.items) return formatCurrency(0);
  
  const subtotal = (invoice.items || []).reduce((sum, item) => {
    const amount = parseFloat(item.rate || 0) * parseFloat(item.quantity || 0);
    return sum + amount;
  }, 0);
  
  const taxRate = invoice.tax_rate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;
  
  return formatCurrency(total);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function getUserInitials(email) {
  if (!email) return 'N/A';
  
  const parts = email.split('@')[0].split(/[._-]/);
  if (parts.length > 1) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  
  return email.substring(0, 2).toUpperCase();
}

async function promoteToAdmin(user) {
  try {
    const { error } = await authStore.supabase
      .from('users')
      .update({ role: 'superadmin' })
      .eq('id', user.id);
    
    if (error) throw error;
    
    // Refresh user list
    await fetchAllUsers();
  } catch (error) {
    console.error('Error promoting user:', error);
  }
}

async function demoteToUser(user) {
  try {
    const { error } = await authStore.supabase
      .from('users')
      .update({ role: 'user' })
      .eq('id', user.id);
    
    if (error) throw error;
    
    // Refresh user list
    await fetchAllUsers();
  } catch (error) {
    console.error('Error demoting user:', error);
  }
}
</script> 