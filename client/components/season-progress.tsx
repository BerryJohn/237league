import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Season } from '@/types';

interface SeasonProgressProps {
  season: Season;
  showStats?: boolean;
}

export const SeasonProgress = ({
  season,
  showStats = true,
}: SeasonProgressProps) => {
  const progress = (season.completedRounds / season.totalRounds) * 100;
  const remainingRounds = season.totalRounds - season.completedRounds;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-lg">Season Progress</h3>
          <Chip color={getStatusColor(season.status)} size="sm">
            {season.status.toUpperCase()}
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Rounds Completed</span>
              <span className="font-medium">
                {season.completedRounds} / {season.totalRounds}
              </span>
            </div>
            <div className="w-full bg-default-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  season.status === 'completed'
                    ? 'bg-success'
                    : season.status === 'ongoing'
                      ? 'bg-primary'
                      : 'bg-default-400'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="text-xs text-default-500 mt-1">
              {progress.toFixed(1)}% complete
            </div>
          </div>

          {/* Season Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-default-500">Start Date:</span>
              <div className="font-medium">
                {new Date(season.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div>
              <span className="text-default-500">End Date:</span>
              <div className="font-medium">
                {new Date(season.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          {showStats && (
            <div className="border-t pt-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-default-50 rounded">
                  <div className="text-xs text-default-500">Remaining</div>
                  <div className="font-bold text-primary">
                    {remainingRounds}
                  </div>
                  <div className="text-xs">rounds</div>
                </div>
                <div className="text-center p-2 bg-default-50 rounded">
                  <div className="text-xs text-default-500">Categories</div>
                  <div className="font-bold text-secondary">
                    {season.categories.length}
                  </div>
                  <div className="text-xs">classes</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
