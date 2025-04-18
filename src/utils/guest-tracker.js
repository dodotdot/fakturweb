import { supabase } from '../lib/supabase';
import { invoiceEvents } from './analytics';

/**
 * Utility for tracking guest PDF generation
 */

/**
 * Get the client's IP address using a simple API call
 * @returns {Promise<string|null>} - The IP address or null if it couldn't be retrieved
 */
async function getClientIpAddress() {
  try {
    // Use a public API to get the client's IP address
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return null;
  }
}

/**
 * Track a guest PDF generation event
 * @param {object} data - The PDF generation data
 * @param {string} data.invoiceTitle - The title of the invoice
 * @param {number} data.invoiceTotal - The total amount of the invoice
 * @param {string} data.ipAddress - The IP address of the user (optional)
 * @param {string} data.userAgent - The user agent of the browser (optional)
 * @param {string} data.guestName - The name of the guest (optional)
 * @param {string} data.guestEmail - The email of the guest (optional)
 * @returns {Promise} - A promise that resolves when the tracking is complete
 */
export async function trackGuestPdfGeneration(data) {
  try {
    // First track with Google Analytics
    invoiceEvents.download(data.invoiceTitle, data.invoiceTotal);
    
    // Try to get the client's IP address if not provided
    const ipAddress = data.ipAddress || await getClientIpAddress();
    
    // Then save to our own database
    const { error } = await supabase
      .from('guest_pdf_generations')
      .insert({
        title: data.invoiceTitle,
        amount: data.invoiceTotal,
        ip_address: ipAddress,
        user_agent: data.userAgent || navigator.userAgent,
        guest_name: data.guestName || null,
        guest_email: data.guestEmail || null,
        generated_at: new Date(),
      });
    
    if (error) {
      console.error('Error tracking guest PDF generation:', error);
    }
  } catch (error) {
    console.error('Failed to track guest PDF generation:', error);
  }
}

/**
 * Get guest PDF generation statistics
 * @returns {Promise<object>} - Statistics about guest PDF generations
 */
export async function getGuestPdfStats() {
  try {
    // Get all records
    const { data, error } = await supabase
      .from('guest_pdf_generations')
      .select('*')
      .order('generated_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    // Calculate statistics
    const total = data.length;
    
    // Today's count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = data.filter(item => {
      const generatedDate = new Date(item.generated_at);
      return generatedDate >= today;
    }).length;
    
    // Last 7 days count
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const weeklyCount = data.filter(item => {
      const generatedDate = new Date(item.generated_at);
      return generatedDate >= last7Days;
    }).length;
    
    // Last 30 days count
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const monthlyCount = data.filter(item => {
      const generatedDate = new Date(item.generated_at);
      return generatedDate >= last30Days;
    }).length;
    
    // Recent generations
    const recentGenerations = data.slice(0, 10);
    
    return {
      total,
      todayCount,
      weeklyCount,
      monthlyCount,
      recentGenerations
    };
  } catch (error) {
    console.error('Error fetching guest PDF stats:', error);
    return {
      total: 0,
      todayCount: 0,
      weeklyCount: 0,
      monthlyCount: 0,
      recentGenerations: []
    };
  }
} 