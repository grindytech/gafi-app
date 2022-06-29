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
            display: 'flex',
          }}
        >
          <Heading fontSize={{ base: '2xl', tablet: '3xl', pc: '4xl' }}>
            {t('HELLO')},
          </Heading>
          <Heading
            fontSize={{ base: '2xl', tablet: '3xl', pc: '4xl' }}
            ml={2}
            color="primary"
          >
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
  pb: { base: 4, pc: 'none' },
  p: { base: 4, pc: 8 },
  borderBottom: { base: '2px solid #EEF1FF', pc: 'none' },
  bg: { base: 'white', tablet: 'transparent' },
};
