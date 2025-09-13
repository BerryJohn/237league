'use client';

import React, { use } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import Link from 'next/link';
import { RacingEvent } from '@/types';
import { ParticipantsList } from '@/components/participants-list';
import { WeatherCard } from '@/components/weather-card';
import { TrackInfoCard } from '@/components/track-info-card';

// Mock data for development - replace with actual API calls
const getMockEventById = (id: string): RacingEvent | null => {
  const mockEvents: Record<string, RacingEvent> = {
    '1': {
      id: '1',
      name: '24 Hours of Le Mans',
      description:
        'The legendary endurance race at Circuit de la Sarthe. Experience the ultimate test of driver skill, car reliability, and team strategy in this iconic 24-hour marathon.',
      track: {
        id: 'lemans',
        name: 'Circuit de la Sarthe',
        location: 'Le Mans',
        country: 'France',
        length: 13.626,
        corners: 38,
        difficulty: 'expert',
        imageUrl: '/images/tracks/lemans.jpg',
        description:
          'The most famous endurance racing circuit in the world, featuring the legendary Mulsanne Straight and challenging chicanes.',
        lapRecord: {
          time: '3:14.791',
          driver: 'Kamui Kobayashi',
          car: 'Toyota TS050 Hybrid',
          date: new Date('2017-06-11'),
        },
      },
      eventType: 'race',
      status: 'upcoming',
      startDate: new Date('2024-06-15T15:00:00Z'),
      endDate: new Date('2024-06-16T15:00:00Z'),
      registrationDeadline: new Date('2024-06-10T23:59:59Z'),
      maxParticipants: 60,
      currentParticipants: 42,
      weather: {
        condition: 'cloudy',
        temperature: 22,
        trackTemperature: 28,
        humidity: 65,
        windSpeed: 15,
        windDirection: 'NW',
      },
      raceSettings: {
        raceLength: 1440, // 24 hours in minutes
        lengthType: 'time',
        qualifyingLength: 60,
        practiceLength: 120,
        fuelConsumption: true,
        tireWear: true,
        damage: 'full',
        assists: {
          abs: false,
          tractionControl: false,
          stabilityControl: false,
          autoShift: false,
          brakingAssist: false,
        },
      },
      participants: [
        {
          id: '1',
          userId: 'user1',
          username: 'SpeedDemon',
          displayName: 'Speed Demon',
          avatar: '/avatars/user1.jpg',
          carNumber: 7,
          car: 'Toyota GR010 Hybrid',
          team: 'Team Velocity',
          registeredAt: new Date('2024-05-15T10:30:00Z'),
          isReserve: false,
        },
        {
          id: '2',
          userId: 'user2',
          username: 'RaceAce',
          displayName: 'Race Ace',
          avatar: '/avatars/user2.jpg',
          carNumber: 14,
          car: 'Porsche 963',
          team: 'Thunder Racing',
          registeredAt: new Date('2024-05-16T14:22:00Z'),
          isReserve: false,
        },
        {
          id: '3',
          userId: 'user3',
          username: 'TrackMaster',
          displayName: 'Track Master',
          avatar: '/avatars/user3.jpg',
          carNumber: 23,
          car: 'Ferrari 499P',
          registeredAt: new Date('2024-05-17T09:15:00Z'),
          isReserve: true,
        },
      ],
      createdBy: 'admin',
      createdAt: new Date('2024-05-01T00:00:00Z'),
      updatedAt: new Date('2024-05-15T00:00:00Z'),
    },
    '2': {
      id: '2',
      name: 'Silverstone Grand Prix',
      description: 'Sprint race at the home of British motorsport',
      track: {
        id: 'silverstone',
        name: 'Silverstone Circuit',
        location: 'Silverstone',
        country: 'United Kingdom',
        length: 5.891,
        corners: 18,
        difficulty: 'advanced',
      },
      eventType: 'race',
      status: 'completed',
      startDate: new Date('2024-05-20T14:00:00Z'),
      endDate: new Date('2024-05-20T15:30:00Z'),
      registrationDeadline: new Date('2024-05-15T23:59:59Z'),
      maxParticipants: 30,
      currentParticipants: 28,
      weather: {
        condition: 'sunny',
        temperature: 18,
        trackTemperature: 25,
        humidity: 45,
        windSpeed: 8,
        windDirection: 'SW',
      },
      raceSettings: {
        raceLength: 45,
        lengthType: 'laps',
        qualifyingLength: 20,
        practiceLength: 30,
        fuelConsumption: true,
        tireWear: true,
        damage: 'visual',
        assists: {
          abs: true,
          tractionControl: true,
          stabilityControl: false,
          autoShift: false,
          brakingAssist: false,
        },
      },
      participants: [],
      results: [
        {
          position: 1,
          participantId: '1',
          username: 'ChampionRacer',
          displayName: 'Champion Racer',
          car: 'McLaren 720S GT3',
          team: 'Velocity Racing',
          totalTime: '1:32:45.123',
          bestLap: '1:26.891',
          lapsCompleted: 45,
          gap: '+0.000',
          points: 25,
          dnf: false,
        },
        {
          position: 2,
          participantId: '2',
          username: 'FastTrack',
          displayName: 'Fast Track',
          car: 'Porsche 911 GT3 R',
          totalTime: '1:32:47.456',
          bestLap: '1:27.234',
          lapsCompleted: 45,
          gap: '+2.333',
          points: 18,
          dnf: false,
        },
      ],
      createdBy: 'admin',
      createdAt: new Date('2024-04-15T00:00:00Z'),
      updatedAt: new Date('2024-05-20T16:00:00Z'),
    },
  };

  return mockEvents[id] || null;
};

