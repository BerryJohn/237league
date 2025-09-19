/**
 *
 * @param avatarHash The avatar hash from Steam user data
 * @param size 'small' | 'medium' | 'large'
 * @returns URL to the Steam avatar image
 */
export const createSteamAvatarURL = (
  avatarHash: string,
  size: 'small' | 'medium' | 'large'
): string => {
  switch (size) {
    case 'small':
      return `https://avatars.steamstatic.com/${avatarHash}.jpg`;
    case 'medium':
      return `https://avatars.steamstatic.com/${avatarHash}_medium.jpg`;
    case 'large':
      return `https://avatars.steamstatic.com/${avatarHash}_full.jpg`;
    default:
      return `https://avatars.steamstatic.com/${avatarHash}_medium.jpg`;
  }
};
