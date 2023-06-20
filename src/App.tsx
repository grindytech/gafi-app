import ConnectWalletProvider from 'components/ConnectWallet/ConnectWalletProvider';
import { SubstrateContextProvider } from 'contexts/substrateContext';
import DefaultRoot from 'layouts/default/DefaultRoot';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes, { IRouteProps } from 'routes/routes';
import { QueryParamProvider } from 'use-query-params';

const getRoutes = (item: IRouteProps[]) => {
  return item.map(props => (
    <Route
      exact
      key={props.path}
      path={props.path}
      component={props.component}
    />
  ));
};

export default function App() {
  return (
    <SubstrateContextProvider>
      <ConnectWalletProvider>
        <BrowserRouter>
          <DefaultRoot>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Switch>{React.Children.toArray(getRoutes(routes))}</Switch>
            </QueryParamProvider>
          </DefaultRoot>
        </BrowserRouter>
      </ConnectWalletProvider>
    </SubstrateContextProvider>
  );
}
