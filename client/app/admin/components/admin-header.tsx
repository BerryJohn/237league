import { title, subtitle } from '@/components/primitives';

export default function AdminHeader() {
  return (
    <div className="inline-block max-w-4xl text-center justify-center">
      <h1 className={title({ size: 'lg' })}>Panel Administratora</h1>
    </div>
  );
}
