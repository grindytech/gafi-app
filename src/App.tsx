import DefaultRoot from 'layouts/default/DefaultRoot';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes, { IRouteProps } from 'routes/routes';

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
    <BrowserRouter>
      <DefaultRoot>
        <Switch>{React.Children.toArray(getRoutes(routes))}</Switch>
      </DefaultRoot>
    </BrowserRouter>
  );
}
