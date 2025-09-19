'use client';

import { SettingsForm } from './components/settings-form';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ustawienia</h1>
        <p className="text-default-600">
          Zarządzaj ustawieniami swojego konta i preferencjami
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
