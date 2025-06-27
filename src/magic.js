import { schedule } from '../config/schedule.js';

function getMondayEvents() {
    return schedule
        .map(gym => ({
            name: gym.name,
            shifts: gym.shifts.filter(shift => shift.weekday === "Monday")
        }))
        .filter(gym => gym.shifts.length > 0);
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
            `<div class="shift">${shift.startTime}:00 - ${shift.endTime}:00</div>`
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