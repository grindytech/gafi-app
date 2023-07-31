import {
  Box,
  Button,
  ButtonProps,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
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

import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { cloundinary_link } from 'axios/cloudinary_axios';
import GafiAmount from 'components/GafiAmount';
import { formatCurrency } from 'utils/utils';

import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import useItemBought from 'hooks/useItemBought';
import RatioPicture from 'components/RatioPicture';

interface NFTDetailBuyProps {
  trade_id: number;
  fee: number;
  amount: number;
  sx?: ButtonProps;
  refetch?: () => void;
}

export default function NFTDetailBuy({
  trade_id,
  fee,
  amount,
  refetch,
  sx,
}: NFTDetailBuyProps) {
  const { nft_id, collection_id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { metaCollection } = useMetaCollection({
    key: `${nft_id}/${collection_id}`,
    group: [
      {
        collection_id: Number(collection_id),
      },
    ],
  });

  const { metaNFT } = useMetaNFT({
    key: `${nft_id}/${collection_id}`,
    group: [
      {
        collection_id: Number(collection_id),
        nft_id: Number(nft_id),
      },
    ],
  });

  const { isLoading, mutation } = useItemBought({
    trade_id,
    amount: watch().amount,
    bidPrice: amount * fee,
    refetch() {
      if (refetch) {
        refetch();
      }
      onClose();
    },
  });

  return (
    <Button
      variant="primary"
      borderRadius="3xl"
      fontSize="sm"
      fontWeight="medium"
      isLoading={isLoading}
      onClick={onOpen}
      _hover={{}}
      {...sx}
    >
      Buy now
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            reset();
            onClose();
          }}
          closeOnOverlayClick={!isLoading}
        >
          <ModalOverlay />

          <ModalContent
            as="form"
            sx={{
              input: {
                padding: 4,
                height: 'auto',
                fontSize: 'sm',
                color: 'shader.a.900',
                borderRadius: 'xl',
                borderColor: 'shader.a.300',
              },
              span: {
                color: 'shader.a.500',
                fontWeight: 'normal',
                fontSize: 'sm',
              },
              '.amount-gafi': {
                color: 'shader.a.900',
                fontSize: 'sm',
                fontWeight: 'medium',
              },
            }}
            onSubmit={handleSubmit(mutation)}
          >
            <ModalHeader
              display="flex"
              justifyContent="space-between"
              padding={4}
              borderBottom="0.0625rem solid"
              borderColor="shader.a.300"
            >
              <Heading fontSize="xl" color="shader.a.900" fontWeight="semibold">
                Buy
              </Heading>

              <ModalCloseButton position="unset" width={6} height={6} />
            </ModalHeader>

            <ModalBody
              display="flex"
              flexDirection="column"
              gap={5}
              padding={4}
            >
              <HStack alignItems="flex-start" spacing={4}>
                <Flex gap={4}>
                  <Box>
                    <RatioPicture
                      alt={nft_id}
                      src={
                        metaNFT?.[0]?.image
                          ? cloundinary_link(metaNFT?.[0]?.image)
                          : null
                      }
                      sx={{ width: 32 }}
                    />
                  </Box>
                  <Box>
                    <Text color="primary.a.500" fontWeight="medium">
                      {metaCollection?.[0]?.title || '-'}
                    </Text>

                    <Text
                      as="span"
                      color="shader.a.900"
                      fontWeight="semibold"
                      fontSize="xl"
                    >
                      {metaNFT?.[0]?.title || '-'}
                      <Text
                        as="strong"
                        fontWeight="medium"
                        fontSize="md"
                        color="primary.a.500"
                      >
                        &nbsp;x{amount}
                      </Text>
                    </Text>
                  </Box>
                </Flex>
              </HStack>

              <Flex
                borderRadius="xl"
                bg="shader.a.200"
                border="0.0625rem solid"
                borderColor="shader.a.300"
                padding={2}
                justifyContent="space-between"
              >
                <Text as="span">Current price</Text>

                <Box textAlign="right">
                  <GafiAmount
                    amount={fee}
                    sx={{
                      className: 'amount-gafi',
                      sx: {
                        span: {
                          color: 'inherit!',
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                        },
                      },
                    }}
                  />

                  <Text as="span">{formatCurrency(fee, 'usd')}</Text>
                </Box>
              </Flex>

              <FormControl isRequired={true} isInvalid={!!errors.amount}>
                <Input
                  placeholder="Enter supply"
                  isRequired={false}
                  {...register('amount', { required: true })}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter
              gap={2}
              borderTop="0.0625rem solid"
              borderColor="shader.a.300"
              padding={4}
              justifyContent="space-between"
              display="block"
            >
              <Flex justifyContent="space-between">
                <Text as="span">Total value</Text>

                <Box textAlign="right">
                  <GafiAmount
                    amount={watch().price || 0}
                    sx={{
                      className: 'amount-gafi',
                      sx: {
                        span: {
                          color: 'inherit!',
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                        },
                      },
                    }}
                  />

                  <Text as="span">
                    {formatCurrency(Number(watch().price || 0), 'usd')}
                  </Text>
                </Box>
              </Flex>

              <Button
                isLoading={isLoading}
                variant="primary"
                width="full"
                type="submit"
                mt={4}
                _hover={{}}
              >
                Purchase
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Button>
  );
}
