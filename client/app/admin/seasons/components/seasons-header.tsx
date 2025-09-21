import { title } from '@/components/primitives';

export default function SeasonsHeader() {
  return (
    <div className="flex items-end justify-between">
      <h1 className={title({ size: 'lg' })}>Zarządzanie sezonami</h1>
    </div>
  );
}
