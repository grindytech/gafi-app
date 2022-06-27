import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
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
  const [isSmallsceen] = useMediaQuery(
    '(min-width: 1024px) and (max-width: 1200px)'
  );
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
      {btnLink && !isSmallsceen ? (
        <Button
          as="a"
          variant="white"
          target="_blank"
          href={btnLink}
          mt={{ base: 8, tablet: 0 }}
          rightIcon={
            <Icon color="primary">
              <path fill="currentColor" d={mdiArrowRightThin} />
            </Icon>
          }
        >
          {t('MORE_DETAIL')}
        </Button>
      ) : (
        <IconButton
          as="a"
          p={4}
          borderRadius="50%"
          aria-label="see-more-btn"
          target="_blank"
          href={btnLink}
          variant="white"
          icon={
            <Icon color="primary">
              <path fill="currentColor" d={mdiArrowRightThin} />
            </Icon>
          }
        />
      )}
    </Card>
  );
};

export default Banner;

const bannerStyled = {
  display: 'flex',
  flexDirection: { base: 'column', tablet: 'row' },
  alignItems: 'center',
  bg: 'url(/assets/layout/upfront-banner-bg.png) no-repeat center',
  backgroundSize: 'cover',
  justifyContent: 'space-between',
  color: 'white',
};

const subTitleStyled = {
  width: { base: '90%', '2xl': '70%' },
  mt: 4,
};
