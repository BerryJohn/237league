import { Image } from '@heroui/image';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Chip } from '@heroui/chip';

const Event = () => {
  return (
    <Card isPressable shadow="sm">
      <CardBody className="overflow-visible p-0">
        <Image
          alt={'Ring Rumble Event Image'}
          className="w-full object-cover h-[140px]"
          radius="lg"
          shadow="sm"
          src="https://cdn.thesimgrid.com/1cx7ofxzoq2hbsyvyn553sztxnzs"
          width="100%"
        />
      </CardBody>
      <CardFooter className="text-small flex-col">
        <p>Ring Rumble - Mount Panorama</p>
        <p>21.06.2025</p>
        <p>Multiclass</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Chip color="primary" variant="solid">
            Hypercar
          </Chip>
          <Chip color="secondary" variant="solid">
            GT3
          </Chip>
          <Chip color="danger" variant="solid">
            LMP2
          </Chip>
        </div>
        {/* <b>Ring Rumble</b>
        <p className="text-default-500">21.37.2005</p> */}
      </CardFooter>
    </Card>
  );
};

export default Event;
