import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';

import CameraIcon from 'public/assets/fill/camera.svg';
import CompassIcon from 'public/assets/line/compass.svg';

import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import RatioPicture from 'components/RatioPicture';
import { useParams } from 'react-router-dom';

export default function AccountSettingProfile() {
  const { address } = useParams();

  return (
    <Box width="full">
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

          <RatioPicture src={null} sx={{ height: 52 }} />
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
      </Box>

      <Flex pt={12} flexDirection="column" gap={6}>
        <FormControl gap={2}>
          <FormLabel fontWeight="medium">Display name</FormLabel>
          <Input placeholder="Alex Pham" variant="settingProfile" />
        </FormControl>

        <FormControl gap={2}>
          <FormLabel fontWeight="medium">Description/Bio</FormLabel>
          <Input variant="settingProfile" />
        </FormControl>

        <Box>
          <HStack>
            <Icon
              as={CompassIcon}
              height={6}
              width={6}
              sx={{
                path: {
                  stroke: 'url(#CompassLinear04)',
                },
              }}
            />
            <Text fontSize="lg" fontWeight="medium">
              Social Connections
            </Text>
          </HStack>

          <HStack fontSize="sm">
            <Text color="shader.a.500">Connection to verify your account</Text>
            <Text color="primary.a.500">more infos</Text>
          </HStack>
        </Box>

        <FormControl gap={2}>
          <FormLabel fontWeight="medium">Website</FormLabel>
          <Input placeholder="Https://youwbsite.com" variant="settingProfile" />
        </FormControl>

        <FormControl gap={2}>
          <FormLabel fontWeight="medium">Twitter</FormLabel>
          <Input
            placeholder="https://twitter.com/your_twitter"
            variant="settingProfile"
          />
        </FormControl>

        <FormControl gap={2}>
          <FormLabel fontWeight="medium">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            variant="settingProfile"
          />
        </FormControl>

        <Button
          variant="primary"
          borderRadius="1.5rem"
          width="fit-content"
          px={6}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
}
