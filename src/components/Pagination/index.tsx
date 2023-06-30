import { Button, CenterProps, Flex, Icon } from '@chakra-ui/react';
import usePagination from 'hooks/usePagination';
import React from 'react';
import Chevron01Icon from 'public/assets/line/chevron-01.svg';

interface PaginationProps {
  currentPage: number;
  amount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  sx?: CenterProps;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  amount,
  sx,
}: PaginationProps) {
  const { data, onClickPage } = usePagination({
    currentPage,
    setCurrentPage,
    amount,
  });

  return (
    <Flex gap={2} {...sx}>
      <Button
        variant="unstyled"
        isDisabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
      >
        <Icon
          as={Chevron01Icon}
          width={6}
          height={6}
          transform="rotate(90deg)"
          color="primary.light.400"
          verticalAlign="middle"
        />
      </Button>

      <Flex>
        {React.Children.toArray(
          data.map(value => (
            <Button
              isDisabled={value === '...'}
              variant="numberPagination"
              onClick={() => onClickPage(Number(value))}
              bg={currentPage === value ? 'primary.a.500' : undefined}
              color={currentPage === value ? 'white' : 'black'}
            >
              {value}
            </Button>
          ))
        )}
      </Flex>

      <Button
        variant="unstyled"
        isDisabled={currentPage === amount}
        onClick={() => setCurrentPage(prev => prev + 1)}
      >
        <Icon
          as={Chevron01Icon}
          width={6}
          height={6}
          transform="rotate(-90deg)"
          color="primary.light.400"
          verticalAlign="middle"
        />
      </Button>
    </Flex>
  );
}
