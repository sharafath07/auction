import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { formatTimeLeft, isEndingSoon } from '../../utils/format';

export const CountdownTimer = ({ endTime, size = 'md', showIcon = true }) => {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime));
  const [isEnding, setIsEnding] = useState(isEndingSoon(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime));
      setIsEnding(isEndingSoon(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const colorClasses = isEnding
    ? 'text-red-600 bg-red-50 border-red-200'
    : 'text-gray-600 bg-gray-50 border-gray-200';

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-md border ${colorClasses} ${sizeClasses[size]}`}>
      {showIcon && <Clock className="w-3 h-3 mr-1" />}
      <span className="font-medium">{timeLeft}</span>
    </div>
  );
};
