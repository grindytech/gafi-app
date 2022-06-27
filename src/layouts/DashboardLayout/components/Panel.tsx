import { Box, Heading, Icon, IconButton } from '@chakra-ui/react';
import { mdiMenu } from '@mdi/js';
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
    <Box sx={PanelStyled}>
      <IconButton
        display={{ base: 'flex', pc: 'none' }}
        onClick={onOpen}
        w={16}
        h={16}
        variant="transparents"
        aria-label="open menu"
        icon={
          <Icon color="primary">
            <path fill="currentColor" d={mdiMenu} />
          </Icon>
        }
      />
      <Box sx={{ display: 'flex' }}>
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
  );
};

export default Panel;

const PanelStyled = {
  width: '100%',
  h: 20,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: { base: 'none', pc: 8 },
};
