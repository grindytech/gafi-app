import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { Dimmer, Grid, Loader, Message } from 'semantic-ui-react';

import AccountInfo from './components/AccountInfo';
import Panel from './components/Panel';
import SideBar from './components/Sidebar';

import { useSubstrateState } from 'substrate-lib';

const DashboardLayout: React.FC = ({ children }) => {
  const { apiState, apiError, keyringState } = useSubstrateState();
  if (apiState === 'ERROR') return message(apiError);
  if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }
  return (
    <Box sx={dashBoardStyled}>
      <SideBar />
      <VStack
        flex={10}
        sx={{
          background: 'greyBg',
          display: 'flex',
        }}
      >
        <Panel />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flex: 8,
              px: 4,
            }}
          >
            {children}
          </Box>
          <AccountInfo />
        </Box>
      </VStack>
    </Box>
  );
};
export default DashboardLayout;

const dashBoardStyled = {
  p: 4,
  display: 'flex',
  background: 'greyBg',
  minHeight: '100vh',
};

const message = (errObj: any) => (
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
);

const loader = (text: string) => (
  <Dimmer active>
    <Loader size="small">{text}</Loader>
  </Dimmer>
);
