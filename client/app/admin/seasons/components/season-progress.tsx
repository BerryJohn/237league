import { Progress } from '@heroui/progress';
import { Season } from '@shared/types';

interface SeasonProgressProps {
  season: Season;
}

export function SeasonProgress({ season }: SeasonProgressProps) {
  const progressValue =
    season.totalRounds > 0
      ? (season.completedRounds / season.totalRounds) * 100
      : 0;

  const getProgressColor = () => {
    if (season.status === 'completed') return 'success';
    if (season.status === 'cancelled') return 'danger';
    if (progressValue === 0) return 'warning';
    return 'primary';
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-tiny">
        <span>
          {season.completedRounds}/{season.totalRounds} rund
        </span>
        <span>{Math.round(progressValue)}%</span>
      </div>
      <Progress
        value={progressValue}
        color={getProgressColor()}
        size="sm"
        className="max-w-md"
      />
    </div>
  );
}
