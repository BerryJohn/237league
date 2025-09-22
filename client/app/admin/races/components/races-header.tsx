import { title } from '@/components/primitives';

export default function RacesHeader() {
  return (
    <div className="flex items-end justify-between">
      <h1 className={title({ size: 'lg' })}>Zarządzanie wyścigami</h1>
    </div>
  );
}
