import { title, typography } from '@/components/primitives';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import {
  DiscordIcon,
  TwitchIcon,
  YoutubeIcon,
  HeartFilledIcon,
} from '@/components/icons';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className={title({ size: 'lg' })}>Kontakt</h1>
        <p
          className={typography({
            class: 'mt-4 text-foreground-600 max-w-2xl mx-auto',
          })}
        >
          Masz pytania dotyczące 237League? Chcesz dołączyć do naszej
          społeczności? Skontaktuj się z nami jednym z poniższych sposobów.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Contact Information & Social Media */}
        <div className="space-y-8">
          {/* Social Media Links */}
          <Card className="shadow-large">
            <CardHeader className="flex-col">
              <h2 className={typography({ size: 'xl', weight: 'semibold' })}>
                Dołącz do społeczności
              </h2>
              <p className="text-foreground-600 text-sm">
                Śledź nas w mediach społecznościowych i bądź na bieżąco
              </p>
            </CardHeader>
            <CardBody className="gap-4">
              <Button
                as={Link}
                href={siteConfig.links.discord}
                isExternal
                variant="flat"
                className="justify-start h-16 text-left"
                startContent={
                  <DiscordIcon size={24} className="text-[#5865F2]" />
                }
              >
                <div>
                  <div className="font-semibold">Discord</div>
                  <div className="text-sm text-foreground-600">
                    Dołącz do naszego serwera Discord
                  </div>
                </div>
              </Button>

              <Button
                as={Link}
                href={siteConfig.links.twitch}
                isExternal
                variant="flat"
                className="justify-start h-16 text-left"
                startContent={
                  <TwitchIcon size={24} className="text-[#9146FF]" />
                }
              >
                <div>
                  <div className="font-semibold">Twitch</div>
                  <div className="text-sm text-foreground-600">
                    Oglądaj streamy Pueblooo237
                  </div>
                </div>
              </Button>

              <Button
                as={Link}
                href={siteConfig.links.youtube}
                isExternal
                variant="flat"
                className="justify-start h-16 text-left"
                startContent={
                  <YoutubeIcon size={24} className="text-[#FF0000]" />
                }
              >
                <div>
                  <div className="font-semibold">YouTube</div>
                  <div className="text-sm text-foreground-600">
                    Subskrybuj kanał na YouTube
                  </div>
                </div>
              </Button>

              <Button
                as={Link}
                href={siteConfig.links.sponsor}
                isExternal
                variant="flat"
                className="justify-start h-16 text-left"
                startContent={
                  <HeartFilledIcon size={24} className="text-danger" />
                }
              >
                <div>
                  <div className="font-semibold">Patronite</div>
                  <div className="text-sm text-foreground-600">
                    Wspieraj rozwój ligi
                  </div>
                </div>
              </Button>
            </CardBody>
          </Card>

          {/* League Information */}
          <Card className="shadow-large">
            <CardHeader>
              <h2 className={typography({ size: 'xl', weight: 'semibold' })}>
                O 237League
              </h2>
            </CardHeader>
            <CardBody className="gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Organizator</h3>
                  <p className="text-foreground-600 text-sm">
                    Liga jest prowadzona przez streamera{' '}
                    <strong>Pueblooo237</strong>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Gra</h3>
                  <p className="text-foreground-600 text-sm">
                    Le Mans Ultimate - profesjonalne wyścigi wytrzymałościowe
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Społeczność</h3>
                  <p className="text-foreground-600 text-sm">
                    Polska liga dla graczy na wszystkich poziomach zaawansowania
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Harmonogram</h3>
                  <p className="text-foreground-600 text-sm">
                    Regularne wyścigi i eventy specjalne
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* FAQ Section */}
          <Card className="shadow-large">
            <CardHeader>
              <h2 className={typography({ size: 'xl', weight: 'semibold' })}>
                Często zadawane pytania
              </h2>
            </CardHeader>
            <CardBody className="gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1 text-primary-600">
                    Jak mogę dołączyć do ligi?
                  </h3>
                  <p className="text-foreground-600 text-sm">
                    Dołącz do naszego serwera Discord i skontaktuj się z
                    organizatorami. Potrzebujesz gry Le Mans Ultimate na Steam.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1 text-primary-600">
                    Czy liga jest płatna?
                  </h3>
                  <p className="text-foreground-600 text-sm">
                    Liga jest darmowa dla wszystkich uczestników. Można
                    dobrowolnie wspierać rozwój przez Patronite.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1 text-primary-600">
                    Kiedy odbywają się wyścigi?
                  </h3>
                  <p className="text-foreground-600 text-sm">
                    Harmonogram wyścigów jest publikowany na Discord i stronie
                    głównej. Zazwyczaj weekendy, wieczorami.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1 text-primary-600">
                    Potrzebuję specjalnego sprzętu?
                  </h3>
                  <p className="text-foreground-600 text-sm">
                    Kierownica jest zalecana, ale nie wymagana. Można grać na
                    padzie lub klawiaturze na początku.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
