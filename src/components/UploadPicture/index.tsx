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
import { TypeRegister } from 'types';

interface UploadPictureProps {
  register: TypeRegister;
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
      >
        {preview ? (
          <Image width="full" height="full" objectFit="contain" src={preview} />
        ) : (
          <>
            <Icon as={UploadIcon} width={5} height={5} />

            <Text fontWeight="semibold" fontSize="xs">
              Upload Image
            </Text>
          </>
        )}

        <Input
          {...register(value, {
            required: isRequired,
          })}
          onChange={async e => {
            const file = e.target.files;

            if (file) {
              setPreview(URL.createObjectURL(file[0]));
            }
          }}
          required={false}
          type="file"
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
