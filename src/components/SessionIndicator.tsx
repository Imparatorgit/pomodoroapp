import React from 'react';

interface SessionIndicatorProps {
  completedPomodoros: number;
  longBreakInterval: number;
}

const SessionIndicator: React.FC<SessionIndicatorProps> = ({
  completedPomodoros,
  longBreakInterval,
}) => {
  // Calculate the current session within the interval
  const currentSession = completedPomodoros % longBreakInterval || 0;
  
  // Create an array for the indicators based on the long break interval
  const indicators = Array.from({ length: longBreakInterval }, (_, i) => {
    // Determine if this indicator should be filled
    const isFilled = i < currentSession;
    return { isFilled, id: i };
  });

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="text-sm text-gray-600 mb-2">
        {completedPomodoros} pomodoros completed
      </p>
      <div className="flex space-x-2">
        {indicators.map(({ isFilled, id }) => (
          <div
            key={id}
            className={`w-3 h-3 rounded-full ${
              isFilled ? 'bg-red-500' : 'bg-gray-300'
            } transition-colors`}
            aria-label={`Session ${id + 1} ${isFilled ? 'completed' : 'not completed'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SessionIndicator;