import { Box, Heading, Icon, Image, Text } from '@chakra-ui/react';
// import { NavLink } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';

import Card from 'components/card/Card';
import routes from 'routes';

const SideBar = () => {
  const location = useLocation();
  const activeRoute = (routeName: string) =>
    location.pathname === routeName ? 'active' : '';
  return (
    <Card sx={sidebarStyled}>
      <Box sx={sidebarHead}>
        <Image src="/assets/layout/logo.svg" alt="Gafi logo" />
        <Heading ml={4}>GAFI</Heading>
      </Box>
      <Box sx={menuStyled}>
        {routes.map(route => (
          <NavLink to={route.layout + route.path}>
            <Box
              sx={
                activeRoute(route.layout + route.path) === 'active'
                  ? { ...activeMenuItem, ...menuItem }
                  : menuItem
              }
            >
              <Icon w={18} h={18}>
                <path fill="currentColor" d={route.icon} />
              </Icon>
              <Text fontWeight="semibold" fontSize="md" ml={7}>
                {route.name}
              </Text>
            </Box>
          </NavLink>
        ))}
      </Box>
      <Box sx={{ flex: 1, background: 'red' }} />
      <Text opacity="inherit" fontSize="sm">
        &copy; copyright by cryptoviet
      </Text>
    </Card>
  );
};

export default SideBar;

const sidebarStyled = {
  height: '80vh',
  flex: 2,
  alignItems: 'center',
  py: 10,
};

const sidebarHead = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  mb: 20,
  pl: 8,
};

const menuItem = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: 48,
  alignItems: 'center',
  px: 8,
  py: 6,
};
const activeMenuItem = {
  background: 'greyBg',
  color: 'primary',
  fontWeight: 'semibold',
};

const menuStyled = {
  width: '100%',
};
