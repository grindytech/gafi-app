import { Box, BoxProps, Center, Icon, Input, Text } from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';
import { convertHex } from 'utils';

import CloseIcon from 'public/assets/fill/close.svg';
import CameraIcon from 'public/assets/fill/camera.svg';

export interface BackgroundAvatarProps {
  name: 'Background Avatar' | 'Background Banner' | 'Background Cover';
  size: '320x320px' | '320x192px' | '512x512px' | '1400x280px';
  background: File | undefined;
  setBackground: React.Dispatch<React.SetStateAction<File | undefined>>;
  isRequired?: boolean;
  sx?: BoxProps;
}

export default ({
  name,
  size,
  background,
  setBackground,
  isRequired,
  sx,
}: BackgroundAvatarProps) => {
  const handleUpload = (file: FileList | null) => {
    if (background) URL.revokeObjectURL(background as never);

    if (file) {
      setBackground(file[0]);
    }
  };

  const handleRemove = () => {
    URL.revokeObjectURL(background as never);
    setBackground(undefined);
  };

  return (
    <Box {...sx}>
      <Text fontSize="sm" color="white" fontWeight="medium" lineHeight={3}>
        {name}

        {isRequired && (
          <Text as="span" color="primary.a.400">
            &nbsp;*
          </Text>
        )}
      </Text>

      <Text as="span" color="shader.a.500" fontSize="xs">
        Recommend size: {size}
      </Text>

      <Center
        mt={4}
        position="relative"
        borderRadius="xl"
        border="0.0625rem solid"
        borderColor="shader.a.800"
        backgroundColor={convertHex('#ffffff', 0.2)}
        backgroundImage="repeating-linear-gradient(45deg, transparent 25%, transparent 75%, #27272A 75%, #27272A), repeating-linear-gradient(45deg, transparent 25%, transparent 75%, #27272A 75%, #27272A)"
        backgroundPosition="0 0, 0.625rem 0.625rem"
        backgroundSize="1.25rem 1.25rem"
        transitionDuration="ultra-slow"
        role="group"
      >
        {background && (
          <>
            <RatioPicture
              src={URL.createObjectURL(background) || null}
              sx={{
                width: 'full',
                height: 'full',
                sx: {
                  '> div': { width: 'inherit', height: 'inherit' },
                },
              }}
            />

            <Icon
              as={CloseIcon}
              position="absolute"
              zIndex="docked"
              cursor="pointer"
              inset="0 0 auto auto"
              transform="translate(50%, -50%)"
              color="shader.a.400"
              borderRadius="full"
              width={5}
              height={5}
              onClick={handleRemove}
            />
          </>
        )}

        <Box
          position="absolute"
          width="full"
          height="full"
          transitionDuration="ultra-slow"
          _groupHover={
            background
              ? {
                  bg: convertHex('#000000', 0.45),

                  svg: {
                    color: 'white',
                    opacity: 1,
                  },
                }
              : undefined
          }
        >
          <Icon
            position="absolute"
            inset="50% auto auto 50%"
            transform="translate(-50%, -50%)"
            transitionDuration="inherit"
            color="shader.a.700"
            as={CameraIcon}
            width={10}
            height={10}
            opacity={background ? 0 : 1}
          />
        </Box>

        <Input
          variant="unstyled"
          position="absolute"
          inset="0"
          type="file"
          cursor="pointer"
          opacity={0}
          onChange={event => handleUpload(event.target.files)}
        />
      </Center>
    </Box>
  );
};
