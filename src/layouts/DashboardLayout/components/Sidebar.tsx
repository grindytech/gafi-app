import {
  Box,
  BoxProps,
  CloseButton,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
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
  const { t } = useTranslation();
  const activeRoute = (routeName: string) =>
    location.pathname === routeName ? 'active' : '';
  return (
    <Card sx={sidebarStyled} display={display}>
      <HStack w="full" mb={20} justifyContent="space-between">
        <Box sx={sidebarHead}>
          <Image src="/assets/layout/logo.svg" alt="Gafi logo" />
          <Heading ml={4}>GAFI</Heading>
        </Box>
        <CloseButton display={{ base: 'flex', pc: 'none' }} onClick={onClose} />
      </HStack>

      <Box w="full">
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
                <Text fontWeight="semibold" fontSize="md" ml={7}>
                  {t(route.name)}
                </Text>
              </Box>
            </NavLink>
          ))
        )}
      </Box>
      <Text sx={cpyRight} opacity="inherit" fontSize="sm">
        &copy; copyright by cryptoviet
      </Text>
    </Card>
  );
};

export default SideBar;

const sidebarStyled = {
  w: { base: 'full', pc: 72, '2xl': '20vw' },
  h: { base: 'full', pc: '80vh' },
  borderRadius: { base: 'none', pc: '2xl' },
  alignItems: 'center',
  justifyContent: 'space-between',
  py: 10,
};

const sidebarHead = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
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

const cpyRight = {
  flex: 1,
  display: 'flex',
  alignItems: 'flex-end',
};
