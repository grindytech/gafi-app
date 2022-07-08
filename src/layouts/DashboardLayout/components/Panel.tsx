import { Box, Heading, IconButton, useToken } from '@chakra-ui/react';
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
  const borderBottomColor = useToken('colors', 'borderBottom');
  return (
    <Box w="full">
      <Box
        sx={PanelStyled}
        borderBottom={{ base: `2px solid ${borderBottomColor}`, md: 'none' }}
      >
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
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
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            {t('HELLO')},
          </Heading>
          <Heading
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pb: { base: 4, lg: 'none' },
  px: { base: 4, lg: 6 },
  py: { base: 2, lg: 4 },

  bg: { base: 'white', md: 'transparent' },
};
