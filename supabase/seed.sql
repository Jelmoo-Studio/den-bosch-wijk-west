-- Fictieve testdata voor ontmoetingsplekken in West Den Bosch
INSERT INTO ontmoetingsplekken (naam, beschrijving, adres, lat, lng, buurt, type, doelgroepen, contact_telefoon, contact_email, contact_website, openingstijden, actief) VALUES
(
  'Wijkcentrum Helftheuvel',
  'Wijkcentrum Helftheuvel is het kloppende hart van West. Hier vinden allerlei activiteiten plaats voor bewoners van alle leeftijden: van yogalessen en schildercursussen tot informatiebijeenkomsten en buurtborrels.',
  'Kraaivenstraat 2, 5213 LE ''s-Hertogenbosch',
  51.6960, 5.2880,
  'Kruiskamp', 'buurtgericht',
  ARRAY['inwoners', 'ouderen', 'gezinnen'],
  '073-123 45 67', 'info@helftheuvel.nl', 'https://www.helftheuvel.nl',
  'Ma–vr: 9:00–21:00 | Za: 10:00–17:00', true
),
(
  'Buurthuis De Schutskamp',
  'Een laagdrempelige ontmoetingsplek midden in de Schutskamp. Buurthuis De Schutskamp organiseert regelmatig buurtactiviteiten en biedt ruimte aan lokale initiatieven en bewonersgroepen.',
  'Schutskampweg 10, 5216 HB ''s-Hertogenbosch',
  51.7025, 5.2895,
  'Schutskamp', 'buurtgericht',
  ARRAY['inwoners', 'ouderen', 'gezinnen'],
  '073-234 56 78', 'contact@buurthuis-schutskamp.nl', NULL,
  'Di en do: 10:00–16:00 | Za: 11:00–15:00', true
),
(
  'Kinderboerderij West',
  'Een gezellige kinderboerderij waar kinderen en hun ouders in contact komen met dieren en de natuur. Naast de dieren zijn er regelmatig educatieve activiteiten en workshops voor kinderen.',
  'Deuterseweg 15, 5215 MH ''s-Hertogenbosch',
  51.7018, 5.3010,
  'Deuteren', 'buurtgericht',
  ARRAY['kinderen', 'gezinnen', 'inwoners'],
  '073-345 67 89', 'info@kinderboerderijwest.nl', NULL,
  'Di–zo: 10:00–17:00', true
),
(
  'Jongerencentrum De Pit',
  'Jongerencentrum De Pit is de plek voor jongeren in West. Hier kunnen ze terecht voor vrije inloop, sport en spelactiviteiten, huiswerkbegeleiding en tal van cursussen en workshops.',
  'Kruiskampplein 5, 5213 NK ''s-Hertogenbosch',
  51.6948, 5.2870,
  'Kruiskamp', 'complexgericht',
  ARRAY['jongeren'],
  '073-456 78 90', 'depit@jongerenwerk073.nl', 'https://www.jongerenwerk073.nl',
  'Ma–vr: 15:00–21:00 | Za: 13:00–19:00', true
),
(
  'Ruilwinkel West',
  'Bij Ruilwinkel West kun je gratis spullen brengen en meenemen. Kleding, boeken, speelgoed, huishoudelijke artikelen — alles is welkom. Een mooie plek om elkaar te ontmoeten en samen duurzamer te leven.',
  'Schutskampstraat 22, 5216 HC ''s-Hertogenbosch',
  51.7030, 5.2880,
  'Schutskamp', 'buurtgericht',
  ARRAY['inwoners', 'gezinnen'],
  NULL, 'ruilwinkelwest@gmail.com', NULL,
  'Za: 10:00–13:00', true
),
(
  'GGD & MEE Zorgpunt West',
  'Het gezamenlijke zorgpunt van GGD Hart voor Brabant en MEE Brabant biedt laagdrempelige ondersteuning op het gebied van gezondheid, welzijn en participatie.',
  'Deuterseweg 45, 5215 ML ''s-Hertogenbosch',
  51.7015, 5.3025,
  'Deuteren', 'buurtgericht',
  ARRAY['inwoners', 'professionals'],
  '073-567 89 01', 'zorgpuntwest@ggdhvb.nl', NULL,
  'Ma–vr: 8:30–17:00', true
),
(
  'Dorpshuis Engelen',
  'Het dorpshuis van Engelen is het centrum van het gemeenschapsleven in dit groene deel van West. Hier vinden dorpsactiviteiten, vergaderingen van de wijkraad en diverse clubs en verenigingen hun thuis.',
  'Engelseweg 8, 5221 AC ''s-Hertogenbosch',
  51.7205, 5.2790,
  'Engelen', 'complexgericht',
  ARRAY['inwoners', 'ouderen', 'gezinnen'],
  '073-678 90 12', 'dorpshuisengelen@gmail.com', NULL,
  'Activiteiten afhankelijk van planning', true
),
(
  'Buurtmoestuin Deuteren',
  'In de buurtmoestuin Deuteren kunnen bewoners een eigen tuinbed huren. Naast tuinieren is het een plek voor ontmoeting, uitwisseling van kennis en gezamenlijke activiteiten rondom gezond voedsel en duurzaamheid.',
  'Deuterseweg 30, 5215 MJ ''s-Hertogenbosch',
  51.7020, 5.3018,
  'Deuteren', 'buurtgericht',
  ARRAY['inwoners', 'ouderen', 'gezinnen'],
  NULL, 'moestuindeuteren@gmail.com', NULL,
  'Altijd toegankelijk voor huurders', true
),
(
  'Moskee Al-Fourqaan',
  'Moskee Al-Fourqaan vervult een belangrijke sociale rol in West. Naast religieuze diensten organiseert de moskee maatschappelijke activiteiten, taalcursussen en ontmoetingen die bijdragen aan verbinding tussen culturen in de wijk.',
  'Schutskampweg 18, 5216 HB ''s-Hertogenbosch',
  51.7022, 5.2900,
  'Schutskamp', 'complexgericht',
  ARRAY['inwoners', 'gezinnen'],
  '073-789 01 23', 'info@alfourqaan.nl', NULL,
  'Dagelijks open voor gebed en activiteiten', true
),
(
  'Speeltuin De Ster',
  'Speeltuin De Ster is een heerlijke buitenspeelplek voor kinderen tot 12 jaar. Met klimrekken, schommels, zandbak en een waterpartij is het een populaire ontmoetingsplek voor gezinnen in de Kruiskamp.',
  'Kruiskampstraat 12, 5213 NE ''s-Hertogenbosch',
  51.6965, 5.2865,
  'Kruiskamp', 'buurtgericht',
  ARRAY['kinderen', 'gezinnen'],
  NULL, 'speeltuinder@gmail.com', NULL,
  'April–oktober: dagelijks 10:00–18:00', true
);
