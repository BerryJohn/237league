'use client';

import { Card, CardHeader, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { User } from '@heroui/user';
import { UserProfile } from '@/types';

interface UserProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onEditClick?: () => void;
}

export function UserProfileHeader({
  profile,
  isOwnProfile,
  onEditClick,
}: UserProfileHeaderProps) {
  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 justify-between flex-col sm:flex-row">
        <div className="flex gap-3 items-center flex-col sm:flex-row">
          <User
            name={profile.displayName}
            description={`@${profile.username}`}
            avatarProps={{
              src: profile.avatar,
              size: 'lg',
              isBordered: true,
              color: profile.isOnline ? 'success' : 'default',
            }}
          />
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 items-center">
            <Chip
              color={profile.isOnline ? 'success' : 'default'}
              variant="flat"
              size="sm"
            >
              {profile.isOnline
                ? 'Online'
                : `Last seen ${formatLastSeen(profile.lastSeen)}`}
            </Chip>
            {profile.country && (
              <Chip variant="flat" size="sm">
                {profile.country}
              </Chip>
            )}
          </div>
        </div>

        {isOwnProfile && (
          <Button color="primary" variant="flat" onPress={onEditClick}>
            Edit Profile
          </Button>
        )}
      </CardHeader>

      <CardBody>
        <div className="space-y-4">
          {profile.bio && (
            <div>
              <h4 className="text-sm font-semibold text-default-600 mb-1">
                Bio
              </h4>
              <p className="text-default-800">{profile.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-default-600">
                Member since:
              </span>
              <span className="ml-2">
                {profile.createdAt.toLocaleDateString()}
              </span>
            </div>

            {profile.steamProfile.realName && (
              <div>
                <span className="font-medium text-default-600">Real name:</span>
                <span className="ml-2">{profile.steamProfile.realName}</span>
              </div>
            )}

            <div>
              <span className="font-medium text-default-600">Steam ID:</span>
              <span className="ml-2 font-mono text-xs">{profile.steamId}</span>
            </div>

            <div>
              <a
                href={profile.steamProfile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Steam Profile →
              </a>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
