import { PoolsItemProps } from '.';
import PoolsPlan from './PoolsPlan';

const ListStaking: PoolsItemProps[] = [
  {
    type: 'Basic plan',
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
    type: 'Medium plan',
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
    type: 'Premium plan',
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

export default function PoolsStaking() {
  return <PoolsPlan pools={ListStaking} />;
}
