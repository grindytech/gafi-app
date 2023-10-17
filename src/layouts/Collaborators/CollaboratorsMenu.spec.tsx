import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import CollaboratorsMenu from './CollaboratorsMenu';
import { AccountContext, AccountStateProps } from 'contexts/contexts.account';
import { useState } from 'react';

const mockProvider = () => {
  const initial = [
    {
      address: '5HC2BvrZTXc3DCxDVm6en2tn7iE8bzZnHA4gPEeM3sDL1TkW',
      name: 'bob',
    },
    {
      address: '5DhYYp1Q2sNXR7HfzbQFUt3XHfK4CKYRA4vaaKRiWpSLkp62',
      name: 'alice',
    },
  ];

  const { result } = renderHook(() =>
    useState<AccountStateProps>({
      current: initial[0],
      all: initial,
    })
  );

  const [account, setAccount] = result.current;

  const provider = render(
    <AccountContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      <CollaboratorsMenu
        address={initial[0].address}
        index={0}
        setCollaborators={() => {}}
      />
    </AccountContext.Provider>
  );

  const input_placeholder = 'Add more collaborators';

  return {
    provider,

    input_placeholder,
  };
};

describe('<CollaboratorsMenu />', () => {
  it('should render correctly placeholder of input', () => {
    const { input_placeholder } = mockProvider();

    expect(screen.getByPlaceholderText(input_placeholder)).toBeInTheDocument();
  });

  it('should render icon when has input value', () => {
    const { provider, input_placeholder } = mockProvider();

    const element = provider.getByPlaceholderText(input_placeholder);

    fireEvent.change(element, {
      target: { value: 'alice' },
    });

    expect(screen.getByLabelText('right-element true')).toBeInTheDocument();
  });

  it('should render text "alice" in list', () => {
    mockProvider();

    expect(screen.getByText('alice')).toBeInTheDocument();
  });
});
