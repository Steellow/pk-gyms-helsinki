import { schedule } from '../config/schedule.js';

function parseTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return parseInt(hours) * 60 + parseInt(minutes);
}

function formatTime(timeStr) {
    const [hours, minutes = "00"] = timeStr.split(/[.:]/).map(str => str.padStart(2, '0'));
    return `${hours}.${minutes}`;
}

function getEventsForWeekday(weekday) {
    return schedule
        .map(gym => ({
            name: gym.name,
            shifts: gym.shifts.filter(shift => shift.weekday === weekday)
        }))
        .filter(gym => gym.shifts.length > 0)
        .sort((a, b) => parseTime(a.shifts[0].startTime) - parseTime(b.shifts[0].startTime));
}

function displayEventsForWeekday(weekday) {
    const events = getEventsForWeekday(weekday);
    const eventsContainer = document.getElementById('events-container');
    
    if (!eventsContainer) return;
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `<p class="no-events">No events scheduled for ${weekday}.</p>`;
        return;
    }
    
    const eventsHTML = events.map(gym => {
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

document.addEventListener('DOMContentLoaded', () => {
    // Initialize with Monday
    displayEventsForWeekday('Monday');
    
    // Add click handlers to weekday titles
    document.querySelectorAll('.weekday-title').forEach(title => {
        title.addEventListener('click', () => {
            const weekday = title.getAttribute('data-weekday');
            setActiveWeekday(weekday);
        });
    });
});