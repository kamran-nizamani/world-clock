// ============================================
// Timezone Clock Application
// ============================================

// All timezones
const ALL_TIMEZONES = [
    // Americas
    { name: 'New York', timezone: 'America/New_York', region: 'Americas', offset: 'UTC-5/-4' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles', region: 'Americas', offset: 'UTC-8/-7' },
    { name: 'Chicago', timezone: 'America/Chicago', region: 'Americas', offset: 'UTC-6/-5' },
    { name: 'Denver', timezone: 'America/Denver', region: 'Americas', offset: 'UTC-7/-6' },
    { name: 'Anchorage', timezone: 'America/Anchorage', region: 'Americas', offset: 'UTC-9/-8' },
    { name: 'Honolulu', timezone: 'Pacific/Honolulu', region: 'Americas', offset: 'UTC-10' },
    { name: 'Toronto', timezone: 'America/Toronto', region: 'Americas', offset: 'UTC-5/-4' },
    { name: 'Mexico City', timezone: 'America/Mexico_City', region: 'Americas', offset: 'UTC-6/-5' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo', region: 'Americas', offset: 'UTC-3/-2' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', region: 'Americas', offset: 'UTC-3' },

    // Europe
    { name: 'London', timezone: 'Europe/London', region: 'Europe', offset: 'UTC+0/+1' },
    { name: 'Paris', timezone: 'Europe/Paris', region: 'Europe', offset: 'UTC+1/+2' },
    { name: 'Berlin', timezone: 'Europe/Berlin', region: 'Europe', offset: 'UTC+1/+2' },
    { name: 'Madrid', timezone: 'Europe/Madrid', region: 'Europe', offset: 'UTC+1/+2' },
    { name: 'Rome', timezone: 'Europe/Rome', region: 'Europe', offset: 'UTC+1/+2' },
    { name: 'Amsterdam', timezone: 'Europe/Amsterdam', region: 'Europe', offset: 'UTC+1/+2' },
    { name: 'Moscow', timezone: 'Europe/Moscow', region: 'Europe', offset: 'UTC+3' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul', region: 'Europe', offset: 'UTC+3' },
    { name: 'Dublin', timezone: 'Europe/Dublin', region: 'Europe', offset: 'UTC+0/+1' },
    { name: 'Athens', timezone: 'Europe/Athens', region: 'Europe', offset: 'UTC+2/+3' },

    // Asia
    { name: 'Dubai', timezone: 'Asia/Dubai', region: 'Asia', offset: 'UTC+4' },
    { name: 'Bangalore', timezone: 'Asia/Kolkata', region: 'Asia', offset: 'UTC+5:30' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok', region: 'Asia', offset: 'UTC+7' },
    { name: 'Singapore', timezone: 'Asia/Singapore', region: 'Asia', offset: 'UTC+8' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', region: 'Asia', offset: 'UTC+8' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai', region: 'Asia', offset: 'UTC+8' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', region: 'Asia', offset: 'UTC+9' },
    { name: 'Seoul', timezone: 'Asia/Seoul', region: 'Asia', offset: 'UTC+9' },
    { name: 'Jakarta', timezone: 'Asia/Jakarta', region: 'Asia', offset: 'UTC+7' },
    { name: 'Manila', timezone: 'Asia/Manila', region: 'Asia', offset: 'UTC+8' },

    // Australia & Pacific
    { name: 'Sydney', timezone: 'Australia/Sydney', region: 'Pacific', offset: 'UTC+10/+11' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne', region: 'Pacific', offset: 'UTC+10/+11' },
    { name: 'Auckland', timezone: 'Pacific/Auckland', region: 'Pacific', offset: 'UTC+12/+13' },
    { name: 'Fiji', timezone: 'Pacific/Fiji', region: 'Pacific', offset: 'UTC+12/+13' },

    // Africa
    { name: 'Cairo', timezone: 'Africa/Cairo', region: 'Africa', offset: 'UTC+2' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg', region: 'Africa', offset: 'UTC+2' },
    { name: 'Lagos', timezone: 'Africa/Lagos', region: 'Africa', offset: 'UTC+1' },
    { name: 'Nairobi', timezone: 'Africa/Nairobi', region: 'Africa', offset: 'UTC+3' },
];

// Default timezones to display on first load
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
];

// ============================================
// State Management
// ============================================

let selectedTimezones = JSON.parse(localStorage.getItem('selectedTimezones')) || DEFAULT_TIMEZONES;
let updateInterval = null;

// ============================================
// DOM Elements
// ============================================

const clocksGrid = document.getElementById('clocksGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addBtn');
const resetBtn = document.getElementById('resetBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const modalSearch = document.getElementById('modalSearch');
const timezoneList = document.getElementById('timezoneList');
const searchResults = document.getElementById('searchResults');

// ============================================
// Event Listeners
// ============================================

addBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
resetBtn.addEventListener('click', resetToDefault);
modal.addEventListener('click', closeModalOnBackdrop);

searchInput.addEventListener('input', handleSearchInput);
modalSearch.addEventListener('input', handleModalSearch);

// ============================================
// Initialize App
// ============================================

function init() {
    populateTimezoneList();
    renderClocks();
    startClock();
    updateAddButtonState();
}

// ============================================
// Modal Functions
// ============================================

function openModal() {
    modal.classList.remove('hidden');
    populateTimezoneList();
    modalSearch.focus();
}

function closeModal() {
    modal.classList.add('hidden');
    modalSearch.value = '';
    filterTimezoneList('');
}

function closeModalOnBackdrop(e) {
    if (e.target === modal) {
        closeModal();
    }
}

function populateTimezoneList() {
    timezoneList.innerHTML = '';
    const groupedByRegion = {};

    ALL_TIMEZONES.forEach(tz => {
        if (!groupedByRegion[tz.region]) {
            groupedByRegion[tz.region] = [];
        }
        groupedByRegion[tz.region].push(tz);
    });

    Object.keys(groupedByRegion).sort().forEach(region => {
        groupedByRegion[region].forEach(tz => {
            const item = document.createElement('div');
            item.className = 'timezone-item';
            
            const isSelected = selectedTimezones.includes(tz.timezone);
            if (isSelected) {
                item.style.backgroundColor = 'var(--bg-hover)';
                item.style.borderColor = 'var(--primary-color)';
            }

            item.innerHTML = `
                <div style="font-weight: 600; color: var(--text-primary);">${tz.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${tz.timezone} (${tz.offset})</div>
            `;

            item.addEventListener('click', () => toggleTimezone(tz.timezone, item));
            timezoneList.appendChild(item);
        });
    });
}

function handleModalSearch(e) {
    const query = e.target.value.toLowerCase();
    filterTimezoneList(query);
}

function filterTimezoneList(query) {
    const items = timezoneList.querySelectorAll('.timezone-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}

// ============================================
// Timezone Management
// ============================================

function toggleTimezone(timezone, element) {
    const index = selectedTimezones.indexOf(timezone);
    
    if (index > -1) {
        selectedTimezones.splice(index, 1);
        element.style.backgroundColor = '';
        element.style.borderColor = '';
    } else {
        selectedTimezones.push(timezone);
        element.style.backgroundColor = 'var(--bg-hover)';
        element.style.borderColor = 'var(--primary-color)';
    }

    saveSelection();
    renderClocks();
    updateAddButtonState();
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length === 0) {
        searchResults.classList.remove('active');
        updateAddButtonState();
        return;
    }

    const filtered = ALL_TIMEZONES.filter(tz =>
        tz.name.toLowerCase().includes(query) ||
        tz.timezone.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        searchResults.classList.add('active');
        addBtn.disabled = true;
        return;
    }

    searchResults.innerHTML = filtered.map(tz => `
        <div class="search-result-item" data-timezone="${tz.timezone}">
            <strong>${tz.name}</strong><br>
            <small>${tz.timezone}</small>
        </div>
    `).join('');

    searchResults.classList.add('active');

    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const timezone = item.dataset.timezone;
            const tz = ALL_TIMEZONES.find(t => t.timezone === timezone);
            
            if (!selectedTimezones.includes(timezone)) {
                selectedTimezones.push(timezone);
                saveSelection();
                renderClocks();
                updateAddButtonState();
            }

            searchInput.value = '';
            searchResults.classList.remove('active');
            updateAddButtonState();
        });
    });

    addBtn.disabled = false;
}

function updateAddButtonState() {
    const query = searchInput.value.toLowerCase();
    addBtn.disabled = query.length === 0;
}

function resetToDefault() {
    selectedTimezones = DEFAULT_TIMEZONES;
    saveSelection();
    renderClocks();
    searchInput.value = '';
    searchResults.classList.remove('active');
}

function saveSelection() {
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
}

// ============================================
// Clock Rendering
// ============================================

function renderClocks() {
    if (selectedTimezones.length === 0) {
        clocksGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    clocksGrid.innerHTML = selectedTimezones.map(timezone => {
        const tzInfo = ALL_TIMEZONES.find(tz => tz.timezone === timezone);
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        return `
            <div class="clock-card" data-timezone="${timezone}">
                <div class="clock-header">
                    <div class="timezone-name">${tzInfo.name}</div>
                    <div class="timezone-info">${timezone}</div>
                </div>

                <div class="digital-clock blinking" data-timezone="${timezone}">
                    00:00:00
                </div>

                <div class="analog-clock" data-timezone="${timezone}">
                    <div class="hand hour" style="transform: rotate(0deg);"></div>
                    <div class="hand minute" style="transform: rotate(0deg);"></div>
                    <div class="hand second" style="transform: rotate(0deg);"></div>
                    <div class="clock-center"></div>
                </div>

                <div class="time-details">
                    <div class="detail-item">
                        <div class="detail-label">Date</div>
                        <div class="detail-value date-display" data-timezone="${timezone}"></div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Day</div>
                        <div class="detail-value day-display" data-timezone="${timezone}"></div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">UTC Offset</div>
                        <div class="detail-value">${tzInfo.offset}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Region</div>
                        <div class="detail-value">${tzInfo.region}</div>
                    </div>
                </div>

                <div class="clock-actions">
                    <button class="btn-copy" data-timezone="${timezone}" title="Copy current time">
                        📋 Copy Time
                    </button>
                    <button class="btn btn-remove" data-timezone="${timezone}" title="Remove this timezone">
                        ✕ Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners to copy buttons
    clocksGrid.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', copyTimeToClipboard);
    });

    // Add event listeners to remove buttons
    clocksGrid.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const timezone = this.dataset.timezone;
            selectedTimezones = selectedTimezones.filter(tz => tz !== timezone);
            saveSelection();
            renderClocks();
            updateAddButtonState();
        });
    });

    updateClocks();
}

function copyTimeToClipboard(e) {
    const timezone = e.target.dataset.timezone;
    const timeElement = document.querySelector(`.digital-clock[data-timezone="${timezone}"]`);
    const dateElement = document.querySelector(`.date-display[data-timezone="${timezone}"]`);
    
    const text = `${timeElement.textContent} - ${dateElement.textContent}`;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = e.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// ============================================
// Clock Update Logic
// ============================================

function startClock() {
    updateClocks();
    
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(updateClocks, 1000);
}

function updateClocks() {
    selectedTimezones.forEach(timezone => {
        updateClock(timezone);
    });
}

function updateClock(timezone) {
    const now = new Date();

    // Get time in the specified timezone
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    
    let hours = 0, minutes = 0, seconds = 0;
    
    parts.forEach(part => {
        if (part.type === 'hour') hours = parseInt(part.value);
        if (part.type === 'minute') minutes = parseInt(part.value);
        if (part.type === 'second') seconds = parseInt(part.value);
    });

    // Format digital clock
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const digitalDisplay = document.querySelector(`.digital-clock[data-timezone="${timezone}"]`);
    if (digitalDisplay) {
        digitalDisplay.textContent = timeString;
    }

    // Update analog clock
    const hourHand = document.querySelector(`.analog-clock[data-timezone="${timezone}"] .hand.hour`);
    const minuteHand = document.querySelector(`.analog-clock[data-timezone="${timezone}"] .hand.minute`);
    const secondHand = document.querySelector(`.analog-clock[data-timezone="${timezone}"] .hand.second`);

    if (hourHand && minuteHand && secondHand) {
        const secondDegrees = (seconds / 60) * 360;
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hourDegrees = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    // Update date and day
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const dayFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long'
    });

    const dateDisplay = document.querySelector(`.date-display[data-timezone="${timezone}"]`);
    const dayDisplay = document.querySelector(`.day-display[data-timezone="${timezone}"]`);

    if (dateDisplay) dateDisplay.textContent = dateFormatter.format(now);
    if (dayDisplay) dayDisplay.textContent = dayFormatter.format(now);
}

// ============================================
// Start Application
// ============================================

document.addEventListener('DOMContentLoaded', init);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (updateInterval) clearInterval(updateInterval);
});