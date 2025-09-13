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
import { Season, DriverStanding, SeasonFilters } from '@/types';

// Mock data for development - replace with actual API calls
const mockSeasons: Season[] = [
  {
    id: '2024-lmu-championship',
    name: '2024 Le Mans Ultimate World Championship',
    description:
      "The premier endurance racing championship featuring the world's best drivers competing across iconic circuits.",
    year: 2024,
    status: 'ongoing',
    startDate: new Date('2024-03-15T00:00:00Z'),
    endDate: new Date('2024-11-30T23:59:59Z'),
    totalRounds: 12,
    completedRounds: 8,
    pointsSystem: {
      id: 'f1-2024',
      name: 'Formula 1 Style Points',
      positions: [
        { position: 1, points: 25 },
        { position: 2, points: 18 },
        { position: 3, points: 15 },
        { position: 4, points: 12 },
        { position: 5, points: 10 },
        { position: 6, points: 8 },
        { position: 7, points: 6 },
        { position: 8, points: 4 },
        { position: 9, points: 2 },
        { position: 10, points: 1 },
      ],
      bonusPoints: {
        fastestLap: 1,
        polePosition: 0,
      },
    },
    categories: [
      {
        id: 'lmp1',
        name: 'LMP1 Hypercar',
        description: 'Top-tier prototype racing cars',
        vehicleClass: 'LMP1-H',
      },
      {
        id: 'lmp2',
        name: 'LMP2',
        description: 'Customer prototype racing cars',
        vehicleClass: 'LMP2',
      },
    ],
    standings: [
      {
        seasonId: '2024-lmu-championship',
        categoryId: 'lmp1',
        standings: [
          {
            position: 1,
            previousPosition: 1,
            driverId: 'driver1',
            driverName: 'racing_legend',
            displayName: 'Racing Legend',
            team: 'Velocity Motorsport',
            vehicle: 'Toyota GR010 Hybrid',
            totalPoints: 186,
            roundsParticipated: 8,
            wins: 4,
            podiums: 6,
            fastestLaps: 3,
            polePositions: 2,
            dnfCount: 1,
            penalties: 0,
            averagePosition: 2.1,
            bestFinish: 1,
            worstFinish: 15,
            pointsPerRound: 23.3,
            form: ['W', 2, 'W', 3, 1, 'W', 4, 'W'],
          },
          {
            position: 2,
            previousPosition: 3,
            driverId: 'driver2',
            driverName: 'speed_demon',
            displayName: 'Speed Demon',
            team: 'Thunder Racing',
            vehicle: 'Porsche 963',
            totalPoints: 164,
            roundsParticipated: 8,
            wins: 2,
            podiums: 5,
            fastestLaps: 2,
            polePositions: 3,
            dnfCount: 0,
            penalties: 1,
            averagePosition: 3.2,
            bestFinish: 1,
            worstFinish: 8,
            pointsPerRound: 20.5,
            form: [2, 'W', 3, 1, 'W', 2, 5, 3],
          },
          {
            position: 3,
            previousPosition: 2,
            driverId: 'driver3',
            driverName: 'track_master',
            displayName: 'Track Master',
            team: 'Phoenix Racing',
            vehicle: 'Ferrari 499P',
            totalPoints: 156,
            roundsParticipated: 8,
            wins: 1,
            podiums: 4,
            fastestLaps: 1,
            polePositions: 1,
            dnfCount: 1,
            penalties: 2,
            averagePosition: 4.1,
            bestFinish: 1,
            worstFinish: 12,
            pointsPerRound: 19.5,
            form: [3, 4, 2, 'W', 6, 'DNF', 2, 7],
          },
        ],
        lastUpdated: new Date('2024-09-01T12:00:00Z'),
      },
    ],
    rounds: [],
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-09-01T12:00:00Z'),
  },
  {
    id: '2023-lmu-championship',
    name: '2023 Le Mans Ultimate Championship',
    description:
      'Previous season championship with thrilling races and close competition.',
    year: 2023,
    status: 'completed',
    startDate: new Date('2023-03-15T00:00:00Z'),
    endDate: new Date('2023-11-30T23:59:59Z'),
    totalRounds: 10,
    completedRounds: 10,
    pointsSystem: {
      id: 'f1-2023',
      name: 'Formula 1 Style Points',
      positions: [
        { position: 1, points: 25 },
        { position: 2, points: 18 },
        { position: 3, points: 15 },
      ],
    },
    categories: [],
    standings: [],
    rounds: [],
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-12-01T00:00:00Z'),
  },
];

