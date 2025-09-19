'use client';

import { Card, CardFooter, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { Chip } from '@heroui/chip';
import { OutlineCalendarMonth, PeopleIcon } from './icons';
import { redirect, RedirectType } from 'next/navigation';

type PostProps = {
  imgUrl?: string;
  title?: string;
  date?: Date;
  author?: string;
  id?: string;
};

const Post = ({ imgUrl, title, date, author, id }: PostProps) => {
  const handleRedirect = () => {
    if (id) {
      redirect(`/posts/${id}`, RedirectType.push);
    }
  };

  return (
    <Card
      isFooterBlurred
      className="w-[550px] h-[300px]"
      isPressable
      onClick={handleRedirect}
    >
      <CardHeader className="absolute top-0 flex justify-between gap-2">
        {date && (
          <Chip
            size="sm"
            variant="solid"
            color="default"
            className="bg-opacity-70"
            radius="sm"
            startContent={<OutlineCalendarMonth />}
          >
            {date?.toISOString().split('T')[0]}
          </Chip>
        )}
        {author && (
          <Chip
            size="sm"
            variant="solid"
            color="default"
            className="bg-opacity-70"
            radius="sm"
            startContent={<PeopleIcon />}
          >
            {author}
          </Chip>
        )}
      </CardHeader>
      <Image
        removeWrapper
        isZoomed
        alt="Post image"
        className="z-0 w-full h-full object-cover"
        src={imgUrl || '/brand/logo.png'}
      />
      {title && (
        <CardFooter className="absolute bottom-0">
          <div className="flex grow gap-2 items-center">{title}</div>
        </CardFooter>
      )}
    </Card>
  );
};

export default Post;
