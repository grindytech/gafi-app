import {
  Button,
  FormControl,
  FormLabel,
  Icon,
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
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import LineAddIcon from 'public/assets/line/add.svg';
import { useFieldArray, useForm } from 'react-hook-form';
import CloseIcon from 'public/assets/line/close.svg';
import { NumberInputStyle } from 'components/NumberInput';
import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

interface SponsoredFieldProps {
  pool_amount: number;
  discount: number;
  transaction_limit: number;
  targets: {
    contractAddress: number | undefined;
  }[];
}

export default function PoolsSponsoredAdd() {
  const { api } = useAppSelector(state => state.substrate);

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['sponsoredAdd'],
    address: account?.address as string,
  });

  const { isOpen, onClose, onToggle } = useDisclosure();

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

  const ListItem = [
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
        variant="unstyled"
        display="flex"
        px={6}
        bg="primary.a.500"
        color="white"
        borderRadius="lg"
        onClick={onToggle}
        rightIcon={<LineAddIcon />}
      >
        Add Pool
      </Button>

      <Modal
        isOpen={isOpen}
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
          <ModalHeader color="primary.a.500" fontSize="xl" fontWeight="medium">
            Create sponsored pool
          </ModalHeader>

          <ModalBody>
            <Stack spacing={4}>
              {ListItem.map(item => (
                <FormControl
                  key={item.fieldName}
                  isRequired={true}
                  isInvalid={
                    !!errors[item.fieldName as keyof SponsoredFieldProps]
                  }
                >
                  <FormLabel>{item.text}</FormLabel>

                  <NumberInput min={0}>
                    <NumberInputField
                      {...register(
                        item.fieldName as keyof SponsoredFieldProps,
                        {
                          required: 'Please fill out this field.',
                          min: 0,
                        }
                      )}
                      required={false}
                    />
                  </NumberInput>
                </FormControl>
              ))}

              {fields.map((field, index) => {
                const shouldShowRemove = fields.length >= 2;

                return (
                  <FormControl
                    key={field.id}
                    isRequired={true}
                    isInvalid={!!errors.targets?.[index]}
                  >
                    <FormLabel>Target {index}</FormLabel>

                    <InputGroup key={field.id} _notFirst={{ mt: 4 }}>
                      <NumberInput width="full" min={0}>
                        <NumberInputField
                          {...NumberInputStyle}
                          {...register(`targets.${index}.contractAddress`, {
                            required: 'Please fill out this field.',
                            min: 0,
                          })}
                          required={false}
                          borderRightRadius={
                            shouldShowRemove ? undefined : 'unset'
                          }
                          _focusVisible={{}}
                        />
                      </NumberInput>

                      {shouldShowRemove ? (
                        <InputRightAddon
                          bg="unset"
                          onClick={() => remove(Number(field.id))}
                        >
                          <Icon as={CloseIcon} width={6} height={6} />
                        </InputRightAddon>
                      ) : null}
                    </InputGroup>
                  </FormControl>
                );
              })}

              <Button
                variant="unstyled"
                display="flex"
                bg="primary.a.500"
                color="white"
                borderRadius="lg"
                onClick={() =>
                  append({
                    contractAddress: undefined,
                  })
                }
                leftIcon={<LineAddIcon />}
              >
                Add targets
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter gap={4}>
            <Button type="submit" isLoading={isLoading}>
              Save
            </Button>

            <Button onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
