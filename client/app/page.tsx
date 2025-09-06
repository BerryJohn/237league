import { title, typography, leagueGreen } from '@/components/primitives';
import { EventProps } from '@/components//event';
import Post from '@/components/post';

export default function Home() {
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

        {/* <div className="relative z-10 inline-block max-w-xl text-center justify-center">
          <span className={title()}>Zapisz się do&nbsp;</span>
          <span className={title({ color: 'green' })}>237League&nbsp;</span>
          <br />
          <div className={subtitle({ class: 'mt-4' })}>
            Polska liga dla graczy, prowadzona przez streamera Pueblooo237
          </div>
        </div> */}
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
        <span className={title() + ' uppercase'}>Aktualności</span>
        <span className={typography()}>
          Najnowsze ogłoszenia, zapowiedzi wyścigów i podsumowania. Bądź na
          bieżąco.
        </span>
        <div className="flex gap-2 mt-2">
          <div className="h-1 w-12" style={{ backgroundColor: leagueGreen }} />
          <div className="h-1 w-12" style={{ backgroundColor: leagueGreen }} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Post
          imgUrl="https://237league.pl/wp-content/uploads/2025/08/857F1651-0901-42B1-92CE-0C0D77EEDDD7_wynik.webp"
          title="Ranking kierowców w LMU - Sprawdź, jak Ci idzie!"
          date={new Date('2024-10-01')}
          author="Paweł Gaśnica"
          id="test"
        />
        <Post author="237League" />
      </div>

      {/* TODO: Carousel / overflow in case of larger amount of races */}
      {/* <div className="flex gap-4 ">
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
      </div> */}
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
