# CLAUDE.md

- This is a simple web app with info about parkour gyms in Helsinki where one can train
- Uses simple html/css/js (no build system, no Node.js dependencies)
- UI should look modern, sleek and minimal, with flat elements
- Should always be pleasant to use on both mobile and desktop
- Uses client-side routing for SPA functionality
- Mobile-optimized with touch gestures and responsive design
- Includes swipe navigation for weekdays on mobile devices

## File structure

- Claude can freely move, create, edit, delete files
- All code files should be inside src/ folder, or in a subfolder inside of it
- All config files are in config/ folder
    - gyms.js contains all the info we need about the gyms and shifts we are showing in the UI

## Data Structure

Gym data in `config/gyms.js` follows this structure:
- `name` (required): String - Gym name
- `website` (required): String - Full URL to gym website (shows with 🌐 emoji)
- `mapsId` (optional): String - Google Maps share ID for location links
- `equipment` (optional): Array of strings with emojis - Available equipment
- `price` (optional): String - Pricing information 
- `disclaimer` (optional): String - Warning/disclaimer text (shows with ❗ emoji)
- `actualParkourGym` (optional): Boolean - If true, shows gym name in bold with 🔥 emoji and sorts first
- `seasonStart` (optional): String - Season start date in yyyy-mm-dd format
- `seasonEnd` (optional): String - Season end date in yyyy-mm-dd format
- `shifts` (optional): Array of time slot objects:
  - `weekday` (required): String - Full weekday name (Monday, Tuesday, etc.)
  - `startTime` (required): String - 24h format with dot or colon (e.g. "10.30", "16:00")
  - `endTime` (required): String - 24h format with dot or colon

Season logic: Gyms only show if current date is within season. No season fields = always show. Only one field = open-ended season.

Sorting: Actual parkour gyms (actualParkourGym: true) appear first, then gyms without disclaimers, then sorted alphabetically (All gyms) or by opening time (Open gym times).

## Development

- Use `npx live-server --port=8000` to run locally with SPA routing support and auto-refresh
- Alternative: `npx serve -s . -p 8000` (without auto-refresh)
- The app includes GitHub Pages SPA support via 404.html redirect handling
- Cloudflare Web Analytics integrated for usage tracking

## Mobile Features

- Touch-optimized UI with appropriate button sizes and spacing
- Swipe gestures on "Open gym times" tab: swipe left/right to navigate between weekdays
- Smart toast notification system to help users discover swipe functionality
- Auto-centering of active weekday button in horizontal scroll
- Full-height swipe area for better gesture detection
- Persistent user preferences via localStorage (toast shown state, swipe discovery)
