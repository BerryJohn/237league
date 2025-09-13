import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import Link from 'next/link';
import { RacingEvent } from '@/types';

interface EventCardProps {
  event: RacingEvent;
  showActions?: boolean;
}

export const EventCard = ({ event, showActions = true }: EventCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'ongoing':
        return 'success';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'race':
        return 'success';
      case 'qualifying':
        return 'warning';
      case 'practice':
        return 'secondary';
      case 'championship':
        return 'primary';
      default:
        return 'default';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p className="text-small text-default-500">
              {event.track.name}, {event.track.country}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Chip color={getStatusColor(event.status)} variant="flat" size="sm">
              {event.status.toUpperCase()}
            </Chip>
            <Chip
              color={getEventTypeColor(event.eventType)}
              variant="flat"
              size="sm"
            >
              {event.eventType.toUpperCase()}
            </Chip>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-small text-default-600 mb-4">{event.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-small">
          <div>
            <span className="font-medium">Start:</span>{' '}
            {formatDate(event.startDate)}
          </div>
          <div>
            <span className="font-medium">End:</span>{' '}
            {formatDate(event.endDate)}
          </div>
          <div>
            <span className="font-medium">Participants:</span>{' '}
            {event.currentParticipants}/{event.maxParticipants}
          </div>
          <div>
            <span className="font-medium">Track Length:</span>{' '}
            {event.track.length} km
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Chip variant="dot" color="default" size="sm">
              {event.weather.condition}
            </Chip>
            <Chip variant="dot" color="default" size="sm">
              {event.weather.temperature}°C
            </Chip>
          </div>
          {showActions && (
            <Link href={`/event/${event.id}`}>
              <Button color="primary" size="sm">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
