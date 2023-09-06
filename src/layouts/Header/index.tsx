import { Center, Heading, Icon, List, ListItem, Text } from '@chakra-ui/react';

import GearIcon from 'public/assets/logo/gear.svg';

import { Link, useLocation } from 'react-router-dom';

import ConnectWallet from 'components/ConnectWallet';

const ListHeader = [
  {
    title: 'Creator',
    link: '/creator',
  },
  {
    title: 'Blockchain',
    link: 'https://gafi.network/',
    target: '_blank',
    isDisabled: true,
  },
  {
    title: 'Market Place',
    link: 'https://gafi.network/2',
    target: '_blank',
    isDisabled: true,
  },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Center
      as="header"
      position="sticky"
      justifyContent="space-between"
      zIndex="dropdown"
      top={0}
      padding={5}
      _before={{
        content: `''`,
        bg: 'shader.a.900',
        position: 'absolute',
        inset: '50% auto auto 50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100%',
      }}
    >
      <Center position="relative" as="nav" gap={8}>
        <Heading as="h1" fontWeight="bold" fontSize="md" color="primary.a.300">
          <Center as={Link} to="/">
            <Icon
              as={GearIcon}
              width={8}
              height={8}
              mr={2}
              sx={{
                g: {
                  path: {
                    _first: { color: 'shader.a.900' },
                    _last: { fill: 'url(#paint0_linear_1734_14538)' },
                  },
                },
              }}
            />
            GAFI&nbsp;
            <Text as="span" color="#FAFAFA">
              CREATOR
            </Text>
          </Center>
        </Heading>

        <List display={{ base: 'none', md: 'flex' }} gap={8}>
          {ListHeader.map(header => {
            const isActive = pathname.includes(header.link);

            return (
              <ListItem
                key={header.link}
                color={isActive ? 'primary.a.300' : '#FAFAFA'}
                fontSize="md"
                fontWeight="medium"
                opacity={header.isDisabled ? 0.4 : undefined}
                pointerEvents={header.isDisabled ? 'none' : undefined}
              >
                {header.target ? (
                  <a href={header.link} target={header.target}>
                    {header.title}
                  </a>
                ) : (
                  <Link to={header.link}>{header.title}</Link>
                )}
              </ListItem>
            );
          })}
        </List>
      </Center>

      <List>
        <ListItem>
          <ConnectWallet />
        </ListItem>
      </List>
    </Center>
  );
}
