import React from 'react';
import { formatTime } from '../utils/formatTime';
import { TimerState } from '../types';

interface TimerProps {
  timerState: TimerState;
}

const Timer: React.FC<TimerProps> = ({ timerState }) => {
  const { timeLeft, status, settings } = timerState;
  
  let totalDuration = 0;
  switch (status) {
    case 'work':
      totalDuration = settings.workDuration;
      break;
    case 'shortBreak':
      totalDuration = settings.shortBreakDuration;
      break;
    case 'longBreak':
      totalDuration = settings.longBreakDuration;
      break;
    case 'idle':
      totalDuration = settings.workDuration;
      break;
    default:
      totalDuration = settings.workDuration;
  }
  
  const progress = 1 - (timeLeft / totalDuration);
  const circumference = 2 * Math.PI * 120;
  const dashOffset = circumference * (1 - progress);
  
  let progressColor = '';
  let statusLabel = '';
  let statusBg = '';
  
  switch (status) {
    case 'work':
      progressColor = settings.darkMode ? 'stroke-red-400' : 'stroke-red-500';
      statusLabel = 'Focus Time';
      statusBg = settings.darkMode ? 'bg-red-900/30 text-red-100' : 'bg-red-100 text-red-700';
      break;
    case 'shortBreak':
      progressColor = settings.darkMode ? 'stroke-green-400' : 'stroke-green-500';
      statusLabel = 'Short Break';
      statusBg = settings.darkMode ? 'bg-green-900/30 text-green-100' : 'bg-green-100 text-green-700';
      break;
    case 'longBreak':
      progressColor = settings.darkMode ? 'stroke-blue-400' : 'stroke-blue-500';
      statusLabel = 'Long Break';
      statusBg = settings.darkMode ? 'bg-blue-900/30 text-blue-100' : 'bg-blue-100 text-blue-700';
      break;
    case 'idle':
      progressColor = settings.darkMode ? 'stroke-gray-400' : 'stroke-gray-500';
      statusLabel = 'Ready';
      statusBg = settings.darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-700';
      break;
    default:
      progressColor = settings.darkMode ? 'stroke-gray-400' : 'stroke-gray-500';
      statusLabel = 'Ready';
      statusBg = settings.darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-700';
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Keyboard Shortcuts: Space (Start/Pause) | Ctrl+R (Reset) | Ctrl+S (Skip) | Alt+↑/↓ (Volume)
      </div>
      <div className={`px-4 py-1 rounded-full text-sm font-medium mb-6 ${statusBg}`}>
        {statusLabel}
      </div>
      
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 256 256">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            className={settings.darkMode ? 'stroke-gray-700' : 'stroke-gray-200'}
            strokeWidth="12"
          />
        </svg>
        
        <svg 
          className="absolute w-full h-full -rotate-90 transform"
          viewBox="0 0 256 256"
        >
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            className={progressColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default Timer