import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import AvatarPopover from 'components/Avatar/AvatarPopover';

export interface Web3GamesDataProps {
  owner: string;
  game_id: number;
  collections: number[];
}

export interface Web3GamesProps {
  data: Web3GamesDataProps[];
}

export default function Web3Games({ data }: Web3GamesProps) {
  const address = '5DhYYp1Q2sNXR7HfzbQFUt3XHfK4CKYRA4vaaKRiWpSLkp62';

  return (
    <Grid
      gridTemplateColumns={{
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
      }}
      gap={5}
      fontWeight="medium"
    >
      {data.map(game => (
        <Box
          key={game.game_id}
          border="0.0625rem solid"
          borderColor="shader.a.300"
          borderRadius="xl"
        >
          <Center
            bg="shader.a.300"
            position="relative"
            width="full"
            pt={(9 / 16) * 100 + '%'} // 16:9 Aspect Ratio
            overflow="hidden"
            sx={{
              img: {
                position: 'absolute',
                inset: 0,
                width: 'full',
                height: 'full',
              },
            }}
          >
            <Image src="/assets/fill/item.png" objectFit="none" />
          </Center>

          <Stack bg="white" spacing={3} padding={4} flex={1}>
            <Flex>
              <AvatarPopover type="Owner" address={address} name="-">
                <AccountJazzicon
                  address={address}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AvatarPopover>

              <AvatarPopover type="Admin" address={address} name="-">
                <AccountJazzicon
                  address={address}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AvatarPopover>
            </Flex>

            <Center justifyContent="space-between">
              <Heading fontSize="md" fontWeight="medium" color="shader.a.900">
                {/* title */} -
              </Heading>

              <Text fontSize="sm" fontWeight="medium" color="shader.a.500">
                ID:&nbsp;
                <Text as="span" color="primary.a.500">
                  {game.game_id}
                </Text>
              </Text>
            </Center>

            <Center justifyContent="space-between">
              <Heading fontSize="md" fontWeight="medium" color="primary.a.500">
                {game.collections.length} collections
              </Heading>

              <Text fontSize="xs" color="shader.a.500">
                Open 0 hours
              </Text>
            </Center>
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}
