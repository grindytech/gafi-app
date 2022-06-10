import { Box } from '@chakra-ui/react';
import React from 'react';

import AccountInfo from './components/AccountInfo';
import Panel from './components/Panel';
import SideBar from './components/Sidebar';

const DashboardLayout: React.FC = ({ children }) => (
  <Box sx={dashBoardStyled}>
    <SideBar />
    <Box
      flex={10}
      sx={{
        background: 'greyBg',
        display: 'flex',
        flexDirection: 'column',
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
    </Box>
  </Box>
);
export default DashboardLayout;

const dashBoardStyled = {
  p: 4,
  display: 'flex',
  background: 'greyBg',
  minHeight: '100vh',
};
