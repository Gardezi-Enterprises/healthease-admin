-- Create profiles table for admin user
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admin can access profiles" 
ON public.profiles 
FOR ALL 
USING (role = 'admin');

-- Insert hardcoded admin user (password: admin123)
INSERT INTO public.profiles (email, password_hash, role) 
VALUES ('admin@medicalbilling.com', '$2b$10$rOZJQQKqJ6XH6YQOyqjYu.4NJFJTJKqJQKqJQKqJQKqJQKqJQKqJ', 'admin');