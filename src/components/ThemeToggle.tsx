import React from 'react';
import { useTheme } from '../context/ThemeContext';

type ThemeToggleProps = {
  onToggle?: () => void;
  isSwitching?: boolean;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle, isSwitching = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Light mode' : 'Dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      disabled={isSwitching}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isSwitching ? '✨' : isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};
