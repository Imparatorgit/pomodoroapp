export type TimerStatus = 'work' | 'shortBreak' | 'longBreak' | 'idle';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  pomodoros: number;
  createdAt: string;
}

export interface Session {
  id: string;
  type: TimerStatus;
  duration: number;
  startTime: string;
  endTime: string;
  taskId?: string;
}

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  dailyGoal: number;
  darkMode: boolean;
  soundEnabled: boolean;
  soundUrl: string;
  volume: number;
}

export interface TimerStatistics {
  totalWorkTime: number;
  totalBreakTime: number;
  completedPomodoros: number;
  dailyStreak: number;
  lastCompletedDate: string | null;
  todayWorkTime: number;
  sessions: Session[];
  tasks: Task[];
}

export interface TimerState {
  status: TimerStatus;
  timeLeft: number;
  isActive: boolean;
  completedPomodoros: number;
  settings: TimerSettings;
  showSettings: boolean;
  statistics: TimerStatistics;
  currentTask?: Task;
}