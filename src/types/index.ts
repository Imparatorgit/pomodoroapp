export type TimerStatus = 'work' | 'shortBreak' | 'longBreak' | 'idle';

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  dailyGoal: number;
  darkMode: boolean;
}

export interface TimerStatistics {
  totalWorkTime: number;
  totalBreakTime: number;
  completedPomodoros: number;
  dailyStreak: number;
  lastCompletedDate: string | null;
  todayWorkTime: number;
}

export interface TimerState {
  status: TimerStatus;
  timeLeft: number;
  isActive: boolean;
  completedPomodoros: number;
  settings: TimerSettings;
  showSettings: boolean;
  statistics: TimerStatistics;
}