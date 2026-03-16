-- PandaOffer Supabase Database Schema (Idempotent Version)

-- 1. Create Custom Types (Enums)
-- We use a DO block to avoid errors if types already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('user', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gpa_scale_type') THEN
        CREATE TYPE public.gpa_scale_type AS ENUM ('percentage', 'four', 'five');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_type') THEN
        CREATE TYPE public.product_type AS ENUM ('service', 'content_access', 'package');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'purchase_status') THEN
        CREATE TYPE public.purchase_status AS ENUM ('pending', 'completed', 'refunded', 'consumed');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cost_tier') THEN
        CREATE TYPE public.cost_tier AS ENUM ('tier_1', 'tier_2', 'tier_3');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'language_instruction') THEN
        CREATE TYPE public.language_instruction AS ENUM ('English', 'Chinese', 'Bilingual');
    END IF;
END$$;

-- 2. Authentication & Users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role public.user_role DEFAULT 'user'::public.user_role NOT NULL,
  entitlements JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to automatically create a user entry upon sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Products & Purchases
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type public.product_type NOT NULL,
  price NUMERIC NOT NULL,
  entitlement_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
  status public.purchase_status DEFAULT 'pending'::public.purchase_status NOT NULL,
  payment_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to add entitlement to user when purchase is completed
CREATE OR REPLACE FUNCTION public.handle_purchase_completion()
RETURNS trigger AS $$
DECLARE
  prod_entitlement TEXT;
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Get entitlement key
    SELECT entitlement_key INTO prod_entitlement FROM public.products WHERE id = NEW.product_id;
    
    IF prod_entitlement IS NOT NULL THEN
      UPDATE public.users
      SET entitlements = entitlements || to_jsonb(prod_entitlement)
      WHERE id = NEW.user_id AND NOT (entitlements @> to_jsonb(prod_entitlement));
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_purchase_completed ON public.purchases;
CREATE TRIGGER on_purchase_completed
  AFTER UPDATE ON public.purchases
  FOR EACH ROW EXECUTE PROCEDURE public.handle_purchase_completion();

-- 4. User Profiles & AI Matcher
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  nationality TEXT NOT NULL,
  target_major TEXT NOT NULL,
  gpa_scale public.gpa_scale_type NOT NULL,
  gpa_value NUMERIC NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CRM & Engagement
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Dynamic Content (Cities, Universities & Programs)
CREATE TABLE IF NOT EXISTS public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  province TEXT NOT NULL,
  cost_of_living_tier public.cost_tier NOT NULL,
  monthly_living_cost_usd NUMERIC,
  climate TEXT,
  expat_friendliness INTEGER CHECK (expat_friendliness >= 1 AND expat_friendliness <= 5),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  ranking INTEGER,
  international_student_pct NUMERIC,
  campus_quality INTEGER CHECK (campus_quality >= 1 AND campus_quality <= 5),
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  degree_level TEXT NOT NULL,
  language_of_instruction public.language_instruction NOT NULL,
  tuition_fee NUMERIC,
  duration_years NUMERIC,
  admission_requirements JSONB,
  scholarships_available BOOLEAN DEFAULT false,
  career_prospects TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- users: users read/update own, admins read/update all
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users" ON public.users FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users" ON public.users FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- products: everyone can read, admins can modify
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- purchases: users read own, admins read/update all
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;
CREATE POLICY "Users can view own purchases" ON public.purchases FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own purchases" ON public.purchases;
CREATE POLICY "Users can insert own purchases" ON public.purchases FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all purchases" ON public.purchases;
CREATE POLICY "Admins can view all purchases" ON public.purchases FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update all purchases" ON public.purchases;
CREATE POLICY "Admins can update all purchases" ON public.purchases FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- user_profiles: users read/update own, admins read/update all
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
CREATE POLICY "Admins can view all profiles" ON public.user_profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;
CREATE POLICY "Admins can update all profiles" ON public.user_profiles FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- leads: anyone can insert, admins read/update
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- feedbacks: anyone can insert, admins read/update
DROP POLICY IF EXISTS "Anyone can insert feedbacks" ON public.feedbacks;
CREATE POLICY "Anyone can insert feedbacks" ON public.feedbacks FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view feedbacks" ON public.feedbacks;
CREATE POLICY "Admins can view feedbacks" ON public.feedbacks FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update feedbacks" ON public.feedbacks;
CREATE POLICY "Admins can update feedbacks" ON public.feedbacks FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete feedbacks" ON public.feedbacks;
CREATE POLICY "Admins can delete feedbacks" ON public.feedbacks FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- cities: anyone can read, admins modify
DROP POLICY IF EXISTS "Anyone can view cities" ON public.cities;
CREATE POLICY "Anyone can view cities" ON public.cities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert cities" ON public.cities;
CREATE POLICY "Admins can insert cities" ON public.cities FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update cities" ON public.cities;
CREATE POLICY "Admins can update cities" ON public.cities FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete cities" ON public.cities;
CREATE POLICY "Admins can delete cities" ON public.cities FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- universities: anyone can read, admins modify
DROP POLICY IF EXISTS "Anyone can view universities" ON public.universities;
CREATE POLICY "Anyone can view universities" ON public.universities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert universities" ON public.universities;
CREATE POLICY "Admins can insert universities" ON public.universities FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update universities" ON public.universities;
CREATE POLICY "Admins can update universities" ON public.universities FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete universities" ON public.universities;
CREATE POLICY "Admins can delete universities" ON public.universities FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- programs: anyone can read, admins modify
DROP POLICY IF EXISTS "Anyone can view programs" ON public.programs;
CREATE POLICY "Anyone can view programs" ON public.programs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert programs" ON public.programs;
CREATE POLICY "Admins can insert programs" ON public.programs FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can update programs" ON public.programs;
CREATE POLICY "Admins can update programs" ON public.programs FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete programs" ON public.programs;
CREATE POLICY "Admins can delete programs" ON public.programs FOR DELETE USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
