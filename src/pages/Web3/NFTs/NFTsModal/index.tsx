import { UseFormWatch } from 'react-hook-form';
import {
  Button,
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import { NFTsFieldProps } from '..';

interface CollectionsModalProps {
  isDisabled: boolean;
  watch: UseFormWatch<NFTsFieldProps>;
}

export default ({ isDisabled }: CollectionsModalProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button variant="primary" onClick={onOpen} isDisabled={isDisabled}>
        Sign & Submit
      </Button>

      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />

        <ModalContent borderRadius="xl" bg="shader.a.900">
          <ModalHeader
            padding={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="white" fontSize="lg" fontWeight="medium">
              Create NFT
            </Text>

            <ModalCloseButton
              position="unset"
              width={6}
              height={6}
              color="white"
            />
          </ModalHeader>

          <ModalFooter
            padding={6}
            bg={convertHex(colors.shader.a[800], 0.25)}
            borderTop="0.0625rem solid"
            borderColor="shader.a.800"
            display="block"
          >
            <Center justifyContent="space-between" mb={6}>
              <Text color="shader.a.500">Transaction fee</Text>

              <Text as="span" color="white" fontWeight="semibold">
                50,6895 GAFI
              </Text>
            </Center>

            <Button
              width="full"
              variant="primary"
              onClick={() => {
                alert('cooming soon');
              }}
            >
              Sign & Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
