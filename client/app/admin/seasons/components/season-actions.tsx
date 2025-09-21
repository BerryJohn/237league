import { Tooltip } from '@heroui/tooltip';
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';
import { Season } from './mock-data';

interface SeasonActionsProps {
  season: Season;
  onEdit: (season: Season) => void;
  onDelete: (season: Season) => void;
  onView?: (season: Season) => void;
}

export function SeasonActions({
  season,
  onEdit,
  onDelete,
  onView,
}: SeasonActionsProps) {
  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Szczegóły">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onView?.(season)}
        >
          <EyeIcon />
        </span>
      </Tooltip>
      <Tooltip content="Edytuj">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onEdit(season)}
        >
          <EditIcon />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Usuń">
        <span
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={() => onDelete(season)}
        >
          <DeleteIcon />
        </span>
      </Tooltip>
    </div>
  );
}
