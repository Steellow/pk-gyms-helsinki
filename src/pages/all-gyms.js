import { gyms } from '../../config/gyms.js';
import { 
    normalizeWeekday, 
    isGymInSeason, 
    parseTime, 
    formatTime, 
    processEquipment,
    sortGyms,
    generateLinksHTML,
    createToggleHandler,
    validateAndProcessGyms
} from '../utils/gym-utils.js';

// Group shifts by weekday for display
function groupShiftsByWeekday(shifts) {
    if (!shifts || typeof shifts !== 'object') {
        return {};
    }
    
    const grouped = {};
    const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    Object.entries(shifts).forEach(([weekday, shift]) => {
        try {
            const normalizedWeekday = normalizeWeekday(weekday);
            if (!grouped[normalizedWeekday]) {
                grouped[normalizedWeekday] = [];
            }
            grouped[normalizedWeekday].push(shift);
        } catch (error) {
            console.error(`Error processing shift for ${weekday}:`, shift, error);
        }
    });
    
    // Sort shifts within each day by start time
    Object.keys(grouped).forEach(weekday => {
        try {
            grouped[weekday].sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
        } catch (error) {
            console.error(`Error sorting shifts for ${weekday}:`, grouped[weekday], error);
        }
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
    
    // Validate gym data and log errors
    validateAndProcessGyms(gyms);
    
    const sortedGyms = sortGyms(gyms, 'alphabetical');
    
    const gymsHTML = sortedGyms.map((gym, gymIndex) => {
        const eventId = `gym-${gymIndex}`;
        const equipment = processEquipment(gym);
        const { mapsId, price, disclaimer, website, actualParkourGym, isTelegramGroup } = gym;
        
        // Group shifts by weekday, but only show shifts if gym is in season
        const shiftsToShow = isGymInSeason(gym) ? gym.shifts : null;
        const groupedShifts = groupShiftsByWeekday(shiftsToShow);
        const shiftsHTML = Object.entries(groupedShifts)
            .map(([weekday, shifts]) => {
                const dayShifts = shifts.map(shift => 
                    `${formatTime(shift.startTime)} – ${formatTime(shift.endTime)}`
                ).join(', ');
                return `<div class="weekday-shifts"><strong>${weekday}:</strong> ${dayShifts}</div>`;
            }).join('');
        
        const hasShifts = shiftsToShow && typeof shiftsToShow === 'object' && Object.keys(shiftsToShow).length > 0;
        
        return `
            <div class="gym-event">
                <div class="event-header" onclick="toggleGym('${eventId}')">
                    <div class="toggle-arrow" id="arrow-${eventId}"></div>
                    <div class="event-main">
                        <div class="gym-name ${(actualParkourGym || isTelegramGroup) ? 'actual-parkour-gym' : ''}">${gym.name}${(actualParkourGym || isTelegramGroup) ? ' 🔥' : ''}</div>
                    </div>
                </div>
                <div class="event-details" id="details-${eventId}">
                    <div class="equipment">
                        ${generateLinksHTML(gym)}
                        ${equipment.map(item => `<div class="equipment-item">${item}</div>`).join('')}
                        ${disclaimer ? `<div class="disclaimer">❗ ${disclaimer}</div>` : ''}
                        ${hasShifts ? `
                            <div class="shifts-section">
                                <div class="shifts-title">Open hours:</div>
                                ${shiftsHTML}
                                ${!isTelegramGroup ? '<div class="hours-note">Check website for exceptions and most recent info about opening hours</div>' : ''}
                            </div>
                        ` : isGymInSeason(gym) ? `
                            <div class="shifts-section">
                                <div class="no-shifts">No regular open hours available. Check website for current information.</div>
                            </div>
                        ` : `
                            <div class="shifts-section">
                                <div class="no-shifts">Currently no open shifts. Check website for details.</div>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    eventsContainer.innerHTML = gymsHTML;
}

window.toggleGym = createToggleHandler();

export function renderGymsPage() {
    const pageContent = document.getElementById('page-content');
    
    pageContent.innerHTML = `
        <div id="gyms-container" style="margin-top: 20px;"></div>
        <div style="margin-top: 24px; text-align: center;">
            <a href="https://maps.app.goo.gl/MLcL3uAfPMg53FyXA" target="_blank" rel="noopener noreferrer" class="text-link">Gyms on Google Maps <span class="external-icon">↗</span></a>
        </div>
    `;
    
    displayGyms();
}