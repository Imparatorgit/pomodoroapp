import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-4 right-4 p-2 rounded-full transition-colors ${
        darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
      } hover:scale-110 transform duration-200`}
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default DarkModeToggle;