import React from 'react';
import { SortDescriptor } from '@heroui/table';
import { RacerStats } from './types';

export const useTableFiltering = (racers: RacerStats[]) => {
  const [filterValue, setFilterValue] = React.useState('');

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredRacers = [...racers];

    if (hasSearchFilter) {
      filteredRacers = filteredRacers.filter(
        (racer) =>
          racer.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          racer.team?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredRacers;
  }, [racers, filterValue, hasSearchFilter]);

  const onSearchChange = React.useCallback((value?: string) => {
    setFilterValue(value || '');
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
  }, []);

  return {
    filterValue,
    filteredItems,
    onSearchChange,
    onClear,
  };
};

export const useTableSorting = (items: RacerStats[]) => {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'overallRating',
    direction: 'descending',
  });

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof RacerStats] as any;
      const second = b[sortDescriptor.column as keyof RacerStats] as any;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  return {
    sortDescriptor,
    setSortDescriptor,
    sortedItems,
  };
};
