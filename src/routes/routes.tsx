import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';
import Web3 from 'pages/Web3';
import MarketPlace from 'pages/MarketPlace';
import Home from 'layouts/Home';
import { ListWeb3Item } from 'layouts/DefaultLayout/DefaultWeb3';
import Blockchain, { ListBlockchain } from 'pages/Blockchain';
import Explorer, { ListExplorerTab } from 'pages/MarketPlace/Explorer';
import HomeMarketPlace from 'pages/MarketPlace/Home';
import ExplorerGamesDetail from 'layouts/MarketPlace/Explorer/ExplorerGames/ExplorerGamesDetail';
import ExplorerNFTsDetail from 'layouts/MarketPlace/Explorer/ExplorerNFTs/ExplorerNFTsDetail';
import ExplorerCollectionsDetail from 'layouts/MarketPlace/Explorer/ExplorerCollections/ExplorerCollectionsDetail';
import Mint from 'pages/Mint';
import ExplorerBundleDetail from 'layouts/MarketPlace/Explorer/ExplorerBundles/ExplorerBundleDetail';
import Account from 'pages/Account';

import AccountSetting from 'pages/Account/Settings';

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
            path: 'explorer',
            element: <Explorer />,
            children: ListExplorerTab.map(tabLink => ({
              path: tabLink.link,
              element: tabLink.element,
            })),
          },
          {
            path: 'game/:id',
            element: <ExplorerGamesDetail />,
          },
          {
            path: 'nft/:id',
            element: <ExplorerNFTsDetail />,
          },
          {
            path: 'collection/:id',
            element: <ExplorerCollectionsDetail />,
          },
          {
            path: 'bundle/:id',
            element: <ExplorerBundleDetail />,
          },
        ],
      },
      {
        path: 'account',
        element: <Account />,
      },
      { path: 'account/setting', element: <AccountSetting /> },
      {
        path: 'minting',
      },
    ],
  },
]);

export default router;
