'use client';

import { Card, CardHeader, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { RecentRace } from '@/types';

interface RecentRacesCardProps {
  races: RecentRace[];
}

export function RecentRacesCard({ races }: RecentRacesCardProps) {
  const getPositionColor = (position: number, total: number) => {
    const percentage = position / total;
    if (percentage <= 0.1) return 'success'; // Top 10%
    if (percentage <= 0.3) return 'warning'; // Top 30%
    return 'default';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">Recent Races</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {races.length > 0 ? (
            races.map((race) => (
              <div
                key={race.id}
                className="p-4 rounded-lg border border-default-200 hover:bg-default-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-3 items-center">
                    <Chip
                      color={getPositionColor(
                        race.position,
                        race.totalParticipants
                      )}
                      variant="flat"
                      size="sm"
                    >
                      #{race.position}/{race.totalParticipants}
                    </Chip>
                    <div className="text-lg font-semibold">{race.wpm} WPM</div>
                    <Chip variant="flat" size="sm">
                      {race.accuracy}% accuracy
                    </Chip>
                  </div>
                  <div className="text-sm text-default-500">
                    {formatDate(race.createdAt)}
                  </div>
                </div>

                <div className="text-sm text-default-600 line-clamp-2">
                  &ldquo;{race.textPreview}&rdquo;
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-default-500 py-8">
              <div className="text-4xl mb-2">🏁</div>
              <div>No races completed yet</div>
              <div className="text-sm">
                Start your first race to see your progress here!
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
