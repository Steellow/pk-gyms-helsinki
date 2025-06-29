import { gyms } from '../../config/gyms.js';

function parseTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return parseInt(hours) * 60 + parseInt(minutes);
}

function formatTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return `${hours}.${minutes}`;
}

// Group shifts by weekday for display
function groupShiftsByWeekday(shifts) {
    const grouped = {};
    const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    shifts.forEach(shift => {
        if (!grouped[shift.weekday]) {
            grouped[shift.weekday] = [];
        }
        grouped[shift.weekday].push(shift);
    });
    
    // Sort shifts within each day by start time
    Object.keys(grouped).forEach(weekday => {
        grouped[weekday].sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
    });
    
    // Return in weekday order
    const orderedGrouped = {};
    weekdayOrder.forEach(day => {
        if (grouped[day]) {
            orderedGrouped[day] = grouped[day];
        }
    });
    
    return orderedGrouped;
}

function displayGyms() {
    const eventsContainer = document.getElementById('gyms-container');
    
    if (!eventsContainer) return;
    
    const sortedGyms = [...gyms].sort((a, b) => {
        // First sort by disclaimer presence (no disclaimer comes first)
        const aHasDisclaimer = !!a.disclaimer;
        const bHasDisclaimer = !!b.disclaimer;
        
        if (aHasDisclaimer !== bHasDisclaimer) {
            return aHasDisclaimer ? 1 : -1;
        }
        
        // Then sort alphabetically
        return a.name.localeCompare(b.name);
    });
    
    const gymsHTML = sortedGyms.map((gym, gymIndex) => {
        const eventId = `gym-${gymIndex}`;
        const equipment = gym.equipment;
        const mapsId = gym.mapsId;
        const price = gym.price;
        const disclaimer = gym.disclaimer;
        const website = gym.website;
        
        // Group shifts by weekday
        const groupedShifts = groupShiftsByWeekday(gym.shifts);
        const shiftsHTML = Object.entries(groupedShifts)
            .map(([weekday, shifts]) => {
                const dayShifts = shifts.map(shift => 
                    `${formatTime(shift.startTime)} – ${formatTime(shift.endTime)}`
                ).join(', ');
                return `<div class="weekday-shifts"><strong>${weekday}:</strong> ${dayShifts}</div>`;
            }).join('');
        
        return `
            <div class="gym-event">
                <div class="event-header" onclick="toggleGym('${eventId}')">
                    <div class="toggle-arrow" id="arrow-${eventId}"></div>
                    <div class="event-main">
                        <div class="gym-name">${gym.name}</div>
                    </div>
                </div>
                <div class="event-details" id="details-${eventId}">
                    <div class="equipment">
                        <div class="price-and-maps">
                            ${website ? `<div class="website-link"><a href="${website}" target="_blank" rel="noopener noreferrer">🌐 Website <span class="external-icon">↗</span></a></div>` : ''}
                            ${mapsId ? `<div class="maps-link"><a href="https://maps.app.goo.gl/${mapsId}" target="_blank">🗺️ Google Maps</a></div>` : ''}
                            ${price ? `<div class="price-item">💰 ${price}</div>` : ''}
                        </div>
                        ${equipment ? equipment.map(item => `<div class="equipment-item">${item}</div>`).join('') : ''}
                        ${disclaimer ? `<div class="disclaimer">❗ ${disclaimer}</div>` : ''}
                        <div class="shifts-section">
                            <div class="shifts-title">Open hours:</div>
                            ${shiftsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    eventsContainer.innerHTML = gymsHTML;
}

window.toggleGym = function(eventId) {
    const arrow = document.getElementById(`arrow-${eventId}`);
    const details = document.getElementById(`details-${eventId}`);
    
    if (!details) return;
    
    const isExpanded = details.classList.contains('expanded');
    
    if (isExpanded) {
        arrow.classList.remove('expanded');
        details.classList.remove('expanded');
    } else {
        arrow.classList.add('expanded');
        details.classList.add('expanded');
    }
}

export function renderGymsPage() {
    const pageContent = document.getElementById('page-content');
    
    pageContent.innerHTML = `
        <div id="gyms-container"></div>
        <div style="margin-top: 24px; text-align: center;">
            <a href="https://maps.app.goo.gl/MLcL3uAfPMg53FyXA" target="_blank" rel="noopener noreferrer" class="text-link">Gyms on Google Maps <span class="external-icon">↗</span></a>
        </div>
    `;
    
    displayGyms();
}