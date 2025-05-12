import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import { TimerState } from '../types';

interface ControlsProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onToggleSettings: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  timerState,
  onStart,
  onPause,
  onReset,
  onSkip,
  onToggleSettings,
}) => {
  const { isActive, status } = timerState;

  let mainButtonColor = '';
  switch (status) {
    case 'work':
      mainButtonColor = isActive ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-red-500 text-white hover:bg-red-600';
      break;
    case 'shortBreak':
      mainButtonColor = isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-green-500 text-white hover:bg-green-600';
      break;
    case 'longBreak':
      mainButtonColor = isActive ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'bg-blue-500 text-white hover:bg-blue-600';
      break;
    default:
      mainButtonColor = isActive ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-500 text-white hover:bg-gray-600';
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        {isActive ? (
          <button
            onClick={onPause}
            className={`p-4 rounded-full ${mainButtonColor} transition-all duration-200 transform hover:scale-105`}
            aria-label="Pause"
          >
            <Pause size={28} />
          </button>
        ) : (
          <button
            onClick={onStart}
            className={`p-4 rounded-full ${mainButtonColor} transition-all duration-200 transform hover:scale-105`}
            aria-label="Start"
          >
            <Play size={28} />
          </button>
        )}

        <button
          onClick={onReset}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
          aria-label="Reset"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={onSkip}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
          aria-label="Skip"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <button
        onClick={onToggleSettings}
        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 ml-2"
        aria-label="Settings"
      >
        <Settings size={24} />
      </button>
    </div>
  );
};

export default Controls;