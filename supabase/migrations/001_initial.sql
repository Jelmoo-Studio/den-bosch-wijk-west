-- Ontmoetingsplekken tabel
CREATE TABLE ontmoetingsplekken (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  naam TEXT NOT NULL,
  beschrijving TEXT NOT NULL,
  adres TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  buurt TEXT NOT NULL CHECK (buurt IN ('Kruiskamp', 'Schutskamp', 'Deuteren', 'Engelen')),
  type TEXT NOT NULL CHECK (type IN ('complexgericht', 'buurtgericht')),
  doelgroepen TEXT[] NOT NULL DEFAULT '{}',
  contact_telefoon TEXT,
  contact_email TEXT,
  contact_website TEXT,
  openingstijden TEXT,
  foto_url TEXT,
  actief BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security inschakelen
ALTER TABLE ontmoetingsplekken ENABLE ROW LEVEL SECURITY;

-- Iedereen mag actieve plekken lezen (publiek)
CREATE POLICY "Publiek lezen actieve plekken"
  ON ontmoetingsplekken
  FOR SELECT
  USING (actief = true);

-- Ingelogde beheerders mogen alles lezen
CREATE POLICY "Beheerder leest alles"
  ON ontmoetingsplekken
  FOR SELECT
  TO authenticated
  USING (true);

-- Ingelogde beheerders mogen toevoegen
CREATE POLICY "Beheerder voegt toe"
  ON ontmoetingsplekken
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ingelogde beheerders mogen bijwerken
CREATE POLICY "Beheerder werkt bij"
  ON ontmoetingsplekken
  FOR UPDATE
  TO authenticated
  USING (true);

-- Ingelogde beheerders mogen verwijderen
CREATE POLICY "Beheerder verwijdert"
  ON ontmoetingsplekken
  FOR DELETE
  TO authenticated
  USING (true);
