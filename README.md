# Pomodoro Timer

A beautiful and feature-rich Pomodoro Timer application built with React and TypeScript. Stay focused and boost your productivity with this modern implementation of the Pomodoro Technique.

![Pomodoro Timer](./pomodoro._app.png)

## 🚀 Latest Updates (v1.1.0 - March 2025)

### 🐛 Bug Fixes

1. **Timer State Persistence**
   - Fixed: Timer state now correctly persists after page refresh
   - Files modified: `usePomodoro.ts`

2. **Statistics Reset**
   - Fixed: Daily statistics now properly reset at midnight
   - Previous behavior: Stats carried over to the next day
   - Files modified: `usePomodoro.ts`, `types/index.ts`

3. **Volume Control**
   - Fixed: Volume settings now persist between sessions
   - Added visual feedback for volume changes
   - Files modified: `usePomodoro.ts`

### ✨ New Features

1. **Dark Mode**
   - Toggle between light and dark themes
   - Keyboard shortcut: `Ctrl/Cmd + D`
   - Persists user preference
   - Context-aware UI elements and notifications
   - Files: `DarkModeToggle.tsx`, `App.tsx`, `tailwind.config.js`

2. **Daily Goals**
   - Track daily work time progress
   - Visual progress bar with percentage
   - Configurable daily goal (default: 4 hours)
   - Automatic reset at midnight
   - Files: `DailyProgress.tsx`, `types/index.ts`

3. **Enhanced Statistics**
   - Added today's work time tracking
   - Progress towards daily goal
   - Improved streak tracking
   - Dark mode compatible statistics display

### 🎯 All Features

- 🎯 Customizable work and break durations
- ⏱️ Elegant timer display with visual progress
- 🔄 Automatic work/break cycle management
- 📊 Statistics tracking
  - Total focus time
  - Completed pomodoros
  - Daily streak
  - Break time
  - Daily goal progress
- 🌓 Dark mode support
- 🔔 Audio and visual notifications
- ⌨️ Keyboard shortcuts
  - Space: Start/Pause
  - Ctrl/Cmd + R: Reset
  - Ctrl/Cmd + S: Skip
  - Ctrl/Cmd + D: Toggle Dark Mode
  - Alt + ↑/↓: Volume Control
- 🎨 Beautiful UI with context-aware themes
- 💾 Persistent settings and statistics
- 📱 Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Keyboard Shortcuts

| Shortcut      | Action           |
|---------------|------------------|
| Space         | Start/Pause      |
| Ctrl/Cmd + R  | Reset Timer      |
| Ctrl/Cmd + S  | Skip Phase       |
| Ctrl/Cmd + D  | Toggle Dark Mode |
| Alt + ↑/↓     | Volume Control   |

## The Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into focused intervals (typically 25 minutes) separated by short breaks. The method is based on the idea that frequent breaks can improve mental agility.

1. Choose a task
2. Work for 25 minutes
3. Take a 5-minute break
4. After 4 pomodoros, take a longer break (15-30 minutes)
5. Repeat

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
