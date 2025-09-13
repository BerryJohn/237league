import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { DriverStanding } from '@/types';

interface ChampionshipStandingsProps {
  standings: DriverStanding[];
  showDetails?: boolean;
  maxRows?: number;
  title?: string;
}

export const ChampionshipStandings = ({
  standings,
  showDetails = false,
  maxRows,
  title = 'Championship Standings',
}: ChampionshipStandingsProps) => {
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

  const displayStandings = maxRows ? standings.slice(0, maxRows) : standings;
  const leader = standings[0];

  if (showDetails) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">{title}</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <Table aria-label="Detailed championship standings">
              <TableHeader>
                <TableColumn>POS</TableColumn>
                <TableColumn>DRIVER</TableColumn>
                <TableColumn>TEAM</TableColumn>
                <TableColumn>PTS</TableColumn>
                <TableColumn>WINS</TableColumn>
                <TableColumn>PODIUMS</TableColumn>
                <TableColumn>FL</TableColumn>
                <TableColumn>FORM</TableColumn>
              </TableHeader>
              <TableBody>
                {displayStandings.map((driver) => {
                  const positionChange = getPositionChange(
                    driver.position,
                    driver.previousPosition
                  );
                  const gapToLeader = leader.totalPoints - driver.totalPoints;

                  return (
                    <TableRow key={driver.driverId}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">
                            {driver.position}
                          </span>
                          {positionChange && positionChange.type !== 'same' && (
                            <div
                              className={`flex items-center ${positionChange.type === 'up' ? 'text-success' : 'text-danger'}`}
                            >
                              {positionChange.type === 'up' ? '↗' : '↘'}
                              <span className="text-xs">
                                {positionChange.value}
                              </span>
                            </div>
                          )}
                          {driver.position === 1 && (
                            <span className="text-warning">👑</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {driver.displayName}
                          </span>
                          <span className="text-xs text-default-500">
                            @{driver.driverName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{driver.team}</span>
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
                        <span className="font-semibold text-purple-500">
                          {driver.fastestLaps}
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

          {maxRows && standings.length > maxRows && (
            <div className="text-center pt-4">
              <span className="text-default-500 text-sm">
                Showing top {maxRows} of {standings.length} drivers
              </span>
            </div>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <Table aria-label="Championship standings">
            <TableHeader>
              <TableColumn>POS</TableColumn>
              <TableColumn>DRIVER</TableColumn>
              <TableColumn>TEAM</TableColumn>
              <TableColumn>PTS</TableColumn>
              <TableColumn>FORM</TableColumn>
            </TableHeader>
            <TableBody>
              {displayStandings.map((driver) => {
                const positionChange = getPositionChange(
                  driver.position,
                  driver.previousPosition
                );
                const gapToLeader = leader.totalPoints - driver.totalPoints;

                return (
                  <TableRow key={driver.driverId}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">
                          {driver.position}
                        </span>
                        {positionChange && positionChange.type !== 'same' && (
                          <div
                            className={`flex items-center ${positionChange.type === 'up' ? 'text-success' : 'text-danger'}`}
                          >
                            {positionChange.type === 'up' ? '↗' : '↘'}
                            <span className="text-xs">
                              {positionChange.value}
                            </span>
                          </div>
                        )}
                        {driver.position === 1 && (
                          <span className="text-warning">👑</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {driver.displayName}
                        </span>
                        <span className="text-xs text-default-500">
                          @{driver.driverName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{driver.team}</span>
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

        {maxRows && standings.length > maxRows && (
          <div className="text-center pt-4">
            <span className="text-default-500 text-sm">
              Showing top {maxRows} of {standings.length} drivers
            </span>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
