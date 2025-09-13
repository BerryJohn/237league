'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { RacerStats, RacerStatsTableProps } from './types';
import { columns, defaultRacerData } from './constants';
import { renderTableCell } from './table-cell-renderers';
import { TableSearch } from './table-search';
import { SummaryStats } from './summary-stats';
import { useTableFiltering, useTableSorting } from './hooks';

export const RacerStatsTable: React.FC<RacerStatsTableProps> = ({
  racers = defaultRacerData,
  title = 'Racer Performance Analysis',
}) => {
  // Use custom hooks for filtering and sorting
  const { filterValue, filteredItems, onSearchChange, onClear } =
    useTableFiltering(racers);

  const { sortDescriptor, setSortDescriptor, sortedItems } =
    useTableSorting(filteredItems);

  // Memoize the cell renderer
  const renderCell = React.useCallback(
    (racer: RacerStats, columnKey: React.Key) =>
      renderTableCell(racer, columnKey),
    []
  );

  // Memoize the top content (search)
  const topContent = React.useMemo(
    () => (
      <TableSearch
        filterValue={filterValue}
        onSearchChange={onSearchChange}
        onClear={onClear}
        totalCount={racers.length}
      />
    ),
    [filterValue, onSearchChange, onClear, racers.length]
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-default-500">
          Racer skill assessment and split recommendations based on performance
          analytics
        </p>
      </div>

      {/* Table */}
      <Table
        aria-label="Racing performance analysis table"
        isHeaderSticky
        topContent={topContent}
        topContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: 'min-h-[400px]',
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems} emptyContent={'No racers found'}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Summary Statistics */}
      <SummaryStats racers={racers} />
    </div>
  );
};
