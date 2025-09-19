'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar';

import { useAuth } from '@/contexts/auth-context';
import { NavbarBrandComponent } from './navbar-brand';
import { NavbarLinks } from './navbar-links';
import { AuthButton } from './auth-button';

export const Navbar = () => {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      isBordered
      shouldBlockScroll
    >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrandComponent />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarLinks />
        <NavbarItem>
          <AuthButton
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogin={login}
            onLogout={logout}
          />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;
