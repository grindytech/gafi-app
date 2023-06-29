import NewGames from 'layouts/Web3/NewGames';
import Collections from 'layouts/Web3/Collections';
import Items from 'layouts/Web3/Items';
import Mint from 'pages/Mint';
import Pools from 'layouts/Web3/Pools';
import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';

import Web3 from 'pages/Web3';
import MarketPlace, { ListMarketPlace } from 'pages/MarketPlace';

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
      {
        path: 'marketplace',
        element: <MarketPlace />,

        children: ListMarketPlace.map(market => ({
          path: market.link,
          element: market.element,
        })),
      },
    ],
  },
]);

export default router;
