'use client';

import React, { use, useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import Link from 'next/link';
import { Season, DriverStanding, SeasonRound, RacingEvent } from '@/types';

// Mock data for detailed season view
const getMockSeasonById = (id: string): Season | null => {
  if (id === '2024-lmu-championship') {
    return {
      id: '2024-lmu-championship',
      name: '2024 Le Mans Ultimate World Championship',
      description:
        "The premier endurance racing championship featuring the world's best drivers competing across iconic circuits in the most advanced racing simulators.",
      year: 2024,
      status: 'ongoing',
      startDate: new Date('2024-03-15T00:00:00Z'),
      endDate: new Date('2024-11-30T23:59:59Z'),
      totalRounds: 12,
      completedRounds: 8,
      pointsSystem: {
        id: 'f1-2024',
        name: 'Formula 1 Style Points System',
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
          maxParticipants: 30,
        },
        {
          id: 'lmp2',
          name: 'LMP2',
          description: 'Customer prototype racing cars',
          vehicleClass: 'LMP2',
          maxParticipants: 20,
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
            {
              position: 4,
              driverId: 'driver4',
              driverName: 'apex_hunter',
              displayName: 'Apex Hunter',
              team: 'Storm Racing',
              vehicle: 'BMW M Hybrid V8',
              totalPoints: 142,
              roundsParticipated: 8,
              wins: 1,
              podiums: 3,
              fastestLaps: 2,
              polePositions: 1,
              dnfCount: 0,
              penalties: 0,
              averagePosition: 4.8,
              bestFinish: 1,
              worstFinish: 9,
              pointsPerRound: 17.8,
              form: [5, 3, 4, 2, 'W', 6, 3, 8],
            },
            {
              position: 5,
              driverId: 'driver5',
              driverName: 'circuit_king',
              displayName: 'Circuit King',
              team: 'Lightning Motorsport',
              vehicle: 'Alpine A480',
              totalPoints: 128,
              roundsParticipated: 8,
              wins: 0,
              podiums: 4,
              fastestLaps: 1,
              polePositions: 2,
              dnfCount: 2,
              penalties: 1,
              averagePosition: 5.2,
              bestFinish: 2,
              worstFinish: 15,
              pointsPerRound: 16.0,
              form: [7, 2, 'DNF', 4, 3, 2, 'DNF', 5],
            },
          ],
          lastUpdated: new Date('2024-09-01T12:00:00Z'),
        },
      ],
      rounds: [
        {
          id: 'round1',
          roundNumber: 1,
          name: 'Season Opener - Silverstone',
          eventId: 'silverstone-2024-1',
          seasonId: '2024-lmu-championship',
          isCompleted: true,
          pointsAwarded: [],
          date: new Date('2024-03-15T14:00:00Z'),
          event: {} as RacingEvent,
        },
      ],
      regulations:
        'Standard LMU regulations apply. No assists except ABS allowed in LMP1 category.',
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-09-01T12:00:00Z'),
    };
  }
  return null;
};

