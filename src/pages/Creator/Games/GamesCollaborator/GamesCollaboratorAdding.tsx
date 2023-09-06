import {
  Box,
  Button,
  Center,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
  Text,
} from '@chakra-ui/react';

import SettingIcon from 'public/assets/line/setting.svg';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';

interface GamesCollaboratorAddingProps {
  length_collaborator: number;
  options: string[];
}

export default ({
  length_collaborator,
  options,
}: GamesCollaboratorAddingProps) => {
  return (
    <Center justifyContent="space-between" mb={2}>
      <Text color="shader.a.300" fontWeight="medium">
        Collaborators&nbsp;
        <Text as="span" color="primary.a.300" fontWeight="normal">
          {length_collaborator}
        </Text>
      </Text>

      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            variant="unstyled"
            color="primary.a.300"
            fontWeight="medium"
            iconSpacing={1}
            leftIcon={<Icon as={SettingIcon} width={4} height={4} />}
          >
            Settings
          </Button>
        </PopoverTrigger>

        <PopoverContent
          border="0.0625rem solid"
          borderColor="shader.a.800"
          bg="shader.a.900"
          borderRadius="xl"
        >
          <PopoverHeader
            padding={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="white"
            borderBottom="0.0625rem solid"
            borderColor="shader.a.800"
          >
            <Text fontWeight="medium">Add Accept Adding</Text>

            <PopoverCloseButton position="unset" width={5} height={5} />
          </PopoverHeader>

          <PopoverBody padding={4} bg={convertHex(colors.shader.a[800], 0.25)}>
            {options.map(meta => (
              <Center
                key={meta}
                justifyContent="space-between"
                _notFirst={{
                  mt: 4,
                }}
              >
                <Text fontWeight="medium" color="shader.a.500">
                  {meta}
                </Text>

                <Box
                  sx={{
                    span: {
                      '--switch-bg': '#71717A',
                      border: '0.0625rem solid',
                      borderColor: 'shader.a.600',
                      borderRadius: 'xl',
                      padding: 1,

                      '&[data-checked]': {
                        '--switch-bg': '#2A7AD7',
                      },
                    },
                  }}
                >
                  <Switch id="isReadOnly" />
                </Box>
              </Center>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};
