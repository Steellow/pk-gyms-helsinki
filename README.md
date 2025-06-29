# PK GYMS HELSINKI

<INSERT PAGE URL HERE>

- A simple web app with info about parkour gyms in Helsinki where one can train
- Has a schedules for free shifts
- Plain html/css/js, no node or anything
- First project I've done with Claude Code

## Development

To run the app locally with proper SPA routing support and auto-refresh:

```bash
npx live-server --port=8000
```

This will:
- Serve the app at http://localhost:8000
- Automatically refresh the page when files change
- Handle SPA routing (serves `index.html` for all routes)

Alternative (without auto-refresh):
```bash
npx serve -s . -p 8000
```

## Data Structure

Gym data is stored in `config/gyms.js`. Each gym object has the following structure:

```javascript
{
    name: "Gym Name",                    // Required: String
    website: "https://example.com",      // Required: Full URL to gym website
    mapsId: "googleMapsId",             // Required: Google Maps share ID for location
    equipment: ["Equipment item 1"],     // Optional: Array of strings with emojis
    price: "15€",                       // Optional: Pricing information string
    disclaimer: "Important note",        // Optional: Warning/disclaimer text
    actualParkourGym: true,             // Optional: Boolean, shows gym with bold text + 🔥 emoji and sorts first
    seasonStart: "2024-09-01",          // Optional: Season start date (yyyy-mm-dd)
    seasonEnd: "2025-05-31",            // Optional: Season end date (yyyy-mm-dd)
    shifts: [                           // Optional: Array of time slots
        {
            weekday: "Monday",          // Required: Full weekday name
            startTime: "10.30",         // Required: 24h format, dot or colon separator
            endTime: "16"               // Required: 24h format, dot or colon separator
        }
    ]
}
```