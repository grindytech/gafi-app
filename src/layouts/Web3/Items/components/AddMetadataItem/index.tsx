import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';
import TextInputMaxLength from 'components/TextInput/TextInputMaxLength';

import AddMetadataItemModal from './AddMetadataItemModal';
import UploadPicture from 'components/UploadPicture';

export interface AddMetadataItemFieldProps extends TypeSwitchAdmin {
  collection_id: number;
  item_id: number;
  title: string;
  image: File;
}

export default function AddMetadataItem() {
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMetadataItemFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
        <UploadPicture setValue={setValue} value="image" />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          value="collection_id"
          title="Collection ID"
          register={register}
          isInvalid={!!errors.collection_id}
          isRequired={true}
        />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          value="item_id"
          title="Item ID"
          register={register}
          isInvalid={!!errors.item_id}
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
        <AddMetadataItemModal onClose={onClose} getValues={getValues} />
      )}
    </Flex>
  );
}
