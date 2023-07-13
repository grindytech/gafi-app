import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import UploadPicture from 'components/UploadPicture';
import CardBox from 'components/CardBox';
import TextInputMaxLength from 'components/TextInput/TextInputMaxLength';
import TextInput from 'components/TextInput';
import NumberInput from 'components/NumberInput';
import AddMetadataCollectionModal from './AddMetadataCollectionModal';

export interface AddMetadataCollectionFieldProps extends TypeSwitchAdmin {
  collection_id: string;
  image: File;
  title: string;
  external_url: string;
}

export default function AddMetadataCollection() {
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMetadataCollectionFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      onSubmit={handleSubmit(onOpen)}
      as="form"
      flexDirection="column"
      gap={3}
    >
      <SwitchAdmin
        setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
      />

      <CardBox variant="createGames">
        <UploadPicture setValue={setValue} value="image" />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          register={register}
          title="Collection ID"
          value="collection_id"
          isInvalid={!!errors.collection_id}
          isRequired={true}
        />
      </CardBox>

      <CardBox variant="createGames">
        <TextInputMaxLength
          register={register}
          value="title"
          title="Title"
          placeholder="Heroes & Empires"
          isInvalid={!!errors.title}
          isRequired={true}
          max={28}
        />
      </CardBox>

      <CardBox variant="createGames">
        <TextInput
          value="external_url"
          title="External URL"
          register={register}
          isInvalid={!!errors.external_url}
          placeholder="https://songaming.io/1"
          isRequired={true}
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
