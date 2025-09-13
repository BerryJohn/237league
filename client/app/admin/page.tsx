'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import NextLink from 'next/link';

import { title, subtitle, typography } from '@/components/primitives';

// Custom admin icons
const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const CogIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ClipboardListIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const adminMenuItems = [
  {
    title: 'Zarządzaj użytkownikami',
    description: 'Dodawaj, edytuj i zarządzaj profilami kierowców',
    icon: UsersIcon,
    href: '/admin/users',
    color: 'primary' as const,
    available: false,
  },
  {
    title: 'Wydarzenia i wyścigi',
    description: 'Twórz i zarządzaj wydarzeniami wyścigowymi',
    icon: CalendarIcon,
    href: '/admin/events',
    color: 'secondary' as const,
    available: false,
  },
  {
    title: 'Sezony i klasyfikacje',
    description: 'Zarządzaj sezonami i systemem punktów',
    icon: TrophyIcon,
    href: '/admin/seasons',
    color: 'success' as const,
    available: false,
  },
  {
    title: 'Statystyki i raporty',
    description: 'Przeglądaj dane i generuj raporty',
    icon: ChartBarIcon,
    href: '/admin/stats',
    color: 'warning' as const,
    available: false,
  },
  {
    title: 'Ustawienia systemu',
    description: 'Konfiguracja ogólna aplikacji',
    icon: CogIcon,
    href: '/admin/settings',
    color: 'danger' as const,
    available: false,
  },
  {
    title: 'Moderacja treści',
    description: 'Zarządzaj postami i komentarzami',
    icon: ClipboardListIcon,
    href: '/admin/moderation',
    color: 'default' as const,
    available: false,
  },
];

export default function AdminPanel() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <h1 className={title({ size: 'lg' })}>Panel Administratora</h1>
        <p className={subtitle({ class: 'mt-4' })}>
          Witaj w panelu zarządzania 237League. Stąd możesz zarządzać wszystkimi
          aspektami ligi.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl px-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700">
          <CardBody className="text-center text-white">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm opacity-90">Aktywni użytkownicy</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-700">
          <CardBody className="text-center text-white">
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm opacity-90">Nadchodzące wyścigi</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700">
          <CardBody className="text-center text-white">
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm opacity-90">Aktywny sezon</p>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-700">
          <CardBody className="text-center text-white">
            <p className="text-2xl font-bold">47</p>
            <p className="text-sm opacity-90">Łączne wyścigi</p>
          </CardBody>
        </Card>
      </div>

      {/* Admin Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {adminMenuItems.map((item, index) => {
          const IconComponent = item.icon;

          // Define icon styling based on color
          const getIconStyles = (color: string) => {
            switch (color) {
              case 'primary':
                return {
                  container: 'bg-blue-100 dark:bg-blue-900/20',
                  icon: 'text-blue-600 dark:text-blue-400',
                };
              case 'secondary':
                return {
                  container: 'bg-purple-100 dark:bg-purple-900/20',
                  icon: 'text-purple-600 dark:text-purple-400',
                };
              case 'success':
                return {
                  container: 'bg-green-100 dark:bg-green-900/20',
                  icon: 'text-green-600 dark:text-green-400',
                };
              case 'warning':
                return {
                  container: 'bg-orange-100 dark:bg-orange-900/20',
                  icon: 'text-orange-600 dark:text-orange-400',
                };
              case 'danger':
                return {
                  container: 'bg-red-100 dark:bg-red-900/20',
                  icon: 'text-red-600 dark:text-red-400',
                };
              default:
                return {
                  container: 'bg-gray-100 dark:bg-gray-900/20',
                  icon: 'text-gray-600 dark:text-gray-400',
                };
            }
          };

          const iconStyles = getIconStyles(item.color);

          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
              isPressable={item.available}
            >
              <CardHeader className="flex gap-3">
                <div
                  className={`flex-shrink-0 p-2 rounded-lg ${iconStyles.container}`}
                >
                  <IconComponent className={`h-6 w-6 ${iconStyles.icon}`} />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="text-md font-semibold">{item.title}</p>
                    {!item.available && (
                      <Chip size="sm" color="default" variant="flat">
                        Wkrótce
                      </Chip>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-small text-default-600 mb-4">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  {item.available ? (
                    <Button
                      as={NextLink}
                      href={item.href}
                      color={item.color}
                      variant="flat"
                      size="sm"
                    >
                      Otwórz
                    </Button>
                  ) : (
                    <Button color="default" variant="flat" size="sm" isDisabled>
                      Niedostępne
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="w-full max-w-6xl px-4">
        <Card>
          <CardHeader>
            <h3 className={typography({ size: 'lg', weight: 'semibold' })}>
              Ostatnie aktywności
            </h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-default-100 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">
                    Nowy użytkownik zarejestrowany
                  </p>
                  <p className="text-xs text-default-600">
                    JanKowalski dołączył do ligi
                  </p>
                </div>
                <p className="text-xs text-default-500">2 godz. temu</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-default-100 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">Wyścig zakończony</p>
                  <p className="text-xs text-default-600">
                    GP Monza - Sezon 2025
                  </p>
                </div>
                <p className="text-xs text-default-500">5 godz. temu</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-default-100 rounded-lg">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <div className="flex-grow">
                  <p className="text-sm font-medium">Nowy post dodany</p>
                  <p className="text-xs text-default-600">
                    Regulamin sezonu 2025
                  </p>
                </div>
                <p className="text-xs text-default-500">1 dzień temu</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
