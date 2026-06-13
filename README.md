# JobTracker

A modern job application tracker built with **React** and **Vite**, designed with a **Dark Glassmorphism** UI. Track your application progress elegantly through a classic list view or an interactive Kanban board.

## Features

- **Glassmorphism UI** - Premium visual design with frosted glass effects and animated mesh gradient background
- **Kanban Board & List View** - Switch between a table layout and a Kanban board (Applied, Interview, Offer, Rejected, No Response)
- **Responsive Design** - Adapts seamlessly across desktop, tablet, and mobile with dedicated mobile navigation
- **Local Storage (Privacy First)** - All data stored securely offline via browser LocalStorage, no backend required
- **Search, Filter & Sort** - Quickly find applications by company, position, or notes; filter by status; sort by date or name
- **Toast Notifications** - Smooth action feedback on every create, update, and delete operation
- **Backup & Restore** - Export all data to JSON or import from a previous backup via the Settings panel
- **Accessibility** - ARIA labels, keyboard navigation, focus trapping in modals, and screen reader support

## Tech Stack

- [React 19](https://react.dev/) with TypeScript
- [Vite 8](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism theme
- [Lucide React](https://lucide.dev/) for icons
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font

## Getting Started

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository:
   ```bash
   git clone https://github.com/herman-xphp/job-tracker.git
   cd job-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Contributing

Suggestions, pull requests, and bug reports are welcome.
