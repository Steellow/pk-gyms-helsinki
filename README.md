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