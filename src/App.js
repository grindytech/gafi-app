import React, { createRef, useRef, useState } from 'react'
import {
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import {Container, Stack, Portal, useDisclosure} from '@chakra-ui/react'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'
import 'semantic-ui-css/semantic.min.css'

import AccountSelector from './AccountSelector'
// import Balances from './Balances'
// import Interactor from './Interactor'
import TemplateModule from './TemplateModule'
// import Transfer from './Transfer'
// import Upgrade from './Upgrade'
import MappingAccount from './components/MappingAccount'
import UpfrontPool from './components/UpfrontPool'
import StakingPool from './components/StakingPool'
import DeployContract from './components/DeployContract'
import SideBar from './components/sideBar/SideBar'
import routes from "./routes";
import AdminNavbar from './components/navbars/AdminNavbar'
import MainPanel from './components/layout/MainPanel'
import PanelContainer from './components/layout/PanelContainer'
import PanelContent from './components/layout/PanelContent'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Main() {
  const { t } = useTranslation();
  const { apiState, apiError, keyringState } = useSubstrateState()
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const mainPanel = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fixed, setFixed] = useState(false);

  // functions for changing the states from components
  const getRoute = () => window.location.pathname !== "/admin/full-screen-maps";
  // TODO: Define type for route
  const getActiveRoute = (routes) => {
    const activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        const categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

   // TODO: Define type for route
   const getActiveNavbar = (routes )  => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        if (routes[i].secondaryNavbar) {
          return routes[i].secondaryNavbar;
        }
      }
    }
    return activeNavbar;
   };
  
  // TODO: Define type for route
  const getRoutes = (routes) =>
    routes.map((prop) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
          />
        );
      }
      return null;
    });

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }
  const contextRef = createRef()

  return (
    <>
       <SideBar
        routes={routes}
        logoText={t("GAFI_DASHBOARD")}
        display="none"
        sidebarVariant={sidebarVariant}
        // {...rest}
      />
      {/* <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky> */}
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={t("GAFI_DASHBOARD")}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            // {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {React.Children.toArray(getRoutes(routes))}
                <Redirect from="/admin" to="/admin/dashboard" />
                <Redirect from="/" to="/admin/dashboard" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        {/* <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal> */}
        {/* <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          // TODO: Define type for value
          onSwitch={(value: any) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        /> */}
      </MainPanel>
      {/* <Container maxW='container.xl' pb={5}>
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
            <Upgrade />
          </Grid.Row>
          <Grid.Row>
            <TemplateModule />
          </Grid.Row>
        </Grid>
        <Stack direction="column" width="full" gap={4}>
          <MappingAccount /> 
          <UpfrontPool />
          <StakingPool />
          <DeployContract/>
        </Stack>
          <Grid.Row>
            <Interactor />
           
          </Grid.Row>
      </Container> */}
      <DeveloperConsole />
    </>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
