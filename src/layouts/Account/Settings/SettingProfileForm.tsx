import {
  Box,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  Center,
  Icon,
  HStack,
  Button,
} from '@chakra-ui/react';
import CameraIcon from 'public/assets/fill/camera.svg';
import CompassIcon from 'public/assets/line/compass.svg';
const SettingProfileForm = () => {
  return (
    <>
      <Box width="full">
        <Box position="relative" minH="12.5rem">
          <Box
            height="full"
            width="full"
            bg="shader.a.300"
            position="absolute"
            transition="all linear 0.25s"
            borderRadius="xl"
            _hover={{
              background: 'shader.a.400',
              svg: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            }}
            top={0}
          >
            <Center height="full">
              <Icon
                transition="all linear 0.25s"
                opacity={0}
                transform="translateY(10%)"
                as={CameraIcon}
                height={10}
                width={10}
                color="white"
                cursor="pointer"
              />
            </Center>
          </Box>
          <Box
            bottom={'-15%'}
            position="absolute"
            borderRadius="full"
            border="0.5rem solid"
            borderColor="white"
            bg="shader.a.300"
            left="1.5rem"
            height={40}
            width={40}
            transition="all linear 0.25s"
            _hover={{
              background: 'shader.a.400',
              svg: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            }}
          >
            <Center height="full">
              <Icon
                transition="all linear 0.25s"
                opacity={0}
                as={CameraIcon}
                transform="translateY(10%)"
                height={10}
                width={10}
                color="white"
                cursor="pointer"
              />
            </Center>
          </Box>
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
