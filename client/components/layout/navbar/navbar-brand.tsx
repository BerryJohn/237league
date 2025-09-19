'use client';

import { NavbarBrand } from '@heroui/navbar';
import NextLink from 'next/link';

export const NavbarBrandComponent = () => {
  return (
    <NavbarBrand as="li" className="gap-3 max-w-fit">
      <NextLink className="flex justify-start items-center gap-1" href="/">
        <img src="/brand/logo.png" alt="237League Logo" className="h-16 w-16" />
      </NextLink>
    </NavbarBrand>
  );
};
