import React from 'react';
import { Chip } from '@heroui/chip';
import { User } from '@heroui/user';
import { RacerStats } from './types';
import { statusColorMap, skillLevelColorMap } from './constants';
import { RatingBar } from './rating-bar';

interface TableCellRenderersProps {
  racer: RacerStats;
  columnKey: React.Key;
}

export const renderOverallRating = (racer: RacerStats) => (
  <div className="flex items-center gap-2">
    <span className="text-lg font-bold">{racer.overallRating}</span>
    <div className="w-16 bg-default-200 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-danger to-success h-2 rounded-full transition-all duration-300"
        style={{ width: `${racer.overallRating}%` }}
      />
    </div>
  </div>
);

export const renderRacerName = (racer: RacerStats) => (
  <User
    avatarProps={{
      radius: 'lg',
      src: racer.avatar,
    }}
    description={racer.team}
    name={racer.name}
  >
    {racer.name}
  </User>
);

export const renderSkillLevel = (racer: RacerStats) => (
  <Chip
    className="capitalize"
    color={skillLevelColorMap[racer.skillLevel]}
    size="sm"
    variant="flat"
  >
    {racer.skillLevel}
  </Chip>
);

export const renderSuggestedSplit = (racer: RacerStats) => (
  <div className="flex items-center">
    <span className="text-bold text-sm">{racer.suggestedSplit}</span>
  </div>
);

export const renderPaceRating = (racer: RacerStats) => (
  <RatingBar value={racer.paceRating} color="primary" />
);

export const renderConsistencyRating = (racer: RacerStats) => (
  <RatingBar value={racer.consistencyRating} color="secondary" />
);

export const renderSafetyRating = (racer: RacerStats) => (
  <RatingBar value={racer.safetyRating} color="success" />
);

export const renderIncidentRate = (racer: RacerStats) => (
  <div className="flex items-center">
    <span
      className={`text-bold text-sm ${
        racer.incidentRate > 2
          ? 'text-danger'
          : racer.incidentRate > 1
            ? 'text-warning'
            : 'text-success'
      }`}
    >
      {racer.incidentRate.toFixed(1)}/race
    </span>
  </div>
);

export const renderTotalRaces = (racer: RacerStats) => (
  <div className="flex items-center">
    <span className="text-bold text-sm">{racer.totalRaces}</span>
  </div>
);

export const renderStatus = (racer: RacerStats) => (
  <Chip
    className="capitalize"
    color={statusColorMap[racer.status]}
    size="sm"
    variant="flat"
  >
    {racer.status}
  </Chip>
);

export const renderTableCell = (racer: RacerStats, columnKey: React.Key) => {
  const cellValue = racer[columnKey as keyof RacerStats];

  switch (columnKey) {
    case 'overallRating':
      return renderOverallRating(racer);
    case 'name':
      return renderRacerName(racer);
    case 'skillLevel':
      return renderSkillLevel(racer);
    case 'suggestedSplit':
      return renderSuggestedSplit(racer);
    case 'paceRating':
      return renderPaceRating(racer);
    case 'consistencyRating':
      return renderConsistencyRating(racer);
    case 'safetyRating':
      return renderSafetyRating(racer);
    case 'incidentRate':
      return renderIncidentRate(racer);
    case 'totalRaces':
      return renderTotalRaces(racer);
    case 'status':
      return renderStatus(racer);
    default:
      return cellValue;
  }
};
