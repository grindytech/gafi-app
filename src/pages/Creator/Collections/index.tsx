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
import CollectionsGeneral from './CollectionsGeneral';
import CollectionsMedia from './CollectionsMedia';
import CollectionsModal from './CollectionsModal';
import Owner from 'layouts/Owner';

import CollectionAdmin from './CollectionAdmin';

import { TypeMetaCollection, TypeMetaGame } from 'types/meta.type.ts';
import { TypeCollaboratorState } from 'types/collaborator.type';

export interface CollectionsFieldProps
  extends Omit<TypeMetaCollection, 'logo' | 'banner' | 'cover' | 'game'> {
  //general
  john_game?: {
    id: number;
    meta?: TypeMetaGame;
  };

  // media
  logo: File;
  banner?: File;
  cover?: File;

  // common
  collaborator: TypeCollaboratorState;
}

export interface CollectionsFieldSetProps {
  label: string;
  fieldName: keyof CollectionsFieldProps;
  form: JSX.Element;
  isRequired?: boolean;
  isValue?: boolean;
}

export default () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CollectionsFieldProps>();

  const [required, setRequired] = React.useState<Record<number, number>>({});

  const steps = [
    {
      id: 0,
      heading: 'General info',
      element: (
        <CollectionsGeneral
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
      heading: 'Media data',
      element: (
        <CollectionsMedia
          setValue={setValue}
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
      <GoBack heading="Create Collection" />

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

              <CollectionsModal
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

          <CollectionAdmin setValue={setValue} watch={watch} />
        </Stack>
      </DefaultForm>
    </>
  );
};
