import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    // Fix: Explicitly type `timeLeft` to ensure values are treated as numbers.
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Fix: Explicitly type the useState hook to ensure timeLeft's value is always a number.
  // This resolves the TypeScript error where `value` was inferred as `unknown`.
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
      if (value < 0) return null;
      return (
          <div key={interval} className="flex flex-col items-center mx-2">
              <span className="text-xl md:text-2xl font-bold text-accent">{String(value).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-gray-400">{interval}</span>
          </div>
      );
  });

  return (
    <div className="flex justify-center my-4 p-2 bg-base-200/50 rounded-lg">
      {Object.keys(timeLeft).length ? timerComponents : <span className="text-red-500 font-semibold">Offer Expired!</span>}
    </div>
  );
};

export default CountdownTimer;