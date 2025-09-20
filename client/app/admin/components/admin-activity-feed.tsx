import { Card, CardBody, CardHeader } from '@heroui/card';

import { typography } from '@/components/primitives';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'user' | 'race' | 'post';
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    title: 'Nowy użytkownik zarejestrowany',
    description: 'JanKowalski dołączył do ligi',
    timestamp: '2 godz. temu',
    type: 'user',
  },
  {
    id: '2',
    title: 'Wyścig zakończony',
    description: 'GP Monza - Sezon 2025',
    timestamp: '5 godz. temu',
    type: 'race',
  },
  {
    id: '3',
    title: 'Nowy post dodany',
    description: 'Regulamin sezonu 2025',
    timestamp: '1 dzień temu',
    type: 'post',
  },
];

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'user':
      return 'bg-green-500';
    case 'race':
      return 'bg-blue-500';
    case 'post':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

interface ActivityItemProps {
  activity: ActivityItem;
}

const ActivityItemComponent = ({ activity }: ActivityItemProps) => (
  <div className="flex items-center gap-3 p-3 bg-default-100 rounded-lg">
    <div
      className={`h-2 w-2 ${getActivityColor(activity.type)} rounded-full`}
    ></div>
    <div className="flex-grow">
      <p className="text-sm font-medium">{activity.title}</p>
      <p className="text-xs text-default-600">{activity.description}</p>
    </div>
    <p className="text-xs text-default-500">{activity.timestamp}</p>
  </div>
);

export default function AdminActivityFeed() {
  return (
    <div className="w-full max-w-6xl px-4">
      <Card>
        <CardHeader>
          <h3 className={typography({ size: 'lg', weight: 'semibold' })}>
            Ostatnie aktywności
          </h3>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3">
            {activityData.map((activity) => (
              <ActivityItemComponent key={activity.id} activity={activity} />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
