import React from 'react';

interface RatingBarProps {
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingBar: React.FC<RatingBarProps> = ({
  value,
  maxValue = 100,
  color = 'primary',
  showValue = true,
  size = 'sm',
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const sizeClasses = {
    sm: 'w-12 h-1.5',
    md: 'w-16 h-2',
    lg: 'w-20 h-3',
  };

  return (
    <div className="flex items-center gap-2">
      {showValue && (
        <span className="text-bold text-sm min-w-[2rem]">{value}</span>
      )}
      <div className={`bg-default-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`bg-${color} h-full rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
