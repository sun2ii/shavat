# Shavat

A Sabbath for reading text. A minimal reading tool for Genesis (NIV).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Features

- Read Genesis chapter-by-chapter
- Highlight verses (yellow or blue)
- Add optional notes to highlights
- Auto-bookmark current chapter
- View all highlights grouped by chapter
- All data persisted locally (localStorage)

## Data Storage

All data is stored in your browser's localStorage:
- `shavat:highlights` - array of highlights
- `shavat:bookmark` - current reading position

## What This Is NOT

- Not a platform
- Not a publishing tool
- No authentication
- No cloud sync
- No search
- No metrics
- No gamification

Just reading.
# shavat
