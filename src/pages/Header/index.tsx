import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';

import BellIcon from 'public/assets/line/bell.svg';
import GafiAppIcon from 'public/assets/logo/gafi-app.svg';

import { Link, useLocation } from 'react-router-dom';
import PickaxeIcon from 'public/assets/line/pickaxe.svg';
import { useWallet } from 'use-wallet';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import { shorten } from 'utils/utils';
import ConnectWallet from 'components/ConnectWallet';

const ListHeader = [
  {
    title: 'Web3 Games',
    link: '/web3',
  },
  {
    title: 'Mint',
    link: '/mint',
    icon: PickaxeIcon,
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
  const { connect, account, reset } = useWallet();

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
                      display="flex"
                      as={Link}
                      alignItems="center"
                      gap={1}
                      to={header.link}
                      color={isActive ? 'primary.a.500' : 'shader.a.900'}
                      fontSize="md"
                      fontWeight={isActive ? 'bold' : 'medium'}
                      textDecoration="none"
                    >
                      {header.icon && (
                        <Icon as={header.icon as any} width={4} height={4} />
                      )}

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
            {account ? (
              <Tooltip label="click to disconnect">
                <Center gap={2} cursor="pointer" onClick={reset}>
                  <AccountJazzicon address={account} />

                  <Text color="shader.a.600">{shorten(account, 6)}</Text>
                </Center>
              </Tooltip>
            ) : (
              <ConnectWallet />
            )}
          </ListItem>
        </List>
      </Center>
    </Box>
  );
}
