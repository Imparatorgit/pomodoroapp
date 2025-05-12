import React from 'react';
import { Session, Task } from '../types';
import { formatTime } from '../utils/formatTime';
import { Calendar, Clock } from 'lucide-react';

interface SessionHistoryProps {
  sessions: Session[];
  tasks: Task[];
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, tasks }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getTaskTitle = (taskId?: string) => {
    if (!taskId) return 'No task';
    const task = tasks.find(t => t.id === taskId);
    return task ? task.title : 'Unknown task';
  };

  const groupedSessions = sessions.reduce((acc, session) => {
    const date = new Date(session.startTime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Session History</h2>
      
      <div className="space-y-6">
        {Object.entries(groupedSessions).map(([date, daySessions]) => (
          <div key={date} className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span className="text-sm font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            
            <div className="space-y-2">
              {daySessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          session.type === 'work'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : session.type === 'shortBreak'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        }`}
                      >
                        {session.type === 'work'
                          ? 'Focus'
                          : session.type === 'shortBreak'
                          ? 'Short Break'
                          : 'Long Break'}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {getTaskTitle(session.taskId)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock size={16} />
                      <span className="text-sm">{formatTime(session.duration)}</span>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(session.startTime)} - {formatDate(session.endTime)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionHistory;