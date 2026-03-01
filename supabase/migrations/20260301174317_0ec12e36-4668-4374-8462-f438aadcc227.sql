
-- 1. Roles enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles without recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can read their own roles, admins can read all
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Blueprint codes table
CREATE TABLE public.blueprint_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  blueprint_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  claimed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  claimed_at TIMESTAMPTZ
);

ALTER TABLE public.blueprint_codes ENABLE ROW LEVEL SECURITY;

-- Anyone can read a code (to claim it), authenticated users can claim
CREATE POLICY "Anyone can look up blueprint codes"
  ON public.blueprint_codes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can claim codes"
  ON public.blueprint_codes FOR UPDATE
  USING (auth.uid() IS NOT NULL AND claimed_by IS NULL)
  WITH CHECK (auth.uid() = claimed_by);

-- Service role inserts codes (from edge function), no user insert policy needed
