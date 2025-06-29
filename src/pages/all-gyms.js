import { gyms } from '../../config/gyms.js';

function normalizeWeekday(weekday) {
    if (typeof weekday !== 'string') return weekday;
    
    const normalized = weekday.toLowerCase();
    const weekdayMap = {
        'monday': 'Monday',
        'tuesday': 'Tuesday', 
        'wednesday': 'Wednesday',
        'thursday': 'Thursday',
        'friday': 'Friday',
        'saturday': 'Saturday',
        'sunday': 'Sunday'
    };
    
    return weekdayMap[normalized] || weekday;
}

function validateGymData(gym, index) {
    const errors = [];
    const validWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    if (!gym.name || typeof gym.name !== 'string') {
        errors.push(`Gym at index ${index}: 'name' is required and must be a string`);
    }
    
    if (!gym.website || typeof gym.website !== 'string') {
        errors.push(`Gym "${gym.name || `at index ${index}`}": 'website' is required and must be a string`);
    }
    
    if (gym.mapsId && typeof gym.mapsId !== 'string') {
        errors.push(`Gym "${gym.name || `at index ${index}`}": 'mapsId' must be a string if provided`);
    }
    
    if (gym.shifts && !Array.isArray(gym.shifts)) {
        errors.push(`Gym "${gym.name || `at index ${index}`}": 'shifts' must be an array if provided`);
    }
    
    if (gym.shifts && Array.isArray(gym.shifts)) {
        gym.shifts.forEach((shift, shiftIndex) => {
            if (!shift.weekday || typeof shift.weekday !== 'string') {
                errors.push(`Gym "${gym.name}": shift ${shiftIndex} missing or invalid 'weekday'`);
            } else {
                const normalizedWeekday = normalizeWeekday(shift.weekday);
                if (!validWeekdays.includes(normalizedWeekday)) {
                    errors.push(`Gym "${gym.name}": shift ${shiftIndex} has invalid weekday "${shift.weekday}". Valid options: ${validWeekdays.join(', ')}`);
                } else {
                    // Normalize the weekday in place
                    shift.weekday = normalizedWeekday;
                }
            }
            if (!shift.startTime || typeof shift.startTime !== 'string') {
                errors.push(`Gym "${gym.name}": shift ${shiftIndex} missing or invalid 'startTime'`);
            }
            if (!shift.endTime || typeof shift.endTime !== 'string') {
                errors.push(`Gym "${gym.name}": shift ${shiftIndex} missing or invalid 'endTime'`);
            }
        });
    }
    
    if (gym.equipment && !Array.isArray(gym.equipment)) {
        errors.push(`Gym "${gym.name}": 'equipment' must be an array if provided`);
    }
    
    return errors;
}

