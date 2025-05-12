import React from 'react';
import { usePomodoro } from './hooks/usePomodoro';
import Timer from './components/Timer';
import Controls from './components/Controls';
import SessionIndicator from './components/SessionIndicator';
import SettingsPanel from './components/SettingsPanel';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import DailyProgress from './components/DailyProgress';
import TaskManager from './components/TaskManager';
import SessionHistory from './components/SessionHistory';
import SoundSettings from './components/SoundSettings';
import { TimerSettings, Task } from './types';
import { Toaster } from 'react-hot-toast';

function App() {
  const {
    state,
    start,
    pause,
    reset,
    skip,
    toggleSettings,
    updateSettings,
    addTask,
    selectTask,
    completeTask,
    deleteTask,
    toggleSound,
    updateVolume,
    updateSoundUrl,
  } = usePomodoro();

  const handleSaveSettings = (newSettings: TimerSettings) => {
    updateSettings(newSettings);
  };

  // Determine background color based on timer status and dark mode
  let bgColor = state.settings.darkMode
    ? 'bg-gray-900'
    : 'bg-gradient-to-br from-white to-gray-50';
  
  if (state.status === 'work') {
    bgColor = state.settings.darkMode
      ? 'bg-red-950'
      : 'bg-gradient-to-br from-red-50 to-orange-50';
  } else if (state.status === 'shortBreak') {
    bgColor = state.settings.darkMode
      ? 'bg-green-950'
      : 'bg-gradient-to-br from-green-50 to-emerald-50';
  } else if (state.status === 'longBreak') {
    bgColor = state.settings.darkMode
      ? 'bg-blue-950'
      : 'bg-gradient-to-br from-blue-50 to-indigo-50';
  }

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(task);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${bgColor} ${state.settings.darkMode ? 'dark' : ''}`}>
      <DarkModeToggle
        darkMode={state.settings.darkMode}
        onToggle={() => updateSettings({ darkMode: !state.settings.darkMode })}
      />
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center max-w-md">
        <header className="w-full text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Pomodoro Timer</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay focused, be productive
          </p>
        </header>

        <main className="w-full flex-1 flex flex-col items-center justify-center space-y-8">
          <Timer timerState={state} />
          
          <Controls
            timerState={state}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onSkip={skip}
            onToggleSettings={toggleSettings}
          />
          
          <SessionIndicator
            completedPomodoros={state.completedPomodoros}
            longBreakInterval={state.settings.longBreakInterval}
          />

          <DailyProgress
            todayWorkTime={state.statistics.todayWorkTime}
            dailyGoal={state.settings.dailyGoal}
          />

          <TaskManager
            tasks={state.statistics.tasks}
            currentTask={state.currentTask}
            onAddTask={handleAddTask}
            onSelectTask={selectTask}
            onCompleteTask={completeTask}
            onDeleteTask={deleteTask}
          />

          <Statistics statistics={state.statistics} />

          <SessionHistory
            sessions={state.statistics.sessions}
            tasks={state.statistics.tasks}
          />
        </main>

        <Footer />

        <SettingsPanel
          isOpen={state.showSettings}
          settings={state.settings}
          onClose={toggleSettings}
          onSave={handleSaveSettings}
        >
          <SoundSettings
            soundEnabled={state.settings.soundEnabled}
            volume={state.settings.volume}
            soundUrl={state.settings.soundUrl}
            onToggleSound={toggleSound}
            onVolumeChange={updateVolume}
            onSoundUrlChange={updateSoundUrl}
          />
        </SettingsPanel>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: state.settings.darkMode ? '#374151' : '#fff',
            color: state.settings.darkMode ? '#fff' : '#1F2937',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }}
      />
    </div>
  );
}

export default App;