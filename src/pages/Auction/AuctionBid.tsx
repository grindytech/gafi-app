import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { isNull } from '@polkadot/util';
import NumberInput from 'components/NumberInput';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface AuctionBidFieldProps {
  bid_price: number;
}

export default function AuctionBid() {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);
  const { id } = useParams();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, watch, handleSubmit, reset } =
    useForm<AuctionBidFieldProps>();

  const { bid_price } = watch();

  const { isLoading, mutation } = useSignAndSend({
    key: [`bid_auction/${id}`],
    address: account?.address as string,
    onSuccess() {
      handleClose();
    },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Button
        borderRadius="3xl"
        width="fit-content"
        px={10}
        py={6}
        variant="primary"
        onClick={onOpen}
      >
        Place a bid
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(() => {
            if (api) {
              mutation(api.tx.game.bidAuction(Number(id), bid_price));
            }
          })}
        >
          <ModalHeader>
            <Text fontSize="lg" fontWeight="medium" color="shader.a.900">
              Bid Auction
            </Text>
          </ModalHeader>

          <ModalCloseButton top="unset" transform="translateY(50%)" />

          <ModalBody>
            <NumberInput
              formState={{
                control,
                value: 'bid_price',
                isInvalid: isNull(bid_price),
                isRequired: true,
              }}
            />
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              Sign & Submit
            </Button>

            <Button variant="cancel" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
