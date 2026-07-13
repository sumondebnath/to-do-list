# 📝 To-Do List

A production-ready task management application built with React 19, Vite 8, and Tailwind CSS 4. Features include real-time search, filtering, sorting, inline editing, local storage persistence, and a comprehensive accessibility-first design.

---

## 🔗 Live Demo

| Platform | Link |
|----------|------|
| 🌐 Live Website | [https://todo.nexsoft.dev](https://todo.nexsoft.dev) |
| 📁 GitHub Repository | [https://github.com/your-username/to-do-list](https://github.com/sumondebnath/to-do-list) |

---

## 📸 Screenshots

| Desktop View | Tablet View | Mobile View |
|:---:|:---:|:---:|
| ![Desktop](screenshots/desktop.png) | ![Tablet](screenshots/tablet.png) | ![Mobile](screenshots/mobile.png) |

---

## ✨ Features

### Task Management
- ✅ Add new tasks with validation
- ✏️ Inline editing — click to edit task titles
- 🗑️ Delete tasks with confirmation dialog
- ✔️ Toggle task completion status
- 🧹 Clear all completed tasks at once

### Organization
- 🔍 Real-time search filtering
- 📂 Filter by: All / Active / Completed
- 🔃 Sort by: Newest, Oldest, Alphabetical A-Z, Z-A, Completed First, Active First
- 📊 Live statistics dashboard with completion percentage

### User Experience
- 💾 Local storage persistence — data survives refreshes
- 🔔 Toast notifications for user feedback
- ⚠️ Confirmation dialogs for destructive actions
- 📱 Fully responsive UI (mobile, tablet, desktop)
- 🌙 Clean, minimal interface with Tailwind CSS

### Quality
- ♿ Accessibility best practices (ARIA labels, keyboard navigation, semantic HTML)
- 🔍 SEO optimized (Open Graph, Twitter Card, canonical, robots)
- 🧪 Comprehensive test coverage — 91 tests across 19 test files
- ⚡ Zero-config build with Vite 8

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.2 | UI framework |
| [Vite](https://vite.dev/) | 8.1 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3 | Utility-first CSS |
| [Vitest](https://vitest.dev/) | 4.1 | Unit testing framework |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | 16.3 | Component testing |
| [ESLint](https://eslint.org/) | 10.6 | Code linting |

---

## 📁 Folder Structure

```
to-do-list/
├── public/
│   ├── _redirects              # Netlify SPA routing fallback
│   └── favicon.svg             # Application icon
├── src/
│   ├── components/             # Reusable UI components (15)
│   │   ├── AppShell.jsx        #   Layout wrapper
│   │   ├── Badge.jsx           #   Status badge
│   │   ├── Button.jsx          #   Button component
│   │   ├── ConfirmationModal.jsx # Confirmation dialog
│   │   ├── EmptyState.jsx      #   Empty state display
│   │   ├── FilterBar.jsx       #   Filter tabs
│   │   ├── Input.jsx           #   Text input
│   │   ├── Modal.jsx           #   Modal dialog
│   │   ├── SearchBar.jsx       #   Search input
│   │   ├── SortDropdown.jsx    #   Sort options dropdown
│   │   ├── Statistics.jsx      #   Stats dashboard
│   │   ├── TaskCard.jsx        #   Individual task card
│   │   ├── TaskInput.jsx       #   New task input
│   │   ├── TaskList.jsx        #   Task list container
│   │   └── ToastHost.jsx       #   Toast notifications
│   ├── constants/              # Application constants
│   │   ├── filters.js          #   Filter options
│   │   ├── sorts.js            #   Sort options
│   │   └── storageKeys.js      #   Local storage keys
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTasks.js         #   Task CRUD + persistence
│   │   └── useToasts.js        #   Toast notification state
│   ├── pages/                  # Page components
│   │   └── TasksPage.jsx       #   Main tasks page
│   ├── tests/                  # Test files (19)
│   │   ├── components/         #   Component tests (12)
│   │   ├── hooks/              #   Hook tests (2)
│   │   ├── utils/              #   Utility tests (4)
│   │   ├── smoke.test.js       #   Smoke test
│   │   └── setupTests.js       #   Test setup
│   ├── utils/                  # Utility functions
│   │   ├── dates.js            #   Date formatting
│   │   ├── id.js               #   ID generation
│   │   ├── normalize.js        #   Text normalization
│   │   └── storage.js          #   Safe localStorage
│   ├── App.jsx                 # Root component
│   ├── index.css               # Tailwind entry point
│   └── main.jsx                # Application entry
├── eslint.config.js            # ESLint flat config
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── README.md                   # Documentation
├── vite.config.js              # Vite configuration
└── vitest.config.js            # Test configuration
```

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0 or higher
- npm 9.0 or higher

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/to-do-list.git
   cd to-do-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint code with ESLint |

---

## 🏗️ Build for Production

```bash
npm run build
```

This generates an optimized `dist/` folder ready for deployment. The build includes:

- Minified JavaScript and CSS
- Code splitting
- Asset optimization
- Tree shaking

To preview the production build locally:

```bash
npm run preview
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch
```

### Test Coverage

| Category | Test Files | Coverage |
|----------|-----------|----------|
| Components | 12 | All 15 components |
| Hooks | 2 | useTasks, useToasts |
| Utilities | 4 | dates, id, normalize, storage |
| Smoke | 1 | App renders without crash |
| **Total** | **19** | **91 test cases** |

### What Is Tested

- **Component Rendering** — Correct output for various prop combinations
- **User Interactions** — Click, type, submit, keyboard navigation
- **State Changes** — Task CRUD, filter, sort, search
- **Edge Cases** — Empty inputs, duplicate tasks, long text, special characters
- **Accessibility** — ARIA labels, roles, keyboard navigation
- **Local Storage** — Read/write with error handling
- **Utility Functions** — Pure function unit tests

---

## ♿ Accessibility

This application follows WCAG 2.1 AA guidelines:

- **Semantic HTML** — Proper use of `<main>`, `<section>`, `<nav>`, `<header>`, `<button>`, `<input>`
- **ARIA Labels** — All interactive elements have descriptive `aria-label` attributes
- **Keyboard Navigation** — Full keyboard support (Tab, Enter, Escape, Arrow keys)
- **Focus Management** — Visible focus indicators on all interactive elements
- **Screen Reader Support** — Proper heading hierarchy and live regions for dynamic content
- **Color Contrast** — All text meets minimum 4.5:1 contrast ratio
- **Form Labels** — All form inputs have associated labels
- **Error Handling** — Errors announced via `aria-live` regions

---

## 🔍 SEO

Built-in SEO optimizations without any external libraries:

| Meta Tag | Implementation |
|----------|---------------|
| `<title>` | Descriptive page title |
| `<meta description>` | Concise app description |
| `<meta robots>` | `index, follow` |
| `<link rel="canonical">` | Canonical URL |
| Open Graph | `og:title`, `og:description`, `og:type`, `og:url` |
| Twitter Card | `twitter:card`, `twitter:title`, `twitter:description` |
| Viewport | Responsive viewport meta tag |
| Favicon | SVG favicon with proper `type` attribute |

---

## ⚡ Performance

- **Vite 8** — Lightning-fast HMR and optimized builds
- **React 19** — Automatic batching and concurrent features
- **Tailwind CSS 4** — Zero-runtime CSS with tree-shaking
- **Memoization** — `useMemo` and `useCallback` prevent unnecessary re-renders
- **Lazy State Initialization** — `useState` with function initializers avoids recalculation
- **Efficient Persistence** — Debounced localStorage writes to prevent UI blocking
- **Minimal Bundle** — Zero external runtime dependencies

---

## 📱 Responsive Design

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | `< 640px` | Single column, stacked UI |
| Tablet | `640px – 1024px` | Adapted layout, larger touch targets |
| Desktop | `> 1024px` | Full layout with sidebar/stats |

All components use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) for fluid adaptation across screen sizes.

---

## 🧩 Project Architecture

### Component Hierarchy

```
App
└── AppShell
    ├── Header
    ├── Statistics
    ├── SearchBar
    ├── FilterBar
    ├── SortDropdown
    ├── TaskInput
    ├── TaskList
    │   └── TaskCard (×N)
    ├── EmptyState
    ├── Modal
    ├── ConfirmationModal
    └── ToastHost
```

### State Management

The app uses a custom hook `useTasks` as the single source of truth:

- **State** — Tasks array + UI state (filter, search, sort)
- **Derived State** — Filtered, searched, sorted tasks + statistics (computed via `useMemo`)
- **Persistence** — Automatic sync to `localStorage` on every mutation
- **Error Handling** — Graceful fallback when storage is full or corrupted

### Data Flow

```
User Action → Component → useTasks Action → State Update → localStorage Sync → Re-render
```

---

## 🔮 Future Improvements

- [ ] **Categories & Tags** — Organize tasks into projects or categories
- [ ] **Due Dates** — Add deadlines with date pickers
- [ ] **Drag & Drop Reordering** — Manual task priority ordering
- [ ] **Dark Mode** — Theme toggle with system preference detection
- [ ] **Keyboard Shortcuts** — Power-user shortcuts for common actions
- [ ] **Import/Export** — JSON backup and restore functionality
- [ ] **Recurring Tasks** — Daily/weekly/monthly repeating tasks
- [ ] **Progress Charts** — Visual completion trends over time
- [ ] **Multi-language** — Internationalization (i18n) support
- [ ] **PWA Support** — Offline mode with service workers

---

## 🌐 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Configure build settings:

   | Setting | Value |
   |---------|-------|
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Node version | `18` (or leave default) |

6. Click **Deploy site**

The `public/_redirects` file handles SPA routing automatically.

### Vercel

1. Push your code to GitHub
2. Log in to [Vercel](https://vercel.com)
3. Import your repository — Vite is auto-detected
4. Deploy

### Manual

```bash
npm run build
# Upload the 'dist' folder to any static hosting provider
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes
4. **Run** tests and lint
   ```bash
   npm test
   npm run lint
   ```
5. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Description |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style changes (formatting, etc.) |
| `refactor:` | Code refactoring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**[Your Name]**

| Platform | Link |
|----------|------|
| 🐙 GitHub | [github.com/your-username](https://github.com/your-username) |
| 💼 LinkedIn | [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile) |
| 🌐 Portfolio | [your-portfolio.dev](https://your-portfolio.dev) |

---

<p align="center">Built with ❤️ using React, Vite & Tailwind CSS</p>
