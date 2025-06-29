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

function getEventsForWeekday(weekday) {
    try {
        return gyms
            .filter(isGymInSeason)
            .filter(gym => gym.shifts && typeof gym.shifts === 'object' && Object.keys(gym.shifts).length > 0) // Only gyms with shifts
            .map(gym => {
                try {
                    // Find shifts for the specific weekday
                    const shiftsForDay = [];
                    Object.entries(gym.shifts).forEach(([shiftWeekday, shift]) => {
                        const normalizedWeekday = normalizeWeekday(shiftWeekday);
                        if (normalizedWeekday === weekday) {
                            shiftsForDay.push(shift);
                        }
                    });
                    
                    return {
                        name: gym.name,
                        shifts: shiftsForDay,
                        disclaimer: gym.disclaimer
                    };
                } catch (error) {
                    console.error(`Error processing gym "${gym.name}":`, error);
                    return null;
                }
            })
            .filter(gym => gym && gym.shifts.length > 0)
        .sort((a, b) => {
            const aGymData = gyms.find(g => g.name === a.name);
            const bGymData = gyms.find(g => g.name === b.name);
            
            // First sort by actualParkourGym or isTelegramGroup (true comes first)
            const aIsActualParkour = !!(aGymData?.actualParkourGym || aGymData?.isTelegramGroup);
            const bIsActualParkour = !!(bGymData?.actualParkourGym || bGymData?.isTelegramGroup);
            
            if (aIsActualParkour !== bIsActualParkour) {
                return aIsActualParkour ? -1 : 1;
            }
            
            // Then sort by disclaimer presence (no disclaimer comes first)
            const aHasDisclaimer = !!a.disclaimer;
            const bHasDisclaimer = !!b.disclaimer;
            
            if (aHasDisclaimer !== bHasDisclaimer) {
                return aHasDisclaimer ? 1 : -1;
            }
            
            // Finally sort by opening time
            try {
                return parseTime(a.shifts[0].startTime) - parseTime(b.shifts[0].startTime);
            } catch (error) {
                console.error(`Error parsing start time for gym "${a.name}" or "${b.name}":`, error);
                return 0;
            }
        });
    } catch (error) {
        console.error('Error in getEventsForWeekday:', error);
        return [];
    }
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
        const gymData = gyms.find(g => g.name === gym.name);
        let equipment = gymData?.equipment || [];
        
        // Add parkour equipment as first item for actual parkour gyms (except Telegram groups)
        if (gymData?.actualParkourGym && !gymData?.isTelegramGroup) {
            equipment = ['🏃 Parkour obstacles and bars', ...equipment];
        }
        const mapsId = gymData?.mapsId;
        const price = gymData?.price;
        const disclaimer = gymData?.disclaimer;
        const website = gymData?.website;
        const actualParkourGym = gymData?.actualParkourGym;
        const isTelegramGroup = gymData?.isTelegramGroup;
        
        return `
            <div class="gym-event">
                <div class="event-header" onclick="toggleEvent('${eventId}')">
                    <div class="toggle-arrow" id="arrow-${eventId}"></div>
                    <div class="event-main">
                        <div class="gym-name ${(actualParkourGym || isTelegramGroup) ? 'actual-parkour-gym' : ''}">${gym.name}${(actualParkourGym || isTelegramGroup) ? ' 🔥' : ''}</div>
                        ${shiftsHTML}
                    </div>
                </div>
                ${(equipment || mapsId || price || disclaimer || website) ? `
                    <div class="event-details" id="details-${eventId}">
                        <div class="equipment">
                            <div class="price-and-maps">
                                ${website ? `<div class="website-link"><a href="${website}" target="_blank" rel="noopener noreferrer">${isTelegramGroup ? '📱 Telegram' : '🌐 Website'} <span class="external-icon">↗</span></a></div>` : ''}
                                ${mapsId && !isTelegramGroup ? `<div class="maps-link"><a href="https://maps.app.goo.gl/${mapsId}" target="_blank" rel="noopener noreferrer">🗺️ Google Maps <span class="external-icon">↗</span></a></div>` : ''}
                                ${price ? `<div class="price-item">💰 ${price}</div>` : ''}
                            </div>
                            ${equipment ? equipment.map(item => `<div class="equipment-item">${item}</div>`).join('') : ''}
                            ${disclaimer ? `<div class="disclaimer">❗ ${disclaimer}</div>` : ''}
                            ${!isTelegramGroup ? '<div class="hours-note">Check website for exceptions and most recent info about opening hours</div>' : ''}
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
        
        // Scroll the active weekday to center on mobile
        const weekdaysContainer = document.querySelector('.weekdays');
        if (weekdaysContainer) {
            const containerWidth = weekdaysContainer.clientWidth;
            const buttonWidth = selectedTitle.offsetWidth;
            const buttonLeft = selectedTitle.offsetLeft;
            
            // Calculate scroll position to center the button
            const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
            
            weekdaysContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }
    
    displayEventsForWeekday(selectedWeekday);
}