function isGymInSeason(gym) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // yyyy-mm-dd format
    
    const { seasonStart, seasonEnd } = gym;
    
    // If no season restrictions, gym is always available
    if (!seasonStart && !seasonEnd) {
        return true;
    }
    
    // Check season start
    if (seasonStart && todayStr < seasonStart) {
        return false;
    }
    
    // Check season end
    if (seasonEnd && todayStr > seasonEnd) {
        return false;
    }
    
    return true;
}

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
    if (!shifts || !Array.isArray(shifts)) {
        return {};
    }
    
    const grouped = {};
    const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    shifts.forEach(shift => {
        try {
            if (!grouped[shift.weekday]) {
                grouped[shift.weekday] = [];
            }
            grouped[shift.weekday].push(shift);
        } catch (error) {
            console.error(`Error processing shift:`, shift, error);
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
    let hasErrors = false;
    gyms.forEach((gym, index) => {
        const errors = validateGymData(gym, index);
        if (errors.length > 0) {
            hasErrors = true;
            errors.forEach(error => console.error(`Gym data validation error: ${error}`));
        }
    });
    
    if (hasErrors) {
        console.error('Fix the above gym data errors in config/gyms.js');
    }
    
    const inSeasonGyms = gyms.filter(isGymInSeason);
    const sortedGyms = [...inSeasonGyms].sort((a, b) => {
        // First sort by actualParkourGym (true comes first)
        const aIsActualParkour = !!a.actualParkourGym;
        const bIsActualParkour = !!b.actualParkourGym;
        
        if (aIsActualParkour !== bIsActualParkour) {
            return aIsActualParkour ? -1 : 1;
        }
        
        // Then sort by disclaimer presence (no disclaimer comes first)
        const aHasDisclaimer = !!a.disclaimer;
        const bHasDisclaimer = !!b.disclaimer;
        
        if (aHasDisclaimer !== bHasDisclaimer) {
            return aHasDisclaimer ? 1 : -1;
        }
        
        // Finally sort alphabetically
        return a.name.localeCompare(b.name);
    });
    
    const gymsHTML = sortedGyms.map((gym, gymIndex) => {
        const eventId = `gym-${gymIndex}`;
        const equipment = gym.equipment;
        const mapsId = gym.mapsId;
        const price = gym.price;
        const disclaimer = gym.disclaimer;
        const website = gym.website;
        const actualParkourGym = gym.actualParkourGym;
        
        // Group shifts by weekday
        const groupedShifts = groupShiftsByWeekday(gym.shifts);
        const shiftsHTML = Object.entries(groupedShifts)
            .map(([weekday, shifts]) => {
                const dayShifts = shifts.map(shift => 
                    `${formatTime(shift.startTime)} – ${formatTime(shift.endTime)}`
                ).join(', ');
                return `<div class="weekday-shifts"><strong>${weekday}:</strong> ${dayShifts}</div>`;
            }).join('');
        
        const hasShifts = gym.shifts && Array.isArray(gym.shifts) && gym.shifts.length > 0;
        
        return `
            <div class="gym-event">
                <div class="event-header" onclick="toggleGym('${eventId}')">
                    <div class="toggle-arrow" id="arrow-${eventId}"></div>
                    <div class="event-main">
                        <div class="gym-name ${actualParkourGym ? 'actual-parkour-gym' : ''}">${gym.name}${actualParkourGym ? ' 🔥' : ''}</div>
                    </div>
                </div>
                <div class="event-details" id="details-${eventId}">
                    <div class="equipment">
                        <div class="price-and-maps">
                            ${website ? `<div class="website-link"><a href="${website}" target="_blank" rel="noopener noreferrer">🌐 Website <span class="external-icon">↗</span></a></div>` : ''}
                            ${mapsId ? `<div class="maps-link"><a href="https://maps.app.goo.gl/${mapsId}" target="_blank" rel="noopener noreferrer">🗺️ Google Maps <span class="external-icon">↗</span></a></div>` : ''}
                            ${price ? `<div class="price-item">💰 ${price}</div>` : ''}
                        </div>
                        ${equipment ? equipment.map(item => `<div class="equipment-item">${item}</div>`).join('') : ''}
                        ${disclaimer ? `<div class="disclaimer">❗ ${disclaimer}</div>` : ''}
                        ${hasShifts ? `
                            <div class="shifts-section">
                                <div class="shifts-title">Open hours:</div>
                                ${shiftsHTML}
                                <div class="hours-note">Check website for exceptions and most recent info about opening hours</div>
                            </div>
                        ` : `
                            <div class="shifts-section">
                                <div class="no-shifts">No regular open hours available. Check website for current information.</div>
                            </div>
                        `}
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
        <div id="gyms-container" style="margin-top: 20px;"></div>
        <div style="margin-top: 24px; text-align: center;">
            <a href="https://maps.app.goo.gl/MLcL3uAfPMg53FyXA" target="_blank" rel="noopener noreferrer" class="text-link">Gyms on Google Maps <span class="external-icon">↗</span></a>
        </div>
    `;
    
    displayGyms();
}