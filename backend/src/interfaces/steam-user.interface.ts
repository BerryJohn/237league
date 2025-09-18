export type SteamData = {
  provider: string;
  _json: userData;
  id: string;
  displayName: string;
  photos: Photo[];
};

export type userData = {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname: string;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  loccountrycode: string;
};

export type Photo = {
  value: string;
};
