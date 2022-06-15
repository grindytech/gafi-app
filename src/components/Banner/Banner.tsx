import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { mdiArrowRightThin } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';

interface IProp {
  title: string;
  subTitle: string;
  bannerBg: string;
  btnLink?: string;
}

const Banner: React.FC<IProp> = ({ title, subTitle, bannerBg, btnLink }) => {
  const { t } = useTranslation();
  return (
    <Card
      mb={4}
      sx={{ ...bannerStyled, bg: `url(${bannerBg}) no-repeat center` }}
    >
      <Box>
        <Heading>{title}</Heading>
        <Text sx={subTitleStyled} fontSize="md">
          {subTitle}
        </Text>
      </Box>
      {btnLink && (
        <Button
          as="a"
          variant="white"
          target="_blank"
          href={btnLink}
          rightIcon={
            <Icon color="primary">
              <path fill="currentColor" d={mdiArrowRightThin} />
            </Icon>
          }
        >
          {t('MORE_DETAIL')}
        </Button>
      )}
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
