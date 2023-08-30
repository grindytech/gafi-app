import { useNavigate } from 'react-router-dom';
import { Center, CenterProps, Icon, IconButton, Text } from '@chakra-ui/react';

import CloseIcon from 'public/assets/line/close.svg';

interface GoBackProps {
  heading: string;
  sx?: CenterProps;
}

export default function GoBack({ heading, sx }: GoBackProps) {
  const navigate = useNavigate();

  return (
    <Center justifyContent="space-between" mb={6} {...sx}>
      <Text color="primary.a.300" fontSize="lg" fontWeight="medium">
        {heading}
      </Text>

      <IconButton
        variant="unstyled"
        width={8}
        height={8}
        aria-label={`close-${heading}`}
        borderRadius="full"
        border="0.0625rem solid"
        borderColor="primary.a.400"
        color="white"
        icon={<Icon as={CloseIcon} width={5} height={5} />}
        onClick={() => {
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            // the current entry in the history stack will be replaced with the new one with { replace: true }
            navigate('/', { replace: true });
          }
        }}
      />
    </Center>
  );
}
