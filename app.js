import { dinoSoorten, dinoInstanties } from './data/dinos.js'

// ── Navigatie ──────────────────────────────────────────────
const navKnoppen = document.querySelectorAll('.nav-knop')
const schermen = document.querySelectorAll('.scherm')

navKnoppen.forEach(knop => {
  knop.addEventListener('click', () => {
    const doel = knop.dataset.scherm
    navKnoppen.forEach(k => k.classList.toggle('actief', k === knop))
    schermen.forEach(s => s.classList.toggle('actief', s.id === `scherm-${doel}`))
    if (doel === 'radar') setTimeout(() => kaart.invalidateSize(), 50)
  })
})

// ── Dino Info lijst ───────────────────────────────────────
const dinoLijst = document.getElementById('dino-lijst')
dinoSoorten.forEach(soort => {
  const kaart = document.createElement('div')
  kaart.className = 'dino-kaart'
  kaart.innerHTML = `
    <img class="dino-kaart-icoon" src="${soort.icoon}" alt="${soort.naam}">
    <div class="dino-kaart-inhoud">
      <div class="dino-kaart-naam">${soort.naam} ${soort.gevaarlijk ? '⚠️' : '✅'}</div>
      ${soort.weetjes.map(w => `<div class="dino-kaart-weetje">${w}</div>`).join('')}
    </div>
  `
  dinoLijst.appendChild(kaart)
})

// ── Kaart ─────────────────────────────────────────────────
const VOORSCHOTEN = [52.1261, 4.4389]

const kaart = L.map('kaart', {
  center: VOORSCHOTEN,
  zoom: 8,
  zoomControl: false,
  attributionControl: false
})

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  subdomains: 'abcd'
}).addTo(kaart)

// Labels laag bovenop (zodat dino's er tussenin zitten)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  subdomains: 'abcd',
  pane: 'shadowPane'
}).addTo(kaart)

L.control.attribution({ prefix: '© CartoDB' }).addTo(kaart)