function getCurrentWeekday() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
}

// Toast notification system
let clickCount = 0;
let hasShownToast = localStorage.getItem('swipeToastShown') === 'true';
let hasUsedSwipe = localStorage.getItem('hasUsedSwipe') === 'true';

function showSwipeToast() {
    if (hasShownToast) return;
    
    const toast = document.createElement('div');
    toast.className = 'swipe-toast';
    toast.innerHTML = 'You can also swipe to change the day!';
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
    
    hasShownToast = true;
    localStorage.setItem('swipeToastShown', 'true');
}

function isMobileDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function setupSwipeGestures() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    let startX = null;
    let startY = null;
    const minSwipeDistance = 30;
    const maxVerticalDistance = 150;
    
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    function getCurrentActiveWeekday() {
        const activeButton = document.querySelector('.weekday-title.active');
        return activeButton ? activeButton.getAttribute('data-weekday') : getCurrentWeekday();
    }
    
    function navigateToWeekday(direction) {
        const currentWeekday = getCurrentActiveWeekday();
        const currentIndex = weekdays.indexOf(currentWeekday);
        
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % weekdays.length;
        } else {
            newIndex = (currentIndex - 1 + weekdays.length) % weekdays.length;
        }
        
        setActiveWeekday(weekdays[newIndex]);
    }
    
    // Ensure the events container takes up available screen height for touch events
    const updateContainerHeight = () => {
        const viewportHeight = window.innerHeight;
        const containerTop = eventsContainer.getBoundingClientRect().top;
        const minHeight = Math.max(200, viewportHeight - containerTop - 20); // 20px bottom padding
        eventsContainer.style.minHeight = `${minHeight}px`;
    };
    
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    
    eventsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    eventsContainer.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < maxVerticalDistance) {
            hasUsedSwipe = true; // User discovered swipe functionality
            localStorage.setItem('hasUsedSwipe', 'true');
            
            if (deltaX > 0) {
                // Swipe right - go to previous day
                navigateToWeekday('prev');
            } else {
                // Swipe left - go to next day
                navigateToWeekday('next');
            }
        }
        
        startX = null;
        startY = null;
    }, { passive: true });
}

export function renderOpenShiftsPage() {
    const pageContent = document.getElementById('page-content');
    
    pageContent.innerHTML = `
        <div class="weekdays">
            <h2 class="weekday-title" data-weekday="Monday">Monday</h2>
            <h2 class="weekday-title" data-weekday="Tuesday">Tuesday</h2>
            <h2 class="weekday-title" data-weekday="Wednesday">Wednesday</h2>
            <h2 class="weekday-title" data-weekday="Thursday">Thursday</h2>
            <h2 class="weekday-title" data-weekday="Friday">Friday</h2>
            <h2 class="weekday-title" data-weekday="Saturday">Saturday</h2>
            <h2 class="weekday-title" data-weekday="Sunday">Sunday</h2>
        </div>
        <div id="events-container"></div>
    `;
    
    // Initialize with current weekday
    const currentWeekday = getCurrentWeekday();
    setActiveWeekday(currentWeekday);
    
    // Add click handlers to weekday titles
    document.querySelectorAll('.weekday-title').forEach(title => {
        title.addEventListener('click', () => {
            const weekday = title.getAttribute('data-weekday');
            setActiveWeekday(weekday);
            
            // Track clicks and show toast if user is on mobile and hasn't used swipe
            if (isMobileDevice() && !hasUsedSwipe && !hasShownToast) {
                clickCount++;
                if (clickCount >= 2) {
                    showSwipeToast();
                }
            }
        });
    });
    
    // Add swipe gesture support for mobile
    setupSwipeGestures();
}