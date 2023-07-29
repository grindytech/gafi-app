import { Box, Center, Icon, Image } from '@chakra-ui/react';
import CameraIcon from 'public/assets/fill/camera.svg';
const SettingProfileImage = () => {
  return (
    <>
      <Box
        height="full"
        width="full"
        bg="shader.a.300"
        role="group"
        position="absolute"
        top={0}
      >
        <Center
          width="full"
          height="full"
          background="shader.a.900"
          opacity={0}
          transition="opacity 0.3s ease-in-out"
          _groupHover={{
            opacity: 0.5,
          }}
          position="absolute"
          zIndex={3}
        >
          <Icon
            as={CameraIcon}
            height={10}
            width={10}
            color="white"
            cursor="pointer"
          />
        </Center>
        <Box position="absolute" height="full" width="full">
          <Image
            src="https://i.seadn.io/gae/U584T8SUu66g60cVtv3z7k-q7UJNKoIRjZISmxo6AewpGl3pNN9uk3ZB804qoNPhvqVVYR5ecA5AiUJ2RYvMYyg6GWWg-jtNSsa1eg?auto=format&dpr=1&w=1920"
            height="full"
            width="full"
            objectFit="cover"
          />
        </Box>
        <Box
          background="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
          bottom={0}
          position="absolute"
          height="6.25rem"
          width="full"
        />
      </Box>
      <Box
        zIndex={4}
        bottom={'-15%'}
        position="absolute"
        borderRadius="full"
        border="0.5rem solid"
        borderColor="white"
        bg="shader.a.300"
        left="1.5rem"
        overflow="hidden"
        height={40}
        width={40}
        role="group"
      >
        <Box position="absolute" height="full" width="full">
          <Image
            src="https://i.seadn.io/gae/VMG3VFncJG-pyqsRAwQznZGqYDw4RkPjJnJNJwrDERFhD4pWLh82q66JJ8Qh0vCPoovjoyigJwLqfFpa5tMAVV5ASIiR5nF1XkQFpec?auto=format&dpr=1&w=1920"
            height="full"
            width="full"
            objectFit="cover"
          />
        </Box>

        <Center
          width="full"
          height="full"
          background="shader.a.900"
          opacity={0}
          transition="opacity 0.3s ease-in-out"
          _groupHover={{
            opacity: 0.5,
          }}
          position="absolute"
          zIndex={3}
        >
          <Icon
            as={CameraIcon}
            height={10}
            width={10}
            color="white"
            cursor="pointer"
          />
        </Center>
      </Box>
    </>
  );
};

export default SettingProfileImage;
