import { RacerStatsTable } from '@/components/racer-stats-table';

export default function CheckYourselfPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Sprawdź siebie!
        </h1>
        <p className="text-lg text-default-600">
          Sprawdź swoje osiągi wyścigowe i porównaj się z innymi zawodnikami w
          lidze
        </p>
      </div>

      <RacerStatsTable />
    </div>
  );
}
