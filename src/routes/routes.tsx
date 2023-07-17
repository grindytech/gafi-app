import Mint from 'pages/Mint';
import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';
import Web3 from 'pages/Web3';
import MarketPlace from 'pages/MarketPlace';
import Home from 'layouts/Home';
import { ListWeb3Item } from 'layouts/DefaultLayout/DefaultWeb3';
import Blockchain, { ListBlockchain } from 'pages/Blockchain';
import Explorer, { ListExplorerTab } from 'pages/MarketPlace/Explorer';
import HomeMarketPlace from 'pages/MarketPlace/Home';
import MintingPoolMarket from 'pages/MarketPlace/MintingPools';
import GameDetail from 'pages/MarketPlace/Explorer/Games/GameDetail';
import CollectionDetail from 'pages/MarketPlace/Explorer/Collections/CollectionDetail';
import NFTDetail from 'pages/MarketPlace/Explorer/NFTs/NFTDetail';

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
            path: 'minting',
            element: <MintingPoolMarket />,
          },
        ],
      },
      {
        path: 'game/:id',
        element: <GameDetail />,
      },
      {
        path: 'nft/:id',
        element: <NFTDetail />,
      },
      {
        path: 'collection/:id',
        element: <CollectionDetail />,
      },
      {
        path: 'minting',
      },
    ],
  },
]);

export default router;
