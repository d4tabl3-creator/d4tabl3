
-- Add preview tracking to profiles
ALTER TABLE public.profiles ADD COLUMN preview_used_at timestamp with time zone DEFAULT NULL;

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.preview_used_at IS 'Timestamp when the user consumed their free Blueprint Preview session. NULL means preview not yet used.';
