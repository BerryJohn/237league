import { Card, CardHeader, CardBody } from '@heroui/card';
import { User } from '@heroui/user';
import { userDataType } from '@/types/user';
import { useAuth } from '@/contexts/auth-context';
import { createSteamAvatarURL } from '@/utils/helpers';
import { Input } from '@heroui/input';
// import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';

interface SettingsFormProps {
  userData: userDataType;
  onSave: (data: Partial<userDataType>) => Promise<void>;
}

export function SettingsForm() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Profil</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-4">
            <User
              name={user.displayName}
              description={`Steam ID: ${user.steamId}`}
              avatarProps={{
                src: createSteamAvatarURL(user.avatarHash, 'large'),
                size: 'lg',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Steam URL"
                disabled
                size="sm"
                value={user.steamProfileUrl}
              />
            </div>
            <div>
              <Input
                label="Data dołączenia"
                disabled
                size="sm"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
            <div>
              <Input
                label="ID użytkownika"
                disabled
                size="sm"
                value={user.id}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Dane personalne</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input label="Imię" size="sm" value={'Edward'} />
            </div>
            <div>
              <Input label="Nazwisko" size="sm" value={'Nowak'} />
            </div>
            <div>
              {/* <Autocomplete size="sm" value={'Polska'}>
                <AutocompleteItem key="polska">Polska</AutocompleteItem>
                <AutocompleteItem key="niemiecka">Niemiecka</AutocompleteItem>
                <AutocompleteItem key="francuska">Francuska</AutocompleteItem>
              </Autocomplete> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
