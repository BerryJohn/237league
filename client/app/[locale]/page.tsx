import { useTranslations } from 'next-intl';
import { title, typography, leagueGreen } from '@/components/primitives';
import Post from '@/components/post';

export default function HomePage() {
  const t = useTranslations('welcome');

  return (
    <section className="flex flex-col items-center justify-center gap-4 overflow-x-hidden">
      <div className="relative flex flex-col items-center justify-center gap-4 min-h-screen w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/intro.mp4"
        />

        <div className="relative z-10 inline-block max-w-xl text-center justify-center">
          <span className={title()}>{t('title')}</span>
          <br />
          <div className="w-full text-lg lg:text-xl text-default-600 block max-w-full">
            {t('description')}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 py-10">
        <span
          className={
            typography({
              size: 'lg',
              weight: 'semibold',
              align: 'center',
              color: 'leagueGreen',
            }) + ' uppercase'
          }
        >
          Wszystko, co ważne w 237League
        </span>
        <span className={typography()}>
          Najnowsze ogłoszenia, zapowiedzi wyścigów i podsumowania. Bądź na
          bieżąco.
        </span>
        <div className="flex gap-2 mt-2">
          <div className="h-1 w-12" style={{ backgroundColor: leagueGreen }} />
          <div className="h-1 w-12" style={{ backgroundColor: leagueGreen }} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Post />
      </div>
    </section>
  );
}
