import { Box, Button, Center, Flex, VStack, useSteps } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import StepValidate from 'components/StepValidate';
import React from 'react';

import GoBack from 'components/GoBack';
import DefaultForm from 'layouts/DefaultLayout/DefaultForm';
import Owner from 'layouts/Owner';
import NFTsGeneral from './NFTsGeneral';

import NFTsMedia from './NFTsMedia';

import { TypeMetaCollection } from 'types/meta.type.ts';
import NFTsModal from './NFTsModal';

export interface NFTsFieldProps {
  // general
  general_nft_title: string;
  general_nft_id: number;
  general_amount: number | null;
  general_description: string;
  general_external_url: string;
  general_join_collection: {
    collection_id: number;
    option?: TypeMetaCollection;
  };

  // media
  media_avatar: File;
}

export default () => {
  const {
    register,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<NFTsFieldProps>();

  const [required, setRequired] = React.useState<Record<number, number>>({});

  const steps = [
    {
      id: 0,
      heading: 'General info',
      element: (
        <NFTsGeneral
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
        <NFTsMedia
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
      <GoBack heading="Create NFT" />

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

              <NFTsModal
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

        <Box>
          <Owner />
        </Box>
      </DefaultForm>
    </>
  );
};
