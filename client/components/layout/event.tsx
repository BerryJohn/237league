import { Image } from '@heroui/image';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/divider';
import { PeopleIcon } from '../icons';

export type EventProps = {
  title?: string;
  date?: string;
  hour?: string;
  track?: string;
  participants?: number;
  maxParticipants?: number;
  imageUrl?: string;
  raceLength?: string;
  raceType?: 'Multiclass' | 'Single Class';
  classes?: string[];
};

const Event = ({
  title = 'Ring Rumble',
  date = '2024-01-01',
  hour = '20:00',
  track = 'Monza',
  participants = 47,
  maxParticipants = 50,
  imageUrl = 'https://cdn.thesimgrid.com/1cx7ofxzoq2hbsyvyn553sztxnzs',
  raceLength = '75min',
  raceType = 'Multiclass',
  classes = ['Hypercar', 'LMGT3', 'LMP2'],
}: EventProps) => {
  return (
    <Card isPressable shadow="sm" className="w-[250px]">
      <CardBody className="overflow-visible p-0">
        <Image
          alt={'Ring Rumble Event Image'}
          className="w-full object-cover h-[140px]"
          radius="lg"
          shadow="sm"
          src={imageUrl}
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small flex-col gap-2">
        <p>{title}</p>
        <Divider />
        <p>{track}</p>
        <Divider />
        <p>
          {date} | {hour}
        </p>
        <Divider />
        <Chip
          color="success"
          variant="solid"
          size="sm"
          endContent={<PeopleIcon className="h-4 w-4" />}
        >
          {participants}/{maxParticipants}
        </Chip>

        <Divider />
        <p>{raceType}</p>
        <div className="flex flex-wrap gap-2">
          {classes.map((cls, index) => (
            <Chip key={index} color="primary" variant="solid" size="sm">
              {cls}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Event;
