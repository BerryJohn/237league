import { Chip } from '@heroui/chip';
import { Race } from '@shared/types';

interface RaceStatusChipProps {
  race: Race;
}

type RaceStatus = 'upcoming' | 'ongoing' | 'finished' | 'cancelled';
type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Get status based on race date
 * @param race - The race object
 * @returns The race status
 */
export function getRaceStatus(race: Race): RaceStatus {
  const now = new Date();
  const raceDate = new Date(race.raceDate);
  const raceEnd = new Date(raceDate.getTime() + 2 * 60 * 60 * 1000); // Assuming 2 hour races

  if (now < raceDate) {
    return 'upcoming';
  } else if (now >= raceDate && now <= raceEnd) {
    return 'ongoing';
  } else {
    return 'finished';
  }
}

/**
 * Get color for race status chip
 * @param status - The race status
 * @returns The appropriate chip color
 */
export function getRaceStatusColor(status: RaceStatus): ChipColor {
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
 * Get display label for race status
 * @param status - The race status
 * @returns The localized display label
 */
export function getRaceStatusLabel(status: RaceStatus): string {
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

export function RaceStatusChip({ race }: RaceStatusChipProps) {
  const status = getRaceStatus(race);
  const color = getRaceStatusColor(status);
  const label = getRaceStatusLabel(status);

  return (
    <Chip variant="flat" color={color} size="sm">
      {label}
    </Chip>
  );
}
