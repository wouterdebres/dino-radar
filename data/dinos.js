export const dinoSoorten = [
  {
    id: "trex",
    naam: "T-Rex",
    icoon: "assets/icons/t-rex.png",
    gevaarlijk: true,
    milieu: "land",
    weetjes: [
      "Ik eet vlees en kom op beweging af. Versto je goed en beweeg niet!",
      "Mijn armpjes zijn klein maar mijn tanden zijn enorm groot.",
      "Ik kan ruiken van heel ver weg. Zorg dat de wind niet jouw kant op waait!"
    ]
  },
  {
    id: "brachiosaurus",
    naam: "Brachiosaurus",
    icoon: "assets/icons/dino.png",
    gevaarlijk: false,
    milieu: "land",
    weetjes: [
      "Ik ben de grootste! Maar maak je geen zorgen, ik eet alleen bladeren.",
      "Mijn nek is zo lang dat ik bomen eet die jij niet eens kunt zien.",
      "Als ik langs kom, voel je de grond trillen!"
    ]
  },
  {
    id: "vliegend",
    naam: "Pterosaurus",
    icoon: "assets/icons/vliegende-dino.PNG",
    gevaarlijk: true,
    milieu: "lucht",
    weetjes: [
      "Ik vlieg hoog boven je hoofd — kijk omhoog!",
      "Mijn vleugels zijn groter dan een auto. Ren naar binnen als je me ziet!",
      "Ik duik naar beneden als ik iets lekkers zie bewegen..."
    ]
  },
  {
    id: "stegosaurus",
    naam: "Stegosaurus",
    icoon: "assets/icons/stegosaurus.PNG",
    gevaarlijk: false,
    milieu: "land",
    weetjes: [
      "Ik heb grote platen op mijn rug — die gebruik ik om warm te worden in de zon.",
      "Mijn staart heeft scherpe stekels. Ik gebruik ze alleen als ik bang ben!",
      "Ik eet alleen planten. Varens en mossen zijn mijn favoriete eten."
    ]
  },
  {
    id: "water",
    naam: "Plesiosaurus",
    icoon: "assets/icons/water-dino.PNG",
    gevaarlijk: false,
    milieu: "water",
    weetjes: [
      "Ik zwem in het water. Ga niet zwemmen als ik in de buurt ben!",
      "Mijn nek is superlang. Ik kan ver het water uitkijken.",
      "Ik leef in meren en zeeën. Het strand is mijn favoriete plek."
    ]
  }
]

// Voorschoten en omgeving
const VLIETLAND_LAT = 52.118, VLIETLAND_LNG = 4.430

