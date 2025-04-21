import { supabase } from './supabase';

/**
 * Fetch business profile data for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} - The business profile data
 */
export async function getBusinessProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    
    return data || {};
  } catch (error) {
    console.error('Error fetching business profile:', error);
    throw new Error('Failed to fetch business profile');
  }
}

/**
 * Update or create business profile for a user
 * @param {string} userId - The user ID
 * @param {Object} profileData - The business profile data
 * @returns {Promise<Object>} - The updated business profile
 */
export async function updateBusinessProfile(userId, profileData) {
  try {
    // Convert from camelCase to snake_case for DB
    const dbProfileData = {
      user_id: userId,
      company_name: profileData.companyName,
      business_email: profileData.businessEmail,
      business_phone: profileData.businessPhone,
      business_address: profileData.businessAddress,
      business_website: profileData.businessWebsite,
      business_tax_id: profileData.businessTaxId,
      business_logo: profileData.businessLogo,
      business_description: profileData.businessDescription,
      updated_at: new Date()
    };
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    let result;
    
    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from('profiles')
        .update(dbProfileData)
        .eq('user_id', userId)
        .select();
      
      if (error) throw error;
      result = data[0];
    } else {
      // Create new profile
      dbProfileData.created_at = new Date();
      dbProfileData.id = userId; // Set id equal to userId for RLS policies
      
      const { data, error } = await supabase
        .from('profiles')
        .insert([dbProfileData])
        .select();
      
      if (error) throw error;
      result = data[0];
    }
    
    return result;
  } catch (error) {
    console.error('Error updating business profile:', error);
    throw new Error('Failed to update business profile');
  }
}

/**
 * Upload business logo to storage
 * @param {File} file - The logo file to upload
 * @param {string} userId - The user ID
 * @returns {Promise<string>} - The URL of the uploaded logo
 */
export async function uploadBusinessLogo(file, userId) {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG and PNG are allowed.');
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('File size exceeds 2MB limit.');
    }
    
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `business-logos/${fileName}`;
    
    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading business logo:', error);
    throw new Error(error.message || 'Failed to upload logo');
  }
}

/**
 * Delete business logo from storage
 * @param {string} logoUrl - The URL of the logo to delete
 * @param {string} userId - The user ID
 * @returns {Promise<void>}
 */
export async function deleteBusinessLogo(logoUrl, userId) {
  try {
    // Extract file path from URL
    const baseUrl = supabase.storage.from('uploads').getPublicUrl('').data.publicUrl;
    const filePath = logoUrl.replace(baseUrl, '');
    
    // Delete file from storage
    const { error } = await supabase.storage
      .from('uploads')
      .remove([filePath]);
    
    if (error) throw error;
    
    // Update business profile to remove logo URL
    await supabase
      .from('profiles')
      .update({ business_logo: null })
      .eq('user_id', userId);
    
    return true;
  } catch (error) {
    console.error('Error deleting business logo:', error);
    throw new Error('Failed to delete logo');
  }
} 