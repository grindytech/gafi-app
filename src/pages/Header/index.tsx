import {
  Box,
  Center,
  IconButton,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import BellIcon from 'public/assets/line/bell.svg';
import GafiAppIcon from 'public/assets/logo/gafi-app.svg';
import UserProfileIcon from 'public/assets/header/user-profile.svg';
import { Link, useLocation } from 'react-router-dom';

const ListHeader = [
  {
    title: 'Web3 Games',
    link: '/web3',
  },
  {
    title: 'Blockchain',
    link: '/blockchain',
  },
  {
    title: 'Market place',
    link: '/marketplace',
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

          <List display="flex" gap={8} padding={0}>
            {React.Children.toArray(
              ListHeader.map(header => {
                const isActive = pathname.includes(header.link);

                return (
                  <ListItem>
                    <Text
                      as={Link}
                      to={header.link}
                      color={isActive ? 'primary.a.500' : 'shader.a.900'}
                      fontSize="md"
                      fontWeight={isActive ? 'bold' : 'medium'}
                      textDecoration="none"
                    >
                      {header.title}
                    </Text>
                  </ListItem>
                );
              })
            )}
          </List>
        </Center>

        <List display="flex" alignItems="center" gap={6}>
          <ListItem>
            <BellIcon />
          </ListItem>

          <ListItem>
            <UserProfileIcon />
          </ListItem>
        </List>
      </Center>
    </Box>
  );
}
