import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PoolsFieldProps, PoolsFieldSetProps } from '..';
import PoolsFailed from './PoolsFailed';
import PoolsType from './PoolsType';
import PoolsNormal from './PoolsNormal';
import { useEffect } from 'react';
import { validateLength } from 'utils/utils.validate';

interface PoolsAddItemProps {
  register: UseFormRegister<PoolsFieldProps>;
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  errors: FieldErrors<PoolsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export default ({
  errors,
  register,
  setRequired,
  setValue,
  watch,
}: PoolsAddItemProps) => {
  const fieldsSet: PoolsFieldSetProps[] = [
    {
      label: 'Pool type',
      fieldName: 'type_pool',
      isRequired: true,
      form: <PoolsType setValue={setValue} watch={watch} />,
    },
    {
      label: 'Minning fee',
      fieldName: 'minting_fee',
      isRequired: true,
      form: (
        <InputGroup>
          <Input
            variant="validate"
            placeholder="Enter mining fee"
            type="number"
            {...register('minting_fee', { required: true })}
          />

          <InputRightAddon
            color="white"
            fontWeight="medium"
            background="unset"
            bg="shader.a.900"
            border="unset"
          >
            GAFI
          </InputRightAddon>
        </InputGroup>
      ),
    },
    {
      label: 'Supply',
      fieldName: 'supply',
      isRequired: true,
      form: (
        <>
          <PoolsNormal register={register} setValue={setValue} watch={watch} />

          <PoolsFailed watch={watch} setValue={setValue} register={register} />
        </>
      ),
    },
  ];

  // first validate
  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 1,
    });
  }, []);

  useEffect(() => {
    watch(({ failed, type_pool, minting_fee, supply }) => {
      const product = Object.values(
        supply?.[type_pool as keyof typeof supply] || []
      );

      const findRequired = fieldsSet.filter(() => {
        if (!minting_fee) return true;

        if (product?.length)
          return product?.filter(meta => !meta?.weight).length;

        if (failed) return false;

        return true;
      });

      setRequired({
        1: findRequired.length,
      });
    });
  }, [watch]);

  return fieldsSet.map(meta => (
    <FormControl isInvalid={!!errors[meta.fieldName]} key={meta.fieldName}>
      <FormLabel fontSize="sm" fontWeight="medium" color="shader.a.400">
        {meta.label}

        {meta.isRequired && (
          <Text as="span" color="primary.a.400" fontWeight="medium">
            &nbsp;*
          </Text>
        )}
      </FormLabel>

      {meta.form}
    </FormControl>
  ));
};
