-- Check if the stocks table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'stocks'
);

-- Check the columns in the stocks table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'stocks';

-- Add industry column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'stocks' 
        AND column_name = 'industry'
    ) THEN
        ALTER TABLE stocks ADD COLUMN industry TEXT;
    END IF;
END $$;
