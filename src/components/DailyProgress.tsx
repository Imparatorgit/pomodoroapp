import React from 'react';
import { Target } from 'lucide-react';

interface DailyProgressProps {
  todayWorkTime: number;
  dailyGoal: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ todayWorkTime, dailyGoal }) => {
  const progress = Math.min((todayWorkTime / (dailyGoal * 60)) * 100, 100);
  const formattedProgress = Math.round(progress);
  
  const hours = Math.floor(todayWorkTime / 3600);
  const minutes = Math.floor((todayWorkTime % 3600) / 60);
  
  return (
    <div className="w-full max-w-md mt-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target size={18} className="text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Goal Progress</span>
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {hours}h {minutes}m / {dailyGoal}h
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right mt-1">
        <span className="text-sm text-gray-500 dark:text-gray-400">{formattedProgress}%</span>
      </div>
    </div>
  );
};

export default DailyProgress;