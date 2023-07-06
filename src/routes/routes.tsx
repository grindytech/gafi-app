import NewGames from 'layouts/Web3/NewGames';
import Collections from 'layouts/Web3/Collections';
import Items from 'layouts/Web3/Items';
import Mint from 'pages/Mint';
import Pools from 'layouts/Web3/Pools';
import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';
import Web3 from 'pages/Web3';
import MarketPlace from 'pages/MarketPlace';
import Home from 'layouts/Home';
import Explorer, { ListExplorerTab } from 'pages/MarketPlace/Explorer';
import HomeMarketPlace from 'pages/MarketPlace/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultRoot />,
    children: [
      {
        index: true,
        element: <Home />,
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
        children: [
          { path: 'home', element: <HomeMarketPlace /> },
          {
            path: 'explorer',
            element: <Explorer />,
            children: ListExplorerTab.map(tabLink => ({
              path: tabLink.link,
              element: tabLink.element,
            })),
          },
        ],
      },
      {
        path: 'minting',
      },
    ],
  },
]);

export default router;
