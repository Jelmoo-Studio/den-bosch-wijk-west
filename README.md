# Ontmoetingsplekken West — 's-Hertogenbosch

Interactieve website met een overzicht van alle ontmoetingsplekken in wijk West van 's-Hertogenbosch (Kruiskamp, Schutskamp, Deuteren en Engelen).

## Snel starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

De site werkt direct met demo-data. Voor echte opslag koppel je Supabase (zie hieronder).

---

## Supabase koppelen

### 1. Supabase project aanmaken
1. Ga naar [supabase.com](https://supabase.com) en maak een nieuw project aan
2. Kies regio **West Europe (Frankfurt)**

### 2. Database aanmaken
Ga in Supabase naar **SQL Editor** en voer uit:
- `supabase/migrations/001_initial.sql` — maakt de tabel en rechten aan
- `supabase/seed.sql` — voegt de testdata in (optioneel)

### 3. Omgevingsvariabelen instellen
Kopieer `.env.local.example` naar `.env.local` en vul in:

```
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
```

Je vindt deze waarden in Supabase onder **Settings → API**.

### 4. Beheerder aanmaken
Ga in Supabase naar **Authentication → Users → Add user** en maak een account aan voor de beheerder.

---

## Structuur

```
src/
├── app/
│   ├── page.tsx              # Publieke kaartpagina
│   ├── plek/[id]/page.tsx    # Detail per ontmoetingsplek
│   └── admin/
│       ├── page.tsx          # Admin startpagina
│       ├── dashboard/        # Overzicht alle plekken
│       ├── nieuw/            # Nieuwe plek toevoegen
│       └── plek/[id]/bewerken/ # Plek bewerken
├── components/
│   ├── Kaart.tsx             # Leaflet kaart (wrapper)
│   ├── KaartInner.tsx        # Leaflet implementatie
│   ├── PlekKaart.tsx         # Kaartje per plek in sidebar
│   └── PlekFormulier.tsx     # Formulier voor toevoegen/bewerken
└── lib/
    ├── types.ts              # TypeScript types
    ├── mockData.ts           # Demo-data
    ├── supabase.ts           # Supabase client
    └── plekken.ts            # Data-laag (mock of Supabase)
```

## Deployen op Vercel

1. Push naar GitHub
2. Ga naar [vercel.com](https://vercel.com) en importeer de repository
3. Voeg de omgevingsvariabelen toe onder **Settings → Environment Variables**
4. Deploy!
