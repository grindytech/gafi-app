import {
  Icon,
  Step,
  StepIndicator,
  StepStatus,
  Stepper,
} from '@chakra-ui/react';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';

interface StepValidateProps {
  activeStep: number;
  steps: string[];
}

export default ({ steps, activeStep }: StepValidateProps) => {
  return (
    <Stepper gap={2} justifyContent="unset" index={activeStep}>
      {steps.map((step, index) => (
        <Step style={{ flex: 'unset' }} key={index}>
          <StepIndicator
            width="auto"
            height={8}
            border="0.125rem solid transparent"
            transitionDuration="ultra-slow"
            cursor="pointer"
            fontSize="sm"
            px={3}
            sx={{
              '&[data-status=active]': {
                borderColor: 'primary.a.500',
                color: 'white',
              },
              '&[data-status=complete]': {
                bg: 'primary.a.500',
                color: 'white',
              },
              '&[data-status=incomplete]': {
                bg: 'shader.a.700',
                color: 'shader.a.500',
              },
            }}
          >
            <StepStatus active={step} complete={step} incomplete={step} />
          </StepIndicator>

          {index < steps.length - 1 ? (
            <Icon
              as={Chevron01Icon}
              width={4}
              height={4}
              transform="rotate(-90deg)"
              color={activeStep === index ? 'shader.a.700' : 'primary.a.500'}
            />
          ) : null}
        </Step>
      ))}
    </Stepper>
  );
};