export const dinoInstanties = [
  // --- Voorschoten ---
  { soortId: "trex",          lat: 52.122, lng: 4.438, richting:  45, snelheid: 0.0003 },
  { soortId: "trex",          lat: 52.133, lng: 4.450, richting: 200, snelheid: 0.0003 },
  { soortId: "brachiosaurus", lat: 52.130, lng: 4.432, richting: 270, snelheid: 0.0001 },
  { soortId: "brachiosaurus", lat: 52.125, lng: 4.452, richting: 160, snelheid: 0.0001 },
  { soortId: "vliegend",      lat: 52.128, lng: 4.442, richting:  90, snelheid: 0.0004 },
  { soortId: "vliegend",      lat: 52.140, lng: 4.435, richting: 220, snelheid: 0.0005 },

  // --- Stegosaurussen ---
  { soortId: "stegosaurus", lat: 52.140, lng: 4.460, richting: 200, snelheid: 0.0001 }, // Leiden
  { soortId: "stegosaurus", lat: 52.100, lng: 4.380, richting:  60, snelheid: 0.0001 }, // Voorburg
  { soortId: "stegosaurus", lat: 48.860, lng:  2.350, richting:  90, snelheid: 0.0001 }, // Parijs
  { soortId: "stegosaurus", lat: 51.510, lng: -0.120, richting: 270, snelheid: 0.0001 }, // Londen
  { soortId: "stegosaurus", lat: 52.520, lng: 13.400, richting: 180, snelheid: 0.0001 }, // Berlijn
  { soortId: "stegosaurus", lat: -1.290, lng: 36.820, richting: 120, snelheid: 0.0001 }, // Nairobi

  // --- Vlietland (water) ---
  { soortId: "water", lat: 52.1135, lng: 4.4205, richting: 180, snelheid: 0.0001, waterbak: { latMin: 52.108, latMax: 52.122, lngMin: 4.413, lngMax: 4.435 } },
  { soortId: "water", lat: 52.1160, lng: 4.4270, richting:  60, snelheid: 0.0001, waterbak: { latMin: 52.108, latMax: 52.122, lngMin: 4.413, lngMax: 4.435 } },

  // --- Noordzee (water) ---
  { soortId: "water", lat: 52.300, lng: 3.980, richting:  30, snelheid: 0.0003, waterbak: { latMin: 51.4, latMax: 53.5, lngMin: 3.3, lngMax: 4.15 } },
  { soortId: "water", lat: 52.050, lng: 4.050, richting: 150, snelheid: 0.0003, waterbak: { latMin: 51.4, latMax: 53.5, lngMin: 3.3, lngMax: 4.15 } },
  { soortId: "water", lat: 52.800, lng: 4.100, richting: 200, snelheid: 0.0003, waterbak: { latMin: 51.4, latMax: 53.5, lngMin: 3.3, lngMax: 4.15 } },
  { soortId: "water", lat: 53.300, lng: 3.800, richting:  90, snelheid: 0.0003, waterbak: { latMin: 51.4, latMax: 53.5, lngMin: 3.3, lngMax: 4.15 } },

  // --- Nederland ---
  { soortId: "trex",          lat: 52.370, lng: 4.900, richting: 120, snelheid: 0.0003 }, // Amsterdam
  { soortId: "trex",          lat: 51.920, lng: 4.480, richting:  80, snelheid: 0.0003 }, // Rotterdam
  { soortId: "brachiosaurus", lat: 52.520, lng: 6.090, richting: 150, snelheid: 0.0001 }, // Zwolle
  { soortId: "brachiosaurus", lat: 53.220, lng: 6.570, richting: 310, snelheid: 0.0001 }, // Groningen
  { soortId: "vliegend",      lat: 52.080, lng: 4.310, richting: 180, snelheid: 0.0005 }, // Den Haag
  { soortId: "water", lat: 52.720, lng: 5.300, richting: 200, snelheid: 0.0002, waterbak: { latMin: 52.5, latMax: 53.1, lngMin: 5.0, lngMax: 5.7 } }, // IJsselmeer
  { soortId: "water", lat: 51.550, lng: 3.700, richting:  90, snelheid: 0.0002, waterbak: { latMin: 51.3, latMax: 51.7, lngMin: 3.3, lngMax: 4.0 } }, // Zeeland

  // --- België ---
  { soortId: "trex",          lat: 50.850, lng:  4.350, richting: 200, snelheid: 0.0003 }, // Brussel
  { soortId: "brachiosaurus", lat: 51.050, lng:  3.720, richting:  60, snelheid: 0.0001 }, // Gent
  { soortId: "vliegend",      lat: 50.630, lng:  5.570, richting: 310, snelheid: 0.0005 }, // Luik

  // --- Duitsland ---
  { soortId: "trex",          lat: 52.520, lng: 13.400, richting:  90, snelheid: 0.0003 }, // Berlijn
  { soortId: "trex",          lat: 48.140, lng: 11.580, richting: 270, snelheid: 0.0003 }, // München
  { soortId: "brachiosaurus", lat: 53.550, lng: 10.000, richting: 140, snelheid: 0.0001 }, // Hamburg
  { soortId: "brachiosaurus", lat: 50.110, lng:  8.680, richting:  45, snelheid: 0.0001 }, // Frankfurt
  { soortId: "vliegend",      lat: 51.230, lng:  6.780, richting: 200, snelheid: 0.0005 }, // Düsseldorf

  // --- Frankrijk ---
  { soortId: "trex",          lat: 48.860, lng:  2.350, richting: 160, snelheid: 0.0003 }, // Parijs
  { soortId: "brachiosaurus", lat: 43.300, lng:  5.380, richting: 270, snelheid: 0.0001 }, // Marseille
  { soortId: "vliegend",      lat: 45.750, lng:  4.850, richting: 100, snelheid: 0.0005 }, // Lyon
  { soortId: "water",         lat: 43.400, lng:  4.500, richting:  80, snelheid: 0.0002, waterbak: { latMin: 43.0, latMax: 44.0, lngMin: 3.0, lngMax: 7.0 } }, // Golf van Lion

  // --- Engeland ---
  { soortId: "trex",          lat: 51.510, lng: -0.120, richting:  45, snelheid: 0.0003 }, // Londen
  { soortId: "brachiosaurus", lat: 53.480, lng: -2.240, richting: 180, snelheid: 0.0001 }, // Manchester
  { soortId: "vliegend",      lat: 55.860, lng: -4.250, richting: 220, snelheid: 0.0005 }, // Glasgow
  { soortId: "water",         lat: 51.000, lng: -3.000, richting:  90, snelheid: 0.0002, waterbak: { latMin: 49.5, latMax: 52.0, lngMin: -6.0, lngMax: -1.0 } }, // Kanaal/Atlantisch

  // --- Spanje ---
  { soortId: "trex",          lat: 40.420, lng: -3.700, richting: 300, snelheid: 0.0003 }, // Madrid
  { soortId: "brachiosaurus", lat: 41.390, lng:  2.170, richting:  90, snelheid: 0.0001 }, // Barcelona
  { soortId: "vliegend",      lat: 37.390, lng: -5.990, richting: 130, snelheid: 0.0005 }, // Sevilla
  { soortId: "water",         lat: 36.800, lng: -3.500, richting: 200, snelheid: 0.0002, waterbak: { latMin: 36.0, latMax: 38.0, lngMin: -5.5, lngMax: -1.0 } }, // Middellandse Zee ES

  // --- Italië ---
  { soortId: "trex",          lat: 41.900, lng: 12.500, richting: 120, snelheid: 0.0003 }, // Rome
  { soortId: "brachiosaurus", lat: 45.460, lng:  9.190, richting: 240, snelheid: 0.0001 }, // Milaan
  { soortId: "vliegend",      lat: 43.770, lng: 11.260, richting:  60, snelheid: 0.0005 }, // Florence
  { soortId: "water",         lat: 44.300, lng: 13.800, richting: 180, snelheid: 0.0002, waterbak: { latMin: 43.0, latMax: 45.5, lngMin: 12.5, lngMax: 16.0 } }, // Adriatische Zee

  // --- Scandinavië ---
  { soortId: "trex",          lat: 59.910, lng: 10.750, richting: 200, snelheid: 0.0003 }, // Oslo
  { soortId: "brachiosaurus", lat: 59.330, lng: 18.070, richting: 270, snelheid: 0.0001 }, // Stockholm
  { soortId: "vliegend",      lat: 55.680, lng: 12.570, richting: 140, snelheid: 0.0005 }, // Kopenhagen
  { soortId: "water",         lat: 57.800, lng:  9.500, richting:  90, snelheid: 0.0002, waterbak: { latMin: 56.0, latMax: 60.0, lngMin: 7.0, lngMax: 13.0 } }, // Noordzee Noord

  // --- Oost-Europa ---
  { soortId: "trex",          lat: 52.230, lng: 21.010, richting: 310, snelheid: 0.0003 }, // Warschau
  { soortId: "trex",          lat: 50.080, lng: 14.440, richting: 180, snelheid: 0.0003 }, // Praag
  { soortId: "brachiosaurus", lat: 47.500, lng: 19.040, richting:  90, snelheid: 0.0001 }, // Boedapest
  { soortId: "vliegend",      lat: 48.210, lng: 16.370, richting: 220, snelheid: 0.0005 }, // Wenen
  { soortId: "trex",          lat: 44.820, lng: 20.460, richting: 100, snelheid: 0.0003 }, // Belgrado
  { soortId: "brachiosaurus", lat: 47.380, lng:  8.540, richting: 160, snelheid: 0.0001 }, // Zürich

  // --- Middellandse Zee ---
  { soortId: "water", lat: 38.500, lng: 15.500, richting: 270, snelheid: 0.0003, waterbak: { latMin: 36.0, latMax: 41.0, lngMin: 10.0, lngMax: 20.0 } },
  { soortId: "water", lat: 39.000, lng:  5.000, richting:  45, snelheid: 0.0003, waterbak: { latMin: 37.0, latMax: 42.0, lngMin: 1.0,  lngMax: 10.0 } },

  // --- Portugal ---
  { soortId: "trex",     lat: 38.720, lng: -9.140, richting:  60, snelheid: 0.0003 }, // Lissabon
  { soortId: "vliegend", lat: 41.150, lng: -8.610, richting: 200, snelheid: 0.0005 }, // Porto

  // --- Griekenland ---
  { soortId: "trex",     lat: 37.980, lng: 23.730, richting: 300, snelheid: 0.0003 }, // Athene
  { soortId: "water",    lat: 37.500, lng: 25.000, richting: 130, snelheid: 0.0002, waterbak: { latMin: 36.0, latMax: 39.0, lngMin: 22.0, lngMax: 28.0 } }, // Egeïsche Zee

  // --- Benin & West-Afrika ---
  { soortId: "trex",          lat:  6.370, lng:  2.430, richting:  90, snelheid: 0.0003 }, // Cotonou
  { soortId: "trex",          lat:  9.310, lng:  2.120, richting: 180, snelheid: 0.0003 }, // Parakou
  { soortId: "brachiosaurus", lat:  7.200, lng:  1.800, richting:  45, snelheid: 0.0001 }, // Midden-Benin
  { soortId: "brachiosaurus", lat:  6.800, lng:  2.700, richting: 270, snelheid: 0.0001 }, // Kust Benin
  { soortId: "vliegend",      lat:  8.000, lng:  2.350, richting: 120, snelheid: 0.0005 }, // Benin binnenland
  { soortId: "water",         lat:  6.100, lng:  2.300, richting: 180, snelheid: 0.0002, waterbak: { latMin: 5.0, latMax: 7.0, lngMin: 0.5, lngMax: 4.0 } }, // Golf van Guinee (Benin)
  { soortId: "water",         lat:  5.500, lng:  1.500, richting:  90, snelheid: 0.0002, waterbak: { latMin: 5.0, latMax: 7.0, lngMin: 0.5, lngMax: 4.0 } }, // Golf van Guinee (west)

  // --- Rest van Afrika ---
  { soortId: "trex",          lat: -1.290, lng: 36.820, richting: 200, snelheid: 0.0003 }, // Nairobi
  { soortId: "brachiosaurus", lat: -8.800, lng: 13.230, richting:  45, snelheid: 0.0001 }, // Luanda
  { soortId: "vliegend",      lat: 15.560, lng: 32.530, richting: 270, snelheid: 0.0005 }, // Khartoum
  { soortId: "trex",          lat:-25.970, lng: 32.580, richting: 130, snelheid: 0.0003 }, // Maputo
  { soortId: "water",         lat: -5.000, lng:  0.000, richting:  45, snelheid: 0.0003, waterbak: { latMin: -10.0, latMax: 2.0, lngMin: -5.0, lngMax: 8.0 } }, // Atlantisch (west-Afrika)

  // --- Noord-Amerika ---
  { soortId: "trex",          lat: 40.710, lng: -74.00, richting: 270, snelheid: 0.0003 }, // New York
  { soortId: "trex",          lat: 34.050, lng:-118.24, richting:  90, snelheid: 0.0003 }, // Los Angeles
  { soortId: "brachiosaurus", lat: 51.050, lng:-114.07, richting: 180, snelheid: 0.0001 }, // Calgary
  { soortId: "vliegend",      lat: 19.430, lng: -99.13, richting:  30, snelheid: 0.0005 }, // Mexico-Stad
  { soortId: "water",         lat: 25.000, lng: -85.00, richting: 200, snelheid: 0.0003, waterbak: { latMin: 20.0, latMax: 30.0, lngMin: -92.0, lngMax: -78.0 } }, // Golf van Mexico

  // --- Zuid-Amerika ---
  { soortId: "trex",          lat: -23.55, lng: -46.63, richting: 140, snelheid: 0.0003 }, // São Paulo
  { soortId: "brachiosaurus", lat:  -3.10, lng: -60.02, richting: 200, snelheid: 0.0001 }, // Manaus (jungle)
  { soortId: "vliegend",      lat: -12.05, lng: -77.04, richting:  60, snelheid: 0.0005 }, // Lima
  { soortId: "water",         lat: -15.00, lng: -40.00, richting: 270, snelheid: 0.0003, waterbak: { latMin: -25.0, latMax: -5.0, lngMin: -48.0, lngMax: -30.0 } }, // Zuid-Atlantisch

  // --- Azië ---
  { soortId: "trex",          lat: 35.680, lng: 139.69, richting: 300, snelheid: 0.0003 }, // Tokyo
  { soortId: "trex",          lat: 28.610, lng:  77.21, richting: 200, snelheid: 0.0003 }, // New Delhi
  { soortId: "brachiosaurus", lat: 39.910, lng: 116.39, richting:  90, snelheid: 0.0001 }, // Peking
  { soortId: "vliegend",      lat:  1.350, lng: 103.82, richting: 150, snelheid: 0.0005 }, // Singapore
  { soortId: "water",         lat: 15.000, lng: 110.00, richting:  45, snelheid: 0.0003, waterbak: { latMin: 5.0, latMax: 22.0, lngMin: 105.0, lngMax: 120.0 } }, // Zuid-Chinese Zee

  // --- Australië ---
  { soortId: "trex",          lat:-33.870, lng: 151.21, richting: 270, snelheid: 0.0003 }, // Sydney
  { soortId: "brachiosaurus", lat:-25.000, lng: 130.00, richting: 180, snelheid: 0.0001 }, // Outback
  { soortId: "vliegend",      lat:-27.470, lng: 153.02, richting:  90, snelheid: 0.0005 }, // Brisbane
  { soortId: "water",         lat:-20.000, lng: 150.00, richting: 200, snelheid: 0.0003, waterbak: { latMin: -25.0, latMax: -15.0, lngMin: 145.0, lngMax: 158.0 } }, // Groot Barrièrerif

  // --- Oceanen ---
  { soortId: "water", lat: 45.000, lng: -30.000, richting: 180, snelheid: 0.0003, waterbak: { latMin: 35.0, latMax: 55.0, lngMin: -45.0, lngMax: -15.0 } }, // Noord-Atlantisch
  { soortId: "water", lat:  0.000, lng: -25.000, richting:  90, snelheid: 0.0003, waterbak: { latMin: -10.0, latMax: 10.0, lngMin: -35.0, lngMax: -10.0 } }, // Midden-Atlantisch
  { soortId: "water", lat: 30.000, lng: -160.00, richting: 270, snelheid: 0.0003, waterbak: { latMin: 20.0, latMax: 40.0, lngMin: -175.0, lngMax: -145.0 } }, // Noord-Pacific
  { soortId: "water", lat:-40.000, lng:  20.000, richting:  90, snelheid: 0.0003, waterbak: { latMin: -50.0, latMax: -30.0, lngMin: 10.0, lngMax: 30.0 } }, // Zuidelijke Oceaan
  { soortId: "water", lat: -5.000, lng:  75.000, richting: 180, snelheid: 0.0003, waterbak: { latMin: -15.0, latMax: 5.0, lngMin: 65.0, lngMax: 85.0 } }, // Indische Oceaan
]
