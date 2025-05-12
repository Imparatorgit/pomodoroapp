import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { TimerState, TimerSettings, TimerStatus } from '../types';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
  dailyGoal: 4, // 4 hours daily goal
  darkMode: false,
};

const getInitialStatistics = () => {
  const savedStats = localStorage.getItem('pomodoroStats');
  const today = new Date().toLocaleDateString();
  
  const defaultStats = {
    totalWorkTime: 0,
    totalBreakTime: 0,
    completedPomodoros: 0,
    dailyStreak: 0,
    lastCompletedDate: null,
    todayWorkTime: 0,
  };

  if (savedStats) {
    const stats = JSON.parse(savedStats);
    // Reset today's work time if it's a new day
    if (stats.lastCompletedDate !== today) {
      stats.todayWorkTime = 0;
    }
    return stats;
  }

  return defaultStats;
};

const initialState: TimerState = {
  status: 'idle',
  timeLeft: DEFAULT_SETTINGS.workDuration,
  isActive: false,
  completedPomodoros: 0,
  settings: DEFAULT_SETTINGS,
  showSettings: false,
  statistics: getInitialStatistics(),
};

const timerReducer = (state: TimerState, action: any): TimerState => {
  switch (action.type) {
    case 'START':
      return { ...state, isActive: true };
    case 'PAUSE':
      return { ...state, isActive: false };
    case 'RESET':
      return {
        ...state,
        isActive: false,
        status: 'idle',
        timeLeft: state.settings.workDuration,
      };
    case 'TICK':
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };
    case 'COMPLETE_POMODORO': {
      const newCompletedPomodoros = state.completedPomodoros + 1;
      const newStats = {
        ...state.statistics,
        totalWorkTime: state.statistics.totalWorkTime + state.settings.workDuration,
        completedPomodoros: state.statistics.completedPomodoros + 1,
      };

      // Update streak
      const today = new Date().toLocaleDateString();
      if (state.statistics.lastCompletedDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isConsecutive = state.statistics.lastCompletedDate === yesterday.toLocaleDateString();
        
        newStats.dailyStreak = isConsecutive ? state.statistics.dailyStreak + 1 : 1;
        newStats.lastCompletedDate = today;
      }

      let newStatus: TimerStatus;
      let newTimeLeft: number;

      if (newCompletedPomodoros % state.settings.longBreakInterval === 0) {
        newStatus = 'longBreak';
        newTimeLeft = state.settings.longBreakDuration;
      } else {
        newStatus = 'shortBreak';
        newTimeLeft = state.settings.shortBreakDuration;
      }

      return {
        ...state,
        status: newStatus,
        timeLeft: newTimeLeft,
        completedPomodoros: newCompletedPomodoros,
        statistics: newStats,
      };
    }
    case 'COMPLETE_BREAK': {
      const newStats = {
        ...state.statistics,
        totalBreakTime: state.statistics.totalBreakTime + 
          (state.status === 'longBreak' 
            ? state.settings.longBreakDuration 
            : state.settings.shortBreakDuration),
      };

      return {
        ...state,
        status: 'work',
        timeLeft: state.settings.workDuration,
        statistics: newStats,
      };
    }
    case 'SKIP':
      if (state.status === 'work') {
        return timerReducer(state, { type: 'COMPLETE_POMODORO' });
      } else {
        return timerReducer(state, { type: 'COMPLETE_BREAK' });
      }
    case 'TOGGLE_SETTINGS':
      return { ...state, showSettings: !state.showSettings, isActive: false };
    case 'UPDATE_SETTINGS':
      const updatedSettings = { ...state.settings, ...action.payload };
      let updatedTimeLeft = state.timeLeft;
      
      if (state.status === 'work' || state.status === 'idle') {
        updatedTimeLeft = updatedSettings.workDuration;
      } else if (state.status === 'shortBreak') {
        updatedTimeLeft = updatedSettings.shortBreakDuration;
      } else if (state.status === 'longBreak') {
        updatedTimeLeft = updatedSettings.longBreakDuration;
      }
      
      return { 
        ...state, 
        settings: updatedSettings, 
        timeLeft: updatedTimeLeft 
      };
    default:
      return state;
  }
};

export const usePomodoro = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);

  // Save statistics to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify(state.statistics));
  }, [state.statistics]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch(e.code) {
        case 'Space':
          e.preventDefault();
          state.isActive ? pause() : start();
          break;
        case 'KeyR':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            reset();
          }
          break;
        case 'KeyS':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            skip();
          }
          break;
        case 'KeyD':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            updateSettings({ darkMode: !state.settings.darkMode });
            toast.success(`${state.settings.darkMode ? 'Light' : 'Dark'} mode enabled`);
          }
          break;
        case 'ArrowUp':
          if (e.altKey) {
            e.preventDefault();
            setVolume(prev => Math.min(1, prev + 0.1));
            toast.success(`Volume: ${Math.round((volume + 0.1) * 100)}%`);
          }
          break;
        case 'ArrowDown':
          if (e.altKey) {
            e.preventDefault();
            setVolume(prev => Math.max(0, prev - 0.1));
            toast.success(`Volume: ${Math.round((volume - 0.1) * 100)}%`);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.isActive, state.settings.darkMode, volume]);

  // Timer effect
  useEffect(() => {
    if (state.isActive) {
      intervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isActive]);

  // Handle timer completion
  useEffect(() => {
    if (state.timeLeft === 0) {
      // Play sound
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }

      // Show notification
      if (state.status === 'work') {
        toast.success('Work session completed! Time for a break.', {
          icon: '🎉',
          duration: 4000,
        });
        dispatch({ type: 'COMPLETE_POMODORO' });
      } else {
        toast.success('Break time is over. Ready to focus?', {
          icon: '💪',
          duration: 4000,
        });
        dispatch({ type: 'COMPLETE_BREAK' });
      }

      // Send system notification
      if (Notification.permission === 'granted') {
        const message = state.status === 'work' 
          ? 'Work session completed! Time for a break.' 
          : 'Break time is over. Ready to get back to work?';
          
        new Notification('Pomodoro Timer', { body: message });
      }
    }
  }, [state.timeLeft, state.status]);

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const skip = useCallback(() => dispatch({ type: 'SKIP' }), []);
  const toggleSettings = useCallback(() => dispatch({ type: 'TOGGLE_SETTINGS' }), []);
  const updateSettings = useCallback(
    (settings: Partial<TimerSettings>) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    []
  );

  return {
    state,
    start,
    pause,
    reset,
    skip,
    toggleSettings,
    updateSettings,
  };
};