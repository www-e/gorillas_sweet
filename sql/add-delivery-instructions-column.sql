-- Script to add delivery_instructions column if it doesn't exist
-- Run this in Supabase SQL Editor

-- Check if column exists first
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'orders'
        AND column_name = 'delivery_instructions'
    ) THEN
        -- Add the column
        ALTER TABLE orders ADD COLUMN delivery_instructions TEXT;

        -- Add comment to document the column
        COMMENT ON COLUMN orders.delivery_instructions IS 'Optional delivery instructions provided by customer';

        RAISE NOTICE 'delivery_instructions column added successfully';
    ELSE
        RAISE NOTICE 'delivery_instructions column already exists';
    END IF;
END $$;

-- Verify the column was added
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'orders'
AND column_name = 'delivery_instructions';