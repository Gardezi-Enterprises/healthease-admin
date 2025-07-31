import { supabase } from '@/integrations/supabase/client';
import { type TeamMember, type Job } from './localStorage';

// Check if storage bucket exists, create if not
export async function ensureStorageBucket(bucketName: string = 'team-images'): Promise<boolean> {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }

    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      // Create bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        return false;
      }
      
      console.log(`Storage bucket '${bucketName}' created successfully`);
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring storage bucket:', error);
    return false;
  }
}

// Convert file to base64 for fallback storage
export async function fileToBase64(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      console.error('Error reading file as base64');
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
}

// Image upload function with fallback to base64
export async function uploadImage(file: File, bucket: string = 'team-images'): Promise<string | null> {
  try {
    // Validate file
    if (!file || file.size === 0) {
      console.error('Invalid file provided');
      return null;
    }

    // Check file size (2MB limit for base64 fallback)
    if (file.size > 2097152) {
      console.error('File size exceeds 2MB limit');
      return null;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type. Only images are allowed.');
      return null;
    }

    console.log('Attempting Supabase Storage upload:', { fileSize: file.size, fileType: file.type });

    // Try Supabase Storage first
    try {
      // Ensure bucket exists
      const bucketReady = await ensureStorageBucket(bucket);
      if (bucketReady) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (!uploadError) {
          const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

          console.log('Image uploaded to Supabase Storage successfully:', data.publicUrl);
          return data.publicUrl;
        } else {
          console.warn('Supabase Storage upload failed, falling back to base64:', uploadError);
        }
      }
    } catch (storageError) {
      console.warn('Supabase Storage not available, falling back to base64:', storageError);
    }

    // Fallback to base64 encoding
    console.log('Using base64 fallback for image storage');
    const base64Data = await fileToBase64(file);
    if (base64Data) {
      console.log('Image converted to base64 successfully');
      return base64Data;
    }

    console.error('Both Supabase Storage and base64 conversion failed');
    return null;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}

// Delete image function
export async function deleteImage(imageUrl: string, bucket: string = 'team-images'): Promise<boolean> {
  try {
    // Extract the file path from the URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    if (!fileName) return false;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
}

// Team management functions
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
      return [];
    }

    // Transform database format to app format
    return data.map(item => ({
      id: item.id,
      name: item.name,
      role: item.role,
      bio: item.bio || '',
      image: item.image || ''
    }));
  } catch (error) {
    console.error('Error in getTeamMembers:', error);
    return [];
  }
}

export async function saveTeamMember(member: TeamMember): Promise<boolean> {
  try {
    // Transform app format to database format
    const dbMember = {
      id: member.id || undefined,
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      image: typeof member.image === 'string' ? member.image : (member.image ? '' : '')
    };

    const { error } = await supabase
      .from('teams')
      .upsert(dbMember);

    if (error) {
      console.error('Error saving team member:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveTeamMember:', error);
    return false;
  }
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteTeamMember:', error);
    return false;
  }
}

// Job management functions
export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    // Transform database format to app format
    return data.map(item => ({
      id: item.id,
      title: item.title,
      department: item.department,
      type: item.type,
      location: item.location,
      description: item.description,
      requirements: item.requirements || [],
      postedDate: item.posted_date
    }));
  } catch (error) {
    console.error('Error in getJobs:', error);
    return [];
  }
}

export async function saveJob(job: Job): Promise<boolean> {
  try {
    // Transform app format to database format
    const dbJob = {
      id: job.id || undefined,
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      description: job.description,
      requirements: job.requirements || [],
      posted_date: job.postedDate || new Date().toISOString().split('T')[0]
    };

    const { error } = await supabase
      .from('jobs')
      .upsert(dbJob);

    if (error) {
      console.error('Error saving job:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveJob:', error);
    return false;
  }
}

export async function deleteJob(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting job:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteJob:', error);
    return false;
  }
}
