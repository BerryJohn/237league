'use client';

import { Card, CardHeader, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Avatar } from '@heroui/avatar';
import { Link } from '@heroui/link';
import { Divider } from '@heroui/divider';
import { createSteamAvatarURL } from '@/utils/helpers';
import { userDataType } from '@/types/user';

interface UserProfileHeaderProps {
  profile: userDataType;
  isOwnProfile: boolean;
}

const formatJoinDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export function UserProfileHeader({
  profile,
  isOwnProfile,
}: UserProfileHeaderProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-4 px-6 py-6">
        <div className="flex items-start gap-6 w-full">
          <Avatar
            src={createSteamAvatarURL(profile.avatarHash, 'large')}
            alt={profile.displayName}
            className="w-24 h-24 text-large flex-shrink-0"
            isBordered
            color={isOwnProfile ? 'primary' : 'default'}
          />

          <div className="flex flex-col gap-3 flex-grow">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">
                  {profile.displayName}
                </h1>
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                  className="text-xs"
                >
                  Racing League Member
                </Chip>
              </div>

              {profile.personaName !== profile.displayName && (
                <p className="text-small text-default-500">
                  Steam: {profile.personaName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-small text-default-600">
                <span>Joined {formatJoinDate(profile.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={profile.steamProfileUrl}
                  isExternal
                  showAnchorIcon
                  className="text-small"
                  color="primary"
                >
                  View Steam Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-6 py-4 border-t border-divider">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-small text-default-500">Races</p>
            </div>
            <Divider orientation="vertical" className="h-8" />
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">0</p>
              <p className="text-small text-default-500">Wins</p>
            </div>
            <Divider orientation="vertical" className="h-8" />
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">N/A</p>
              <p className="text-small text-default-500">Rank</p>
            </div>
          </div>

          <div className="text-right">
            <Chip color="default" variant="flat" size="sm">
              Season 2025
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
