import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { mdiChevronLeft } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import Card from 'components/card/Card';
import routes from 'routes/routes';

interface IProps extends BoxProps {
  onClose?: () => void;
}

const SideBar = ({ onClose, display }: IProps) => {
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();
  const activeRoute = (routeName: string) =>
    location.pathname === routeName ? 'active' : '';
  return (
    <Card sx={sidebarStyled} display={display}>
      <HStack
        w="full"
        mb={{ base: 5, lg: 10 }}
        borderBottom={{
          base: `1px solid ${theme.colors.borderBottom}`,
          lg: 'none',
        }}
        justifyContent="space-between"
        pb={{ base: 6, lg: 0 }}
        px={{ base: 6, lg: 0 }}
      >
        <Box sx={sidebarHead}>
          <Image src="/assets/layout/logo.svg" alt="Gafi logo" />
        </Box>
        <Box
          display={{ base: 'flex', lg: 'none' }}
          onClick={onClose}
          w={10}
          h={10}
          cursor="pointer"
        >
          <Icon color="primary" w={10} h={10}>
            <path fill="currentColor" d={mdiChevronLeft} />
          </Icon>
        </Box>
      </HStack>

      <Box px={{ base: 6, lg: 0 }} w="full">
        {React.Children.toArray(
          routes.map(route => (
            <NavLink onClick={onClose} to={route.layout + route.path}>
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
                <Text
                  sx={
                    activeRoute(route.layout + route.path) === 'active'
                      ? activeMenuItemTitle
                      : menuItemTitle
                  }
                >
                  {t(route.name)}
                </Text>
              </Box>
            </NavLink>
          ))
        )}
      </Box>
      <Text sx={cpyRight} opacity="inherit" fontSize="sm">
        &copy; copyright by Grindy Techonologies
      </Text>
    </Card>
  );
};

export default SideBar;

const sidebarStyled = {
  w: { base: 'full', lg: 64, '2xl': '20vw' },
  h: { sm: 'full', lg: '100vh' },
  // borderRadius: { base: '0px 24px 0px 0px', lg: '2xl' },
  alignItems: 'center',
  justifyContent: 'space-between',
  py: { base: 0 },
  px: { base: 0, lg: 6 },
  borderRadius: 0,
};

const sidebarHead = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const menuItem = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: 10,
  alignItems: 'center',
  px: { base: 4, '2xl': 8 },
  py: 18,
};

const activeMenuItem = {
  background: 'greyBg',
  color: 'primary',
  fontWeight: 'semibold',
};

const cpyRight = {
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
};

const menuItemTitle = {
  fontWeight: 'normal',
  fontSize: 'md',
  ml: { base: 2, lg: 3 },
  color: 'greyText',
};

const activeMenuItemTitle = {
  fontWeight: 'bold',
  ml: { base: 2, lg: 3 },
  fontSize: 'md',
  color: 'primary',
};
