import { Card, CardHeader, CardBody } from '@heroui/card';
import { User } from '@heroui/user';
import { Input } from '@heroui/input';
import { createSteamAvatarURL } from '@/utils/helpers';
import type { User } from '@shared/types';

interface ProfileOverviewCardProps {
  user: User;
}

export function ProfileOverviewCard({ user }: ProfileOverviewCardProps) {
  return (
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
              isDisabled
              size="sm"
              value={user.steamProfileUrl}
            />
          </div>
          <div>
            <Input
              label="Data dołączenia"
              isDisabled
              size="sm"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
