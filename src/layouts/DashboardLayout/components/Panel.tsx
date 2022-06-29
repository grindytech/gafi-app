import { Box, Heading, IconButton } from '@chakra-ui/react';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import UserMenu from './UserMenu';

interface IProps {
  onOpen: () => void;
}

const Panel = ({ onOpen }: IProps) => {
  const userName = 'Alex';
  const { t } = useTranslation();
  return (
    <Box w="full">
      <Box sx={PanelStyled}>
        <IconButton
          display={{ base: 'flex', pc: 'none' }}
          onClick={onOpen}
          variant="transparents"
          aria-label="open menu"
          size="lg"
          color="primary"
          icon={<Icon size={1.5} path={mdiMenu} />}
        />
        <Box
          sx={{
            display: { base: 'none', tablet: 'flex' },
          }}
        >
          <Heading>{t('HELLO')},</Heading>
          <Heading ml={2} color="primary">
            {userName}
          </Heading>
        </Box>

        <Box
          sx={{
            display: 'flex',
          }}
        >
          <UserMenu />
        </Box>
      </Box>
      <Box
        sx={{
          mt: 4,
          display: { base: 'flex', tablet: 'none' },
        }}
      >
        <Heading>{t('HELLO')},</Heading>
        <Heading ml={2} color="primary">
          {userName}
        </Heading>
      </Box>
    </Box>
  );
};

export default Panel;

const PanelStyled = {
  width: '100%',
  h: { base: 16, pc: 20 },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pb: { base: 4, pc: 'none' },
  p: { base: 'none', pc: 8 },
  borderBottom: { base: '2px solid #EEF1FF', pc: 'none' },
};
