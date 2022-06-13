import { Button, Flex, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import { Trans } from 'react-i18next';

interface IProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalCount: number;
  resultsPerPage: number;
  totalPage: number;
  isLoading: boolean;
}

const Pagination = (props: IProps) => {
  const {
    currentPage,
    setCurrentPage,
    totalCount,
    resultsPerPage,
    totalPage,
    isLoading,
  } = props;
  const pageButtons = [];

  let startPage = currentPage < 5 ? 1 : currentPage - 2;
  let endPage = 4 + startPage;
  endPage = totalPage < endPage ? totalPage : endPage;
  const diff = startPage - endPage + 4;
  startPage -= startPage - diff > 0 ? diff : 0;
  if (startPage > 1) {
    pageButtons.push({
      pageNumber: 1,
    });

    pageButtons.push({
      pageNumber: '...',
    });
  }
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push({
      pageNumber: i,
    });
  }
  if (endPage < totalPage) {
    pageButtons.push({
      pageNumber: '...',
    });
    pageButtons.push({
      pageNumber: totalPage,
    });
  }

  const hanldleSwitchPage = (pageNumber: number) => {
    if (pageNumber <= totalPage && pageNumber >= 1) {
      setCurrentPage(pageNumber);
    }
    // call graphQL API to reload data of page number
  };
  const fromAmount = (currentPage - 1) * resultsPerPage + 1;
  const toAmount =
    currentPage * resultsPerPage > totalCount
      ? totalCount
      : currentPage * resultsPerPage;

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex pl={8} flex="6" justifyContent="flex-start">
        <SkeletonText isLoaded={!isLoading} noOfLines={2}>
          {currentPage * resultsPerPage < totalCount ? (
            <Text fontSize="md" fontWeight="normal">
              <Trans
                i18nKey="SHOW_FROM_A_TO_B_OF_C"
                values={{
                  fromAmount: fromAmount || 0,
                  toAmount: toAmount || 0,
                  totalCount: totalCount || 0,
                }}
                components={{ b: <Text as="span" fontSize="bold" /> }}
              />
            </Text>
          ) : (
            <Text fontSize="md" fontWeight="normal">
              <Trans
                i18nKey="SHOW_A_OF_A"
                values={{
                  totalCount: totalCount || 0,
                }}
                components={{ b: <Text as="span" fontSize="bold" /> }}
              />
            </Text>
          )}
        </SkeletonText>
      </Flex>
      <Flex flex="4" justifyContent="flex-end">
        <Skeleton isLoaded={!isLoading} height="20px">
          {!!totalCount && (
            <Button
              ml={3}
              size="sm"
              variant="smallPrimary"
              onClick={() => {
                hanldleSwitchPage(currentPage - 1);
              }}
              aria-label="previous page"
              leftIcon={<Icon size={1} path={mdiChevronLeft} />}
            >
              Previous
            </Button>
          )}
          {pageButtons.map(button => (
            <Button
              ml={3}
              size="sm"
              disabled={button.pageNumber === '...'}
              fontWeight="bold"
              variant={
                button.pageNumber === currentPage
                  ? 'smallPrimary'
                  : 'transparent'
              }
              onClick={() => {
                if (
                  button.pageNumber !== '...' &&
                  button.pageNumber !== currentPage
                ) {
                  hanldleSwitchPage(parseInt(button.pageNumber.toString()));
                }
              }}
            >
              {button.pageNumber}
            </Button>
          ))}
          {!!totalCount && (
            <Button
              ml={3}
              size="sm"
              variant="smallPrimary"
              onClick={() => {
                hanldleSwitchPage(currentPage + 1);
              }}
              aria-label="next page"
              rightIcon={<Icon size={1} path={mdiChevronRight} />}
            >
              Next
            </Button>
          )}
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
