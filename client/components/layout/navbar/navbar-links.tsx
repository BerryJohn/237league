'use client';

import { NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { typography } from '../../primitives';

export const NavbarLinks = () => {
  return (
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
  );
};
