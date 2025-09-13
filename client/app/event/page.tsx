'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { RacingEvent, EventFilters } from '@/types';
import { EventCard } from '@/components/event-card';

// Mock data for development - replace with actual API calls
const mockEvents: RacingEvent[] = [
  {
    id: '1',
    name: '24 Hours of Le Mans',
    description: 'The legendary endurance race at Circuit de la Sarthe',
    track: {
      id: 'lemans',
      name: 'Circuit de la Sarthe',
      location: 'Le Mans',
      country: 'France',
      length: 13.626,
      corners: 38,
      difficulty: 'expert',
      imageUrl: '/images/tracks/lemans.jpg',
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
    participants: [],
    createdBy: 'admin',
    createdAt: new Date('2024-05-01T00:00:00Z'),
    updatedAt: new Date('2024-05-15T00:00:00Z'),
  },
  {
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
    results: [],
    createdBy: 'admin',
    createdAt: new Date('2024-04-15T00:00:00Z'),
    updatedAt: new Date('2024-05-20T16:00:00Z'),
  },
];

export const Event = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'upcoming' | 'ongoing' | 'completed'
  >('all');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.track.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || event.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const upcomingEvents = filteredEvents.filter(
    (event) => event.status === 'upcoming'
  );
  const pastEvents = filteredEvents.filter(
    (event) => event.status === 'completed'
  );
  const ongoingEvents = filteredEvents.filter(
    (event) => event.status === 'ongoing'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Racing Events</h1>
        <p className="text-lg text-default-600">
          Join exciting Le Mans Ultimate racing events and compete with drivers
          from around the world.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search events or tracks..."
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
            All Events
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
            variant={selectedFilter === 'ongoing' ? 'solid' : 'flat'}
            color="success"
            size="sm"
            onClick={() => setSelectedFilter('ongoing')}
          >
            Live
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

      {/* Ongoing Events */}
      {ongoingEvents.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-success">
            🔴 Live Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ongoingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📅 Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🏁 Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* No Events Found */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-default-500">
            {searchQuery
              ? 'Try adjusting your search terms or filters.'
              : 'No events match your current filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Event;
