import React, { useRef } from 'react';
import NextIcon from 'public/assets/line/chevron-01.svg';
import { Swiper } from 'swiper/react';
// Core modules imports are same as usual
import { Navigation, Mousewheel } from 'swiper';

import { Box, Button, ButtonProps, Icon } from '@chakra-ui/react';

import { SwiperOptions } from 'swiper/types';
import 'swiper/css/mousewheel';
interface IProps {
  children: React.ReactNode;
  options?: SwiperOptions;
  styleButton?: ButtonProps;
}
const Carousel = ({ children, options, styleButton }: IProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Box position="relative">
        <Swiper
          // install Swiper modules
          spaceBetween={20}
          slidesPerView={4}
          modules={[Navigation, Mousewheel]}
          mousewheel={{
            forceToAxis: true,
          }}
          navigation={{
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            prevEl: prevRef.current!,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            nextEl: nextRef.current!,
          }}
          onInit={swiper => {
            //  @typescript-eslint/ban-ts-comment
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined
              //  @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              //  @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;

              // Re-init navigation
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            630: {
              slidesPerView: 2,
            },
            920: {
              slidesPerView: 3,
            },

            1280: {
              slidesPerView: 4,
            },
          }}
          style={{
            position: 'relative',
          }}
          {...options}
        >
          {children}
        </Swiper>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          position="absolute"
          sx={{
            top: '50%',
            zIndex: 10,
          }}
        >
          <Button
            ref={prevRef}
            variant="navigation"
            sx={{
              left: '-20px',
            }}
            {...styleButton}
            color="primary.a.500"
          >
            <Icon as={NextIcon} height={6} w={6} transform="rotate(90deg)" />
          </Button>
          <Button
            ref={nextRef}
            variant="navigation"
            sx={{
              right: '-20px',
            }}
            color="primary.a.500"
            {...styleButton}
          >
            <Icon as={NextIcon} height={6} w={6} transform="rotate(-90deg)" />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Carousel;
