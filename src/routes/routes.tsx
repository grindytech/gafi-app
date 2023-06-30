import Mint from 'pages/Mint';
import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';
import Web3 from 'pages/Web3';
import MarketPlace, { ListMarketPlace } from 'pages/MarketPlace';
import Home from 'layouts/Home';
import { ListWeb3Item } from 'layouts/DefaultLayout/DefaultWeb3';
import Blockchain, { ListBlockchain } from 'pages/Blockchain';

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
        children: ListWeb3Item.map(web3 => ({
          path: web3.link,
          element: web3.element,
        })),
      },
      {
        path: '/mint',
        element: <Mint />,
      },
      {
        path: 'blockchain',
        element: <Blockchain />,
        children: ListBlockchain.map(blockchain => ({
          path: blockchain.link,
          element: blockchain.element,
        })),
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
