-- Create the herbs table
CREATE TABLE IF NOT EXISTS herbs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    common_name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    description TEXT,
    traditional_uses TEXT[] DEFAULT '{}',
    modern_uses TEXT[] DEFAULT '{}',
    safety_precautions TEXT[] DEFAULT '{}',
    images JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_herbs_updated_at
    BEFORE UPDATE ON herbs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE herbs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON herbs
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON herbs
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON herbs
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON herbs
    FOR DELETE
    USING (auth.role() = 'authenticated');
