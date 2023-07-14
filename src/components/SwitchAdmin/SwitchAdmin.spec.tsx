import { store } from 'redux/store';
import SwitchAdmin from './SwitchAdmin';
import { Provider } from 'react-redux';
import { injectedAccount } from 'redux/injected';
import { render, screen } from '@testing-library/react';
import { shorten } from 'utils/utils';

it('SwitchAdmin should render correctly', () => {
  // mock account
  const account = {
    type: 'Admin',
    address: '5F2FJymdbprtBNjrKvbCZLwwuByhn2s8oDtgyyccn5TFjRYm',
    name: 'synasapmob',
  } as const;

  // dispatch injectedAccount
  store.dispatch(
    injectedAccount({
      polkadot: {
        account: {
          address: account.address,
          name: account.name,
        },
      },
    })
  );

  // render JSX Element
  render(
    <Provider store={store}>
      <SwitchAdmin type={account.type} setValue={() => {}} />
    </Provider>
  );

  // find Type of SwitchAdmin
  const type = screen.getByText(account.type);
  expect(type.textContent).toMatch(account.type);

  // find pairs currentAccount
  const address = screen.getByText(shorten(account.address, 12));
  expect(address.textContent).toMatch(shorten(account.address, 12));

  const name = screen.getByText(account.name);
  expect(name.textContent).toMatch(account.name);

  // find Jazzicon of currentAccount
  const JazzIcon = screen.getByRole('figure');
  expect(JazzIcon.tagName).toMatch('FIGURE');

  // find Button Chevron
  const chevron = screen.getByRole('button', { name: 'arrow-chevron' });
  expect(chevron).toBeDefined();

  // find Button Coppy
  const copy = screen.getByRole('button', { name: 'button-copy' });
  expect(copy).toBeDefined();
});
