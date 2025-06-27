const schedule = [
    {
        name: "Taitoliikuntakeskus",
        shifts: [
            {
                weekday: "Monday",
                startTime: "11",
                endTime: "16"
            },
            {
                weekday: "Tuesday",
                startTime: "12",
                endTime: "18"
            },
            {
                weekday: "Wednesday",
                startTime: "09",
                endTime: "15"
            },
            {
                weekday: "Friday",
                startTime: "14",
                endTime: "20"
            }
        ]
    },
    {
        name: "Calisthenics Lab",
        shifts: [
            {
                weekday: "Monday",
                startTime: "10",
                endTime: "14"
            },
            {
                weekday: "Wednesday",
                startTime: "16",
                endTime: "19"
            },
            {
                weekday: "Thursday",
                startTime: "10",
                endTime: "13"
            },
            {
                weekday: "Saturday",
                startTime: "09",
                endTime: "17"
            }
        ]
    },
    {
        name: "Urban Movement",
        shifts: [
            {
                weekday: "Tuesday",
                startTime: "08",
                endTime: "12"
            },
            {
                weekday: "Thursday",
                startTime: "15",
                endTime: "21"
            },
            {
                weekday: "Saturday",
                startTime: "11",
                endTime: "16"
            },
            {
                weekday: "Sunday",
                startTime: "13",
                endTime: "18"
            }
        ]
    }
];

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