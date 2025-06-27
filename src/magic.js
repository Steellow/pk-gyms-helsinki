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
    
    const eventsHTML = events.map((gym, gymIndex) => {
        const shiftsHTML = gym.shifts.map(shift => 
            `<div class="shift">${formatTime(shift.startTime)} – ${formatTime(shift.endTime)}</div>`
        ).join('');
        
        const eventId = `event-${gymIndex}`;
        const equipment = schedule.find(g => g.name === gym.name)?.equipment;
        
        return `
            <div class="gym-event">
                <div class="event-header" onclick="toggleEvent('${eventId}')">
                    <div class="toggle-arrow" id="arrow-${eventId}"></div>
                    <div class="event-main">
                        <div class="gym-name">${gym.name}</div>
                        ${shiftsHTML}
                    </div>
                </div>
                ${equipment ? `
                    <div class="event-details" id="details-${eventId}">
                        <div class="equipment">
                            <div class="equipment-title">Equipment:</div>
                            ${equipment.map(item => `<div class="equipment-item">• ${item}</div>`).join('')}
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