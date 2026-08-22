# CineTrace

CineTrace is a movie discovery application built with React and Vite. Search for movies, dig into ratings and full plots, explore ranked essentials, and keep a personal watchlist — all in a fast, minimalist interface.

> Every film leaves a trace.

## Features

- **Search Movies**: Find movies by title, actor, or genre via the OMDb API.
- **Movie Details Modal**: Click any poster to view the full plot, IMDb score, genre chips, cast/crew, and rating bars for IMDb, Rotten Tomatoes, and Metacritic.
- **Trending Essentials**: A curated, ranked list of twelve defining films.
- **Persistent Watchlist**: Tap the heart on any film to save it. Stored in `localStorage`, so your list survives refreshes. Includes a dedicated tab with a live count badge.
- **Keyboard Shortcut**: Press `/` anywhere to jump straight into search.
- **Surprise Me**: One click digs up a random theme — heists, samurai films, time travel, and more.
- **Curated Home Feed**: Fresh genre-blended recommendations on every visit.
- **Minimalist UI**: Noir-inspired dark theme with a single amber accent, editorial serif headlines (Fraunces), staggered entrance animations, hover effects, shimmer skeleton loaders, and smooth tab transitions.
- **Responsive**: Optimized for desktop, tablet, and mobile devices.

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4 (custom design tokens, keyframe animations)
- **API**: OMDb API
- **Deployment**: Vercel (Ready)

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cinetrace.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your OMDb API key:
    ```env
    VITE_OMDB_API_KEY=your_api_key_here
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## Deployment

This project is configured for easy deployment on Vercel.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the `VITE_OMDB_API_KEY` environment variable in the Vercel dashboard.
4.  Deploy!

## License

MIT
