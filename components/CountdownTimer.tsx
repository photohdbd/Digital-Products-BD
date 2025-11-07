import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    // Explicitly type `timeLeft` to ensure values are treated as numbers.
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

  // Explicitly type the useState hook to help with type inference.
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
      // FIX: The type of `value` from `Object.entries` on an object with an index signature
      // can be inferred as `unknown`. Using a `typeof` check acts as a type guard to
      // ensure `value` is a number before performing a numeric comparison.
      if (typeof value !== 'number' || value < 0) return null;
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