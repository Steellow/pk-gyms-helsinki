import { schedule } from '../config/schedule.js';

function parseTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return parseInt(hours) * 60 + parseInt(minutes);
}

function formatTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return `${hours}.${minutes}`;
}

function getMondayEvents() {
    return schedule
        .map(gym => ({
            name: gym.name,
            shifts: gym.shifts.filter(shift => shift.weekday === "Monday")
        }))
        .filter(gym => gym.shifts.length > 0)
        .sort((a, b) => parseTime(a.shifts[0].startTime) - parseTime(b.shifts[0].startTime));
}

function displayMondayEvents() {
    const mondayEvents = getMondayEvents();
    const eventsContainer = document.getElementById('monday-events');
    
    if (!eventsContainer) return;
    
    if (mondayEvents.length === 0) {
        eventsContainer.innerHTML = '<p class="no-events">No events scheduled for Monday.</p>';
        return;
    }
    
    const eventsHTML = mondayEvents.map(gym => {
        const shiftsHTML = gym.shifts.map(shift => 
            `<div class="shift">${formatTime(shift.startTime)} – ${formatTime(shift.endTime)}</div>`
        ).join('');
        
        return `
            <div class="gym-event">
                <div class="gym-name">${gym.name}</div>
                ${shiftsHTML}
            </div>
        `;
    }).join('');
    
    eventsContainer.innerHTML = eventsHTML;
}

document.addEventListener('DOMContentLoaded', displayMondayEvents);