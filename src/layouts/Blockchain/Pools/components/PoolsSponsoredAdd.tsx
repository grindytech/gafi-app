import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import LineAddIcon from 'public/assets/line/add.svg';
import { useFieldArray, useForm } from 'react-hook-form';
import CloseIcon from 'public/assets/line/close.svg';

import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

import PoolsIcon from 'public/assets/line/pools.svg';
import FormControlWrap from 'components/FormControlWrap';

interface SponsoredFieldProps {
  pool_amount: number;
  discount: number;
  transaction_limit: number;
  targets: {
    contractAddress: number | undefined;
  }[];
}

interface ListItemProps {
  text: string;
  fieldName: keyof SponsoredFieldProps;
}

export default function PoolsSponsoredAdd() {
  const { api } = useAppSelector(state => state.substrate);

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { mutation } = useSignAndSend({
    key: ['sponsoredAdd'],
    address: account?.address as string,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SponsoredFieldProps>({
    defaultValues: {
      targets: [
        {
          contractAddress: undefined,
        },
      ],
    },
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'targets',
  });

  const ListItem: ListItemProps[] = [
    {
      text: 'Pool amount',
      fieldName: 'pool_amount',
    },
    {
      text: 'Discount',
      fieldName: 'discount',
    },
    {
      text: 'Transaction limit',
      fieldName: 'transaction_limit',
    },
  ];

  return (
    <>
      <Button
        variant="cancel"
        onClick={onOpen}
        bg="shader.a.200"
        iconSpacing={2}
        leftIcon={<LineAddIcon />}
      >
        Add Pool
      </Button>

      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(data => {
            if (api) {
              const targets = data.targets.map(
                target => target.contractAddress
              );

              mutation(
                api.tx.sponsoredPool.createPool(
                  targets,
                  // parseUnits(data.poolAmount.toString(), chainDecimal).toString(),
                  parseFloat(String(data.discount)) * 10000,
                  data.transaction_limit
                )
              );
            }
          })}
        >
          <ModalHeader display="flex" alignItems="center" gap={3}>
            <Flex
              bg="primary.a.100"
              color="primary.a.500"
              borderRadius="2xl"
              padding={1}
            >
              <Icon as={PoolsIcon} width={4} height={4} />
            </Flex>

            <Text color="shader.a.900" fontSize="md" fontWeight="semibold">
              Create sponsored pool
            </Text>
          </ModalHeader>

          <ModalBody
            sx={{
              '> div': {
                mb: 6,
              },
            }}
          >
            <FormControlWrap variant="transfer">
              {ListItem.map(item => (
                <FormControl
                  mb="inherit"
                  key={item.fieldName}
                  isRequired={true}
                  isInvalid={!!errors[item.fieldName]}
                >
                  <FormLabel>{item.text}</FormLabel>

                  <InputGroup>
                    <NumberInput width="full" min={0}>
                      <NumberInputField
                        pr={20}
                        required={false}
                        {...register(item.fieldName, {
                          required: true,
                        })}
                      />
                    </NumberInput>

                    {item.fieldName === 'pool_amount' ? (
                      <InputRightAddon
                        position="absolute"
                        right="0"
                        bg="unset"
                        border="unset"
                        padding={1}
                      >
                        <Button py={2} height="auto" variant="primary">
                          Max
                        </Button>
                      </InputRightAddon>
                    ) : null}
                  </InputGroup>
                </FormControl>
              ))}
            </FormControlWrap>

            <FormControlWrap variant="transfer">
              {fields.map((field, index) => {
                const shouldShowRemove = fields.length >= 2;

                return (
                  <FormControl
                    mb="inherit"
                    key={field.id}
                    isRequired={true}
                    isInvalid={!!errors.targets?.[index]}
                  >
                    <FormLabel>Target {index}</FormLabel>

                    <InputGroup key={field.id} _notFirst={{ mt: 4 }}>
                      <NumberInput width="full" min={0}>
                        <NumberInputField
                          required={false}
                          pr={20}
                          {...register(`targets.${index}.contractAddress`, {
                            required: true,
                          })}
                        />
                      </NumberInput>

                      {shouldShowRemove ? (
                        <InputRightAddon
                          position="absolute"
                          right="0"
                          bg="unset"
                          border="unset"
                          padding={1}
                        >
                          <IconButton
                            aria-label="close-icon"
                            variant="primary"
                            height="auto"
                            py={1}
                            onClick={() => remove(Number(field.id))}
                            icon={<Icon as={CloseIcon} width={6} height={6} />}
                          />
                        </InputRightAddon>
                      ) : null}
                    </InputGroup>
                  </FormControl>
                );
              })}
            </FormControlWrap>

            <Button
              variant="cancel"
              marginRight="auto"
              onClick={() =>
                append({
                  contractAddress: undefined,
                })
              }
              leftIcon={<LineAddIcon />}
            >
              Add targets
            </Button>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button variant="cancel" onClick={onClose}>
              Cancel
            </Button>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
