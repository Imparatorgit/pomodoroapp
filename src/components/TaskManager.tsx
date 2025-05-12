import React, { useState } from 'react';
import { Plus, Check, X, Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  currentTask?: Task;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onSelectTask: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  currentTask,
  onAddTask,
  onSelectTask,
  onCompleteTask,
  onDeleteTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPomodoros, setNewTaskPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask({
        title: newTaskTitle.trim(),
        completed: false,
        pomodoros: newTaskPomodoros,
      });
      setNewTaskTitle('');
      setNewTaskPomodoros(1);
    }
  };

  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Tasks</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 text-gray-800 dark:text-gray-100"
          />
          <input
            type="number"
            value={newTaskPomodoros}
            onChange={(e) => setNewTaskPomodoros(parseInt(e.target.value, 10) || 1)}
            min="1"
            max="10"
            className="w-16 px-2 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 text-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            className="p-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              task.id === currentTask?.id
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-white dark:bg-gray-800'
            } shadow-sm transition-colors`}
          >
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => onCompleteTask(task.id)}
                className={`p-1 rounded-full ${
                  task.completed
                    ? 'bg-green-500 text-white'
                    : 'border-2 border-gray-300 dark:border-gray-600'
                }`}
              >
                {task.completed && <Check size={16} />}
              </button>
              <span
                className={`flex-1 text-gray-800 dark:text-gray-100 ${
                  task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}
              >
                {task.title}
              </span>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Clock size={16} />
                <span className="text-sm">{task.pomodoros}</span>
              </div>
            </div>
            
            <div className="flex gap-2 ml-4">
              {!task.completed && (
                <button
                  onClick={() => onSelectTask(task)}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {task.id === currentTask?.id ? 'Selected' : 'Select'}
                </button>
              )}
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;