'use client';

import { Card, CardHeader, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { UserStats } from '@/types';

interface UserStatsCardProps {
  stats: UserStats;
}

export function UserStatsCard({ stats }: UserStatsCardProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${remainingMinutes}m`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'success';
    if (accuracy >= 85) return 'warning';
    return 'danger';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {/* Overall Stats */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <h3 className="text-xl font-semibold">Racing Statistics</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.totalRaces}
              </div>
              <div className="text-sm text-default-500">Total Races</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {stats.bestWpm}
              </div>
              <div className="text-sm text-default-500">Best WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {stats.averageWpm}
              </div>
              <div className="text-sm text-default-500">Average WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                #{stats.rank}
              </div>
              <div className="text-sm text-default-500">Global Rank</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Accuracy & Progress */}
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Accuracy</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Accuracy</span>
                <span className="text-sm font-semibold">{stats.accuracy}%</span>
              </div>
              <div className="w-full bg-default-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    getAccuracyColor(stats.accuracy) === 'success'
                      ? 'bg-success'
                      : getAccuracyColor(stats.accuracy) === 'warning'
                        ? 'bg-warning'
                        : 'bg-danger'
                  }`}
                  style={{ width: `${stats.accuracy}%` }}
                />
              </div>
            </div>
            <div className="text-sm text-default-500">
              Time Spent: {formatTime(stats.totalTimeSpent)}
            </div>
            <div className="text-sm text-default-500">
              Points: {stats.points.toLocaleString()}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Recent Achievements */}
      <Card className="col-span-1 md:col-span-1 lg:col-span-2">
        <CardHeader>
          <h4 className="text-lg font-semibold">Recent Achievements</h4>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {stats.achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-default-50"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{achievement.name}</div>
                  <div className="text-sm text-default-500">
                    {achievement.description}
                  </div>
                </div>
                <Chip
                  size="sm"
                  color={
                    achievement.rarity === 'legendary'
                      ? 'warning'
                      : achievement.rarity === 'epic'
                        ? 'secondary'
                        : achievement.rarity === 'rare'
                          ? 'primary'
                          : 'default'
                  }
                >
                  {achievement.rarity}
                </Chip>
              </div>
            ))}
            {stats.achievements.length === 0 && (
              <div className="text-center text-default-500 py-4">
                No achievements yet. Keep racing to unlock them!
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
