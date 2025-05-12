import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundSettingsProps {
  soundEnabled: boolean;
  volume: number;
  soundUrl: string;
  onToggleSound: () => void;
  onVolumeChange: (volume: number) => void;
  onSoundUrlChange: (url: string) => void;
}

const SOUND_OPTIONS = [
  { label: 'Bell', url: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg' },
  { label: 'Chime', url: 'https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg' },
  { label: 'Digital', url: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg' },
];

const SoundSettings: React.FC<SoundSettingsProps> = ({
  soundEnabled,
  volume,
  soundUrl,
  onToggleSound,
  onVolumeChange,
  onSoundUrlChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sound Notifications
        </label>
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-md ${
            soundEnabled
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {soundEnabled && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Volume
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sound Effect
            </label>
            <select
              value={soundUrl}
              onChange={(e) => onSoundUrlChange(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 text-gray-800 dark:text-gray-100"
            >
              {SOUND_OPTIONS.map((option) => (
                <option key={option.url} value={option.url}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default SoundSettings;