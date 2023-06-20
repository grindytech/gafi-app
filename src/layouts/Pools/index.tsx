import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import GameID from 'components/Game/GameID';
import GameOwner from 'components/Game/GameOwner';
import GoBack from 'components/GoBack';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useForceMount from 'hooks/useForceMount';
import CreateItem from 'layouts/Items/components/CreateItem';
import NewGamesAuthorize from 'layouts/NewGames/components/NewGamesAuthorize';
import React from 'react';
import { useForm } from 'react-hook-form';
import PoolsCreateDynamic from './PoolsCreateDynamic';

export default function Pools() {
  return (
    <Box
      px={{
        lg: 48,
      }}
    >
      <GoBack />

      <Tabs variant="unstyled">
        <TabList
          gap={4}
          mt={8}
          mb={4}
          sx={{
            button: {
              fontSize: 'sm',
              fontWeight: 'medium',
              color: 'shader.a.900',
              borderRadius: 'lg',
              border: '0.0625rem solid',
              borderColor: 'shader.a.400',

              _selected: {
                color: 'white',
                borderColor: 'transparent',
                bg: 'primary.a.500',
                fontWeight: 'semibold',
              },
            },
          }}
        >
          <Tab>Create Dynamic Pool</Tab>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              padding: 0,
            },
          }}
        >
          <TabPanel>
            <PoolsCreateDynamic />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
