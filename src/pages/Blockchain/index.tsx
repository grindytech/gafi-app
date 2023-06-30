import { Center, Grid, Icon, Text } from '@chakra-ui/react';
import GameIcon from 'public/assets/fill/game.svg';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import LineAddIcon from 'public/assets/line/add.svg';
import Pools from 'layouts/Blockchain/Pools';
import GameCreator from 'layouts/Blockchain/GameCreator';
import DeployContract from 'layouts/Blockchain/DeployContract';
import { useEffect } from 'react';

export const ListBlockchain = [
  {
    text: 'Pools',
    link: 'pools',
    element: <Pools />,
  },
  {
    text: 'Game Creator',
    link: 'games',
    element: <GameCreator />,
  },
  {
    text: 'Deploy Contract',
    link: 'contract',
    element: <DeployContract />,
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
      <Grid gridTemplateColumns="repeat(4, 1fr)" gap={4} mb={10}>
        {ListBlockchain.map(blockchain => {
          const isActive = pathname.includes(blockchain.link);

          return (
            <Center
              as={Link}
              to={blockchain.link}
              key={blockchain.text}
              padding={3}
              color={isActive ? 'white' : 'shader.a.900'}
              bg={isActive ? 'primary.a.500' : 'transparent'}
              border="0.0625rem solid"
              borderColor={isActive ? 'transparent' : 'shader.a.400'}
              borderRadius="xl"
              justifyContent="space-between"
            >
              <Center gap={4}>
                <Icon as={GameIcon} width={6} height={6} />

                <Text fontWeight="medium">{blockchain.text}</Text>
              </Center>
              <LineAddIcon />
            </Center>
          );
        })}
      </Grid>

      <Outlet />
    </>
  );
}
