import { useAuth } from '@/contexts/auth-context';
import { ProfileOverviewCard } from './profile-overview-card';
import { PersonalDataCard } from './personal-data-card';

export function SettingsForm() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const handlePersonalDataSave = (data: any) => {
    // TODO: Implement save functionality
    console.log('Saving personal data:', data);
  };

  return (
    <div className="space-y-6">
      <ProfileOverviewCard user={user} />
      <PersonalDataCard onSave={handlePersonalDataSave} />
    </div>
  );
}
