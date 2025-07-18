export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: '237League',
  description: 'TBA - strona ligi simracingowej 237League',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    twitch: 'https://www.twitch.tv/pueblooo237',
    youtube: 'https://www.youtube.com/@pueblooo237',
    discord: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    sponsor: 'https://patronite.pl/237league',
  },
};
