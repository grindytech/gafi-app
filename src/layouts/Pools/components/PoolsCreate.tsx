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

export interface PoolsCreateFieldProps extends TypeSwitchAdmin {
  fee: number;
  id: number;
  supply: {
    weight: number;
    maybeNft: {
      collection: number; // collection_id should = collection but follow field of API
      item: number; // as the same above
    };
  }[];
}

export interface PoolsCreateProps {
  type: 'createDynamicPool' | 'createStablePool';
}

export default function PoolsCreate({ type }: PoolsCreateProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fields, setField, removeField, setIsExpanded, isExpanded } =
    useMaybeOption();

  const { setValue, getValues } = useForm<PoolsCreateFieldProps>();

  React.useEffect(() => {
    setValue(
      `id.${fields.length - 1}` as keyof PoolsCreateFieldProps,
      fields.length - 1
    );
  }, [fields]);

  return (
    <>
      <Flex justifyContent="flex-end" mb={4}>
        <Button onClick={() => setField()}>Add Supply</Button>
      </Flex>

      <Flex flexDirection="column" gap={3}>
        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
        />

        <CardBox variant="createGames">
          <NumberInput
            value="fee"
            title="Mining fee"
            setValue={setValue}
            required={true}
          />
        </CardBox>

        {fields.map((element, index) => (
          <MaybeOptions
            title={`Supply ${index}`}
            key={element}
            arrow={{
              isChecked: isExpanded[index],
              onClick: () => setIsExpanded(index),
            }}
            close={
              fields.length >= 2
                ? {
                    onClick: () => removeField(element),
                  }
                : undefined
            }
          >
            <NumberInput
              value={`supply.${index}.maybeNft.collection`}
              title="Collection ID"
              setValue={setValue}
            />

            <NumberInput
              value={`supply.${index}.maybeNft.item`}
              title="Item ID"
              setValue={setValue}
            />

            <NumberInput
              value={`supply.${index}.weight`}
              title="Weight"
              setValue={setValue}
              required={true}
            />
          </MaybeOptions>
        ))}

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && (
        <PoolsModal type={type} onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
