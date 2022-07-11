import { Box } from '@chakra-ui/react';
import React, { ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga';
import { Redirect, Route, Switch } from 'react-router-dom';

import { SubstrateContextProvider } from './contexts/substrateContext';

import config from 'config';
import DashboardLayout from 'layouts/DashboardLayout';
import routes, { IRoute } from 'routes/routes';

ReactGA.initialize(config.TRACKING_ID);

function PageContent() {
  const getRoutes = (routeList: IRoute[]): ReactNode[] =>
    routeList.map((prop: IRoute) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === 'account') {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <Route path={prop.layout + prop.path} component={prop.component} />
        );
      }
      return null;
    });
  return (
    <Box>
      <Switch>
        {React.Children.toArray(getRoutes(routes))}
        <Redirect from="/admin" to="/admin/dashboard" />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Box>
  );
}

export default function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <SubstrateContextProvider>
      <DashboardLayout>
        <PageContent />
      </DashboardLayout>
    </SubstrateContextProvider>
  );
}
