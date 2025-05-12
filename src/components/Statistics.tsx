import React from 'react';
import { TimerStatistics } from '../types';
import { Clock, Calendar, Award, BarChart2 } from 'lucide-react';

interface StatisticsPanelProps {
  statistics: TimerStatistics;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock size={18} />
          <span className="text-sm font-medium">Focus Time</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {formatTime(statistics.totalWorkTime)}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <BarChart2 size={18} />
          <span className="text-sm font-medium">Pomodoros</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {statistics.completedPomodoros}
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Calendar size={18} />
          <span className="text-sm font-medium">Daily Streak</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {statistics.dailyStreak} days
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Award size={18} />
          <span className="text-sm font-medium">Break Time</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {formatTime(statistics.totalBreakTime)}
        </p>
      </div>
    </div>
  );
};

export default StatisticsPanel;