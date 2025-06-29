import { gyms } from '../../config/gyms.js';

function parseTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return parseInt(hours) * 60 + parseInt(minutes);
}

function formatTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return `${hours}.${minutes}`;
}

function getEventsForWeekday(weekday) {
    return gyms
        .map(gym => ({
            name: gym.name,
            shifts: gym.shifts.filter(shift => shift.weekday === weekday),
            disclaimer: gym.disclaimer
        }))
        .filter(gym => gym.shifts.length > 0)
        .sort((a, b) => {
            // First sort by disclaimer presence (no disclaimer comes first)
            const aHasDisclaimer = !!a.disclaimer;
            const bHasDisclaimer = !!b.disclaimer;
            
            if (aHasDisclaimer !== bHasDisclaimer) {
                return aHasDisclaimer ? 1 : -1;
            }
            
            // Then sort by opening time
            return parseTime(a.shifts[0].startTime) - parseTime(b.shifts[0].startTime);
        });
}

function displayEventsForWeekday(weekday) {
    const events = getEventsForWeekday(weekday);
    const eventsContainer = document.getElementById('events-container');
    
    if (!eventsContainer) return;
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `<p class="no-events">No events scheduled for ${weekday}.</p>`;
        return;
    }
    
    const eventsHTML = events.map((gym, gymIndex) => {
        const shiftsHTML = gym.shifts.map(shift => 
            `<div class="shift">${formatTime(shift.startTime)} – ${formatTime(shift.endTime)}</div>`
        ).join('');
        
        const eventId = `event-${gymIndex}`;
        const gymData = gyms.find(g => g.name === gym.name);
        const equipment = gymData?.equipment;
        const mapsId = gymData?.mapsId;
        const price = gymData?.price;
        const disclaimer = gymData?.disclaimer;
        const website = gymData?.website;
        
        return `
            <div class="gym-event">
                <div class="event-header" onclick="toggleEvent('${eventId}')">
                    <div class="toggle-arrow" id="arrow-${eventId}"></div>
                    <div class="event-main">
                        <div class="gym-name">${gym.name}</div>
                        ${shiftsHTML}
                    </div>
                </div>
                ${(equipment || mapsId || price || disclaimer || website) ? `
                    <div class="event-details" id="details-${eventId}">
                        <div class="equipment">
                            <div class="price-and-maps">
                                ${website ? `<div class="website-link"><a href="${website}" target="_blank" rel="noopener noreferrer">🌐 Website <span class="external-icon">↗</span></a></div>` : ''}
                                ${mapsId ? `<div class="maps-link"><a href="https://maps.app.goo.gl/${mapsId}" target="_blank">🗺️ Google Maps</a></div>` : ''}
                                ${price ? `<div class="price-item">💰 ${price}</div>` : ''}
                            </div>
                            ${equipment ? equipment.map(item => `<div class="equipment-item">${item}</div>`).join('') : ''}
                            ${disclaimer ? `<div class="disclaimer">❗ ${disclaimer}</div>` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
    
    eventsContainer.innerHTML = eventsHTML;
}

window.toggleEvent = function(eventId) {
    const arrow = document.getElementById(`arrow-${eventId}`);
    const details = document.getElementById(`details-${eventId}`);
    
    if (!details) return; // No equipment to show
    
    const isExpanded = details.classList.contains('expanded');
    
    if (isExpanded) {
        arrow.classList.remove('expanded');
        details.classList.remove('expanded');
    } else {
        arrow.classList.add('expanded');
        details.classList.add('expanded');
    }
}

function setActiveWeekday(selectedWeekday) {
    document.querySelectorAll('.weekday-title').forEach(title => {
        title.classList.remove('active');
    });
    
    const selectedTitle = document.querySelector(`[data-weekday="${selectedWeekday}"]`);
    if (selectedTitle) {
        selectedTitle.classList.add('active');
    }
    
    displayEventsForWeekday(selectedWeekday);
}

function getCurrentWeekday() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
}

export function renderVapaavuorotPage() {
    const pageContent = document.getElementById('page-content');
    
    pageContent.innerHTML = `
        <div class="weekdays">
            <h2 class="weekday-title" data-weekday="Monday">Monday</h2>
            <h2 class="weekday-title" data-weekday="Tuesday">Tuesday</h2>
            <h2 class="weekday-title" data-weekday="Wednesday">Wednesday</h2>
            <h2 class="weekday-title" data-weekday="Thursday">Thursday</h2>
            <h2 class="weekday-title" data-weekday="Friday">Friday</h2>
            <h2 class="weekday-title" data-weekday="Saturday">Saturday</h2>
            <h2 class="weekday-title" data-weekday="Sunday">Sunday</h2>
        </div>
        <div id="events-container"></div>
    `;
    
    // Initialize with current weekday
    const currentWeekday = getCurrentWeekday();
    setActiveWeekday(currentWeekday);
    
    // Add click handlers to weekday titles
    document.querySelectorAll('.weekday-title').forEach(title => {
        title.addEventListener('click', () => {
            const weekday = title.getAttribute('data-weekday');
            setActiveWeekday(weekday);
        });
    });
}