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
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Input } from '@heroui/input';
import { EmptyState } from './empty-state';
import { LeagueModal } from './leagues-modal';
import { League } from '@shared/types';
import { useQuery } from '@tanstack/react-query';
import { leagueApi } from '@/api/leagues';
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';
import { Tooltip } from '@heroui/tooltip';

import { DeleteConfirmationModal } from './delete-confirmation-modal';

const columns = [
  { name: 'LIGA', uid: 'name' },
  { name: 'GRA', uid: 'game' },
  { name: 'SEZONY', uid: 'seasons' },

  { name: 'DATA UTWORZENIA', uid: 'createdAt' },
  { name: 'AKCJE', uid: 'actions' },
];

export const LeaguesTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    league?: League;
  }>({ isOpen: false });
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    league?: League;
  }>({ isOpen: false });

  const { data: leagues } = useQuery({
    queryKey: ['leagues'],
    queryFn: leagueApi.getAllLeagues,
  });

  const handleCreateLeague = () => {
    setModalState({ isOpen: true });
  };

  const handleEditLeague = (league: League) => {
    setModalState({ isOpen: true, league });
  };

  const handleDeleteLeague = (league: League) => {
    setDeleteModalState({ isOpen: true, league });
  };

  const filteredLeagues = useMemo(() => {
    if (!leagues) return [];

    if (!searchValue) return leagues.data;

    const searchTerm = searchValue.toLowerCase();

    return leagues.data.filter((league) => {
      const matchesName = league.name.toLowerCase().includes(searchTerm);
      const matchesDescription =
        league.description?.toLowerCase().includes(searchTerm) || false;
      const matchesGame = league.game.toLowerCase().includes(searchTerm);

      return matchesName || matchesDescription || matchesGame;
    });
  }, [searchValue, leagues]);

  return (
    <div className="w-full">
      {leagues && leagues.data.length > 0 ? (
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Szukaj ligi..."
            className="w-64"
            value={searchValue}
            onValueChange={setSearchValue}
            isClearable
            onClear={() => setSearchValue('')}
          />
          <Button color="primary" onPress={handleCreateLeague}>
            Dodaj ligę
          </Button>
        </div>
      ) : null}
      {filteredLeagues.length === 0 ? (
        <EmptyState searchValue={searchValue} onAddClick={handleCreateLeague} />
      ) : (
        <Table
          aria-label="leagues.data table"
          className="max-h-[70vh] overflow-auto"
          isHeaderSticky
          isStriped
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredLeagues}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      item,
                      columnKey as string,
                      handleEditLeague,
                      handleDeleteLeague
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <LeagueModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false })}
        league={modalState.league}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false })}
        league={deleteModalState.league}
      />
    </div>
  );
};

export default LeaguesTable;

const mappedGames: { [key: string]: string } = {
  'le-mans-ultimate': 'Le Mans Ultimate',
  'assetto-corsa-competizione': 'Assetto Corsa Competizione',
  iracing: 'iRacing',
};

const renderCell = (
  league: League,
  columnKey: string,
  onEdit: (league: League) => void,
  onDelete: (league: League) => void
) => {
  switch (columnKey) {
    case 'name':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{league.name}</p>
          <p className="text-bold text-tiny text-default-400 max-w-xs truncate">
            {league.description}
          </p>
        </div>
      );
    case 'game':
      return <span>{mappedGames[league.game] || league.game}</span>;
    case 'seasons':
      const seasonsCount = league.seasons?.length || 0;
      return (
        <Popover placement="bottom" showArrow>
          <PopoverTrigger>
            <Chip
              variant="bordered"
              color="primary"
              title={seasonsCount.toString()}
              className="cursor-pointer"
            >
              {seasonsCount}
            </Chip>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              {seasonsCount === 0 ? (
                <div className="text-tiny text-default-400">
                  Brak stworzonych sezonów
                </div>
              ) : (
                league.seasons?.map((season) => (
                  <div key={season.id} className="text-tiny">
                    {season.name}
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      );
    case 'createdAt':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny text-default-400">
            {new Date(league.createdAt).toLocaleDateString()}
          </p>
        </div>
      );
    case 'actions':
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edytuj">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => onEdit(league)}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Usuń">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => onDelete(league)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <span>-</span>;
  }
};
