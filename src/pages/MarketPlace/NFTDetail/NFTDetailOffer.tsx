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
  useDisclosure,
} from '@chakra-ui/react';
import { TextInputMaxLengthStyle } from 'components/TextInput/TextInputMaxLength';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface NFTDetailSellFieldProps {
  amount: string;
  price: string;
  start_block: string | null;
  end_block: string | null;
}

interface ListControlFormProps {
  field: keyof NFTDetailSellFieldProps;
  heading: string;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export default function NFTDetailOffer() {
  const { nft_id, collection_id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NFTDetailSellFieldProps>();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['sell_nft', String(nft_id)],
    address: account?.address as string,
    onSuccess() {
      onClose();
    },
  });

  const ListControlForm: ListControlFormProps[] = [
    {
      field: 'amount',
      heading: 'Amount',
      isRequired: true,
      isInvalid: !!errors.amount,
    },
    {
      field: 'price',
      heading: 'Price',
      isRequired: true,
      isInvalid: !!errors.price,
    },
    {
      field: 'start_block',
      heading: 'Start Block',
    },
    {
      field: 'end_block',
      heading: 'End Block',
    },
  ];

  return (
    <>
      <Button variant="cancel" borderRadius="3xl" onClick={onOpen}>
        Make offer
      </Button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent
            as="form"
            onSubmit={handleSubmit(meta => {
              if (api) {
                mutation(
                  api.tx.game.setBuy(
                    {
                      collection: collection_id,
                      item: nft_id,
                      amount: meta.amount,
                    },
                    meta.price,
                    null,
                    null
                  )
                );
              }
            })}
          >
            <ModalBody padding={6}>
              {React.Children.toArray(
                ListControlForm.map(meta => (
                  <FormControl
                    isRequired={meta.isRequired}
                    isInvalid={meta.isInvalid}
                    _notFirst={{ mt: 4 }}
                  >
                    <FormLabel>{meta.heading}</FormLabel>

                    <Input
                      {...TextInputMaxLengthStyle}
                      isRequired={false}
                      placeholder="Ex: 0"
                      {...register(meta.field, {
                        required: meta.isRequired,
                      })}
                    />
                  </FormControl>
                ))
              )}
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
      )}
    </>
  );
}
