import { title, subtitle } from '@/components/primitives';
import Event, { EventProps } from '@/components/layout/event';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 overflow-x-hidden">
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
      <span className={subtitle() + ' text-center'}>
        Nadchodzące wydarzenia
      </span>
      {/* TODO: Carousel / overflow in case of larger amount of races */}
      <div className="flex gap-4 ">
        {events.map((event, index) => (
          <Event
            key={index}
            title={event.title}
            date={event.date}
            hour={event.hour}
            track={event.track}
            participants={event.participants}
            maxParticipants={event.maxParticipants}
            imageUrl={event.imageUrl}
            raceLength={event.raceLength}
            raceType={event.raceType}
            classes={event.classes}
          />
        ))}
      </div>
    </section>
  );
}

const events: EventProps[] = [
  {
    title: 'Ring Rumble',
    date: '2024-01-01',
    hour: '20:00',
    track: 'Monza',
    participants: 47,
    maxParticipants: 50,
    imageUrl: 'https://cdn.thesimgrid.com/1cx7ofxzoq2hbsyvyn553sztxnzs',
    raceLength: '75min',
    raceType: 'Multiclass',
    classes: ['Hypercar', 'LMGT3', 'LMP2'],
  },
  {
    title: 'Spa Showdown',
    date: '2024-02-15',
    hour: '19:00',
    track: 'Spa-Francorchamps',
    participants: 30,
    maxParticipants: 50,
    imageUrl: 'https://cdn.thesimgrid.com/1cx7ofxzoq2hbsyvyn553sztxnzs',
    raceLength: '90min',
    raceType: 'Single Class',
    classes: ['GT3'],
  },
  {
    title: 'Nordschleife Challenge',
    date: '2024-03-10',
    hour: '21:00',
    track: 'Nordschleife',
    participants: 25,
    maxParticipants: 40,
    imageUrl: 'https://cdn.thesimgrid.com/1cx7ofxzoq2hbsyvyn553sztxnzs',
    raceLength: '120min',
    raceType: 'Multiclass',
    classes: ['Hypercar', 'GTE'],
  },
];
