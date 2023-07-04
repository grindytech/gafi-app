import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import CardBox from 'components/CardBox';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import React from 'react';

import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import NumberInput from 'components/NumberInput';

import PoolsModal from './PoolsModal';
import useMaybeOption from 'hooks/useMaybeOption';
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import useToggleMultiple from 'hooks/useToggleMultiple';

export interface PoolsCreateFieldProps extends TypeSwitchAdmin {
  fee: number;
  supply: {
    weight: number;
    maybeNft: {
      collection: number; // collection_id should = collection but follow field of API
      item: number; // as the same above
    } | null;
  }[];
}

export interface PoolsCreateProps {
  type: 'createDynamicPool' | 'createStablePool';
}

export default function PoolsCreate({ type }: PoolsCreateProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setIsExpanded, removeIsExpanded, isExpanded } = useToggleMultiple();
  const { fields, setField, removeField } = useMaybeOption();

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm<PoolsCreateFieldProps>();

  React.useEffect(() => {
    fields.forEach((_, index) => {
      if (!isExpanded[index]) {
        unregister(`supply.${index}`);

        setValue(`supply.${index}`, {
          maybeNft: {
            collection: null,
            item: null,
          },
        } as keyof object);
      }
    });
  }, [isExpanded]);

  return (
    <>
      <Flex justifyContent="flex-end" mb={4}>
        <Button onClick={() => setField()}>Add Supply</Button>
      </Flex>

      <Flex
        as="form"
        onSubmit={handleSubmit(onOpen)}
        flexDirection="column"
        gap={3}
      >
        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
        />

        <CardBox variant="createGames">
          <NumberInput value="fee" title="Mining fee" register={register} />
        </CardBox>

        {fields.map((element, index) => (
          <MaybeOptions
            title={`Supply ${index}`}
            /* 
              why not used an index
              because element maybe 1 | 2 | 3 | 4 | 10 | 20
              and index actually 0 | 1 | 2 | 3 | 4 | 5 | 6
              that when removing params correctly is 'element'
             */
            key={element}
            toggle={isExpanded[element]}
            switchClick={() => setIsExpanded(element)}
            closeClick={
              fields.length >= 2
                ? () => {
                    removeField(element);
                    removeIsExpanded(element);
                  }
                : undefined
            }
            childrenOption={
              <>
                <NumberInput
                  value={`supply.${index}.maybeNft.collection`}
                  title="Collection ID"
                  register={register}
                  isInvalid={
                    !!errors.supply?.[index]?.maybeNft?.collection || undefined
                  }
                  isRequired={isExpanded[index]}
                />

                <NumberInput
                  value={`supply.${index}.maybeNft.item`}
                  title="Item ID"
                  register={register}
                  isInvalid={
                    !!errors.supply?.[index]?.maybeNft?.item || undefined
                  }
                  isRequired={isExpanded[index]}
                />
              </>
            }
          >
            <NumberInput
              value={`supply.${index}.weight`}
              title="Weight"
              register={register}
              isInvalid={
                errors.supply?.[index]?.weight
                  ? !!String(errors.supply[index]?.weight).length
                  : undefined
              }
              isRequired={true}
            />
          </MaybeOptions>
        ))}

        <Button
          isDisabled={isOpen}
          margin="auto"
          px={6}
          variant="primary"
          type="submit"
        >
          Submit Transaction
        </Button>

        {isOpen && (
          <PoolsModal type={type} onClose={onClose} getValues={getValues} />
        )}
      </Flex>
    </>
  );
}
