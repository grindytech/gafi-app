import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  VStack,
  useSteps,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import StepValidate from 'components/StepValidate';
import React from 'react';

import GoBack from 'components/GoBack';
import DefaultForm from 'layouts/DefaultLayout/DefaultForm';
import Owner from 'layouts/Owner';
import PoolsGeneral from './PoolsGeneral';
import PoolsAddItem from './PoolsAddItem';
import PoolsModal from './PoolModal';
import PoolsAdmin from './PoolsAdmin';
import { TypeCollaboratorState } from 'types/collaborator.type';
import {
  TypeMetaCollection,
  TypeMetaNFT,
  TypeMetaPool,
} from 'types/meta.type.ts';

export type PoolsProductType = {
  weight: number; // failed
  amount: number | null;
  nft: TypeMetaNFT & {
    id: number;
  };
  collection: TypeMetaCollection & {
    id: number;
  };
};

export interface PoolsFieldProps
  extends Omit<TypeMetaPool, 'supply' | 'begin_at' | 'end_at'> {
  // general
  duration: {
    time: number;
    text: string;
  };

  // common
  collaborator: TypeCollaboratorState[number];

  // Add item
  failed: number | undefined | null;

  supply?: Record<
    TypeMetaPool['type_pool'],
    | PoolsProductType[]
    | null // null mean variable not exist
    | undefined // undefined mean variable exist but not have value
  >;
}

export interface PoolsFieldSetProps {
  label: string;
  fieldName: keyof PoolsFieldProps;
  form: JSX.Element;
  isRequired?: boolean;
  isValue?: boolean;
}

export default () => {
  const {
    register,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<PoolsFieldProps>();

  const [required, setRequired] = React.useState<Record<number, number>>({});

  const steps = [
    {
      id: 0,
      heading: 'General info',
      element: (
        <PoolsGeneral
          setValue={setValue}
          errors={errors}
          register={register}
          watch={watch}
          setRequired={setRequired}
        />
      ),
    },
    {
      id: 1,
      heading: 'Add item',
      element: (
        <PoolsAddItem
          setValue={setValue}
          errors={errors}
          register={register}
          watch={watch}
          setRequired={setRequired}
        />
      ),
    },
  ];

  const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
    index: 0,
  });

  return (
    <>
      <GoBack heading="Create mint pool" />

      <StepValidate
        activeStep={activeStep}
        steps={steps.map(meta => meta.heading)}
      />

      <DefaultForm>
        <Box>
          <VStack spacing={6} as="form">
            {React.Children.toArray(
              steps.map(meta => (meta.id === activeStep ? meta.element : null))
            )}

            <Center justifyContent="space-between" width="full">
              <Flex gap={2}>
                <Button
                  variant="primary"
                  isDisabled={activeStep === 0}
                  onClick={() => goToPrevious()}
                >
                  Previous
                </Button>

                <Button
                  variant="primary"
                  isDisabled={
                    activeStep === steps.length - 1 || !!required[activeStep]
                  }
                  onClick={() => goToNext()}
                >
                  Next
                </Button>
              </Flex>

              <PoolsModal
                getValues={getValues}
                onSuccess={() => {
                  setActiveStep(0);
                  reset();
                }}
                isDisabled={
                  activeStep !== steps.length - 1 || !!required[activeStep]
                }
              />
            </Center>
          </VStack>
        </Box>

        <Stack spacing={6}>
          <Owner />

          <PoolsAdmin setValue={setValue} watch={watch} />
        </Stack>
      </DefaultForm>
    </>
  );
};
