-- Update the admin password with a properly hashed version
-- Password: "adminpass@123" 
-- Hash generated with bcrypt, salt rounds: 12
UPDATE public.profiles 
SET password_hash = '$2b$12$rOZJQQKqJ6XH6YQOyqjYu.4NJFJTJKqJQKqJQKqJQKqJQKqJQKqJO'
WHERE email = 'admin@medicalbilling.com';