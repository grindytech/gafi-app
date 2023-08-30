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

import Collaborators from 'layouts/Collaborators';
import GoBack from 'components/GoBack';
import DefaultForm from 'layouts/DefaultLayout/DefaultForm';
import CollectionsGeneral from './CollectionsGeneral';
import CollectionsMedia from './CollectionsMedia';
import CollectionsModal from './CollectionsModal';
import Owner from 'layouts/Owner';

export interface CollectionsFieldProps {
  general_collection_title: string;
  general_description: string;
  general_external_url: string;
  general_join_game: { game_id: number }[];

  // media
  media_avatar: File | undefined;
  media_banner: File | undefined;
  media_cover: File | undefined;
}

export default () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
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

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
  });
  console.log(watch());

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
                watch={watch}
                isDisabled={
                  activeStep !== steps.length - 1 || !!required[activeStep]
                }
              />
            </Center>
          </VStack>
        </Box>

        <Stack spacing={6}>
          <Owner />

          <Collaborators setValue={setValue} />
        </Stack>
      </DefaultForm>
    </>
  );
};
