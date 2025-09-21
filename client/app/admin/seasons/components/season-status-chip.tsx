import { Chip } from '@heroui/chip';

interface SeasonStatusChipProps {
  isFinished: boolean;
}

export function SeasonStatusChip({ isFinished }: SeasonStatusChipProps) {
  return (
    <Chip variant="flat" color={isFinished ? 'success' : 'primary'} size="sm">
      {isFinished ? 'Zakończony' : 'Aktywny'}
    </Chip>
  );
}
