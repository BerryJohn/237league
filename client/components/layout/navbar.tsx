'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Avatar } from '@heroui/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@heroui/dropdown';
import { User } from '@heroui/user';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  DiscordIcon,
  HeartFilledIcon,
  TwitchIcon,
  YoutubeIcon,
  UserIcon,
  SettingsIcon,
  LogoutIcon,
} from '@/components/icons';
import { typography } from '../primitives';
import { useAuth } from '@/contexts/auth-context';
import { createSteamAvatarURL } from '@/utils/helpers';

export const Navbar = () => {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  const router = useRouter();

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      isBordered
      shouldBlockScroll
    >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img
              src="/brand/logo.png"
              alt="237League Logo"
              className="h-16 w-16"
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-6">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.label}
              aria-label={item.label}
              href={item.href}
              className={typography({ weight: 'medium', uppercase: true })}
            >
              {item.label}
            </Link>
          ))}

          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          {isLoading ? (
            <Button isLoading variant="flat">
              Loading...
            </Button>
          ) : isAuthenticated && user ? (
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
                  >
                    <User
                      name={'Imie Nazwisko'}
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
                    key="my-profile"
                    startContent={<UserIcon size={16} />}
                    onPress={() => router.push(`/user/${user.id}`)}
                    className="text-sm"
                  >
                    <span className="truncate">Mój profil</span>
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
                    onPress={logout}
                    className="text-sm"
                  >
                    <span className="truncate">Wyloguj</span>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button color="primary" variant="flat" onPress={login}>
              Zaloguj przez Steam
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
