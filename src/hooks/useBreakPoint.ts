import { useMediaQuery } from '@chakra-ui/react';

const useBreakPoint = () => {
  const [
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
    isDoubleExtraLargeSceen,
  ] = useMediaQuery([
    '(max-width: 767px)',
    '(min-width: 768px) and (max-width: 959px)',
    '(min-width: 960px) and (max-width: 1199px)',
    '(min-width: 1200px) and (max-width: 1535px)',
    '(min-width: 1536px)',
  ]);

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
    isDoubleExtraLargeSceen,
  };
};

export default useBreakPoint;
