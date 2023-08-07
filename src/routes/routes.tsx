import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';
import Web3 from 'pages/Web3';
import MarketPlace from 'pages/MarketPlace';
import Home from 'pages/Home';
import { ListWeb3Item } from 'layouts/DefaultLayout/DefaultWeb3';
import Blockchain, { ListBlockchain } from 'pages/Blockchain';
import HomeMarketPlace from 'pages/MarketPlace/Home';
import Mint from 'pages/Mint';
import CollectionDetail from 'pages/MarketPlace/CollectionDetail';
import NFTDetail from 'pages/MarketPlace/NFTDetail';

import Account from 'pages/Account';
import AccountSetting from 'pages/Account/AccountSetting';
import BundleDetail from 'pages/MarketPlace/BundleDetail';

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
        children: [
          { path: 'home', element: <HomeMarketPlace /> },
          {
            path: 'nft/:nft_id/:collection_id',
            element: <NFTDetail />,
          },
          {
            path: 'collection/:collection_id',
            element: <CollectionDetail />,
          },
          {
            path: 'bundle/:id',
            element: <BundleDetail />,
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: ':address',
            element: <Account />,
          },
          {
            path: ':address/setting',
            element: <AccountSetting />,
          },
        ],
      },
    ],
  },
]);

export default router;
