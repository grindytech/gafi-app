import NewGames from 'layouts/NewGames';
import Collections from 'layouts/Collections';
import Items from 'layouts/Items';
import Mint from 'layouts/Mint';
import Pools from 'layouts/Pools';
import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/default/DefaultRoot';
import Web3 from 'layouts/web3/Web3';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultRoot />,
    children: [
      {
        index: true,
        element: <>home</>,
      },
      {
        path: 'web3',
        element: <Web3 />,
      },
      {
        path: 'web3/items',
        element: <Items />,
      },
      {
        path: 'web3/games',
        element: <NewGames />,
      },
      {
        path: 'web3/collections',
        element: <Collections />,
      },
      {
        path: 'web3/pools',
        element: <Pools />,
      },
      {
        path: '/mint',
        element: <Mint />,
      },
    ],
  },
]);

export default router;
