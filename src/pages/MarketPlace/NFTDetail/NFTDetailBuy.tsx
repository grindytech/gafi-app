import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';

import { useAppSelector } from 'hooks/useRedux';

import useSignAndSend from 'hooks/useSignAndSend';
import { useForm } from 'react-hook-form';

import { TextInputMaxLengthStyle } from 'components/TextInput/TextInputMaxLength';

interface NFTDetailBuyProps {
  trade_id: number;
  fee: number;
}

export default function NFTDetailBuy({ trade_id, fee }: NFTDetailBuyProps) {
  const { nft_id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['buy_nft', String(nft_id)],
    address: account?.address as string,
    onSuccess() {
      onClose();
    },
  });

  const totalFee = watch().amount * fee;

  return (
    <Button
      variant="primary"
      borderRadius="3xl"
      fontSize="sm"
      fontWeight="medium"
      isLoading={isLoading}
      onClick={onOpen}
    >
      Buy now
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(({ amount }) => {
            if (api) {
              mutation(api.tx.game.buyItem(trade_id, amount, totalFee));
            }
          })}
        >
          <ModalBody padding={6}>
            <FormControl isRequired={true} isInvalid={!!errors.amount}>
              <FormLabel>Amount</FormLabel>

              <Input
                {...TextInputMaxLengthStyle}
                isRequired={false}
                placeholder="Ex: 0"
                {...register('amount', {
                  required: true,
                })}
              />
            </FormControl>

            <Text mt={4}>Total fee: {totalFee}</Text>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              Submit
            </Button>
            <Button variant="cancel" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Button>
  );
}
