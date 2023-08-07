import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import { UseFormSetValue, useForm } from 'react-hook-form';

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';
import TextInputMaxLength from 'components/TextInput/TextInputMaxLength';

import UploadPicture from 'components/UploadPicture';
import { isNull, isUndefined } from '@polkadot/util';
import NFTsMetaDataModal from './NFTsMetaDataModal';

export interface NFTsMetaFieldProps extends TypeSwitchAdmin {
  collection_id: number;
  item_id: number;
  title: string;
  image: File;
}

export default function NFTsMetaData() {
  const { getValues, setValue, handleSubmit, watch, reset, control } =
    useForm<NFTsMetaFieldProps>();

  const { collection_id, item_id, title, image } = watch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onOpen)}
      flexDirection="column"
      gap={3}
    >
      <SwitchAdmin
        setValue={setValue as keyof UseFormSetValue<TypeSwitchAdmin>}
      />

      <CardBox variant="createGames">
        <UploadPicture
          formState={{
            setValue,
            value: 'image',
            isInvalid: isUndefined(image),
            isRequired: true,
          }}
        />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          formState={{
            control,
            value: 'collection_id',
            isInvalid: isNull(collection_id),
            isRequired: true,
          }}
          heading="Collection ID"
        />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          formState={{
            control,
            value: 'item_id',
            isInvalid: isNull(item_id),
            isRequired: true,
          }}
          heading="NFT ID"
        />
      </CardBox>

      <CardBox variant="createGames">
        <TextInputMaxLength
          formState={{
            control,
            value: 'title',
            isInvalid: isNull(title),
            isRequired: true,
            max: 28,
          }}
          heading="Title"
        />
      </CardBox>

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
        <NFTsMetaDataModal
          onClose={onClose}
          getValues={getValues}
          reset={reset}
        />
      )}
    </Flex>
  );
}
