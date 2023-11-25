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

import GamesGeneral from './GamesGeneral';
import GamesModal from './GamesModal';

import GoBack from 'components/GoBack';
import DefaultForm from 'layouts/DefaultLayout/DefaultForm';
import Owner from 'layouts/Owner';
import GamesCollaborator from './GamesCollaborator';
import { TypeCollaboratorState } from 'types/collaborator.type';
import { TypeMetaGame } from 'types/meta.type.ts';
import GamesMedia from './GamesMedia';

export interface GamesFieldProps
  extends Omit<TypeMetaGame, 'logo' | 'banner' | 'cover'> {
  // media
  logo: File;
  banner?: File;
  cover?: File;

  // common
  collaborator: TypeCollaboratorState[number];
}

export interface GamesFieldSetProps {
  label: string;
  fieldName: keyof GamesFieldProps;
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
    reset,
    getValues,
  } = useForm<GamesFieldProps>();

  const [required, setRequired] = React.useState<Record<number, number>>({});

  const steps = [
    {
      id: 0,
      heading: 'General info',
      element: (
        <GamesGeneral
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
          setRequired={setRequired}
        />
      ),
    },
    {
      id: 1,
      heading: 'Media data',
      element: (
        <GamesMedia
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
      <GoBack heading="Create Game" />

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

              <GamesModal
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

          <GamesCollaborator setValue={setValue} watch={watch} />
        </Stack>
      </DefaultForm>
    </>
  );
};
