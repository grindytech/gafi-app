import { Icon, IconButton, Input, InputGroup, VStack } from '@chakra-ui/react';
import { mdiClose } from '@mdi/js';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface IProps {
  fields: Array<any>;
  remove: (index: number) => void;
  register: UseFormRegister<any>;
}

const TargetFields: React.FC<IProps> = ({ fields, remove, register }) => {
  const a = 0;
  return (
    <VStack alignItems="flex-start">
      {fields.map((field, index) => (
        <InputGroup size="lg" display="flex" alignItems="center">
          <Input
            size="lg"
            key={field.id}
            sx={{
              borderRadius: '0.375rem 0 0 0.375rem',
            }}
            type="text"
            {...register(`targets.${index}.contractAddress` as const, {
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
      ))}
    </VStack>
  );
};

export default TargetFields;
