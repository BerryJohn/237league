'use client';

import { Avatar } from '@heroui/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@heroui/dropdown';
import { User } from '@heroui/user';
import { useRouter } from 'next/navigation';

import { SettingsIcon, LogoutIcon } from '@/components/icons';
import { createSteamAvatarURL } from '@/utils/helpers';
import { userDataType } from '@/types/user';

interface UserDropdownProps {
  user: userDataType;
  onLogout: () => void;
}

export const UserDropdown = ({ user, onLogout }: UserDropdownProps) => {
  const router = useRouter();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          src={createSteamAvatarURL(user.avatarHash, 'medium')}
          alt={user.displayName}
          size="sm"
          className="cursor-pointer"
          isBordered
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" variant="flat">
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="Profile"
            onPress={() => router.push(`/user`)}
          >
            <User
              name={user.displayName}
              description={`@${user.displayName}`}
              classNames={{
                name: 'text-default-600 truncate max-w-[120px]',
                description: 'text-default-500 truncate max-w-[120px]',
              }}
              avatarProps={{
                size: 'sm',
                src: createSteamAvatarURL(user.avatarHash, 'medium'),
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<SettingsIcon size={16} />}
            onPress={() => router.push('/user')}
            className="text-sm"
          >
            <span className="truncate">Ustawienia</span>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Danger zone">
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<LogoutIcon size={16} />}
            onPress={onLogout}
            className="text-sm"
          >
            <span className="truncate">Wyloguj</span>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
