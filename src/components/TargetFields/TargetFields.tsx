import { Icon, IconButton, Input, InputGroup, VStack } from '@chakra-ui/react';
import { mdiClose } from '@mdi/js';
import React from 'react';
import { FieldArrayWithId, FieldPath, UseFormRegister } from 'react-hook-form';

interface IForm {
  targets: { contractAddress: string }[];
}

interface IProps<T> {
  fields: FieldArrayWithId<T>[];
  remove: (index: number) => void;
  register: UseFormRegister<T>;
}

const TargetFields = <T extends IForm>({
  fields,
  remove,
  register,
}: IProps<T>) => (
  <VStack alignItems="flex-start">
    {React.Children.toArray(
      fields.map((field, index) => (
        <InputGroup size="lg" display="flex" alignItems="center">
          <Input
            size="lg"
            key={field.id}
            sx={{
              borderRadius: '0.375rem 0 0 0.375rem',
            }}
            type="text"
            {...register(`targets.${index}.contractAddress` as FieldPath<T>, {
              required: true,
            })}
          />
          <IconButton
            display={fields.length === 1 ? 'none' : 'flex'}
            onClick={() => remove(index)}
            sx={{
              borderRadius: '0 0.375rem 0.375rem 0',
            }}
            aria-label="remove target"
            variant="delete"
            icon={
              <Icon>
                <path fill="currentColor" d={mdiClose} />
              </Icon>
            }
          />
        </InputGroup>
      ))
    )}
  </VStack>
);

export default TargetFields;
