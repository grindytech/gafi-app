import { Button, Center, CenterProps, Flex, Icon } from '@chakra-ui/react';
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
        isDisabled={currentPage === 1}
        variant="unstyled"
        title="previous"
        color="primary.a.500"
        _disabled={{ color: 'shader.a.400' }}
        onClick={() => setCurrentPage(prev => prev - 1)}
      >
        <Icon
          as={Chevron01Icon}
          width={6}
          height={6}
          transform="rotate(90deg)"
          verticalAlign="middle"
        />
      </Button>

      <Center gap={3}>
        {React.Children.toArray(
          data.map(value => (
            <Button
              variant="unstyled"
              height={8}
              width={8}
              minWidth="auto"
              isDisabled={value === '...'}
              onClick={() => onClickPage(Number(value))}
              borderRadius="3xl"
              bg={currentPage === value ? 'shader.a.900' : undefined}
              color={currentPage === value ? 'shader.a.100' : 'shader.a.900'}
            >
              {value}
            </Button>
          ))
        )}
      </Center>

      <Button
        isDisabled={currentPage === amount}
        variant="unstyled"
        title="next"
        color="primary.a.500"
        _disabled={{ color: 'shader.a.400' }}
        onClick={() => setCurrentPage(prev => prev + 1)}
      >
        <Icon
          as={Chevron01Icon}
          width={6}
          height={6}
          transform="rotate(-90deg)"
          verticalAlign="middle"
        />
      </Button>
    </Flex>
  );
}