const DetailedStandingsTable = ({
  standings,
  pointsSystem,
}: {
  standings: DriverStanding[];
  pointsSystem: Season['pointsSystem'];
}) => {
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
    <div className="overflow-x-auto">
      <Table aria-label="Detailed championship standings">
        <TableHeader>
          <TableColumn>POS</TableColumn>
          <TableColumn>DRIVER</TableColumn>
          <TableColumn>TEAM</TableColumn>
          <TableColumn>VEHICLE</TableColumn>
          <TableColumn>PTS</TableColumn>
          <TableColumn>ROUNDS</TableColumn>
          <TableColumn>WINS</TableColumn>
          <TableColumn>PODIUMS</TableColumn>
          <TableColumn>FASTEST LAPS</TableColumn>
          <TableColumn>POLES</TableColumn>
          <TableColumn>DNF</TableColumn>
          <TableColumn>AVG POS</TableColumn>
          <TableColumn>FORM</TableColumn>
        </TableHeader>
        <TableBody>
          {standings.map((driver) => {
            const positionChange = getPositionChange(
              driver.position,
              driver.previousPosition
            );
            const gapToLeader = standings[0].totalPoints - driver.totalPoints;

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
                    {driver.position > 1 && (
                      <span className="text-xs text-danger">
                        -{gapToLeader}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{driver.roundsParticipated}</span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-success text-lg">
                    {driver.wins}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-warning">
                    {driver.podiums}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-purple-500">
                    {driver.fastestLaps}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-blue-500">
                    {driver.polePositions}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-danger">{driver.dnfCount}</span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">
                    {driver.averagePosition.toFixed(1)}
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
    </div>
  );
};

const PointsSystemCard = ({
  pointsSystem,
}: {
  pointsSystem: Season['pointsSystem'];
}) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold text-lg">🏆 Points System</h3>
      </CardHeader>
      <CardBody>
        <h4 className="font-semibold mb-3">{pointsSystem.name}</h4>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {pointsSystem.positions.map((pos) => (
            <div
              key={pos.position}
              className="text-center p-2 bg-default-100 rounded"
            >
              <div className="text-sm font-bold">P{pos.position}</div>
              <div className="text-primary font-semibold">{pos.points}pts</div>
            </div>
          ))}
        </div>

        {pointsSystem.bonusPoints && (
          <div>
            <h5 className="font-medium mb-2">Bonus Points</h5>
            <div className="space-y-1 text-sm">
              {pointsSystem.bonusPoints.fastestLap && (
                <div className="flex justify-between">
                  <span>Fastest Lap:</span>
                  <span className="font-medium">
                    +{pointsSystem.bonusPoints.fastestLap}pt
                  </span>
                </div>
              )}
              {pointsSystem.bonusPoints.polePosition && (
                <div className="flex justify-between">
                  <span>Pole Position:</span>
                  <span className="font-medium">
                    +{pointsSystem.bonusPoints.polePosition}pt
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

const RaceCalendar = ({
  rounds,
  totalRounds,
}: {
  rounds: SeasonRound[];
  totalRounds: number;
}) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold text-lg">📅 Race Calendar</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {Array.from({ length: totalRounds }, (_, i) => i + 1).map(
            (roundNumber) => {
              const round = rounds.find((r) => r.roundNumber === roundNumber);
              const isCompleted = round?.isCompleted || false;
              const isUpcoming =
                !isCompleted &&
                roundNumber === rounds.filter((r) => r.isCompleted).length + 1;

              return (
                <div
                  key={roundNumber}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isCompleted
                      ? 'bg-success-50 border-success-200'
                      : isUpcoming
                        ? 'bg-primary-50 border-primary-200'
                        : 'bg-default-50 border-default-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isUpcoming
                            ? 'bg-primary text-white'
                            : 'bg-default-300 text-default-600'
                      }`}
                    >
                      {roundNumber}
                    </div>
                    <div>
                      <div className="font-medium">
                        {round?.name || `Round ${roundNumber}`}
                      </div>
                      {round && (
                        <div className="text-sm text-default-500">
                          {new Date(round.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {isCompleted && (
                      <Chip color="success" size="sm" variant="flat">
                        Completed
                      </Chip>
                    )}
                    {isUpcoming && (
                      <Chip color="primary" size="sm" variant="flat">
                        Next
                      </Chip>
                    )}
                    {!isCompleted && !isUpcoming && (
                      <Chip color="default" size="sm" variant="flat">
                        Scheduled
                      </Chip>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export const SeasonDetails = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const season = getMockSeasonById(id);
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (!season) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardBody className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Season Not Found</h2>
            <p className="text-default-500 mb-6">
              The championship you're looking for doesn't exist or has been
              removed.
            </p>
            <Link href="/season">
              <Button color="primary">Back to Championships</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

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
  const currentStandings = season.standings[selectedCategory]?.standings || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/season">
          <Button variant="light" size="sm">
            ← Back to Championships
          </Button>
        </Link>
      </div>

      {/* Season Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{season.name}</h1>
            <p className="text-xl text-default-600 mb-4">
              {season.description}
            </p>
            <div className="flex items-center gap-4">
              <Chip color={getStatusColor(season.status)} size="lg">
                {season.status.toUpperCase()}
              </Chip>
              <span className="text-default-500">
                {new Date(season.startDate).getFullYear()} Season
              </span>
            </div>
          </div>
        </div>

        {/* Season Progress */}
        <Card>
          <CardBody>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Season Progress</span>
              <span className="text-default-500">
                {season.completedRounds} / {season.totalRounds} rounds completed
              </span>
            </div>
            <div className="w-full bg-default-200 rounded-full h-3">
              <div
                className="bg-success h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-default-500">
              {progress.toFixed(1)}% complete
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Category Selection */}
      {season.categories.length > 1 && (
        <div className="mb-6">
          <div className="flex gap-2">
            {season.categories.map((category, index) => (
              <Button
                key={category.id}
                variant={selectedCategory === index ? 'solid' : 'flat'}
                color="primary"
                onClick={() => setSelectedCategory(index)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Championship Standings */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-bold">
                🏆 Championship Standings
                {season.categories[selectedCategory] && (
                  <span className="text-lg font-normal text-default-500 ml-2">
                    - {season.categories[selectedCategory].name}
                  </span>
                )}
              </h2>
            </CardHeader>
            <CardBody>
              <DetailedStandingsTable
                standings={currentStandings}
                pointsSystem={season.pointsSystem}
              />
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Points System */}
          <PointsSystemCard pointsSystem={season.pointsSystem} />

          {/* Race Calendar */}
          <RaceCalendar
            rounds={season.rounds}
            totalRounds={season.totalRounds}
          />

          {/* Season Statistics */}
          <Card>
            <CardHeader>
              <h3 className="font-bold text-lg">📊 Season Stats</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Drivers:</span>
                  <span className="font-medium">{currentStandings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Races Completed:</span>
                  <span className="font-medium">{season.completedRounds}</span>
                </div>
                <div className="flex justify-between">
                  <span>Races Remaining:</span>
                  <span className="font-medium">
                    {season.totalRounds - season.completedRounds}
                  </span>
                </div>
                {currentStandings.length > 1 && (
                  <div className="flex justify-between">
                    <span>Championship Gap:</span>
                    <span className="font-medium text-primary">
                      {currentStandings[0].totalPoints -
                        currentStandings[1].totalPoints}{' '}
                      pts
                    </span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Category Info */}
          {season.categories[selectedCategory] && (
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">ℹ️ Category Info</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <h4 className="font-semibold">
                    {season.categories[selectedCategory].name}
                  </h4>
                  <p className="text-sm text-default-600">
                    {season.categories[selectedCategory].description}
                  </p>
                  <div className="pt-2 border-t">
                    <div className="text-sm">
                      <span className="text-default-500">Vehicle Class: </span>
                      <span className="font-medium">
                        {season.categories[selectedCategory].vehicleClass}
                      </span>
                    </div>
                    {season.categories[selectedCategory].maxParticipants && (
                      <div className="text-sm">
                        <span className="text-default-500">
                          Max Participants:{' '}
                        </span>
                        <span className="font-medium">
                          {season.categories[selectedCategory].maxParticipants}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonDetails;
