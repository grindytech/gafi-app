import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { mdiArrowRightThin } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';

interface IProp {
  title: string;
  subTitle: string;
}

const Banner: React.FC<IProp> = ({ title, subTitle }) => {
  const { t } = useTranslation();
  return (
    <Card mb={4} sx={bannerStyled}>
      <Box>
        <Heading>{title}</Heading>
        <Text sx={subTitleStyled} fontSize="md">
          {subTitle}
        </Text>
      </Box>
      <Button
        variant="white"
        rightIcon={
          <Icon color="primary">
            <path fill="currentColor" d={mdiArrowRightThin} />
          </Icon>
        }
      >
        {t('MORE_DETAIL')}
      </Button>
    </Card>
  );
};

export default Banner;

const bannerStyled = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 200,
  bg: 'url(/assets/layout/upfront-banner-bg.png) no-repeat center',
  backgroundSize: 'cover',
  justifyContent: 'space-between',
  color: 'white',
};

const subTitleStyled = {
  width: '70%',
  mt: 4,
};
