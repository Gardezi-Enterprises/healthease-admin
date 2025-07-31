import { supabase } from '@/integrations/supabase/client';
import { type TeamMember, type Job } from './localStorage';

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
