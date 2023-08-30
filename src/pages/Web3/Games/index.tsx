import { Box, Button, Center, Flex, VStack, useSteps } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import StepValidate from 'components/StepValidate';
import React from 'react';

import GamesGeneral from './GamesGeneral';
import GamesMeta from './GamesMeta';
import GamesModal from './GamesModal';
import Collaborators from 'layouts/Collaborators';
import GoBack from 'components/GoBack';
import DefaultForm from 'layouts/DefaultLayout/DefaultForm';

export interface GamesFieldProps {
  general_game_title: string;
  general_categories: string;
  general_description: string;
  general_website: string;
  general_twitter: string;
  general_discord: string;

  // media
  media_avatar: File | undefined;
  media_banner: File | undefined;
  media_cover: File | undefined;

  collaborators: {
    address: string;
    role: string;
  }[];
}

export interface fieldsSetProps {
  label: string;
  fieldName: keyof GamesFieldProps;
  form: JSX.Element;
  isRequired?: boolean;
}

export default () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
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
        <GamesMeta
          setValue={setValue}
          watch={watch}
          setRequired={setRequired}
        />
      ),
    },
  ];

  const { activeStep, goToNext, goToPrevious } = useSteps({
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

            <Center justifyContent="space-between">
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
                watch={watch}
                isDisabled={
                  activeStep !== steps.length - 1 || !!required[activeStep]
                }
              />
            </Center>
          </VStack>
        </Box>

        <Box>
          <Collaborators setValue={setValue} />
        </Box>
      </DefaultForm>
    </>
  );
};
