import { title, subtitle } from '@/components/primitives';
import Event from '@/components/layout/event';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex flex-col items-center justify-center gap-4 min-h-screen w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.2] blur-sm"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/xD.mp4"
        />

        <div className="relative z-10 inline-block max-w-xl text-center justify-center">
          <span className={title()}>Zapisz się do&nbsp;</span>
          <span className={title({ color: 'green' })}>237League&nbsp;</span>
          <br />
          <div className={subtitle({ class: 'mt-4' })}>
            Polska liga dla graczy, prowadzona przez streamera Pueblooo237
          </div>
        </div>
      </div>

      <div>
        <span className={subtitle()}>Wydarzenia</span>
        <div>
          <Event />
        </div>
      </div>
    </section>
  );
}
