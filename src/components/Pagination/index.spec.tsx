import { render, screen } from '@testing-library/react';
import Pagination from './index';

it('<Pagination /> should return correctly user interface', () => {
  // render pagination
  render(<Pagination amount={5} currentPage={1} setCurrentPage={() => {}} />);

  // find previous Button
  const ButtonPrevious = screen.getByTitle('previous');
  expect(ButtonPrevious.title).toMatch('previous');

  // find next Button
  const ButtonNext = screen.getByTitle('next');
  expect(ButtonNext.title).toMatch('next');

  // find values of currentPage
  [1, 2, 3, 4, '...', 5].map(item => {
    const CurrentPage = screen.getByRole('button', {
      name: String(item),
    });

    expect(CurrentPage.innerHTML).toMatch(String(item));
  });
});
