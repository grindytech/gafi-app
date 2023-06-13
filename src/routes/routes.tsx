import Web3 from 'layouts/web3/Web3';

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
] as IRouteProps[];
export default routes;
