-- Allow admins to insert blueprint codes (for test code generator)
CREATE POLICY "Admins can insert blueprint codes"
ON public.blueprint_codes
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to manage sales agents (insert)
-- Already covered by "Admins can manage agents" ALL policy