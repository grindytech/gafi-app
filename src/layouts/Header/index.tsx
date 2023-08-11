import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  List,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';

import GafiAppIcon from 'public/assets/logo/gafi-app.svg';

import { Link, useLocation } from 'react-router-dom';

import ConnectWallet from 'components/ConnectWallet';
import Notification from 'components/Notification';

const ListHeader = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Explorer',
    link: '/explorer',
  },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      py={4}
      mb={6}
      height="4.5rem"
      bg="white"
      zIndex="dropdown"
      _before={{
        content: `''`,
        position: 'fixed',
        bg: 'inherit',
        width: 'full',
        height: 'inherit',
        inset: '0 0 auto 0',
        pointerEvents: 'none',
        zIndex: 'inherit',
        borderBottom: '0.0625rem solid',
        borderColor: 'shader.a.200',
      }}
    >
      <Center
        as="nav"
        justifyContent="space-between"
        height="full"
        position="relative"
        zIndex="inherit"
      >
        <Center>
          <IconButton
            variant="unstyled"
            height="auto"
            as={Link}
            to="/"
            mr={16}
            aria-label="gafi-app-logo"
            icon={<GafiAppIcon />}
          />

          <List
            display={{
              base: 'none',
              md: 'flex',
            }}
            gap={8}
            padding={0}
          >
            {React.Children.toArray(
              ListHeader.map(header => {
                const isActive = pathname.includes(header.link);

                return (
                  <Button
                    as={Link}
                    to={header.link}
                    display="flex"
                    color={isActive ? 'primary.a.500' : 'shader.a.900'}
                    fontSize="md"
                    fontWeight={isActive ? 'bold' : 'medium'}
                    gap={1}
                    variant="unstyled"
                    height="auto"
                    minWidth="auto"
                    sx={{
                      svg: {
                        path: {
                          fill: isActive
                            ? 'currentColor'
                            : 'url(#PickAxeDefaultColor)',
                        },
                      },
                    }}
                  >
                    {header.icon && (
                      <Icon as={header.icon} width={4} height={4} />
                    )}

                    {header.title}
                  </Button>
                );
              })
            )}
          </List>
        </Center>

        <List display="flex" alignItems="center" gap={6}>
          <ListItem>
            <Notification />
          </ListItem>

          <ListItem>
            <ConnectWallet />
          </ListItem>
        </List>
      </Center>
    </Box>
  );
}
