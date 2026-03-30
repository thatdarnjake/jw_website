// ---- Tab Navigation ----
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.view + 'View').classList.add('active');
        if (btn.dataset.view === 'professional' && map) {
            setTimeout(() => map.invalidateSize(), 100);
        }
    });
});

// ---- Sector Colors ----
const SECTOR_COLORS = {
    "Maritime": "#3b82f6",
    "Tall Buildings": "#f59e0b",
    "Arts & Culture": "#ec4899",
    "Sport": "#10b981",
    "Aviation": "#8b5cf6",
    "Civic": "#6366f1",
    "Innovation": "#06b6d4"
};

function getSectorColor(sector) {
    return SECTOR_COLORS[sector] || "#94a3b8";
}

// ---- Map Setup ----
const map = L.map('map', {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: true,
    scrollWheelZoom: true
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// ---- Map Markers ----
const markerLayer = L.layerGroup().addTo(map);

// Group projects by location to handle overlapping pins
const locationGroups = {};
PROJECTS.forEach(p => {
    const key = `${p.lat},${p.lng}`;
    if (!locationGroups[key]) locationGroups[key] = [];
    locationGroups[key].push(p);
});

Object.values(locationGroups).forEach(group => {
    if (group.length > 1) {
        const spread = 0.015;
        group.forEach((p, i) => {
            const angle = (2 * Math.PI * i) / group.length;
            p.lat += spread * Math.cos(angle);
            p.lng += spread * Math.sin(angle);
        });
    }
});

function addMarkers(projects) {
    markerLayer.clearLayers();
    projects.forEach(p => {
        const color = getSectorColor(p.sector);
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-dot" style="background:${color};box-shadow:0 0 8px ${color}88;"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const marker = L.marker([p.lat, p.lng], { icon })
            .bindTooltip(`<strong>${p.name}</strong><br>${p.location}`, {
                className: 'dark-tooltip',
                direction: 'top',
                offset: [0, -10]
            });

        marker.on('click', () => showProjectDetail(p));
        markerLayer.addLayer(marker);
    });
}

addMarkers(PROJECTS);

// ---- Filters ----
const filterRegion = document.getElementById('filterRegion');
const filterSector = document.getElementById('filterSector');

function getFilteredProjects() {
    const region = filterRegion.value;
    const sector = filterSector.value;
    return PROJECTS.filter(p => {
        if (region !== 'all' && p.region !== region) return false;
        if (sector !== 'all' && p.sector !== sector) return false;
        return true;
    });
}

function applyFilters() {
    const filtered = getFilteredProjects();
    renderProjectGrid(filtered);
    addMarkers(filtered);
}

filterRegion.addEventListener('change', applyFilters);
filterSector.addEventListener('change', applyFilters);

// ---- Project Detail Panel ----
function showProjectDetail(p) {
    const panel = document.getElementById('projectDetail');
    document.getElementById('detailName').textContent = p.name;
    document.getElementById('detailLocation').textContent = `${p.location} \u2022 ${p.year}`;

    // Image
    const imgContainer = document.getElementById('detailImage');
    if (p.image) {
        const img = new Image();
        img.src = p.image;
        img.alt = p.name;
        img.onerror = () => { imgContainer.innerHTML = ''; imgContainer.style.display = 'none'; };
        img.onload = () => { imgContainer.style.display = 'block'; };
        imgContainer.innerHTML = '';
        imgContainer.appendChild(img);
        imgContainer.style.display = 'none';
    } else {
        imgContainer.innerHTML = '';
        imgContainer.style.display = 'none';
    }

    // 3D Model (.glb)
    const modelContainer = document.getElementById('detailModel');
    if (p.model) {
        modelContainer.innerHTML = `<model-viewer src="${p.model}" alt="${p.name} 3D model" auto-rotate camera-controls touch-action="pan-y" shadow-intensity="1" exposure="0.8"></model-viewer>`;
        modelContainer.style.display = 'block';
    } else {
        modelContainer.innerHTML = '';
        modelContainer.style.display = 'none';
    }

    const metaParts = [];
    if (p.team.structural) metaParts.push(`<span class="meta-tag">Structural: ${p.team.structural}</span>`);
    if (p.team.architect) metaParts.push(`<span class="meta-tag">Architect: ${p.team.architect}</span>`);
    if (p.team.designer) metaParts.push(`<span class="meta-tag">Designer: ${p.team.designer}</span>`);
    if (p.team.developer) metaParts.push(`<span class="meta-tag">Developer: ${p.team.developer}</span>`);
    if (p.team.builder) metaParts.push(`<span class="meta-tag">Builder: ${p.team.builder}</span>`);
    metaParts.push(`<span class="meta-tag status-${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span>`);
    metaParts.push(`<span class="meta-tag sector" style="border-color:${getSectorColor(p.sector)}">${p.sector}</span>`);
    metaParts.push(`<span class="meta-tag">${p.region}</span>`);
    document.getElementById('detailMeta').innerHTML = metaParts.join('');

    document.getElementById('detailOverview').textContent = p.overview;
    document.getElementById('detailRole').innerHTML = `<strong>Role:</strong> ${p.role}`;

    panel.style.display = 'block';
}

document.getElementById('detailClose').addEventListener('click', () => {
    document.getElementById('projectDetail').style.display = 'none';
});

// ---- Project Grid ----
function renderProjectGrid(projects) {
    projects = projects || PROJECTS;
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';

    projects.forEach(p => {
        const color = getSectorColor(p.sector);
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.borderLeftColor = color;

        const imgHtml = p.image
            ? `<div class="card-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`
            : '';

        card.innerHTML = `
            ${imgHtml}
            <div class="card-content">
                <h3>${p.name}</h3>
                <p class="card-location">${p.location} &middot; ${p.year}</p>
                <p class="card-sector" style="color:${color}">${p.sector}</p>
                <p class="card-status">${p.status}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            showProjectDetail(p);
            map.setView([p.lat, p.lng], 6, { animate: true });
        });
        grid.appendChild(card);
    });
}

renderProjectGrid();

// ---- Flickr Public Feed ----
function loadFlickrPhotos() {
    const flickrUserId = '134663026@N07';
    const script = document.createElement('script');
    script.src = `https://api.flickr.com/services/feeds/photos_public.gne?id=${flickrUserId}&format=json&jsoncallback=handleFlickrResponse`;
    document.body.appendChild(script);
}

window.handleFlickrResponse = function(data) {
    const grid = document.getElementById('flickrGrid');
    if (!data.items || data.items.length === 0) {
        grid.innerHTML = '<p class="gallery-placeholder">No public Flickr photos found.</p>';
        return;
    }

    grid.innerHTML = '';

    data.items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'flickr-photo';
        // Use _b (1024px) for quality
        const src = item.media.m.replace('_m.', '_b.');
        el.innerHTML = `
            <a href="${item.link}" target="_blank" rel="noopener">
                <img src="${src}" alt="${item.title}" loading="lazy">
                <span class="photo-title">${item.title}</span>
            </a>
        `;
        grid.appendChild(el);
    });
};

loadFlickrPhotos();

// ---- Contact Form (spam-protected) ----

// Obfuscated email addresses - not readable by simple scrapers
const _c = [106,100,119,105,101,115,116]; // jdwiest
const _d = [103,109,97,105,108,46,99,111,109]; // gmail.com
function _addr(tag) {
    return String.fromCharCode(..._c) + '+' + tag + '@' + String.fromCharCode(..._d);
}

// Simple math captcha
let captchaA, captchaB;
function generateCaptcha() {
    captchaA = Math.floor(Math.random() * 10) + 1;
    captchaB = Math.floor(Math.random() * 10) + 1;
    document.getElementById('captchaQuestion').textContent = `What is ${captchaA} + ${captchaB}?`;
}
generateCaptcha();

// Rate limiting
function checkRateLimit() {
    const key = 'contact_sends';
    const now = Date.now();
    const sends = JSON.parse(localStorage.getItem(key) || '[]').filter(t => now - t < 3600000);
    if (sends.length >= 3) return false;
    sends.push(now);
    localStorage.setItem(key, JSON.stringify(sends));
    return true;
}

document.getElementById('contactSend').addEventListener('click', () => {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const body = document.getElementById('contactBody').value.trim();
    const honeypot = document.getElementById('contactWebsite').value;
    const answer = document.getElementById('captchaAnswer').value.trim();
    const type = document.querySelector('input[name="contactType"]:checked').value;

    // Honeypot check - bots fill hidden fields
    if (honeypot) return;

    if (!name || !email || !body) {
        alert('Please fill in all fields.');
        return;
    }

    // Captcha check
    if (parseInt(answer) !== captchaA + captchaB) {
        alert('Incorrect answer. Please try again.');
        generateCaptcha();
        document.getElementById('captchaAnswer').value = '';
        return;
    }

    // Rate limit check
    if (!checkRateLimit()) {
        alert('Too many messages sent. Please try again later.');
        return;
    }

    const to = type === 'photography' ? _addr('snaps') : _addr('work');
    const subject = encodeURIComponent(`[${type === 'photography' ? 'Photography' : 'Professional'}] Message from ${name}`);
    const mailBody = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${body}`);

    window.location.href = `mailto:${to}?subject=${subject}&body=${mailBody}`;
});
