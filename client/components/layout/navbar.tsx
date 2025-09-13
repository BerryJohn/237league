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
import { typography } from '../primitives';

export const Navbar = () => {
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
          <Button as={Link} color="primary" href="#" variant="flat">
            Zaloguj przez Steam
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