const StandingsTable = ({ standings }: { standings: DriverStanding[] }) => {
  const getPositionChange = (current: number, previous?: number) => {
    if (!previous) return null;
    const change = previous - current;
    if (change > 0) return { type: 'up', value: change };
    if (change < 0) return { type: 'down', value: Math.abs(change) };
    return { type: 'same', value: 0 };
  };

  const getFormColor = (result: string | number) => {
    if (result === 'W') return 'success';
    if (result === 'P') return 'warning';
    if (result === 'DNF') return 'danger';
    if (typeof result === 'number' && result <= 3) return 'primary';
    return 'default';
  };

  return (
    <Table aria-label="Championship standings">
      <TableHeader>
        <TableColumn>POS</TableColumn>
        <TableColumn>DRIVER</TableColumn>
        <TableColumn>TEAM</TableColumn>
        <TableColumn>VEHICLE</TableColumn>
        <TableColumn>PTS</TableColumn>
        <TableColumn>WINS</TableColumn>
        <TableColumn>PODIUMS</TableColumn>
        <TableColumn>FORM</TableColumn>
      </TableHeader>
      <TableBody>
        {standings.map((driver) => {
          const positionChange = getPositionChange(
            driver.position,
            driver.previousPosition
          );
          return (
            <TableRow key={driver.driverId}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">{driver.position}</span>
                  {positionChange && positionChange.type !== 'same' && (
                    <div
                      className={`flex items-center ${positionChange.type === 'up' ? 'text-success' : 'text-danger'}`}
                    >
                      {positionChange.type === 'up' ? '↗' : '↘'}
                      <span className="text-xs">{positionChange.value}</span>
                    </div>
                  )}
                  {driver.position === 1 && (
                    <span className="text-warning">👑</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{driver.displayName}</span>
                  <span className="text-xs text-default-500">
                    @{driver.driverName}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{driver.team}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{driver.vehicle}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-primary">
                    {driver.totalPoints}
                  </span>
                  <span className="text-xs text-default-500">
                    {driver.pointsPerRound.toFixed(1)}/round
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-success">
                  {driver.wins}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-warning">
                  {driver.podiums}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  {driver.form.slice(-5).map((result, index) => (
                    <Chip
                      key={index}
                      size="sm"
                      color={getFormColor(result)}
                      variant="flat"
                      className="min-w-6 text-xs"
                    >
                      {result}
                    </Chip>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const SeasonCard = ({ season }: { season: Season }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const progress = (season.completedRounds / season.totalRounds) * 100;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{season.name}</h3>
            <p className="text-small text-default-500">{season.year} Season</p>
          </div>
          <Chip color={getStatusColor(season.status)} variant="flat">
            {season.status.toUpperCase()}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-small text-default-600 mb-4">{season.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-small">
            <span>Progress</span>
            <span>
              {season.completedRounds}/{season.totalRounds} rounds
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
            <span className="text-default-500">Categories:</span>
            <div className="font-medium">{season.categories.length}</div>
          </div>
          <div>
            <span className="text-default-500">Drivers:</span>
            <div className="font-medium">
              {season.standings[0]?.standings.length || 0}
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

  const currentSeason = mockSeasons.find((s) => s.status === 'ongoing');
  const filteredSeasons = mockSeasons.filter((season) => {
    const matchesSearch = season.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || season.status === selectedFilter;
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
                    <span>Season Progress</span>
                    <span className="font-medium">
                      {currentSeason.completedRounds}/
                      {currentSeason.totalRounds} rounds
                    </span>
                  </div>

                  <div className="w-full bg-default-200 rounded-full h-3">
                    <div
                      className="bg-success h-3 rounded-full"
                      style={{
                        width: `${(currentSeason.completedRounds / currentSeason.totalRounds) * 100}%`,
                      }}
                    />
                  </div>

                  {currentSeason.standings[0] && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">
                        Championship Leader
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {
                              currentSeason.standings[0].standings[0]
                                ?.displayName
                            }
                          </div>
                          <div className="text-sm text-default-500">
                            {currentSeason.standings[0].standings[0]?.team}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-lg">
                            {
                              currentSeason.standings[0].standings[0]
                                ?.totalPoints
                            }{' '}
                            pts
                          </div>
                          <div className="text-xs text-default-500">
                            +
                            {currentSeason.standings[0].standings[0]
                              ?.totalPoints -
                              (currentSeason.standings[0].standings[1]
                                ?.totalPoints || 0)}{' '}
                            ahead
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Link href={`/season/${currentSeason.id}`} className="block">
                    <Button color="primary" className="w-full">
                      View Full Standings
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>

            {/* Quick Standings Preview */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Top 5 Standings</h3>
              </CardHeader>
              <CardBody>
                {currentSeason.standings[0] && (
                  <div className="space-y-3">
                    {currentSeason.standings[0].standings
                      .slice(0, 5)
                      .map((driver, index) => (
                        <div
                          key={driver.driverId}
                          className="flex items-center justify-between p-2 rounded-lg bg-default-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                              {driver.position}
                            </div>
                            <div>
                              <div className="font-medium">
                                {driver.displayName}
                              </div>
                              <div className="text-xs text-default-500">
                                {driver.team}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {driver.totalPoints}
                            </div>
                            <div className="text-xs text-default-500">
                              {driver.wins}W
                            </div>
                          </div>
                        </div>
                      ))}
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
