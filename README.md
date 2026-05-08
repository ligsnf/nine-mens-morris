# Nine Men's Morris

A browser implementation of [Nine Men's Morris](https://en.wikipedia.org/wiki/Nine_men%27s_morris), the ancient two-player strategy board game. Play human-vs-human or against a search-based computer opponent.

Built with React + TypeScript + Vite + Tailwind. AI runs entirely in the browser (Web Worker), no backend.

## How to run

Make sure you have [Node.js](https://nodejs.org/) installed.

1. clone repository
2. open terminal in the project folder
3. run `npm install` to install dependencies
4. run `npm run dev` and open the link printed in the terminal to play
5. or, run `npm run build` followed by `npm run preview` to serve a production build

## Documentation

- [Architecture](./docs/architecture.md) — game core, AI engine, Web Worker boundary.
- [Game rules](./docs/game-rules.md) — Nine Men's Morris rules as implemented.
- [User stories](./docs/user-stories.md) — what a player can do.

## Coding Practices

This project aims to adhere to the following:
- TypeScript [style guide](https://google.github.io/styleguide/tsguide.html)
- React [design principles](https://react.dev/learn/thinking-in-react)
- Tailwind CSS [core concepts](https://tailwindcss.com/docs/reusing-styles)
