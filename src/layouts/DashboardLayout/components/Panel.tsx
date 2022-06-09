import { Box, Heading, Icon, IconButton } from '@chakra-ui/react';
import { mdiNearMe, mdiWeatherNight } from '@mdi/js';

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

const Panel = () => (
  <Box sx={PanelStyled}>
    <Box sx={{ display: 'flex' }}>
      <Heading>{'Hello, '}</Heading>
      <Heading ml={2} color="primary">
        Alex
      </Heading>
    </Box>
    <Box sx={actionsStyled}>
      {actions.map(action => (
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
      ))}
    </Box>
  </Box>
);

export default Panel;

const PanelStyled = {
  width: '100%',
  h: 20,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 8,
};

const actionsStyled = {
  display: 'flex',
};

const actionStyled = {
  bg: 'white',
  color: 'black',
  w: '56px',
  h: '56px',
  borderRadius: '50%',
};
