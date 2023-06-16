import {
  Button,
  Flex,
  IconButton,
  Skeleton,
  SkeletonText,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface IProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalCount: number;
  resultsPerPage: number;
  isLoading: boolean;
}

const Pagination = (props: IProps) => {
  const { currentPage, setCurrentPage, totalCount, resultsPerPage, isLoading } =
    props;

  const { t } = useTranslation();

  const isZoomOutButton = useBreakpointValue({
    base: true,
    md: false,
  });

  const totalPage = Math.ceil(totalCount / resultsPerPage);

  const pageButtons = [];

  let startPage = currentPage < 3 ? 1 : currentPage - 1;
  let endPage = 2 + startPage;
  endPage = totalPage < endPage ? totalPage : endPage;
  const diff = startPage - endPage + 2;
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
    setCurrentPage(pageNumber);
  };

  const fromAmount = (currentPage - 1) * resultsPerPage + 1;
  const toAmount =
    currentPage * resultsPerPage > totalCount
      ? totalCount
      : currentPage * resultsPerPage;

  return (
    <Flex
      justifyContent="space-between"
      flexDirection={{
        base: 'column',
        md: 'row',
        lg: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'flex-end',
        md: 'center',
        lg: 'flex-end',
        xl: 'center',
      }}
    >
      <Flex
        pl={8}
        mb={{ base: 6, md: 0, lg: 6, xl: 0 }}
        flex="4"
        justifyContent="flex-start"
      >
        <SkeletonText isLoaded={!isLoading} noOfLines={1}>
          <Text
            data-testid="pagination-info"
            color="greyText"
            fontSize={{ sm: 'sm', md: 'md' }}
            fontWeight="normal"
            whiteSpace="nowrap"
          >
            {currentPage * resultsPerPage < totalCount ? (
              <Trans
                i18nKey="SHOW_FROM_A_TO_B_OF_C"
                values={{
                  fromAmount: fromAmount || 0,
                  toAmount: toAmount || 0,
                  totalCount: totalCount || 0,
                }}
                components={{ b: <Text as="span" fontSize="bold" /> }}
              />
            ) : (
              <Trans
                i18nKey="SHOW_A_OF_A"
                values={{
                  totalCount: totalCount || 0,
                }}
                components={{ b: <Text as="span" fontSize="bold" /> }}
              />
            )}
          </Text>
        </SkeletonText>
      </Flex>
      <Flex flex="14" justifyContent="flex-end">
        <Skeleton isLoaded={!isLoading}>
          <Button
            ml={{ base: 1, xl: 2 }}
            size="sm"
            variant="primary"
            disabled={currentPage === 1 || totalCount === 0}
            onClick={() => {
              hanldleSwitchPage(currentPage - 1);
            }}
            aria-label="previous page"
            leftIcon={<Icon size={1} path={mdiChevronLeft} />}
          >
            {t('PREVIOUS')}
          </Button>

          {React.Children.toArray(
            pageButtons.map(button => (
              <Button
                ml={{ base: 1, xl: 2 }}
                size="sm"
                disabled={button.pageNumber === '...'}
                fontWeight="bold"
                variant={
                  button.pageNumber === currentPage ? 'primary' : 'transparent'
                }
                onClick={() => {
                  if (
                    button.pageNumber !== '...' &&
                    button.pageNumber !== currentPage
                  ) {
                    hanldleSwitchPage(
                      parseInt(button.pageNumber.toString(), 10)
                    );
                  }
                }}
              >
                {button.pageNumber}
              </Button>
            ))
          )}
          {isZoomOutButton ? (
            <IconButton
              aria-label="pre-page"
              p={4}
              ml={{ base: 8, xl: 2 }}
              size="sm"
              variant="primary"
              disabled={currentPage === totalPage || totalCount === 0}
              onClick={() => {
                hanldleSwitchPage(currentPage + 1);
              }}
              icon={<Icon size={1} path={mdiChevronRight} />}
            />
          ) : (
            <Button
              ml={{ base: 1, xl: 2 }}
              size="sm"
              variant="primary"
              disabled={currentPage === totalPage || totalCount === 0}
              onClick={() => {
                hanldleSwitchPage(currentPage + 1);
              }}
              aria-label="next page"
              rightIcon={<Icon size={1} path={mdiChevronRight} />}
            >
              {t('NEXT')}
            </Button>
          )}
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
