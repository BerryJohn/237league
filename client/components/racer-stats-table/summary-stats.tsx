import React from 'react';
import { RacerStats } from './types';

interface SummaryStatsProps {
  racers: RacerStats[];
}

interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-content2 p-4 rounded-lg">
    <h3 className="text-sm font-semibold text-default-500 mb-1">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export const SummaryStats: React.FC<SummaryStatsProps> = ({ racers }) => {
  const totalRacers = racers.length;
  const averageRating =
    totalRacers > 0
      ? Math.round(
          racers.reduce((sum, r) => sum + r.overallRating, 0) / totalRacers
        )
      : 0;
  const activeRacers = racers.filter((r) => r.status === 'active').length;
  const racersOnProbation = racers.filter(
    (r) => r.status === 'probation'
  ).length;

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard title="Total Racers" value={totalRacers} />
      <StatCard title="Average Rating" value={averageRating} />
      <StatCard title="Active Racers" value={activeRacers} />
      <StatCard title="On Probation" value={racersOnProbation} />
    </div>
  );
};
