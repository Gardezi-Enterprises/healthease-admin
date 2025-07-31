Write-Host "=== SUPABASE SQL COMMANDS TO RUN MANUALLY ===" -ForegroundColor Green
Write-Host ""
Write-Host "1. Go to: https://supabase.com/dashboard/project/obkbluzdtskglhpjqakt/sql/new" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Copy and paste the following SQL:" -ForegroundContent Yellow
Write-Host ""
Write-Host "-- Drop the services table if it exists to recreate it properly
DROP TABLE IF EXISTS public.services CASCADE;

-- Create services table with correct structure
CREATE TABLE public.services (
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

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $`$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$`$ LANGUAGE plpgsql;

-- Create trigger for services table
CREATE TRIGGER handle_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Disable Row Level Security to allow operations from our app
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;

-- Insert some default services for testing
INSERT INTO public.services (id, title, description, features, benefits, process_steps) VALUES
('svc-medical-coding', 'Medical Coding', 'Accurate ICD-10, CPT, and HCPCS coding services for maximum reimbursement.', 
 ARRAY['ICD-10 Diagnosis Coding', 'CPT Procedure Coding', 'HCPCS Supply Coding', 'Modifier Application', 'Coding Audits'],
 ARRAY['Improved accuracy rates', 'Faster claim processing', 'Reduced denials', 'Compliance assurance'],
 ARRAY['Medical Record Review', 'ICD-10 Diagnosis Coding', 'CPT Procedure Coding', 'HCPCS Supply Coding', 'Modifier Application', 'Coding Audits', 'Final Review']
),
('svc-claims-processing', 'Claims Processing', 'End-to-end claims management from submission to payment posting.',
 ARRAY['Electronic Claims Submission', 'Claims Tracking', 'Denial Management', 'Appeals Processing', 'Payment Posting'],
 ARRAY['Faster reimbursements', 'Reduced administrative burden', 'Improved cash flow', 'Real-time reporting'],
 ARRAY['Electronic Claims Submission', 'Claims Tracking', 'Denial Management', 'Appeals Processing', 'Payment Posting']
),
('svc-revenue-cycle', 'Revenue Cycle Management', 'Comprehensive revenue cycle optimization to maximize your practice''s financial performance.',
 ARRAY['Patient Registration', 'Insurance Verification', 'Prior Authorization', 'Charge Capture', 'Collections Management'],
 ARRAY['Increased revenue', 'Reduced operating costs', 'Better patient experience', 'Strategic insights'],
 ARRAY['Patient Registration', 'Insurance Verification', 'Prior Authorization', 'Charge Capture', 'Collections Management']
);" -ForegroundColor Cyan

Write-Host ""
Write-Host "3. Click the 'RUN' button" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. After successful execution, test adding a service in your admin panel!" -ForegroundColor Green
