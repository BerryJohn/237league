'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Progress } from '@heroui/progress';
import { EmptyState } from './empty-state';
import { SeasonActions } from './season-actions';
import { SeasonStatusChip } from './season-status-chip';
import { mockSeasons } from './mock-data';
import { Season } from '@shared/types';

const columns = [
  { name: 'SEZON', uid: 'name' },
  { name: 'LIGA', uid: 'league' },
  { name: 'STATUS', uid: 'status' },
  { name: 'POSTĘP', uid: 'progress' },
  { name: 'OKRES', uid: 'period' },
  { name: 'DATA UTWORZENIA', uid: 'createdAt' },
  { name: 'AKCJE', uid: 'actions' },
];

export const SeasonsTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [seasons] = useState<Season[]>(mockSeasons);

  const handleCreateSeason = () => {
    console.log('Create season clicked');
    // TODO: Implement create season modal
  };

  const handleEditSeason = (season: Season) => {
    console.log('Edit season:', season);
    // TODO: Implement edit season modal
  };

  const handleDeleteSeason = (season: Season) => {
    console.log('Delete season:', season);
    // TODO: Implement delete season modal
  };

  const handleViewSeason = (season: Season) => {
    console.log('View season:', season);
    // TODO: Implement view season details
  };

  const filteredSeasons = useMemo(() => {
    if (!searchValue) return seasons;

    const searchTerm = searchValue.toLowerCase();

    return seasons.filter((season) => {
      const matchesName = season.name.toLowerCase().includes(searchTerm);
      const matchesLeague = season.leagueId.toLowerCase().includes(searchTerm);
      const matchesYear = season.startDate
        ? new Date(season.startDate)
            .getFullYear()
            .toString()
            .includes(searchTerm)
        : false;

      return matchesName || matchesLeague || matchesYear;
    });
  }, [searchValue, seasons]);

  return (
    <div className="w-full">
      {seasons && seasons.length > 0 ? (
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Szukaj sezonu..."
            className="w-64"
            value={searchValue}
            onValueChange={setSearchValue}
            isClearable
            onClear={() => setSearchValue('')}
          />
          <Button color="primary" onPress={handleCreateSeason}>
            Dodaj sezon
          </Button>
        </div>
      ) : null}
      {filteredSeasons.length === 0 ? (
        <EmptyState searchValue={searchValue} onAddClick={handleCreateSeason} />
      ) : (
        <Table
          aria-label="seasons table"
          className="max-h-[70vh] overflow-auto"
          isHeaderSticky
          isStriped
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredSeasons}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      item,
                      columnKey as string,
                      handleEditSeason,
                      handleDeleteSeason,
                      handleViewSeason
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SeasonsTable;

const renderCell = (
  season: Season,
  columnKey: string,
  handleEditSeason: (season: Season) => void,
  handleDeleteSeason: (season: Season) => void,
  handleViewSeason: (season: Season) => void
) => {
  switch (columnKey) {
    case 'name':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{season.name}</p>
        </div>
      );
    case 'league':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">
            {season.leagueId || 'Brak ligi'}
          </p>
        </div>
      );
    case 'status':
      return <SeasonStatusChip isFinished={season.isFinished} />;
    case 'progress':
      const totalRaces = season.races?.length || 0;
      // For demo purposes, let's assume some races are completed based on season status
      const completedRaces = season.isFinished
        ? totalRaces
        : Math.floor(totalRaces * 0.6);
      const progressPercentage =
        totalRaces > 0 ? (completedRaces / totalRaces) * 100 : 0;

      return (
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex justify-between text-tiny">
            <span>
              {completedRaces}/{totalRaces} wyścigów
            </span>
          </div>
          <Progress
            value={progressPercentage}
            color={season.isFinished ? 'success' : 'primary'}
            size="sm"
            className="max-w-md"
          />
        </div>
      );
    case 'period':
      const formatDate = (dateString: string | undefined) =>
        dateString ? new Date(dateString).toLocaleDateString() : 'Nie ustalona';

      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny text-default-400">
            {formatDate(season.startDate)} - {formatDate(season.endDate)}
          </p>
        </div>
      );
    case 'createdAt':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny text-default-400">
            {new Date(season.createdAt).toLocaleDateString()}
          </p>
        </div>
      );
    case 'actions':
      return (
        <SeasonActions
          season={season}
          onEdit={handleEditSeason}
          onDelete={handleDeleteSeason}
          onView={handleViewSeason}
        />
      );
    default:
      return <span>-</span>;
  }
};
