# Contributing

Use Node.js 24 and install the locked development dependencies:

```powershell
npm ci --ignore-scripts
npm run check
```

`npm run check` runs ESLint, Markdownlint, Prettier in check mode, package validation, and Node tests. Run `npm run format` to apply formatting. The JavaScript and WebP in `dist/` are the files Home Assistant loads. There is no build step.

## Pre-commit

Install [pre-commit](https://pre-commit.com/) with Python, then install the Git hook once per clone:

```powershell
python -m pip install pre-commit
pre-commit install
pre-commit run --all-files
```

## Browser tests

```powershell
npx --no-install playwright install chromium
npm run test:browser
```

To run against an existing Microsoft Edge installation, set `$env:PLAYWRIGHT_CHANNEL = 'msedge'` before running the browser tests. They use the local demo's sample data.

When changing the Home Assistant integration between the card and its data sources, also test in Home Assistant. Check Marketplace installation via **Settings → Marketplace → Add from link**, both layouts, modem selection, the 24-hour and seven-day Recorder chart, and a dashboard without Recorder history. Use sample or redacted modem data in screenshots and issue reports.

See [repository settings and releases](docs/maintainer.md) before publishing. See the [security policy](SECURITY.md) for vulnerability reports.
