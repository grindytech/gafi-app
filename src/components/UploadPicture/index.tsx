import {
  Center,
  Flex,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import UploadIcon from 'public/assets/line/upload.svg';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import { UseFormRegister } from 'react-hook-form';

interface UploadPictureProps {
  register: UseFormRegister<any>;
  isInvalid?: boolean;
  isRequired?: boolean;
  value: string;
}

export default function UploadPicture({
  register,
  isRequired,
  isInvalid,
  value,
}: UploadPictureProps) {
  const [preview, setPreview] = React.useState('');

  const handleUpload = (file: FileList | null) => {
    // delete memory
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    // update blob
    if (file && file[0]) {
      setPreview(URL.createObjectURL(file[0]));
    }
  };

  return (
    <Flex gap={4}>
      <Center
        flexDirection="column"
        borderRadius="lg"
        border="0.0625rem dashed"
        bg={convertHex(colors.primary.a[500], 0.05)}
        borderColor={isInvalid ? 'red.500' : 'primary.a.200'}
        textAlign="center"
        position="relative"
        color="primary.a.500"
        width={80}
        height={48}
        onDrop={event => {
          // prevent open new tab by image on local
          event.preventDefault();

          handleUpload(event.dataTransfer.files);
        }}
        onDragOver={event => event.preventDefault()}
      >
        {preview ? (
          <Image width="full" height="full" objectFit="cover" src={preview} />
        ) : (
          <>
            <Icon as={UploadIcon} width={5} height={5} />

            <Text fontWeight="semibold" fontSize="xs" mt={2}>
              Drag & Drop files here, or click to select
            </Text>
          </>
        )}

        <Input
          {...register(value, {
            required: isRequired,
          })}
          onChange={event => handleUpload(event.target.files)}
          required={false}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/svg+xml"
          position="absolute"
          cursor="pointer"
          inset={0}
          opacity={0}
          height="full"
        />
      </Center>

      <List
        fontSize="sm"
        fontWeight="medium"
        color="shader.a.500"
        sx={{
          span: {
            color: 'shader.a.800',
            fontWeight: 'semibold',
          },
        }}
      >
        <ListItem>
          Size:&nbsp;
          <Text as="span">320 x 192 px</Text>
        </ListItem>
        <ListItem>
          Maximum:&nbsp;
          <Text as="span">5 MB</Text>
        </ListItem>
        <ListItem>
          Support file:&nbsp;
          <Text as="span">PNG, JPG, SVG</Text>
        </ListItem>
      </List>
    </Flex>
  );
}
