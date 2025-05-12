import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 text-center text-gray-500 text-sm">
      <p>
        The Pomodoro Technique is a time management method developed by Francesco Cirillo.
      </p>
      <p className="mt-1">
        © {new Date().getFullYear()} Pomodoro Timer
      </p>
    </footer>
  );
};

export default Footer;