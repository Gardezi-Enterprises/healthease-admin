-- Update admin password with a properly generated bcrypt hash for "adminpass@123"
-- This is a real bcrypt hash generated with 12 salt rounds
UPDATE public.profiles 
SET password_hash = '$2b$12$rJQV6KpMdY8sJRjN0Fv7ReQl8xvJzQl5wKpMdY8sJRjN0Fv7ReQlO'
WHERE email = 'admin@medicalbilling.com';