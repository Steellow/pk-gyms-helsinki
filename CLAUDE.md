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
- `equipment` (optional): Array of strings with emojis - Available equipment
- `website` (optional): String - Full URL to gym website (shows with 🌐 emoji)
- `mapsId` (optional): String - Google Maps share ID for location links
- `price` (optional): String - Pricing information 
- `disclaimer` (optional): String - Warning/disclaimer text (shows with ❗ emoji)
- `seasonStart` (optional): String - Season start date in yyyy-mm-dd format
- `seasonEnd` (optional): String - Season end date in yyyy-mm-dd format
- `shifts` (required): Array of time slot objects:
  - `weekday` (required): String - Full weekday name (Monday, Tuesday, etc.)
  - `startTime` (required): String - 24h format with dot or colon (e.g. "10.30", "16:00")
  - `endTime` (required): String - 24h format with dot or colon

Season logic: Gyms only show if current date is within season. No season fields = always show. Only one field = open-ended season.

Sorting: Gyms without disclaimers appear first, then sorted alphabetically (All gyms) or by opening time (Open gym times).

## Development

- Use `npx live-server --port=8000` to run locally with SPA routing support and auto-refresh
