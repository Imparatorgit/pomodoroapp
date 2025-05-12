import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TimerSettings } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  settings: TimerSettings;
  onClose: () => void;
  onSave: (settings: TimerSettings) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
}) => {
  const [formValues, setFormValues] = useState({
    workDuration: settings.workDuration / 60,
    shortBreakDuration: settings.shortBreakDuration / 60,
    longBreakDuration: settings.longBreakDuration / 60,
    longBreakInterval: settings.longBreakInterval,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseInt(value, 10) || 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert minutes to seconds for durations
    const updatedSettings: TimerSettings = {
      workDuration: formValues.workDuration * 60,
      shortBreakDuration: formValues.shortBreakDuration * 60,
      longBreakDuration: formValues.longBreakDuration * 60,
      longBreakInterval: formValues.longBreakInterval,
    };
    
    onSave(updatedSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Timer Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close settings"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                name="workDuration"
                value={formValues.workDuration}
                onChange={handleChange}
                min="1"
                max="60"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                name="shortBreakDuration"
                value={formValues.shortBreakDuration}
                onChange={handleChange}
                min="1"
                max="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                name="longBreakDuration"
                value={formValues.longBreakDuration}
                onChange={handleChange}
                min="5"
                max="60"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pomodoros Before Long Break
              </label>
              <input
                type="number"
                name="longBreakInterval"
                value={formValues.longBreakInterval}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;