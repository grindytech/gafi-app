import { Box } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from 'routes';

const PageContent: React.FC = () => {
  const getRoutes = (routes: any) =>
    routes.map((prop: any) => {
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
};

export default PageContent;
