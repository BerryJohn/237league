'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Input } from '@heroui/input';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import Link from 'next/link';
import { SeasonFilters } from '@/types';
import type { Season } from '@shared/types';

// Mock data for development - replace with actual API calls
const mockSeasons: Season<Date>[] = [
  {
    id: '2024-lmu-championship',
    name: '2024 Le Mans Ultimate World Championship',
    isFinished: false,
    startDate: new Date('2024-03-15T00:00:00Z'),
    endDate: new Date('2024-11-30T23:59:59Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    leagueId: 'lmu-league-2024',
    races: [
      {
        id: 'race-1',
        name: 'Le Mans 24 Hours',
        trackName: 'Circuit de la Sarthe',
        description: 'The legendary 24-hour endurance race',
        raceDate: new Date('2024-03-15T14:00:00Z'),
        createdAt: new Date('2024-01-01T00:00:00Z'),
        seasonId: '2024-lmu-championship',
        results: [],
      } as any,
      {
        id: 'race-2',
        name: 'Spa-Francorchamps 6 Hours',
        trackName: 'Circuit de Spa-Francorchamps',
        description: '6-hour endurance race at the iconic Belgian circuit',
        raceDate: new Date('2024-04-20T13:00:00Z'),
        createdAt: new Date('2024-01-01T00:00:00Z'),
        seasonId: '2024-lmu-championship',
        results: [],
      } as any,
    ],
  },
  {
    id: '2023-lmu-championship',
    name: '2023 Le Mans Ultimate Championship',
    isFinished: true,
    startDate: new Date('2023-03-15T00:00:00Z'),
    endDate: new Date('2023-11-30T23:59:59Z'),
    createdAt: new Date('2023-01-01T00:00:00Z'),
    leagueId: 'lmu-league-2023',
    races: [
      {
        id: 'race-2023-1',
        name: 'Le Mans 24 Hours 2023',
        trackName: 'Circuit de la Sarthe',
        description: 'The 2023 edition of the legendary 24-hour race',
        raceDate: new Date('2023-06-15T14:00:00Z'),
        createdAt: new Date('2023-01-01T00:00:00Z'),
        seasonId: '2023-lmu-championship',
        results: [],
      } as any,
    ],
  },
];

// Season table functionality would go here
// Currently the Season type doesn't include standings data
// This will be implemented when the backend supports race results and standings

const SeasonCard = ({ season }: { season: Season<Date> }) => {
  const getStatusColor = (isFinished: boolean) => {
    return isFinished ? 'default' : 'success';
  };

  const year = season.startDate
    ? new Date(season.startDate).getFullYear()
    : 'Unknown';
  const raceCount = season.races?.length || 0;
  const completedRaces =
    season.races?.filter((race) => new Date(race.raceDate) < new Date())
      .length || 0;
  const progress = raceCount > 0 ? (completedRaces / raceCount) * 100 : 0;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{season.name}</h3>
            <p className="text-small text-default-500">{year} Season</p>
          </div>
          <Chip color={getStatusColor(season.isFinished)} variant="flat">
            {season.isFinished ? 'COMPLETED' : 'ACTIVE'}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-small">
            <span>Progress</span>
            <span>
              {completedRaces}/{raceCount} races
            </span>
          </div>
          <div className="w-full bg-default-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-small">
          <div>
            <span className="text-default-500">Races:</span>
            <div className="font-medium">{raceCount}</div>
          </div>
          <div>
            <span className="text-default-500">Status:</span>
            <div className="font-medium">
              {season.isFinished ? 'Finished' : 'Ongoing'}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href={`/season/${season.id}`}>
            <Button color="primary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export const SeasonPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'ongoing' | 'upcoming' | 'completed'
  >('all');

  const currentSeason = mockSeasons.find((s) => !s.isFinished);
  const filteredSeasons = mockSeasons.filter((season) => {
    const matchesSearch = season.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'ongoing' && !season.isFinished) ||
      (selectedFilter === 'completed' && season.isFinished) ||
      (selectedFilter === 'upcoming' &&
        season.startDate &&
        new Date(season.startDate) > new Date());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Championships</h1>
        <p className="text-lg text-default-600">
          Follow the championship standings and race for the title in Le Mans
          Ultimate competitions.
        </p>
      </div>

      {/* Current Season Highlights */}
      {currentSeason && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🏆 Current Championship</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">{currentSeason.name}</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Races</span>
                    <span className="font-medium">
                      {currentSeason.races?.length || 0} races
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>League ID</span>
                    <span className="font-medium text-sm">
                      {currentSeason.leagueId}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Season Period</span>
                    <span className="font-medium text-sm">
                      {currentSeason.startDate
                        ? new Date(currentSeason.startDate).toLocaleDateString()
                        : 'TBD'}{' '}
                      -{' '}
                      {currentSeason.endDate
                        ? new Date(currentSeason.endDate).toLocaleDateString()
                        : 'TBD'}
                    </span>
                  </div>

                  <Link href={`/season/${currentSeason.id}`} className="block">
                    <Button color="primary" className="w-full">
                      View Season Details
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>

            {/* Race Schedule Preview */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Upcoming Races</h3>
              </CardHeader>
              <CardBody>
                {currentSeason.races && currentSeason.races.length > 0 ? (
                  <div className="space-y-3">
                    {currentSeason.races.slice(0, 5).map((race, index) => (
                      <div
                        key={race.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-default-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{race.name}</div>
                            <div className="text-xs text-default-500">
                              {race.trackName}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-sm">
                            {new Date(race.raceDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-default-500">
                    No races scheduled yet
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search championships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'solid' : 'flat'}
            color="primary"
            size="sm"
            onClick={() => setSelectedFilter('all')}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === 'ongoing' ? 'solid' : 'flat'}
            color="success"
            size="sm"
            onClick={() => setSelectedFilter('ongoing')}
          >
            Ongoing
          </Button>
          <Button
            variant={selectedFilter === 'upcoming' ? 'solid' : 'flat'}
            color="primary"
            size="sm"
            onClick={() => setSelectedFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={selectedFilter === 'completed' ? 'solid' : 'flat'}
            color="default"
            size="sm"
            onClick={() => setSelectedFilter('completed')}
          >
            Past
          </Button>
        </div>
      </div>

      {/* All Championships */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Championships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSeasons.map((season) => (
            <SeasonCard key={season.id} season={season} />
          ))}
        </div>
      </section>

      {filteredSeasons.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No championships found</h3>
          <p className="text-default-500">
            {searchQuery
              ? 'Try adjusting your search terms or filters.'
              : 'No championships match your current filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeasonPage;
