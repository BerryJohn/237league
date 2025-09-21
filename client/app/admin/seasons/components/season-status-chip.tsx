import { Chip } from '@heroui/chip';
import type { Season } from '@shared/types';

interface SeasonStatusChipProps {
  season: Season;
}

type SeasonStatus = 'upcoming' | 'ongoing' | 'finished' | 'cancelled';
type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Get color for season status chip
 * @param status - The season status
 * @returns The appropriate chip color
 */
export function getSeasonStatusColor(status: SeasonStatus): ChipColor {
  switch (status) {
    case 'upcoming':
      return 'primary';
    case 'ongoing':
      return 'warning';
    case 'finished':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'default';
  }
}

/**
 * Get display label for season status
 * @param status - The season status
 * @returns The localized display label
 */
export function getSeasonStatusLabel(status: SeasonStatus): string {
  switch (status) {
    case 'upcoming':
      return 'Nadchodzący';
    case 'ongoing':
      return 'W trakcie';
    case 'finished':
      return 'Zakończony';
    case 'cancelled':
      return 'Anulowany';
    default:
      return status;
  }
}

export function SeasonStatusChip({ season }: SeasonStatusChipProps) {
  const color = getSeasonStatusColor(season.status);
  const label = getSeasonStatusLabel(season.status);

  return (
    <Chip variant="flat" color={color} size="sm">
      {label}
    </Chip>
  );
}
