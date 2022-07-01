import { useMediaQuery } from '@chakra-ui/react';

const useBreakPoint = () => {
  const [
    isMobile,
    isSmallScreen,
    isSuperSmallScreen,
    isTablet,
    isPC,
    isLargeScreen,
  ] = useMediaQuery([
    '(max-width: 739px)',
    '(min-width: 1024px) and (max-width: 1400px)',
    '(min-width: 1024px) and (max-width: 1156px)',
    '(min-width: 740px) and (max-width: 1024px)',
    '(min-width: 1024px)',
    '(min-width: 1400px)',
  ]);

  return {
    isMobile,
    isSmallScreen,
    isTablet,
    isPC,
    isLargeScreen,
    isSuperSmallScreen,
  };
};

export default useBreakPoint;
