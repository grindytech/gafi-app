import { Box, Button, Center, Icon, Input, Text } from '@chakra-ui/react';
import CloudIcon from 'public/assets/fill/cloud.svg';

export default function DeployContract() {
  return (
    <Center>
      <Box
        borderRadius="3xl"
        border="0.0625rem solid"
        borderColor="shader.a.300"
        bg="white"
        padding={6}
      >
        <Box
          borderRadius="xl"
          border="0.0625rem dashed"
          borderColor="shader.a.400"
          position="relative"
          bg="shader.a.100"
          py={20}
          px={32}
        >
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

          <Center
            margin="auto"
            height={9}
            width={9}
            bg="gradient.linear.2"
            borderRadius="lg"
          >
            <Icon as={CloudIcon} color="white" width={6} height={6} />
          </Center>

          <Text
            mt={4}
            color="primary.a.500"
            fontWeight="medium"
            textAlign="center"
          >
            Drag & drop&nbsp;
            <Text as="span" color="shader.a.700" fontWeight="normal">
              contract files here, or click to select files
            </Text>
          </Text>
        </Box>

        <Button
          mt={10}
          variant="unstyled"
          display="flex"
          margin="auto"
          px={6}
          py={2}
          height="auto"
          minWidth="auto"
          bg="primary.a.500"
          color="white"
          fontWeight="medium"
          borderRadius="lg"
          fontSize="sm"
        >
          Deploy Contract
        </Button>
      </Box>
    </Center>
  );
}
