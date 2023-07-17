import React, { useRef } from 'react';
import NextIcon from 'public/assets/line/chevron-01.svg';
import { Swiper } from 'swiper/react';
// Core modules imports are same as usual
import { Navigation, Mousewheel } from 'swiper';
import { Box, BoxProps, Button, ButtonProps, Icon } from '@chakra-ui/react';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css/mousewheel';
interface IProps {
  children: React.ReactNode;
  options?: SwiperOptions;
  styleButton?: ButtonProps;
  sxProps?: BoxProps;
}
const Carousel = ({ children, options, styleButton, sxProps }: IProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Box
        position="relative"
        sx={{
          _hover: {
            '.btn-carousel': {
              opacity: 1,
              visibility: 'visible',
            },
          },
        }}
      >
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
              slidesPerView: 1.1,
              spaceBetween: 10,
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
            paddingBottom: '1rem',
          }}
          {...options}
        >
          {children}
        </Swiper>
        <Box
          display="flex"
          opacity={0}
          visibility="hidden"
          className="btn-carousel"
          transition="visibility 0.3s , opacity 0.3s ease-in-out"
          justifyContent="space-between"
          width="100%"
          position="absolute"
          sx={{
            top: '50%',
            zIndex: 10,
          }}
          {...sxProps}
        >
          <Button
            ref={prevRef}
            variant="navigation"
            sx={{
              left: { md: '-1.25rem', base: '-0.75rem' },
            }}
            color="primary.a.500"
            {...styleButton}
          >
            <Icon as={NextIcon} height={6} w={6} transform="rotate(90deg)" />
          </Button>
          <Button
            ref={nextRef}
            variant="navigation"
            sx={{
              right: { md: '-1.25rem', base: '-0.75rem' },
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
