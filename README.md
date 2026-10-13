# TaskFlow — Modern Task & Todo Manager

[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-informational?style=for-the-badge)]()

---

## 📖 Short Description

**TaskFlow** is a modern, responsive personal productivity web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. It bridges the gap between structured project planning and rapid daily task tracking by offering a unified interface for deadline-driven tasks and lightweight todos. With full client-side persistence powered by `localStorage`, TaskFlow requires zero database configuration, ensuring fast, offline-ready task tracking with complete privacy.

---

## ✨ Key Features

- **Dual Workflow Modes**:
  - **Tasks View**: Manage complex items requiring titles, rich descriptions, and strict deadlines.
  - **Todos View**: Rapid-entry checklist for everyday action items with one-click completion.
- **Interactive Calendar & Date Filtering**:
  - Integrated monthly calendar widget with month navigation (`<` / `>`).
  - Click any date to instantly filter tasks scheduled for that deadline; click again to clear filters.
- **Intelligent Status & Overdue Tracking**:
  - Automated deadline monitoring (`isOverdue` utility) that flags missed deadlines in real time.
  - Visual status badges (`Done`, `Overdue`, `Pending`) and color-coded card accents (green, red, neutral).
- **Progress Visualization**:
  - Live animated completion progress bar indicating completed vs. remaining items in the Todos view.
- **Contextual Inspector Sidebar**:
  - Dedicated info panel displaying full task details, description, formatted deadline dates, and status when selecting any task card.
- **Inline Task & Todo Editing**:
  - Seamless form switching between creation and modification modes with client-side validation.
- **Local Persistence & Zero Setup**:
  - Custom `useLocalStorage` React hook synchronizing all changes to the browser's storage automatically.
- **Dark Mode & Modern Typography**:
  - Fully responsive UI tailored with dark mode styles and typography powered by Vercel's Geist font family.

---

## 🛠️ Tech Stack

### Frontend & Architecture
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router architecture)
- **Library**: [React 19](https://react.dev/) (`react`, `react-dom`)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

### Styling & Design
- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`)
- **PostCSS**: [PostCSS](https://postcss.org/)
- **Typography**: [Geist Sans & Geist Mono](https://vercel.com/font) via `next/font/google`

### State & Storage
- **Persistence**: Browser `localStorage` via custom generic React hook (`useLocalStorage`)

---

## 📋 Prerequisites

Before running this project locally, ensure you have the following installed:

- **Node.js**: `v20.x` or higher (LTS recommended)
- **Package Manager**: `npm` (v10+), `yarn`, `pnpm`, or `bun`

Verify your Node.js and npm versions by running:
```bash
node -v
npm -v
```

---

## 🚀 Installation & Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/to-do-list.git
cd to-do-list
```

### 2. Install Dependencies
Install the required packages using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables
This application operates entirely client-side using browser `localStorage`. No `.env` or external API keys are required to run this project.

### 4. Run the Development Server
Start the local Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### 5. Build for Production
To build and preview the optimized production build:

```bash
# Generate the production bundle
npm run build

# Start the production server
npm run start
```

---

## 💡 Usage

### Managing Tasks
1. Navigate to the **Tasks** tab in the top header.
2. Under **New Task**, fill in the **Task title**, optional **Description**, and select a **Deadline**.
3. Click **Add Task**.
4. Click on any task card to preview its details in the right-hand **Info** sidebar.
5. Check the checkbox on a task card to mark it as **Completed**.
6. Click **Edit** to modify task details or **Delete** to remove it.

### Using the Calendar Filter
1. In the right-hand sidebar, locate the **Calendar** component.
2. Use the navigation buttons (`<` and `>`) to switch between months.
3. Click any date number to filter the task list by that specific deadline.
4. Click the same date again to clear the filter and display all tasks.

### Managing Quick Todos
1. Switch to the **Todos** tab in the navigation bar.
2. Enter your todo title in the input field and press `Enter` or click **Add**.
3. Toggle the checkbox beside a todo to mark it complete. Observe the real-time progress bar updating dynamically.
4. Hover over any todo item to reveal the **Edit** and **Delete** action buttons.

---

## 📂 Project Structure

```text
to-do-list/
├── public/                     # Static public assets (SVGs, icons)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico         # App favicon
│   │   ├── globals.css         # Tailwind CSS imports and theme configuration
│   │   ├── layout.tsx          # Root HTML layout and Geist font setup
│   │   └── page.tsx            # Main dashboard shell with view toggling & sidebar
│   ├── components/             # Reusable UI components
│   │   ├── Calendar.tsx        # Monthly calendar with date selection & filtering
│   │   ├── task/               # Task module components
│   │   │   ├── TaskApp.tsx     # Task state management and list orchestration
│   │   │   ├── TaskForm.tsx    # Controlled form for task creation and editing
│   │   │   ├── TaskItem.tsx    # Task card with overdue indicators and actions
│   │   │   └── TaskList.tsx    # List container with empty state handling
│   │   └── todo/               # Todo module components
│   │       ├── TodoApp.tsx     # Todo state management and progress calculation
│   │       ├── TodoForm.tsx    # Quick-entry form with Enter-key submission
│   │       ├── TodoItem.tsx    # Todo item row with hover action controls
│   │       └── TodoList.tsx    # Todo list container with empty state handling
│   ├── hooks/                  # Custom React hooks
│   │   └── useLocalStorage.ts  # Generic hook for persistent localStorage state
│   ├── lib/                    # Utility functions
│   │   └── taskUtils.ts        # Overdue deadline calculation helpers
│   └── types/                  # TypeScript interfaces and types
│       ├── task.ts             # Task data contract definition
│       └── todo.ts             # Todo data contract definition
├── next.config.ts              # Next.js configuration file
├── package.json                # Project dependencies and script definitions
├── postcss.config.mjs          # PostCSS configuration for Tailwind CSS v4
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
