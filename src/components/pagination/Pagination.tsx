import { Button, Flex, Text } from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import { Trans } from 'react-i18next';

interface IProps {
  currentPage: number;
  setCurrentPage: any;
  totalCount: number;
  resultsPerPage: number;
  totalPage: number;
}

const Pagination = (props: IProps) => {
  const { currentPage, setCurrentPage, totalCount, resultsPerPage, totalPage } =
    props;
  const pageButtons = [];
  for (let i = 1; i <= totalPage; i++) {
    if (totalPage > 7) {
      if (currentPage < 5) {
        if (i > 5 && i === totalPage) {
          pageButtons.push({
            pageNumber: '...',
          });
        }
        if (i > 5 && i < totalPage) {
          continue;
        }
      }

      if (currentPage >= 5 && currentPage < totalPage - 3) {
        if (i > 1 && i === currentPage - 2) {
          pageButtons.push({
            pageNumber: '...',
          });
        }
        if (i > 1 && i <= currentPage - 2) {
          continue;
        }

        if (i < totalPage && i === totalPage - 1) {
          pageButtons.push({
            pageNumber: '...',
          });
        }
        if (i < totalPage && i >= currentPage + 2) {
          continue;
        }
      }

      if (currentPage >= totalPage - 3) {
        if (i < totalPage - 4 && i === 2) {
          pageButtons.push({
            pageNumber: '...',
          });
        }
        if (i < totalPage - 4 && i > 1) {
          continue;
        }
      }
    }
    pageButtons.push({
      pageNumber: i,
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
      <Flex flex="8" justifyContent="flex-start">
        {currentPage * resultsPerPage < totalCount ? (
          <Text>
            <Trans
              inline="SHOW_FROM_A_TO_B_OF_C"
              fromAmount={fromAmount || 0}
              toAmount={toAmount || 0}
              totalCount={totalCount || 0}
            >
              Showing <b> {{ fromAmount }} </b> to <b> {{ toAmount }} </b> of{' '}
              <b> {{ totalCount }} </b> results
            </Trans>
          </Text>
        ) : (
          <Text>
            <Trans inline="SHOW_A_OF_A" totalCount={totalCount || 0}>
              Showing <b> {{ totalCount }} </b> of <b> {{ totalCount }} </b>{' '}
              results
            </Trans>
          </Text>
        )}
      </Flex>
      <Flex flex="2" justifyContent="space-between">
        <Button
          onClick={() => {
            hanldleSwitchPage(currentPage - 1);
          }}
        >
          <Icon size={1} path={mdiChevronLeft} />
        </Button>
        {pageButtons.map(button => (
          <Button
            marginLeft="10px"
            boxShadow={
              button.pageNumber === currentPage ? '0px 0px 2px 2px grey' : ''
            }
            disabled={button.pageNumber === '...'}
            variant={button.pageNumber === currentPage ? 'outline' : ''}
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
        <Button
          marginLeft="10px"
          onClick={() => {
            hanldleSwitchPage(currentPage + 1);
          }}
        >
          <Icon size={1} path={mdiChevronRight} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
