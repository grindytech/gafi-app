import { createBrowserRouter } from 'react-router-dom';
import DefaultRoot from 'layouts/DefaultLayout/DefaultRoot';

import Home from 'pages/Home';

import Creator from 'pages/Creator';
import { ListCreatorItem } from 'layouts/DefaultLayout/DefaultCreator';

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
        path: 'creator',
        element: <Creator />,
        children: ListCreatorItem.map(({ link, element }) => ({
          path: link,
          element,
        })),
      },
    ],
  },
]);

export default router;
