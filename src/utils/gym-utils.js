// Shared utility functions for gym data processing

export function normalizeWeekday(weekday) {
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

export function isGymInSeason(gym) {
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

export function parseTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return parseInt(hours) * 60 + parseInt(minutes);
}

export function formatTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return `${hours}.${minutes}`;
}

export function processEquipment(gym) {
    let equipment = gym.equipment || [];
    
    // Add parkour equipment as first item for actual parkour gyms (except Telegram groups)
    if (gym.actualParkourGym && !gym.isTelegramGroup) {
        equipment = ['🏃 Parkour obstacles and bars', ...equipment];
    }
    
    return equipment;
}

export function sortGyms(gyms) {
    return [...gyms].sort((a, b) => {
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
}

export function generateLinksHTML(gym) {
    const { website, mapsId, price, isTelegramGroup } = gym;
    
    return `
        <div class="price-and-maps">
            ${website ? `<div class="website-link"><a href="${website}" target="_blank" rel="noopener noreferrer">${isTelegramGroup ? '📱 Telegram' : '🌐 Website'} <span class="external-icon">↗</span></a></div>` : ''}
            ${mapsId && !isTelegramGroup ? `<div class="maps-link"><a href="https://maps.app.goo.gl/${mapsId}" target="_blank" rel="noopener noreferrer">🗺️ Google Maps <span class="external-icon">↗</span></a></div>` : ''}
            ${price ? `<div class="price-item">💰 ${price}</div>` : ''}
        </div>
    `;
}

export function createToggleHandler() {
    return function(eventId) {
        const arrow = document.getElementById(`arrow-${eventId}`);
        const details = document.getElementById(`details-${eventId}`);
        
        if (!details) return; // No details to show
        
        const isExpanded = details.classList.contains('expanded');
        
        if (isExpanded) {
            arrow.classList.remove('expanded');
            details.classList.remove('expanded');
        } else {
            arrow.classList.add('expanded');
            details.classList.add('expanded');
        }
    };
}

// Validation functions
const validWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function validateGymData(gym, index) {
    const errors = [];
    
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

export function validateAndProcessGyms(gyms) {
    const errors = [];
    
    gyms.forEach((gym, index) => {
        const gymErrors = validateGymData(gym, index);
        if (gymErrors.length > 0) {
            errors.push(...gymErrors);
        }
    });
    
    if (errors.length > 0) {
        console.error('Gym data validation errors:');
        errors.forEach(error => console.error(`  ${error}`));
        console.error('Fix the above gym data errors in config/gyms.js');
    }
    
    return { errors };
}