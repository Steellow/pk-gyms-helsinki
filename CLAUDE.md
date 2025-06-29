# CLAUDE.md

- This is a simple web app with info about parkour gyms in Helsinki where one can train
- Uses simple html/css/js (no build system, no Node.js dependencies)
- UI should look modern, sleek and minimal, with flat elements
- Should always be pleasant to use on both mobile and desktop
- Uses client-side routing for SPA functionality

## File structure

- Claude can freely move, create, edit, delete files
- All code files should be inside src/ folder, or in a subfolder inside of it
- All config files are in config/ folder
    - gyms.js contains all the info we need about the gyms and shifts we are showing in the UI

## Development

- Use `npx live-server --port=8000` to run locally with SPA routing support and auto-refresh
