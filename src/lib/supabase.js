import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadLogo(file, userId) {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to upload a logo');
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    // Upload file to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoice-logos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data } = supabase.storage
      .from('invoice-logos')
      .getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Error uploading logo:', error)
    throw error
  }
}

export async function deleteLogo(filePath, userId) {
  try {
    // Delete file from storage
    const { error: storageError } = await supabase.storage
      .from('invoice-logos')
      .remove([filePath])

    if (storageError) throw storageError

    // Delete record from database
    const { error: dbError } = await supabase
      .from('invoice_logos')
      .delete()
      .match({ user_id: userId, file_path: filePath })

    if (dbError) throw dbError

    return true
  } catch (error) {
    console.error('Error deleting logo:', error)
    throw error
  }
} 