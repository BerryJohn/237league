import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import NextLink from 'next/link';

import {
  UsersIcon,
  CalendarIcon,
  TrophyIcon,
  ChartBarIcon,
  CogIcon,
  ClipboardListIcon,
} from '@/components/icons';
import { AdminMenuItem } from './types';
import { getIconStyles } from './utils';

const adminMenuItems: AdminMenuItem[] = [
  {
    title: 'Zarządanie ligami',
    description: 'Zarządzaj ustawieniami i szczegółami ligi.',
    icon: CogIcon,
    href: '/admin/leagues',
    color: 'secondary',
    available: true,
  },
  {
    title: 'Zarządzanie sezonami',
    description: 'Stwórz lub zarządzaj sezonami ligi.',
    icon: TrophyIcon,
    href: '/admin/seasons',
    color: 'primary',
    available: true,
  },
  {
    title: 'Zarządzanie wyścigami',
    description: 'Dodaj, edytuj lub usuń wyścigi w sezonie.',
    icon: CalendarIcon,
    href: '/admin/races',
    color: 'danger',
    available: true,
  },
];

interface AdminMenuCardProps {
  item: AdminMenuItem;
}

const AdminMenuCard = ({ item }: AdminMenuCardProps) => {
  const IconComponent = item.icon;
  const iconStyles = getIconStyles(item.color);

  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300"
      isPressable={item.available}
    >
      <CardHeader className="flex gap-3">
        <div className={`flex-shrink-0 p-2 rounded-lg ${iconStyles.container}`}>
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
        <p className="text-small text-default-600 mb-4">{item.description}</p>
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
};

export default function AdminMenuGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {adminMenuItems.map((item, index) => (
        <AdminMenuCard key={index} item={item} />
      ))}
    </div>
  );
}
