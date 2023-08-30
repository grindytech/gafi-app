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
    <Stepper justifyContent="unset" index={activeStep}>
      {steps.map((step, index) => (
        <Step style={{ flex: 'unset' }} key={index}>
          <StepIndicator
            width="auto"
            height="auto"
            border="0.125rem solid transparent"
            transitionDuration="ultra-slow"
            cursor="pointer"
            fontSize="sm"
            px={3}
            py={2}
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
                bg: 'shader.a.600',
                color: 'shader.a.500',
              },
            }}
          >
            <StepStatus active={step} complete={step} incomplete={step} />
          </StepIndicator>

          <Icon
            as={Chevron01Icon}
            width={4}
            height={4}
            transform="rotate(-90deg)"
            color="shader.a.700"
          />
        </Step>
      ))}
    </Stepper>
  );
};
