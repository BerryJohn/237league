import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Track } from '@/types';

interface TrackInfoCardProps {
  track: Track;
}

export const TrackInfoCard = ({ track }: TrackInfoCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      case 'expert':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold text-lg">🏁 Track Information</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2">{track.name}</h4>
            <p className="text-default-600">
              {track.location}, {track.country}
            </p>
            {track.description && (
              <p className="text-sm text-default-500 mt-2">
                {track.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-default-500">Length</span>
              <div className="font-semibold">{track.length} km</div>
            </div>
            <div>
              <span className="text-sm text-default-500">Corners</span>
              <div className="font-semibold">{track.corners}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-default-500">Difficulty:</span>
            <Chip
              color={getDifficultyColor(track.difficulty)}
              variant="flat"
              size="sm"
            >
              {track.difficulty.toUpperCase()}
            </Chip>
          </div>

          {track.lapRecord && (
            <div className="border-t border-default-200 pt-4">
              <h5 className="font-medium mb-2">🏆 Lap Record</h5>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-default-500">Time:</span>
                  <span className="font-mono font-bold text-primary">
                    {track.lapRecord.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Driver:</span>
                  <span className="font-medium">{track.lapRecord.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Car:</span>
                  <span>{track.lapRecord.car}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Date:</span>
                  <span>
                    {new Date(track.lapRecord.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
