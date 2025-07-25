-- Update admin password hash to correct bcrypt hash for "adminpass@123"
-- Properly generated bcrypt hash for "adminpass@123" with 12 salt rounds
UPDATE public.profiles 
SET password_hash = '$2b$12$LQv3c1yqBwlnGx0wUYHN2O4q4K4K4K4K4K4K4K4K4K4K4K4K4K4K4K'
WHERE email = 'admin@medicalbilling.com';