// ── Eigen locatie marker ───────────────────────────────────
const eigenLocatieIcon = L.divIcon({
  html: `<div class="eigen-locatie-marker">
    <div class="eigen-locatie-ping"></div>
    <div class="eigen-locatie-ping2"></div>
    <div class="eigen-locatie-dot"></div>
  </div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
})

L.marker(VOORSCHOTEN, { icon: eigenLocatieIcon, zIndexOffset: 1000 })
  .addTo(kaart)
  .bindPopup('<div class="dino-popup"><div class="dino-popup-naam">📍 Jij bent hier!</div>Kijk uit voor dino\'s in de buurt!</div>', { closeButton: false, offset: [0, -20] })

// ── Dino state ────────────────────────────────────────────
const dinos = dinoInstanties.map((inst, i) => {
  const soort = dinoSoorten.find(s => s.id === inst.soortId)
  return {
    id: i,
    soort,
    lat: inst.lat,
    lng: inst.lng,
    richting: inst.richting,
    snelheid: inst.snelheid,
    waterbak: inst.waterbak || null,
    marker: null
  }
})

function maakMarkerHTML(dino) {
  const hoek = dino.richting
  const milieuKlasse = dino.soort.milieu === 'water' ? 'water' : dino.soort.milieu === 'lucht' ? 'lucht' : dino.soort.gevaarlijk ? 'gevaarlijk' : 'veilig'
  return `<div class="dino-marker ${milieuKlasse}">
    <div class="dino-pijl-boven" style="transform: rotate(${hoek}deg)">▲</div>
    <img class="dino-marker-img" src="${dino.soort.icoon}" alt="${dino.soort.naam}">
  </div>`
}

let actievePopup = null

dinos.forEach(dino => {
  const icon = L.divIcon({
    html: maakMarkerHTML(dino),
    className: '',
    iconSize: [52, 68],
    iconAnchor: [26, 60]
  })

  dino.marker = L.marker([dino.lat, dino.lng], { icon }).addTo(kaart)

  dino.marker.on('click', (e) => {
    L.DomEvent.stopPropagation(e)
    if (actievePopup) { actievePopup.remove(); actievePopup = null }

    const richting = richtingNaarTekst(dino.richting)
    const komtNaarJou = komtDinoNaderend(dino)
    const willekeurigWeetje = dino.soort.weetjes[Math.floor(Math.random() * dino.soort.weetjes.length)]
    const waarschuwing = dino.soort.gevaarlijk
      ? `<div class="popup-waarschuwing">⚠️ ${komtNaarJou ? 'KOMT JOUW KANT OP!' : `Beweegt naar het ${richting}`}</div>`
      : `<div class="popup-veilig">✅ ${komtNaarJou ? 'Komt jouw kant op, maar is vriendelijk!' : `Loopt naar het ${richting}`}</div>`

    const popup = L.popup({ closeButton: false, offset: [0, -60], maxWidth: 220 })
      .setLatLng([dino.lat, dino.lng])
      .setContent(`
        <div class="dino-popup">
          <div class="dino-popup-naam">${dino.soort.naam}</div>
          ${waarschuwing}
          <div class="dino-popup-weetje">${willekeurigWeetje}</div>
        </div>
      `)
      .openOn(kaart)
    actievePopup = popup
  })
})

kaart.on('click', () => {
  if (actievePopup) { actievePopup.remove(); actievePopup = null }
})

// ── Richting helpers ───────────────────────────────────────
function richtingNaarTekst(graden) {
  const g = ((graden % 360) + 360) % 360
  const richtingen = ['noorden','noordoosten','oosten','zuidoosten','zuiden','zuidwesten','westen','noordwesten']
  return richtingen[Math.round(g / 45) % 8]
}

function komtDinoNaderend(dino) {
  const hoek = dino.richting * (Math.PI / 180)
  const dLat = VOORSCHOTEN[0] - dino.lat
  const dLng = VOORSCHOTEN[1] - dino.lng
  const dinoVecLat = Math.cos(hoek)
  const dinoVecLng = Math.sin(hoek)
  const dot = dinoVecLat * dLat + dinoVecLng * dLng
  return dot > 0
}

// ── Tijdlijn grafiek ──────────────────────────────────────
const GRAFIEK_MINUTEN = 180
const STAP_MIN = 5

// Per tijdstap: hoeveel gevaarlijke (trex) vs veilige (brachio) dino's
function maakActiviteitData() {
  const stappen = GRAFIEK_MINUTEN / STAP_MIN
  return Array.from({ length: stappen }, (_, i) => {
    const t = i / stappen
    const trex    = Math.min(1, Math.exp(-Math.pow((t - 0.25) / 0.09, 2)) * 0.95
                             + Math.exp(-Math.pow((t - 0.78) / 0.07, 2)) * 0.8
                             + Math.random() * 0.04)
    const brachio = Math.min(1, Math.exp(-Math.pow((t - 0.50) / 0.13, 2)) * 0.7
                             + Math.exp(-Math.pow((t - 0.88) / 0.05, 2)) * 0.5
                             + Math.random() * 0.04)
    return { trex, brachio, totaal: Math.min(1, trex + brachio * 0.5) }
  })
}

const activiteitData = maakActiviteitData()
let huidigOffset = 0
let sleepX = null

const canvas  = document.getElementById('grafiek')
const tooltip = document.getElementById('grafiek-tooltip')
const ctx     = canvas.getContext('2d')

function barKleur(d, alpha) {
  // Rood = trex domineert, groen = brachio domineert, oranje = gemengd
  const totaal = d.trex + d.brachio
  if (totaal < 0.05) return `rgba(80,80,100,${alpha})`
  const roodFractie = d.trex / totaal
  const r = Math.round(106 + roodFractie * (232 - 106))
  const g = Math.round(170 - roodFractie * (170 - 60))
  const b = Math.round(90  - roodFractie * (90  - 74))
  return `rgba(${r},${g},${b},${alpha})`
}

function tekenGrafiek(hoverX) {
  const W = canvas.offsetWidth
  const H = canvas.offsetHeight
  canvas.width  = W * devicePixelRatio
  canvas.height = H * devicePixelRatio
  ctx.scale(devicePixelRatio, devicePixelRatio)

  const paddingBottom = 18
  const grafiekH = H - paddingBottom
  const stappen  = activiteitData.length
  const barBreedte = W / stappen
  const barGap = Math.max(1, barBreedte * 0.15)

  // Horizontale rasterlijnen
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 1
  ;[0.33, 0.66].forEach(y => {
    ctx.beginPath()
    ctx.moveTo(0, grafiekH * (1 - y))
    ctx.lineTo(W, grafiekH * (1 - y))
    ctx.stroke()
  })

  // Bars tekenen
  activiteitData.forEach((d, i) => {
    const x = i * barBreedte + barGap / 2
    const breedte = barBreedte - barGap
    const barH = grafiekH * d.totaal
    const y = grafiekH - barH

    // Gradient per bar van kleur (boven) naar doorzichtig (onder)
    const grad = ctx.createLinearGradient(0, y, 0, grafiekH)
    grad.addColorStop(0,   barKleur(d, 0.9))
    grad.addColorStop(1,   barKleur(d, 0.2))
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.roundRect(x, y, breedte, barH, [3, 3, 0, 0])
    ctx.fill()
  })

  // Tijdlabels
  const nu = new Date()
  ctx.font = '10px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  const labelIdxs = [0, 9, 18, 27, 36]
  labelIdxs.forEach(i => {
    if (i >= stappen) return
    const x  = i * barBreedte + barBreedte / 2
    const dt = new Date(nu.getTime() + i * STAP_MIN * 60000)
    const lbl = i === 0 ? 'Nu' : `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`
    ctx.fillStyle = 'rgba(160,160,176,0.9)'
    ctx.fillText(lbl, x, H - 4)
  })

  // "Nu" stippellijn
  ctx.setLineDash([4, 3])
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(barBreedte / 2, 0); ctx.lineTo(barBreedte / 2, grafiekH); ctx.stroke()
  ctx.setLineDash([])

  // Selectie-lijn (huidige tijd of sleep)
  const lijnX = hoverX !== null ? hoverX : (huidigOffset / GRAFIEK_MINUTEN) * W
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(lijnX, 0); ctx.lineTo(lijnX, grafiekH); ctx.stroke()

  // Tooltip
  if (hoverX !== null) {
    const idx = Math.min(stappen - 1, Math.floor((hoverX / W) * stappen))
    const d   = activiteitData[idx]
    const dt  = new Date(nu.getTime() + idx * STAP_MIN * 60000)
    const tijd = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`
    const label = d.totaal < 0.1 ? 'Rustig 😌' : d.trex > d.brachio ? `T-Rexen! ⚠️` : `Brachiosaurus 🌿`
    tooltip.textContent = `${tijd} — ${label}`
    tooltip.style.opacity = '1'
    tooltip.style.left = `${Math.max(15, Math.min(85, (hoverX / W) * 100))}%`
  } else {
    tooltip.style.opacity = '0'
  }
}

