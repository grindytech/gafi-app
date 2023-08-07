import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import UploadPicture from 'components/UploadPicture';
import CardBox from 'components/CardBox';
import TextInputMaxLength from 'components/TextInput/TextInputMaxLength';

import NumberInput from 'components/NumberInput';
import AddMetadataCollectionModal from './AddMetadataCollectionModal';
import { isNull, isUndefined } from '@polkadot/util';

export interface AddMetadataCollectionFieldProps extends TypeSwitchAdmin {
  collection_id: string;
  image: File;
  title: string;
  external_url: string;
}

export default function AddMetadataCollection() {
  const { setValue, getValues, handleSubmit, reset, control, watch } =
    useForm<AddMetadataCollectionFieldProps>();

  const { collection_id, external_url, image, title } = watch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      onSubmit={handleSubmit(onOpen)}
      as="form"
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
        <TextInputMaxLength
          formState={{
            control,
            value: 'title',
            isInvalid: isNull(title),
            isRequired: true,
            max: 28,
          }}
          placeholder="Heroes & Empires"
          heading="Title"
        />
      </CardBox>

      <CardBox variant="createGames">
        <TextInputMaxLength
          formState={{
            control,
            value: 'external_url',
            isInvalid: isNull(external_url),
            isRequired: true,
          }}
          placeholder="https://songaming.io/1"
          heading="External URL"
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
        <AddMetadataCollectionModal
          reset={reset}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </Flex>
  );
}
