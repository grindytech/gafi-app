import { Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import CardBox from 'components/CardBox';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import React, { useEffect } from 'react';

import { UseFormSetValue, useForm } from 'react-hook-form';

import NumberInput from 'components/NumberInput';

import PoolsModal from './PoolsModal';
import useMaybeOption from 'hooks/useMaybeOption';
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import useToggleMultiple from 'hooks/useToggleMultiple';
import { isNull } from '@polkadot/util';
import DurationBlock, { ListDurationProps } from 'components/DurationBlock';
import { BLOCK_TIME } from 'utils/constants';

import AddIcon from 'public/assets/line/add.svg';

export interface PoolsCreateFieldProps extends TypeSwitchAdmin {
  fee: number;
  duration: ListDurationProps;
  supply: {
    weight: number;
    maybeNft: {
      collection: number; // correctly should collection_id
      item: number; // correctly should nft_id
    } | null;
  }[];
}

export interface PoolsCreateProps {
  type: 'createDynamicPool' | 'createStablePool';
}

export default function PoolsCreate({ type }: PoolsCreateProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setIsExpanded, removeIsExpanded, isExpanded, setExpanded } =
    useToggleMultiple();

  const { fields, setField, setFields, removeField } = useMaybeOption();

  const { setValue, getValues, handleSubmit, control, watch } =
    useForm<PoolsCreateFieldProps>();

  const ListDuration: ListDurationProps[] = [
    {
      text: 'Infinity',
      time: null as unknown as number,
    },
    {
      text: '1 Minutes',
      time: 60 / BLOCK_TIME,
    },
    {
      text: '5 Minutes',
      time: 300 / BLOCK_TIME,
    },
    {
      text: '1 Hours',
      time: 3600 / BLOCK_TIME,
    },
    {
      text: '1 Day',
      time: (86400 * 1) / BLOCK_TIME,
    },
    {
      text: '1 Week',
      time: (86400 * 7) / BLOCK_TIME,
    },
    {
      text: '2 Weeks',
      time: (86400 * 14) / BLOCK_TIME,
    },
    {
      text: '1 Month',
      time: (86400 * 30) / BLOCK_TIME,
    },
  ];

  const [duration, setDuration] = React.useState(ListDuration[0]);

  const { fee, supply } = watch();

  // updating duration
  React.useEffect(() => {
    setValue('duration', duration);
  }, [duration]);

  // fields add new
  useEffect(() => {
    fields.forEach(element => {
      if (!isExpanded[element]) {
        setExpanded(prev => ({
          ...prev,
          [element]: false,
        }));
      }
    });
  }, [fields]);

  // isExpanded Closed
  useEffect(() => {
    fields.forEach(element => {
      if (!isExpanded[element]) {
        control.unregister(`supply.${element}.maybeNft`);
      }
    });
  }, [isExpanded]);

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onOpen)}
      flexDirection="column"
      gap={3}
    >
      <SwitchAdmin
        setValue={setValue as keyof UseFormSetValue<TypeSwitchAdmin>}
        type="Owner"
      />

      <CardBox variant="createGames">
        <NumberInput
          formState={{
            control,
            value: 'fee',
            isInvalid: isNull(fee),
            isRequired: true,
          }}
          heading="Mining fee"
        />
      </CardBox>

      <CardBox variant="createGames">
        <DurationBlock
          listDuration={ListDuration}
          duration={duration}
          setCurrentDuration={setDuration}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            sx: {
              p: {
                margin: 0,
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'shader.a.600',
              },
              '.chakra-collapse': {
                position: 'absolute',
                zIndex: 'dropdown',
                bg: 'white',
                width: 'inherit',
              },
              '.current-minute': {
                py: 2,
                px: 4,
              },
              '.chakra-accordion__item': {
                width: '14.25rem',
                borderRadius: 'md',
              },
            },
          }}
        />
      </CardBox>

      {fields.map(element => (
        <MaybeOptions
          key={element}
          title={`Supply ${element}`}
          toggle={isExpanded[element]}
          switchClick={() => setIsExpanded(element)}
          closeClick={
            fields.length >= 2
              ? () => {
                  removeIsExpanded(element);
                  removeField(element);
                  control.unregister(`supply.${element}`);
                }
              : undefined
          }
          childrenOption={
            <>
              <NumberInput
                formState={{
                  control,
                  value: `supply.${element}.maybeNft.collection`,
                  isInvalid: isNull(supply?.[element]?.maybeNft?.collection),
                  isRequired: isExpanded[element],
                }}
                heading="Collection ID"
              />

              <NumberInput
                formState={{
                  control,
                  value: `supply.${element}.maybeNft.item`,
                  isInvalid: isNull(supply?.[element]?.maybeNft?.item),
                  isRequired: isExpanded[element],
                }}
                heading="NFT ID"
              />
            </>
          }
        >
          <NumberInput
            formState={{
              control,
              value: `supply.${element}.weight`,
              isInvalid: isNull(supply?.[element]?.weight),
              isRequired: true,
            }}
            heading="Weight"
          />
        </MaybeOptions>
      ))}

      <Flex>
        <Button
          isDisabled={isOpen}
          margin="auto"
          variant="primary"
          type="submit"
        >
          Submit Transaction
        </Button>

        <Button
          variant="cancel"
          leftIcon={<Icon as={AddIcon} width={5} height={5} />}
          onClick={() => setField()}
        >
          Add Supply
        </Button>
      </Flex>

      {isOpen && (
        <PoolsModal
          onSuccess={() => {
            setExpanded({ 0: false });
            setFields([0]);
            control.unregister();
            onClose();
          }}
          onClose={onClose}
          type={type}
          getValues={getValues}
        />
      )}
    </Flex>
  );
}