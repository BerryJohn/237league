import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import NextLink from 'next/link';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  DiscordIcon,
  HeartFilledIcon,
  TwitchIcon,
  YoutubeIcon,
} from '@/components/icons';

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="full" position="sticky" isBordered>
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
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitch" href={siteConfig.links.twitch}>
            <TwitchIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="YouTube" href={siteConfig.links.youtube}>
            <YoutubeIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Patronite
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Zaloguj przez Steam
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
