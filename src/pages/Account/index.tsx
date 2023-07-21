import NFTIcon from 'public/assets/line/nfts.svg';
import ChartIcon from 'public/assets/line/chart-02.svg';
import CartIcon from 'public/assets/line/cart-02.svg';
import LoveIcon from 'public/assets/line/heart.svg';
import SettingIcon from 'public/assets/line/setting.svg';
import OwnerNFts from './NFTs';
export const ListProfileData = [
  {
    icon: NFTIcon,
    title: 'My NFTs',
    link: '/account',
    element: <OwnerNFts />,
  },
  {
    icon: ChartIcon,
    title: 'Activity',
    link: '#',
    element: <OwnerNFts />,
  },
  {
    icon: CartIcon,
    title: 'My Cart',
    link: '#',
    element: <OwnerNFts />,
  },
  {
    icon: LoveIcon,
    title: 'Favourited',
    link: '#',
    element: <OwnerNFts />,
  },
  {
    icon: SettingIcon,
    title: 'Settings',
    link: '#',
    element: <OwnerNFts />,
  },
];
const Account = () => {
  return <div>Account</div>;
};

export default Account;
