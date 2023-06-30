import { Stack } from '@chakra-ui/react';
import PoolsBanner from './PoolsBanner';
import PoolsCard from './PoolsCard';
import { PoolsItemProps } from '../index';

const ListUpfront: PoolsItemProps[] = [
  {
    type: 'Basic',
    discount: '30',
    rate: {
      txLimit: 100,
      minute: 30,
    },
    fee: {
      gaki: 1000.0,
      minute: 30,
    },
  },
  {
    type: 'Medium',
    discount: '30',
    rate: {
      txLimit: 100,
      minute: 30,
    },
    fee: {
      gaki: 1000.0,
      minute: 30,
    },
  },
  {
    type: 'Advance',
    discount: '30',
    rate: {
      txLimit: 100,
      minute: 30,
    },
    fee: {
      gaki: 1000.0,
      minute: 30,
    },
  },
];

export default function PoolsUpfront() {
  return (
    <Stack spacing={6}>
      <PoolsBanner
        heading="Upfront pool"
        body={`Upfront Pool provides upfront-charge services to reduce transaction
        fees and enhance network security. Basic, Medium, and Advanced are the
        three packs you can use when you join the Upfront Pool`}
        detail="#"
      />

      <PoolsCard item={ListUpfront} />
    </Stack>
  );
}
