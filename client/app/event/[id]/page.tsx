'use client';
import { use } from 'react';

export const EventInformation = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  return <div> {id} </div>;
};

export default EventInformation;
