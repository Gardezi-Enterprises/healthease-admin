-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT DEFAULT '',
    image TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    type TEXT NOT NULL, -- Full-time, Part-time, Contract
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    posted_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at triggers for both tables
CREATE TRIGGER handle_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security (disable for now to avoid authentication issues in admin)
-- ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for teams table (commented out since RLS is disabled)
-- CREATE POLICY "Teams are viewable by everyone" ON public.teams
--     FOR SELECT USING (true);

-- CREATE POLICY "Teams are insertable by authenticated users" ON public.teams
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Teams are updatable by authenticated users" ON public.teams
--     FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Teams are deletable by authenticated users" ON public.teams
--     FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for jobs table (commented out since RLS is disabled)
-- CREATE POLICY "Jobs are viewable by everyone" ON public.jobs
--     FOR SELECT USING (true);

-- CREATE POLICY "Jobs are insertable by authenticated users" ON public.jobs
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Jobs are updatable by authenticated users" ON public.jobs
--     FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Jobs are deletable by authenticated users" ON public.jobs
--     FOR DELETE USING (auth.role() = 'authenticated');
