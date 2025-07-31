-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    details TEXT DEFAULT '',
    detailed_title TEXT DEFAULT '',
    detailed_description TEXT DEFAULT '',
    detailed_content TEXT DEFAULT '',
    process_steps TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    benefits TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services are viewable by everyone" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Services are insertable by authenticated users" ON public.services
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Services are updatable by authenticated users" ON public.services
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Services are deletable by authenticated users" ON public.services
    FOR DELETE USING (auth.role() = 'authenticated');
