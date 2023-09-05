import {
  Button,
  Center,
  Grid,
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
import { UseFormReset, UseFormWatch } from 'react-hook-form';
import { colors } from 'theme/theme';
import {
  CalculatorOfRarity,
  convertHex,
  formatGAFI,
  unitGAFI,
} from 'utils/utils';
import { PoolsFieldProps } from '..';

import PoolsModalCard from './PoolsModalCard';
import React from 'react';
import PoolsModalSubmit from './PoolsModalSubmit';
import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

interface PoolsModalProps {
  isDisabled: boolean;
  reset: UseFormReset<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export default ({
  isDisabled,
  reset,
  setActiveStep,
  watch,
}: PoolsModalProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { account } = useAppSelector(state => state.injected.polkadot);

  const {
    general_type,
    add_item_failed,
    add_item_dynamic,
    add_item_stable,
    add_item_fee,
  } = watch();

  const getValues = () => {
    const getDynamic = Object.values(add_item_dynamic || []);
    const getStable = Object.values(add_item_stable || []);

    if (general_type === 'Dynamic Pool' && getDynamic.length) {
      return (
        add_item_failed
          ? [...getDynamic, { weight: add_item_failed }]
          : getDynamic
      ) as PoolsFieldProps['add_item_supply'];
    }

    if (general_type === 'Stable Pool' && getStable.length) {
      return (
        add_item_failed
          ? [...getStable, { weight: add_item_failed }]
          : getStable
      ) as PoolsFieldProps['add_item_supply'];
    }

    if (add_item_failed) {
      return [
        { weight: add_item_failed },
      ] as PoolsFieldProps['add_item_supply'];
    }
  };

  const { mutation, isLoading } = useSignAndSend({
    key: [`web3_pool_create/${general_type}`],
    address: account?.address as string,
    onSuccess() {
      onClose();
      reset();
      setActiveStep(0); // reset step
    },
  });

  return (
    <>
      <Button variant="primary" onClick={onOpen} isDisabled={isDisabled}>
        Sign & Submit
      </Button>

      {isOpen ? (
        <Modal
          closeOnOverlayClick={!isLoading}
          isOpen={true}
          size="4xl"
          onClose={onClose}
        >
          <ModalOverlay />

          <ModalContent
            borderRadius="xl"
            bg="shader.a.900"
            border="0.0625rem solid"
            borderColor="shader.a.800"
          >
            <ModalHeader
              padding={6}
              borderBottom="0.0625rem solid"
              borderColor="shader.a.800"
            >
              <Center justifyContent="space-between">
                <Text color="white" fontSize="lg" fontWeight="medium">
                  Create Pool
                </Text>

                <ModalCloseButton
                  position="unset"
                  width={6}
                  height={6}
                  color="white"
                />
              </Center>
            </ModalHeader>

            <ModalBody px={6} py={4} bg="shader.a.1000">
              <Text fontSize="sm" color="shader.a.300" fontWeight="medium">
                Total {getValues()?.length} items
              </Text>

              <Grid
                mt={4}
                gap={4}
                gridTemplateColumns={{
                  base: 'repeat(4, 11.5rem)',
                  md: 'repeat(4, 1fr)',
                }}
              >
                {React.Children.toArray(
                  getValues()
                    ?.filter(meta => !!meta)
                    .map(({ amount, weight, collection, nft }) => {
                      const getRarity = CalculatorOfRarity(
                        weight,
                        getValues()?.map(data => data?.weight) as number[]
                      );

                      return (
                        <PoolsModalCard
                          collection={{
                            name: collection?.title || '-',
                          }}
                          nft={{
                            name: nft?.title || '-',
                            id: nft?.id,
                            image: nft?.image,
                          }}
                          amount={amount}
                          rarity={getRarity}
                        />
                      );
                    })
                )}
              </Grid>
            </ModalBody>

            <ModalFooter
              padding={6}
              bg={convertHex(colors.shader.a[800], 0.25)}
              borderTop="0.0625rem solid"
              borderColor="shader.a.800"
              display="block"
            >
              <Center justifyContent="space-between" mb={4}>
                <Text color="shader.a.500">Mint Fee</Text>

                <Text as="span" color="white" fontWeight="semibold">
                  {formatGAFI(unitGAFI(String(add_item_fee)))} GAFI
                </Text>
              </Center>

              <Center justifyContent="space-between">
                <Text color="shader.a.500">Transaction fee</Text>

                <Text as="span" color="white" fontWeight="semibold">
                  50,6895 GAFI
                </Text>
              </Center>

              <PoolsModalSubmit
                mutation={mutation}
                isLoading={isLoading}
                watch={watch}
                getValues={getValues()}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};
