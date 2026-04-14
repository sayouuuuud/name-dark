-- Site Settings table (stores price, button links, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES 
  ('price', '100'),
  ('purchase_link', 'https://www.spaceship.com/s/buy/namedark.com/DoqmVGcgUG97f0er'),
  ('contact_email', 'sayedxiv@gmail.com')
ON CONFLICT (key) DO NOTHING;

-- Visits tracking table
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT,
  city TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  referrer TEXT,
  page TEXT DEFAULT '/',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Keep alive pings table (to track database activity)
CREATE TABLE IF NOT EXISTS keep_alive (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pinged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at);
CREATE INDEX IF NOT EXISTS idx_visits_country ON visits(country);
CREATE INDEX IF NOT EXISTS idx_keep_alive_pinged ON keep_alive(pinged_at);
