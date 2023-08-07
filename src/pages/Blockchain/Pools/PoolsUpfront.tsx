import { PoolsItemProps } from '.';
import PoolsPlan from './PoolsPlan';

const ListUpfront: PoolsItemProps[] = [
  {
    type: 'Basic plan',
    discount: '30',
    rate: {
      txLimit: 100,
      minute: 30,
    },
    fee: {
      gaki: 1000,
      minute: 30,
    },
  },
  {
    type: 'Medium plan',
    discount: '50',
    rate: {
      txLimit: 400,
      minute: 30,
    },
    fee: {
      gaki: 5000,
      minute: 30,
    },
  },
  {
    type: 'Premium plan',
    discount: '70',
    rate: {
      txLimit: 1500,
      minute: 30,
    },
    fee: {
      gaki: 15000,
      minute: 30,
    },
  },
];

export default function PoolsUpfront() {
  return <PoolsPlan pools={ListUpfront} />;
}
