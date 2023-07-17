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
  fee: string;
  start_block: number | null;
  end_block: number | null;
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
    clearErrors,
    resetField,
    formState: { errors },
  } = useForm<PoolsCreateFieldProps>();

  React.useEffect(() => {
    fields.forEach((_, index) => {
      if (!isExpanded[index]) {
        setValue(`supply.${index}.maybeNft`, null);
        clearErrors(`supply.${index}.maybeNft`);
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
          type="Owner"
        />

        <CardBox variant="createGames">
          <NumberInput
            value="fee"
            title="Mining fee"
            register={register}
            setValue={setValue}
            isInvalid={!!errors.fee}
            isRequired={true}
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            value="start_block"
            title="Start Block"
            register={register}
            setValue={setValue}
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            value="end_block"
            title="End Block"
            register={register}
            setValue={setValue}
          />
        </CardBox>

        {fields.map((element, index) => (
          <MaybeOptions
            title={`Supply ${index}`}
            key={element}
            toggle={isExpanded[element]}
            switchClick={() => setIsExpanded(element)}
            closeClick={
              fields.length >= 2
                ? () => {
                    removeField(element);
                    removeIsExpanded(element);
                    resetField(`supply.${element}`);
                  }
                : undefined
            }
            childrenOption={
              <>
                <NumberInput
                  value={`supply.${index}.maybeNft.collection`}
                  title="Collection ID"
                  register={register}
                  isInvalid={!!errors.supply?.[index]?.maybeNft?.collection}
                  isRequired={isExpanded[index]}
                  isReset={!isExpanded[index]}
                />

                <NumberInput
                  value={`supply.${index}.maybeNft.item`}
                  title="Item ID"
                  register={register}
                  isInvalid={!!errors.supply?.[index]?.maybeNft?.item}
                  isRequired={isExpanded[index]}
                  isReset={!isExpanded[index]}
                />
              </>
            }
          >
            <NumberInput
              value={`supply.${index}.weight`}
              title="Weight"
              register={register}
              isInvalid={!!errors.supply?.[index]?.weight}
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
