import React from 'react';
import { Input } from '@heroui/input';
import { SearchIcon } from '@/components/icons';

interface TableSearchProps {
  filterValue: string;
  onSearchChange: (value?: string) => void;
  onClear: () => void;
  totalCount: number;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  filterValue,
  onSearchChange,
  onClear,
  totalCount,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name or team..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {totalCount} racers
        </span>
      </div>
    </div>
  );
};
