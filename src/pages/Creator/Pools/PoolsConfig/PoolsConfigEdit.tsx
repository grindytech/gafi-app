import { Button, Center, Icon, Text } from '@chakra-ui/react';

import EditIcon from 'public/assets/line/edit.svg';

interface PoolsConfigEditProps {
  onToggle: () => void;
  length: number;
}

export default ({ length, onToggle }: PoolsConfigEditProps) => {
  return (
    <Center
      position="sticky"
      top={0}
      mb={4}
      bg="shader.a.900"
      justifyContent="space-between"
      zIndex="docked"
    >
      <Text fontSize="sm" color="shader.a.300" fontWeight="medium">
        {length || null} Item
      </Text>

      {length ? (
        <Button
          variant="unstyled"
          fontSize="sm"
          color="primary.a.300"
          fontWeight="medium"
          iconSpacing={1}
          leftIcon={<Icon as={EditIcon} width={4} height={4} />}
          onClick={onToggle}
        >
          Edit
        </Button>
      ) : null}
    </Center>
  );
};