export const EventInformation = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const event = getMockEventById(id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardBody className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-default-500 mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/event">
              <Button color="primary">Back to Events</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const canRegister =
    event.status === 'upcoming' &&
    event.currentParticipants < event.maxParticipants &&
    new Date() < event.registrationDeadline;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/event">
          <Button variant="light" size="sm">
            ← Back to Events
          </Button>
        </Link>
      </div>

      {/* Event Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start w-full">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
                  <p className="text-xl text-default-600">{event.track.name}</p>
                  <p className="text-default-500">
                    {event.track.location}, {event.track.country}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Chip color={getStatusColor(event.status)} size="lg">
                    {event.status.toUpperCase()}
                  </Chip>
                  <Chip color="secondary" variant="flat">
                    {event.eventType.toUpperCase()}
                  </Chip>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-default-700 mb-6">{event.description}</p>

              {/* Event Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Event Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Start:</span>{' '}
                      {formatDate(event.startDate)}
                    </div>
                    <div>
                      <span className="font-medium">End:</span>{' '}
                      {formatDate(event.endDate)}
                    </div>
                    <div>
                      <span className="font-medium">
                        Registration Deadline:
                      </span>{' '}
                      {formatDate(event.registrationDeadline)}
                    </div>
                  </div>
                </div>

                {/* Track Info */}
                <div>
                  <h3 className="font-semibold mb-2">Track Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Length:</span>{' '}
                      {event.track.length} km
                    </div>
                    <div>
                      <span className="font-medium">Corners:</span>{' '}
                      {event.track.corners}
                    </div>
                    <div>
                      <span className="font-medium">Difficulty:</span>{' '}
                      {event.track.difficulty}
                    </div>
                    {event.track.lapRecord && (
                      <div>
                        <span className="font-medium">Lap Record:</span>{' '}
                        {event.track.lapRecord.time} (
                        {event.track.lapRecord.driver})
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Race Settings */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Race Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Duration:</span>
                    <br />
                    {event.raceSettings.lengthType === 'time'
                      ? formatDuration(event.raceSettings.raceLength)
                      : `${event.raceSettings.raceLength} laps`}
                  </div>
                  <div>
                    <span className="font-medium">Damage:</span>
                    <br />
                    {event.raceSettings.damage}
                  </div>
                  <div>
                    <span className="font-medium">Fuel:</span>
                    <br />
                    {event.raceSettings.fuelConsumption ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <span className="font-medium">Tire Wear:</span>
                    <br />
                    {event.raceSettings.tireWear ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Assists */}
              <div>
                <h3 className="font-semibold mb-2">Driving Assists</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(event.raceSettings.assists).map(
                    ([assist, enabled]) => (
                      <Chip
                        key={assist}
                        color={enabled ? 'success' : 'danger'}
                        variant="flat"
                        size="sm"
                      >
                        {assist.toUpperCase()}: {enabled ? 'ON' : 'OFF'}
                      </Chip>
                    )
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Event Details Sidebar */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h3 className="font-bold">Event Details</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span>Participants</span>
                    <span>
                      {event.currentParticipants}/{event.maxParticipants}
                    </span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Registration Button */}
          {canRegister && (
            <Button color="success" size="lg" className="w-full mb-4">
              Register for Event
            </Button>
          )}

          <WeatherCard weather={event.weather} />
        </div>
      </div>

      {/* Track Information */}
      <div className="mb-8">
        <TrackInfoCard track={event.track} />
      </div>

      {/* Participants/Results Section */}
      <ParticipantsList
        participants={event.participants}
        results={event.results}
        isCompleted={event.status === 'completed'}
      />
    </div>
  );
};

export default EventInformation;