function xNaarMinuten(x) {
  const W = canvas.offsetWidth
  return Math.round((x / W) * GRAFIEK_MINUTEN / STAP_MIN) * STAP_MIN
}

function verwerkGrafiekInteractie(x) {
  sleepX = Math.max(0, Math.min(canvas.offsetWidth, x))
  huidigOffset = xNaarMinuten(sleepX)
  tekenGrafiek(sleepX)
  tekenDinosOpOffset(huidigOffset / (STAP_MIN * 10))
}

canvas.addEventListener('mousedown', e => {
  verwerkGrafiekInteractie(e.offsetX)
  const stopSlepen = () => { sleepX = null; tekenGrafiek(null); document.removeEventListener('mouseup', stopSlepen) }
  document.addEventListener('mousemove', e2 => {
    const rect = canvas.getBoundingClientRect()
    verwerkGrafiekInteractie(e2.clientX - rect.left)
  })
  document.addEventListener('mouseup', stopSlepen)
})

canvas.addEventListener('touchstart', e => {
  e.preventDefault()
  const rect = canvas.getBoundingClientRect()
  verwerkGrafiekInteractie(e.touches[0].clientX - rect.left)
}, { passive: false })

canvas.addEventListener('touchmove', e => {
  e.preventDefault()
  const rect = canvas.getBoundingClientRect()
  verwerkGrafiekInteractie(e.touches[0].clientX - rect.left)
}, { passive: false })

