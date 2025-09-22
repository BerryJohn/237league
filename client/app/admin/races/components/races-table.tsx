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
import { EmptyState } from './empty-state';
import { RaceActions } from './race-actions';
import { RaceStatusChip } from './race-status-chip';
import { RaceModal } from './race-modal';
import { RaceDeleteConfirmationModal } from './race-delete-confirmation-modal';
import { Race } from '@shared/types';
import { useQuery } from '@tanstack/react-query';
import { racesApi } from '@/api/races';

const columns = [
  { name: 'WYŚCIG', uid: 'name' },
  { name: 'TOR', uid: 'trackName' },
  { name: 'STATUS', uid: 'status' },
  { name: 'DATA WYŚCIGU', uid: 'raceDate' },
  { name: 'SEZON', uid: 'season' },
  { name: 'GRA', uid: 'game' },
  { name: 'UCZESTNICY', uid: 'participants' },
  { name: 'DATA UTWORZENIA', uid: 'createdAt' },
  { name: 'AKCJE', uid: 'actions' },
];

export const RacesTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    race?: Race;
  }>({ isOpen: false });
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    race?: Race;
  }>({ isOpen: false });

  const { data: races } = useQuery({
    queryKey: ['races'],
    queryFn: racesApi.getAllRaces,
  });

  const handleCreateRace = () => {
    setModalState({ isOpen: true });
  };

  const handleEditRace = (race: Race) => {
    setModalState({ isOpen: true, race });
  };

  const handleDeleteRace = (race: Race) => {
    setDeleteModalState({ isOpen: true, race });
  };

  const handleViewRace = (race: Race) => {
    console.log('View race:', race);
    // TODO: Implement view race details
  };

  const filteredRaces = useMemo(() => {
    if (!races) return [];

    if (!searchValue) return races.data;

    const searchTerm = searchValue.toLowerCase();

    return races.data.filter((race) => {
      const matchesName = race.name.toLowerCase().includes(searchTerm);
      const matchesTrack = race.trackName.toLowerCase().includes(searchTerm);
      const matchesGame =
        race.game?.toLowerCase().includes(searchTerm) || false;
      const matchesDate = new Date(race.raceDate)
        .toLocaleDateString()
        .includes(searchTerm);

      return matchesName || matchesTrack || matchesGame || matchesDate;
    });
  }, [searchValue, races]);

  return (
    <div className="w-full">
      {races && races.data.length > 0 ? (
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Szukaj wyścigu..."
            className="w-64"
            value={searchValue}
            onValueChange={setSearchValue}
            isClearable
            onClear={() => setSearchValue('')}
          />
          <Button color="primary" onPress={handleCreateRace}>
            Dodaj wyścig
          </Button>
        </div>
      ) : null}
      {filteredRaces.length === 0 ? (
        <EmptyState searchValue={searchValue} onAddClick={handleCreateRace} />
      ) : (
        <Table
          aria-label="races table"
          className="max-h-[70vh] overflow-auto"
          isHeaderSticky
          isStriped
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredRaces}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      item,
                      columnKey as string,
                      handleEditRace,
                      handleDeleteRace,
                      handleViewRace
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <RaceModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false })}
        race={modalState.race}
      />

      <RaceDeleteConfirmationModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false })}
        race={deleteModalState.race}
      />
    </div>
  );
};

export default RacesTable;

const renderCell = (
  race: Race,
  columnKey: string,
  handleEditRace: (race: Race) => void,
  handleDeleteRace: (race: Race) => void,
  handleViewRace: (race: Race) => void
) => {
  switch (columnKey) {
    case 'name':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{race.name}</p>
          {race.description && (
            <p className="text-tiny text-default-500 truncate max-w-[200px]">
              {race.description}
            </p>
          )}
        </div>
      );
    case 'trackName':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{race.trackName}</p>
        </div>
      );
    case 'status':
      return <RaceStatusChip race={race} />;
    case 'raceDate':
      const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{date.toLocaleDateString()}</p>
            <p className="text-tiny text-default-500">
              {date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        );
      };
      return formatDateTime(race.raceDate);
    case 'season':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">
            {race.seasonId ? 'Przypisany' : 'Brak sezonu'}
          </p>
          {/* TODO: You could fetch and display actual season name here */}
        </div>
      );
    case 'game':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{race.game || 'Nie określono'}</p>
        </div>
      );
    case 'participants':
      const participantsCount = race.results?.length || 0;
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small">{participantsCount}</p>
        </div>
      );
    case 'createdAt':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny text-default-400">
            {new Date(race.createdAt).toLocaleDateString()}
          </p>
        </div>
      );
    case 'actions':
      return (
        <RaceActions
          race={race}
          onEdit={handleEditRace}
          onDelete={handleDeleteRace}
          onView={handleViewRace}
        />
      );
    default:
      return <span>-</span>;
  }
};
