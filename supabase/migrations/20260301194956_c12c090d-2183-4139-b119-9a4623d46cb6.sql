
-- Add-ons catalog
CREATE TABLE public.add_ons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_mxn integer NOT NULL DEFAULT 0,
  icon text DEFAULT 'Zap',
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active add-ons" ON public.add_ons FOR SELECT USING (active = true);

-- User purchased add-ons
CREATE TABLE public.user_add_ons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  add_on_id uuid NOT NULL REFERENCES public.add_ons(id) ON DELETE CASCADE,
  active boolean DEFAULT true,
  purchased_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, add_on_id)
);
ALTER TABLE public.user_add_ons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own add-ons" ON public.user_add_ons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own add-ons" ON public.user_add_ons FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Sales agents
CREATE TABLE public.sales_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  ref_code text NOT NULL UNIQUE,
  display_name text,
  phone text,
  commission_rate numeric DEFAULT 0.10,
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.sales_agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agents can view own profile" ON public.sales_agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage agents" ON public.sales_agents FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Referrals (agent → client)
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES public.sales_agents(id) ON DELETE CASCADE,
  client_user_id uuid,
  client_name text,
  client_business text,
  status text NOT NULL DEFAULT 'registered',
  first_month_paid boolean DEFAULT false,
  recurring_commission_rate numeric DEFAULT 0.10,
  total_earned numeric DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  subscribed_at timestamptz
);
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agents can view own referrals" ON public.referrals FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.sales_agents sa WHERE sa.id = agent_id AND sa.user_id = auth.uid())
);
CREATE POLICY "Agents can insert referrals" ON public.referrals FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.sales_agents sa WHERE sa.id = agent_id AND sa.user_id = auth.uid())
);
CREATE POLICY "Agents can update own referrals" ON public.referrals FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.sales_agents sa WHERE sa.id = agent_id AND sa.user_id = auth.uid())
);
CREATE POLICY "Admins can manage referrals" ON public.referrals FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Client referrals (client → client rewards)
CREATE TABLE public.client_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id uuid NOT NULL,
  referred_user_id uuid,
  referred_email text,
  status text NOT NULL DEFAULT 'invited',
  completed_analysis boolean DEFAULT false,
  subscribed boolean DEFAULT false,
  reward_granted boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.client_referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own client referrals" ON public.client_referrals FOR SELECT USING (auth.uid() = referrer_user_id);
CREATE POLICY "Users can insert client referrals" ON public.client_referrals FOR INSERT WITH CHECK (auth.uid() = referrer_user_id);
CREATE POLICY "Admins can manage client referrals" ON public.client_referrals FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Seed add-ons catalog
INSERT INTO public.add_ons (name, description, price_mxn, icon) VALUES
  ('Marketing Digital', 'Gestión de publicidad en redes sociales y campañas automatizadas.', 199, 'Megaphone'),
  ('Facturación y Cobranza', 'Módulo de facturación electrónica y seguimiento de pagos.', 249, 'Receipt'),
  ('Inventario Multi-Sucursal', 'Control de inventario sincronizado entre múltiples ubicaciones.', 299, 'Package'),
  ('CRM Clientes', 'Gestión avanzada de relaciones con clientes y seguimiento.', 179, 'Users'),
  ('Reportes Avanzados', 'Dashboards personalizados y exportación de datos.', 149, 'BarChart3'),
  ('Nómina Básica', 'Control de asistencia y cálculo de nómina simplificado.', 199, 'Calculator');