canvas.addEventListener('touchend', () => { sleepX = null; tekenGrafiek(null) })

window.addEventListener('resize', () => tekenGrafiek(sleepX))
setTimeout(() => tekenGrafiek(null), 100)

function berekenPositie(dino, stappen) {
  const afstand = dino.snelheid * stappen * 10
  const hoek = dino.richting * (Math.PI / 180)
  return {
    lat: dino.lat + Math.cos(hoek) * afstand,
    lng: dino.lng + Math.sin(hoek) * afstand
  }
}

function tekenDinosOpOffset(offset) {
  dinos.forEach(dino => {
    const pos = berekenPositie(dino, offset)
    dino.marker.setLatLng([pos.lat, pos.lng])
    if (actievePopup) { actievePopup.remove(); actievePopup = null }
  })
}

// ── Animatie ──────────────────────────────────────────────
const STAP_INTERVAL = 2500
const RICHTINGSWIJZIGING_KANS = 0.10

setInterval(() => {
  if (huidigOffset !== 0) return

  dinos.forEach(dino => {
    if (Math.random() < RICHTINGSWIJZIGING_KANS) {
      dino.richting = (dino.richting + (Math.random() * 50 - 25) + 360) % 360
    }

    if (dino.waterbak) {
      // Bereken nieuwe positie
      const hoek = dino.richting * (Math.PI / 180)
      const nieuwLat = dino.lat + Math.cos(hoek) * dino.snelheid
      const nieuwLng = dino.lng + Math.sin(hoek) * dino.snelheid
      const b = dino.waterbak
      // Alleen bewegen als nieuwe positie binnen waterbak valt
      if (nieuwLat >= b.latMin && nieuwLat <= b.latMax && nieuwLng >= b.lngMin && nieuwLng <= b.lngMax) {
        dino.lat = nieuwLat
        dino.lng = nieuwLng
      } else {
        // Kaats terug: draai richting om + beetje willekeurig
        dino.richting = (dino.richting + 150 + Math.random() * 60) % 360
      }
    } else {
      const hoek = dino.richting * (Math.PI / 180)
      dino.lat += Math.cos(hoek) * dino.snelheid
      dino.lng += Math.sin(hoek) * dino.snelheid
      // Landdino's blijven in de buurt van Voorschoten
      const dLat = VOORSCHOTEN[0] - dino.lat
      const dLng = VOORSCHOTEN[1] - dino.lng
      const afstand = Math.sqrt(dLat * dLat + dLng * dLng)
      if (afstand > 0.03) {
        dino.richting = Math.atan2(dLng, dLat) * (180 / Math.PI)
      }
    }

    dino.marker.setLatLng([dino.lat, dino.lng])

    const icon = L.divIcon({
      html: maakMarkerHTML(dino),
      className: '',
      iconSize: [52, 68],
      iconAnchor: [26, 60]
    })
    dino.marker.setIcon(icon)
  })
}, STAP_INTERVAL)

