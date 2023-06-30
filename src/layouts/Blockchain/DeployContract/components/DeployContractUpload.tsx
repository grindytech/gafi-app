import { Box, Button, Icon, Input, Text } from '@chakra-ui/react';
import UploadIcon from 'public/assets/line/upload.svg';

export default function DeployContractUpload() {
  return (
    <Box bg="white" padding={6} borderRadius="lg" textAlign="center">
      <Box borderRadius="xl" position="relative" bg="gray.100" padding={12}>
        <Input
          onChange={e => {
            const file = e.target.files;

            console.log(file);
          }}
          type="file"
          position="absolute"
          inset={0}
          opacity={0}
          cursor="pointer"
          height="full"
        />

        <Icon as={UploadIcon} width={6} height={6} />

        <Text color="primary.a.500">
          Drag & drop&nbsp;
          <Text as="span" color="shader.a.900">
            contract files here, or click to select files
          </Text>
        </Text>
      </Box>

      <Button mt={6} px={8} border="xl">
        Deploy
      </Button>
    </Box>
  );
}
