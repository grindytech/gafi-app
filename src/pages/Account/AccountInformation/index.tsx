import DotIcon from 'public/assets/line/menu.svg';
import ShareIcon from 'public/assets/line/share.svg';

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useAppSelector } from 'hooks/useRedux';

import CameraIcon from 'public/assets/fill/camera.svg';
import TwitterIcon from 'public/assets/fill/twitter-fill.svg';
import InternetIcon from 'public/assets/line/internet.svg';

import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import RatioPicture from 'components/RatioPicture';
import { Link, useParams } from 'react-router-dom';
import { shorten } from 'utils/utils';

export default function AccountInformation() {
  const { address } = useParams();
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <>
      <Box position="relative">
        <Box role="group">
          <IconButton
            zIndex="docked"
            aria-label="background-camera"
            variant="unstyled"
            display="flex"
            width="full"
            height="full"
            bg="shader.a.900"
            color="white"
            opacity={0}
            position="absolute"
            icon={<Icon as={CameraIcon} height={10} width={10} />}
            _groupHover={{ opacity: 0.5 }}
            onClick={() => console.log('edit background')}
          />

          <RatioPicture src={null} sx={{ pt: 'unset', height: 52 }} />
        </Box>

        <Box
          width={32}
          height={32}
          bottom={0}
          position="absolute"
          zIndex="docked"
          transform="translate(25%, 25%)"
          role="group"
          borderRadius="full"
          boxShadow="0 0 0 0.5rem white"
          sx={{
            figure: {
              display: 'block',
            },
          }}
        >
          <AccountJazzicon
            address={address as string}
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              borderRadius: '100%',
            }}
          />

          <IconButton
            aria-label="avatar-camera"
            variant="unstyled"
            display="flex"
            width="inherit"
            height="inherit"
            borderRadius="inherit"
            bg="shader.a.900"
            color="white"
            opacity={0}
            icon={<Icon as={CameraIcon} height={10} width={10} />}
            _groupHover={{ opacity: 0.5 }}
            onClick={() => console.log('edit avatar')}
          />
        </Box>

        <HStack
          zIndex="docked"
          position="absolute"
          padding={6}
          inset="auto 0 0 auto"
          sx={{ button: { bg: 'white' } }}
        >
          <IconButton
            icon={<Icon as={InternetIcon} height={6} w={6} />}
            aria-label="Website Icon"
          />
          <IconButton
            icon={<Icon as={TwitterIcon} height={6} w={6} />}
            aria-label="Twitter Icon"
          />
        </HStack>
      </Box>

      <Center justifyContent="space-between" padding={6} pt={12}>
        <Stack spacing={2}>
          <Text fontWeight="semibold" fontSize="xl">
            {account?.address === address ? account?.name : 'Unknown'}
          </Text>

          <HStack spacing={1}>
            <Text color="shader.a.900">{shorten(String(address), 12)}</Text>

            <ButtonCopy value={String(address)} />
          </HStack>
        </Stack>

        <Flex gap={2}>
          {account?.address === address && (
            <Link to={`/account/${address}/setting`}>
              <Button variant="baseStyle">Edit Profile</Button>
            </Link>
          )}

          <IconButton
            variant="baseStyle"
            icon={<Icon as={ShareIcon} color="shader.a.900" height={6} w={6} />}
            aria-label="Share Icon"
          />

          <IconButton
            variant="baseStyle"
            icon={<Icon as={DotIcon} color="shader.a.900" height={6} w={6} />}
            aria-label="Menu Icon"
          />
        </Flex>
      </Center>
    </>
  );
}
