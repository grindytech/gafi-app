import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { mdiChevronRight } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import useAnalyticsEventTracker from 'hooks/useAnalyticsEventTracker';

interface IProp {
  title: string;
  subTitle: string;
  bannerBg: string;
  btnLink?: string;
}

const Banner: React.FC<IProp> = ({ title, subTitle, bannerBg, btnLink }) => {
  const { t } = useTranslation();
  const gaEventTracker = useAnalyticsEventTracker('Banner');
  const isDisplaySmallBtn = useBreakpointValue({
    sm: true,
    md: false,
    lg: true,
    xl: false,
  });
  return (
    <Box p={{ sm: 4, md: 0 }} bg={{ sm: 'white', md: 'transparent' }}>
      <Card
        mb={{ sm: 0, md: 4 }}
        sx={{ ...bannerStyled, bg: `url(${bannerBg}) no-repeat center` }}
      >
        <Box w="80%">
          <Heading
            sx={{
              fontSize: { base: 'md', md: '4xl' },
            }}
          >
            {title}
          </Heading>
          <Text sx={subTitleStyled}>{subTitle}</Text>
        </Box>
        {btnLink && !isDisplaySmallBtn ? (
          <Button
            as="a"
            variant="white"
            target="_blank"
            onClick={() => {
              gaEventTracker('more detail');
            }}
            href={btnLink}
            mt={{ base: 8, md: 0 }}
            rightIcon={
              <Icon color="primary">
                <path fill="currentColor" d={mdiChevronRight} />
              </Icon>
            }
          >
            {t('MORE_DETAIL')}
          </Button>
        ) : (
          <IconButton
            as="a"
            w={10}
            h={10}
            borderRadius="50%"
            aria-label="see-more-btn"
            target="_blank"
            href={btnLink}
            variant="white"
            icon={
              <Icon color="primary">
                <path fill="currentColor" d={mdiChevronRight} />
              </Icon>
            }
          />
        )}
      </Card>
    </Box>
  );
};

export default Banner;

const bannerStyled = {
  px: { sm: 6, md: 8 },
  py: { sm: 8, md: 12 },
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  bg: 'url(/assets/layout/upfront-banner-bg.png) no-repeat center',
  backgroundSize: 'cover',
  justifyContent: 'space-between',
  color: 'white',
};

const subTitleStyled = {
  width: { base: 48, md: '90%', '2xl': '70%' },
  mt: 4,
  color: 'white',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: { base: 'nowrap', md: 'normal' },
};
