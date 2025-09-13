import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { User } from '@heroui/user';
import { Chip } from '@heroui/chip';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { EventParticipant, RaceResult } from '@/types';

interface ParticipantsListProps {
  participants: EventParticipant[];
  results?: RaceResult[];
  isCompleted?: boolean;
}

export const ParticipantsList = ({
  participants,
  results,
  isCompleted = false,
}: ParticipantsListProps) => {
  if (isCompleted && results) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">🏁 Race Results</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Race results">
            <TableHeader>
              <TableColumn>POS</TableColumn>
              <TableColumn>DRIVER</TableColumn>
              <TableColumn>CAR</TableColumn>
              <TableColumn>TIME</TableColumn>
              <TableColumn>BEST LAP</TableColumn>
              <TableColumn>GAP</TableColumn>
              <TableColumn>PTS</TableColumn>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.participantId}>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">{result.position}</span>
                      {result.position === 1 && (
                        <span className="text-warning">🏆</span>
                      )}
                      {result.position === 2 && (
                        <span className="text-default-400">🥈</span>
                      )}
                      {result.position === 3 && (
                        <span className="text-amber-600">🥉</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{result.displayName}</div>
                      <div className="text-small text-default-500">
                        {result.team}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{result.car}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">
                      {result.dnf ? (
                        <Chip color="danger" size="sm">
                          DNF
                        </Chip>
                      ) : (
                        result.totalTime
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{result.bestLap}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm text-default-500">
                      {result.gap}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-primary">
                      {result.points}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">
          👥 Registered Participants ({participants.length})
        </h2>
      </CardHeader>
      <CardBody>
        {participants.length > 0 ? (
          <div className="space-y-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-4 border border-default-200 rounded-lg hover:bg-default-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <User
                    avatarProps={{
                      src: participant.avatar,
                      size: 'sm',
                      showFallback: true,
                      fallback: participant.displayName.charAt(0).toUpperCase(),
                    }}
                    name={participant.displayName}
                    description={`@${participant.username}`}
                  />

                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <Chip size="sm" variant="flat" color="primary">
                        #{participant.carNumber}
                      </Chip>
                      <span className="text-sm font-medium">
                        {participant.car}
                      </span>
                    </div>
                    {participant.team && (
                      <Chip size="sm" variant="dot" color="secondary">
                        {participant.team}
                      </Chip>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {participant.isReserve && (
                    <Chip color="warning" size="sm" variant="flat">
                      Reserve
                    </Chip>
                  )}
                  <div className="text-sm text-default-500">
                    Joined{' '}
                    {new Date(participant.registeredAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏎️</div>
            <h3 className="text-xl font-semibold mb-2">No participants yet</h3>
            <p className="text-default-500">
              Be the first to register for this exciting racing event!
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
