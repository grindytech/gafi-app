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
import { PoolsFieldProps } from '..';
import PoolsFailed from '../PoolsFailed';
import PoolsDynamicConfig from '../PoolsDynamic/PoolsDynamicConfig';
import PoolsStableConfig from '../PoolsStable/PoolsStableConfig';
import { useEffect } from 'react';
import PoolsType from '../PoolsType';

interface PoolsAddItemProps {
  register: UseFormRegister<PoolsFieldProps>;
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  errors: FieldErrors<PoolsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetProps {
  label: string;
  fieldName: keyof PoolsFieldProps;
  form: JSX.Element;
  isRequired?: boolean;
}

export default ({
  errors,
  register,
  setRequired,
  setValue,
  watch,
}: PoolsAddItemProps) => {
  const { general_type } = watch();

  const fieldsSet: fieldsSetProps[] = [
    {
      label: 'Pool type',
      fieldName: 'general_type',
      isRequired: true,
      form: <PoolsType setValue={setValue} watch={watch} />,
    },
    {
      label: 'Minning fee',
      fieldName: 'add_item_fee',
      isRequired: true,
      form: (
        <InputGroup>
          <Input
            variant="validate"
            placeholder="Enter mining fee"
            type="number"
            {...register('add_item_fee', { required: true })}
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
      fieldName: 'add_item_supply',
      isRequired: true,
      form: (
        <>
          {general_type === 'Dynamic Pool' && (
            <PoolsDynamicConfig
              register={register}
              setValue={setValue}
              watch={watch}
            />
          )}

          {general_type === 'Stable Pool' && (
            <PoolsStableConfig
              register={register}
              setValue={setValue}
              watch={watch}
            />
          )}

          <PoolsFailed watch={watch} setValue={setValue} register={register} />
        </>
      ),
    },
  ];

  useEffect(() => {
    watch(value => {
      const {
        add_item_dynamic,
        add_item_stable,
        add_item_fee,
        add_item_failed,
        general_type,
      } = value;

      const fieldsRequired = () => {
        const findRequired = fieldsSet.filter(() => {
          if (add_item_fee) {
            if (add_item_failed && !add_item_dynamic) return false;

            /*
                summary logic
                1. convert object 'add_item_dynamic' to an array { 1/2: value, 5/1: value} to [ {...spread} ]
                2. Get every field to contain value weight
                3. Check if the total field length of 'add_item_dynamic' than the total field contains weight length
                  that means returns true and when equal length will false (fieldsSet.filter need false)
            */
            if (general_type === 'Dynamic Pool' && add_item_dynamic) {
              const key = Object.values(add_item_dynamic);
              const weight = key.filter(meta => meta?.weight);

              return key.length > weight.length;
            }

            if (general_type === 'Stable Pool' && add_item_stable) {
              const key = Object.values(add_item_stable);
              const weight = key.filter(meta => meta?.weight);

              return key.length > weight.length;
            }
          }

          return true;
        });

        return findRequired.length;
      };

      setRequired(prev => ({
        ...prev,
        1: fieldsRequired(),
      }));
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
