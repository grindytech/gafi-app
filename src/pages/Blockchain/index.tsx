import { Center, Flex, IconButton, Text } from '@chakra-ui/react';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import DeployContract from 'pages/Blockchain/DeployContract';
import { useEffect } from 'react';

import PoolsIcon from 'public/assets/line/pools.svg';
import CreatorIcon from 'public/assets/fill/creator.svg';
import RocketIcon from 'public/assets/fill/rocket.svg';
import Pools from './Pools';
import GameCreator from './GameCreator';

export const ListBlockchain = [
  {
    title: 'Gafi Pools',
    icon: <PoolsIcon />,
    element: <Pools />,
    link: 'pools',
    background: 'gradient.linear.9',
  },
  {
    title: 'Game Creator',
    icon: <CreatorIcon />,
    element: <GameCreator />,
    link: 'games',
    background: 'linear-gradient(135deg, #26E8C1 0%, #049A95 100%)',
  },
  {
    title: 'Deploy Contract',
    icon: <RocketIcon />,
    element: <DeployContract />,
    link: 'contract',
    background: 'gradient.linear.8',
  },
];

export default function Blockchain() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/blockchain') {
      navigate('/blockchain/pools');
    }
  }, [pathname]);

  return (
    <>
      <Flex
        gap={4}
        mb={4}
        pb={6}
        borderBottom="0.0625rem solid"
        borderColor="shader.a.300"
        flexWrap="wrap"
      >
        {ListBlockchain.map(blockchain => {
          const isActive = pathname.includes(blockchain.link);

          return (
            <Center
              as={Link}
              key={blockchain.title}
              to={blockchain.link}
              whiteSpace="pre"
              justifyContent="flex-start"
              textAlign="center"
              py={2}
              px={4}
              gap={3}
              color="shader.a.900"
              fontWeight="medium"
              border={`${isActive ? '0.09375rem' : '0.0625rem'} solid`}
              borderColor={isActive ? 'primary.a.500' : 'shader.a.400'}
              borderRadius="xl"
              flex={{
                base: 1,
                lg: 'unset',
              }}
              flexDirection={{
                base: 'column',
                md: 'row',
              }}
            >
              <IconButton
                variant="unstyled"
                minWidth="auto"
                height="auto"
                aria-label={`icon-${blockchain.title}`}
                borderRadius="lg"
                padding={1.5}
                color="white"
                background={blockchain.background}
                icon={blockchain.icon}
              />

              <Text fontWeight="medium">{blockchain.title}</Text>
            </Center>
          );
        })}
      </Flex>

      <Outlet />
    </>
  );
}
