-- Create stocks table first (referenced by other tables)
CREATE TABLE IF NOT EXISTS stocks (
  ticker TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert stock data
INSERT INTO stocks (ticker, name, sector, industry) VALUES
  ('AAPL', 'Apple Inc.', 'Technology', 'Consumer Electronics'),
  ('MSFT', 'Microsoft Corporation', 'Technology', 'Software'),
  ('GOOGL', 'Alphabet Inc.', 'Technology', 'Internet Content & Information'),
  ('AMZN', 'Amazon.com, Inc.', 'Consumer Cyclical', 'Internet Retail'),
  ('META', 'Meta Platforms, Inc.', 'Technology', 'Internet Content & Information'),
  ('TSLA', 'Tesla, Inc.', 'Consumer Cyclical', 'Auto Manufacturers'),
  ('NVDA', 'NVIDIA Corporation', 'Technology', 'Semiconductors'),
  ('JPM', 'JPMorgan Chase & Co.', 'Financial Services', 'Banks'),
  ('V', 'Visa Inc.', 'Financial Services', 'Credit Services'),
  ('WMT', 'Walmart Inc.', 'Consumer Defensive', 'Discount Stores')
ON CONFLICT (ticker) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  industry = EXCLUDED.industry;

-- Create sentiment_data table with foreign key reference to stocks
CREATE TABLE IF NOT EXISTS sentiment_data (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL REFERENCES stocks(ticker),
  source TEXT NOT NULL,
  score FLOAT NOT NULL,
  change FLOAT NOT NULL,
  posts_count INTEGER,
  keywords TEXT[],
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ticker, source, date)
);

-- Create satellite_data table with foreign key reference to stocks
CREATE TABLE IF NOT EXISTS satellite_data (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL REFERENCES stocks(ticker),
  location_name TEXT NOT NULL,
  activity_level INTEGER NOT NULL,
  activity_change INTEGER NOT NULL,
  coordinates JSONB,
  metrics JSONB,
  analysis TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ticker, location_name, date)
);

-- Create job_data table with foreign key reference to stocks
CREATE TABLE IF NOT EXISTS job_data (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL REFERENCES stocks(ticker),
  total_count INTEGER NOT NULL,
  total_change INTEGER NOT NULL,
  engineering_count INTEGER,
  engineering_change INTEGER,
  marketing_count INTEGER,
  marketing_change INTEGER,
  operations_count INTEGER,
  operations_change INTEGER,
  layoffs JSONB,
  analysis TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(ticker, date)
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  date DATE NOT NULL,
  url TEXT,
  stocks TEXT[],
  sentiment TEXT,
  content TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create signals table with foreign key reference to stocks
CREATE TABLE IF NOT EXISTS signals (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL REFERENCES stocks(ticker),
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  impact TEXT NOT NULL,
  strength TEXT NOT NULL,
  lead_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
