# PK GYMS HELSINKI

<INSERT PAGE URL HERE>

- A simple web app with info about parkour gyms in Helsinki where one can train
- Has a schedules for free shifts
- Plain html/css/js, no node or anything
- First project I've done with Claude Code

## Development

To run the app locally with proper SPA routing support:

```bash
npx serve -s . -p 8000
```

Then open http://localhost:8000 in your browser.

The `-s` flag enables single-page application mode, which serves `index.html` for all routes that don't match files. This prevents 404 errors when refreshing on routes like `/gyms`.