import { Card, CardBody } from '@heroui/card';

interface StatCardProps {
  value: string | number;
  label: string;
  gradient: string;
}

const StatCard = ({ value, label, gradient }: StatCardProps) => (
  <Card className={`bg-gradient-to-br ${gradient}`}>
    <CardBody className="text-center text-white">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm opacity-90">{label}</p>
    </CardBody>
  </Card>
);

const statsData = [
  {
    value: '12',
    label: 'Zarejestrowani użytkownicy',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    value: '3',
    label: 'Nadchodzące wyścigi',
    gradient: 'from-green-500 to-green-700',
  },
  {
    value: '1',
    label: 'Aktywny sezon',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    value: '47',
    label: 'Odbyte wyścigi',
    gradient: 'from-orange-500 to-orange-700',
  },
];

export default function AdminStatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl px-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          value={stat.value}
          label={stat.label}
          gradient={stat.gradient}
        />
      ))}
    </div>
  );
}
