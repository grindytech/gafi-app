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
import PoolsModal from './PoolsModal';
import PoolsAdmin from './PoolsAdmin';
import { TypeCollaboratorsState } from 'layouts/Collaborators/CollaboratorsUtils';

export interface PoolsFieldProps {
  // general
  general_type: 'Dynamic Pool' | 'Stable Pool';
  general_title: string;
  general_duration: {
    time: number;
    text: string;
  };
  general_description: string;

  collaborator: TypeCollaboratorsState[number];

  // Add item
  add_item_fee: number;
  add_item_failed: number | undefined | null;
  add_item_supply?: {
    weight: number;
    amount: number | string;
    nft: {
      id: number;
      title: string;
      image: string;
    };
    collection: {
      id: number;
      title: string;
      image: string;
    };
  }[];
  add_item_dynamic?: PoolsFieldProps['add_item_supply'] | null;
  add_item_stable?: PoolsFieldProps['add_item_supply'] | null;
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
