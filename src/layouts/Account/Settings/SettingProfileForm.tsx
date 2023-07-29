import {
  Box,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  Icon,
  HStack,
  Button,
} from '@chakra-ui/react';

import CompassIcon from 'public/assets/line/compass.svg';
import SettingProfileImage from './SettingProfileImage';
const SettingProfileForm = () => {
  return (
    <>
      <Box width="full">
        <Box position="relative" minH="12.5rem">
          <SettingProfileImage />
        </Box>
        <Flex pt={10} flexDirection="column" gap={6}>
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
              <Text color="shader.a.500">
                Connection to verify your account
              </Text>
              <Text color="primary.a.500">more infos</Text>
            </HStack>
          </Box>
          <FormControl gap={2}>
            <FormLabel fontWeight="medium">Website</FormLabel>
            <Input
              placeholder="Https://youwbsite.com"
              variant="settingProfile"
            />
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
    </>
  );
};

export default SettingProfileForm;
