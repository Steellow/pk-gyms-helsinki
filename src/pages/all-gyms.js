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
    
    if (!gym.mapsId || typeof gym.mapsId !== 'string') {
        errors.push(`Gym "${gym.name || `at index ${index}`}": 'mapsId' is required and must be a string`);
    }
    
    if (gym.shifts && (typeof gym.shifts !== 'object' || Array.isArray(gym.shifts))) {
        errors.push(`Gym "${gym.name || `at index ${index}`}": 'shifts' must be an object if provided`);
    }
    
    if (gym.shifts && typeof gym.shifts === 'object' && !Array.isArray(gym.shifts)) {
        Object.entries(gym.shifts).forEach(([weekday, shift]) => {
            const normalizedWeekday = normalizeWeekday(weekday);
            if (!validWeekdays.includes(normalizedWeekday)) {
                errors.push(`Gym "${gym.name}": invalid weekday key "${weekday}". Valid options: ${validWeekdays.join(', ')}`);
            }
            if (!shift || typeof shift !== 'object') {
                errors.push(`Gym "${gym.name}": shift for "${weekday}" must be an object`);
                return;
            }
            if (!shift.startTime || typeof shift.startTime !== 'string') {
                errors.push(`Gym "${gym.name}": shift for "${weekday}" missing or invalid 'startTime'`);
            }
            if (!shift.endTime || typeof shift.endTime !== 'string') {
                errors.push(`Gym "${gym.name}": shift for "${weekday}" missing or invalid 'endTime'`);
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
    
    const sortedGyms = [...gyms].sort((a, b) => {
        // First sort by actualParkourGym or isTelegramGroup (true comes first)
        const aIsActualParkour = !!(a.actualParkourGym || a.isTelegramGroup);
        const bIsActualParkour = !!(b.actualParkourGym || b.isTelegramGroup);
        
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
        let equipment = gym.equipment || [];
        
        // Add parkour equipment as first item for actual parkour gyms (except Telegram groups)
        if (gym.actualParkourGym && !gym.isTelegramGroup) {
            equipment = ['🏃 Parkour obstacles and bars', ...equipment];
        }
        const mapsId = gym.mapsId;
        const price = gym.price;
        const disclaimer = gym.disclaimer;
        const website = gym.website;
        const actualParkourGym = gym.actualParkourGym;
        const isTelegramGroup = gym.isTelegramGroup;
        
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
                        <div class="price-and-maps">
                            ${website ? `<div class="website-link"><a href="${website}" target="_blank" rel="noopener noreferrer">${isTelegramGroup ? '📱 Telegram' : '🌐 Website'} <span class="external-icon">↗</span></a></div>` : ''}
                            ${mapsId && !isTelegramGroup ? `<div class="maps-link"><a href="https://maps.app.goo.gl/${mapsId}" target="_blank" rel="noopener noreferrer">🗺️ Google Maps <span class="external-icon">↗</span></a></div>` : ''}
                            ${price ? `<div class="price-item">💰 ${price}</div>` : ''}
                        </div>
                        ${equipment ? equipment.map(item => `<div class="equipment-item">${item}</div>`).join('') : ''}
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