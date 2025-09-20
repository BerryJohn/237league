import { title } from '@/components/primitives';
import { Button } from '@heroui/button';

export default function LeaguesHeader() {
  return (
    <div className="flex items-end justify-between ">
      <h1 className={title({ size: 'lg' })}>Zarządzanie ligami</h1>
    </div>
  );
}
