import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import Pagination from 'components/pagination';
import i18n from 'utils/i18nForTests';

describe('Render pagination correcly! case: totalCount=1', () => {
  // load pagination with totalCount = 1
  beforeEach(async () => {
    await render(
      <I18nextProvider i18n={i18n}>
        <Pagination
          currentPage={1}
          setCurrentPage={() => {}}
          totalCount={1}
          resultsPerPage={5}
          isLoading={false}
        />
      </I18nextProvider>
    );
  });

  // show correct notify
  it('should have correct notify', () => {
    const p = screen.getByTestId('pagination-info');
    expect(p.innerHTML).toMatch(/^.*?\bShowing\b.*?\b1\b.*?$/);
  });

  // show have pre-btn, next-btn, (1) btn
  it('should have 3 buttons', () => {
    const previousButton = screen.getByRole('button', {
      name: 'previous page',
    });
    const nextButton = screen.getByRole('button', {
      name: 'next page',
    });
    const Button1 = screen.getByRole('button', {
      name: '1',
    });

    expect(previousButton.innerHTML).toMatch(/Previous/i);
    expect(nextButton.innerHTML).toMatch(/Next/i);
    expect(Button1.innerHTML).toMatch(/1/i);
  });
});
