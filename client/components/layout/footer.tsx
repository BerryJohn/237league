import { Image } from '@heroui/image';
import { leagueGreen, subtitle, title, typography } from '../primitives';
import { Divider } from '@heroui/divider';
import { DiscordIcon, TwitchIcon, YoutubeIcon } from '../icons';
import { Link } from '@heroui/link';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center flex-col pt-8">
      <div>
        <Image src={'./brand/logo.png'} alt="237League Logo" width={90} />
      </div>
      <div className="w-full flex flex-row justify-between px-48 pb-16">
        <div className="flex-1 flex flex-col items-start pr-24 gap-4">
          <span
            className={typography({
              weight: 'bold',
              size: 'lg',
              uppercase: true,
            })}
          >
            O nas
          </span>
          <span
            className={typography({
              weight: 'light',
            })}
          >
            237League to liga simracingowa dla pasjonatów. <br />
            Tworzymy emocjonujące wyścigi i budujemy społeczność opartą na fair
            play.
          </span>
        </div>
        <div className="flex-1 flex items-end gap-4 justify-end">
          <span
            className={typography({
              weight: 'bold',
              uppercase: true,
            })}
          >
            Polityka prywatności
          </span>
          <Divider orientation="vertical" />
          <div className="flex flex-row gap-4 mt-2">
            <Link isExternal aria-label="Twitch" href={siteConfig.links.twitch}>
              <TwitchIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="YouTube"
              href={siteConfig.links.youtube}
            >
              <YoutubeIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
          </div>
        </div>
      </div>
      <div className="pb-8">
        <span
          className={typography({
            size: 'sm',
            color: 'default',
            weight: 'bold',
          })}
        >
          Copyright &copy; {new Date().getFullYear()}{' '}
          <Link href="/" className="">
            <span className={typography({ color: 'leagueGreen', size: 'sm' })}>
              237League
            </span>
          </Link>{' '}
          - Wszelkie prawa zastrzeżone.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
