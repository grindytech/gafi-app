import { Box, Icon, Input, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import UploadIcon from 'public/assets/line/upload.svg';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface NewGamesUploadProps {
  register: UseFormRegister<FieldValues>;
}

const ListUpload = [
  {
    title: 'Size:',
    amount: '320 x 170 px',
  },
  {
    title: 'Maximum:',
    amount: '5 MB',
  },
];

export default function NewGamesUpload({ register }: NewGamesUploadProps) {
  return (
    <CardBox variant="createGames" display="flex" gap={4}>
      <Box
        borderRadius="lg"
        display="inline-block"
        border="0.0625rem dashed"
        borderColor="primary.a.200"
        textAlign="center"
        position="relative"
        color="primary.a.500"
        bg={convertHex(colors.primary.a[500], 0.05)}
        py={8}
        px={14}
      >
        <Icon as={UploadIcon} width={5} height={5} />

        <Text fontWeight="semibold" fontSize="xs">
          Upload Image
        </Text>

        <Input
          {...register('upload')}
          type="file"
          position="absolute"
          inset={0}
          opacity={0}
          height="full"
        />
      </Box>

      <Box fontSize="sm" fontWeight="medium" color="shader.a.500">
        {React.Children.toArray(
          ListUpload.map(upload => (
            <Text>
              {upload.title}&nbsp;
              <Text as="span" color="shader.a.800" fontWeight="semibold">
                {upload.amount}
              </Text>
            </Text>
          ))
        )}
      </Box>
    </CardBox>
  );
}
