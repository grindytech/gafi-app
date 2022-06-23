import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { SubstrateContextProvider } from './contexts/substrateContext';

import DashboardLayout from 'layouts/DashboardLayout';
import routes, { IRoute } from 'routes/routes';

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
  return (
    <SubstrateContextProvider>
      <DashboardLayout>
        <PageContent />
      </DashboardLayout>
    </SubstrateContextProvider>
  );
}
