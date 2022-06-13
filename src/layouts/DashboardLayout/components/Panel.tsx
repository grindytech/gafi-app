import { Box, Heading, Icon, IconButton } from '@chakra-ui/react';
import { mdiNearMe, mdiWeatherNight } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

const actions = [
  {
    icon: mdiWeatherNight,
    bg: '#FFFFFF',
  },
  {
    icon: mdiNearMe,
    bg: '#FFFFFF',
  },
  {
    bg: 'url(/assets/layout/actionBg.png) no-repeat center',
  },
];

const Panel = () => {
  const userName = 'Alex';
  const { t } = useTranslation();
  return (
    <Box sx={PanelStyled}>
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
        {React.Children.toArray(
          actions.map(action => (
            <IconButton
              aria-label="Search database"
              icon={
                <Icon w={18} h={18}>
                  <path fill="currentColor" d={action.icon} />
                </Icon>
              }
              ml={4}
              sx={{ ...actionStyled, background: action.bg }}
            />
          ))
        )}
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
  p: 8,
};

const actionStyled = {
  bg: 'white',
  color: 'black',
  w: '56px',
  h: '56px',
  borderRadius: '50%',
};
