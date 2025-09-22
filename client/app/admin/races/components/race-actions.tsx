import { Tooltip } from '@heroui/tooltip';
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';
import { Race } from '@shared/types';

interface RaceActionsProps {
  race: Race;
  onEdit: (race: Race) => void;
  onDelete: (race: Race) => void;
  onView?: (race: Race) => void;
}

export function RaceActions({
  race,
  onEdit,
  onDelete,
  onView,
}: RaceActionsProps) {
  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Szczegóły">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onView?.(race)}
        >
          <EyeIcon />
        </span>
      </Tooltip>
      <Tooltip content="Edytuj">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => onEdit(race)}
        >
          <EditIcon />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Usuń">
        <span
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={() => onDelete(race)}
        >
          <DeleteIcon />
        </span>
      </Tooltip>
    </div>
  );
}
