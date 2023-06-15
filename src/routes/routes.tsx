import Web3 from 'layouts/web3/Web3';

import NewGames from 'layouts/NewGames';
import Collections from 'layouts/Collections';
import Items from 'layouts/Items';

export interface IRouteProps {
  path: string;
  component: () => JSX.Element;
}

const routes = [
  {
    path: '/',
    component: () => <>home</>,
  },
  {
    path: '/web3',
    component: () => <Web3 />,
  },
  {
    path: '/web3/items',
    component: () => <Items />,
  },
  {
    path: '/web3/games',
    component: () => <NewGames />,
  },
  {
    path: '/web3/collections',
    component: () => <Collections />,
  },
] as IRouteProps[];
export default routes;
