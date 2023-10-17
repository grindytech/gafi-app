import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { InjectedAccount } from 'types/polkadot.type';
import { getInjectedWeb3 } from 'utils';
import { getCookie, setCookie } from 'utils/utils.cookie';
import { INJECTED_ACCOUNT_CONNECTED } from 'utils/utils.injected';

export type AccountStateProps = {
  current?: InjectedAccount;
  all?: InjectedAccount[];
};

interface AccountContextProps {
  account: AccountStateProps;
  setAccount: Dispatch<SetStateAction<AccountStateProps>>;
}

const AccountContext = createContext<AccountContextProps>({
  account: {},
  setAccount: () => {},
});

const AccountContextProvider = ({ children }: PropsWithChildren) => {
  const [account, setAccount] = useState<AccountStateProps>({});

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

const useAccountContext = () => {
  const getAccount = getCookie(INJECTED_ACCOUNT_CONNECTED);

  const { account, setAccount: setAccountContext } = useContext(AccountContext);

  // currentAccount
  useEffect(() => {
    if (getAccount && !account.current?.address) {
      const { address, name } = JSON.parse(getAccount);

      setAccount({
        address,
        name,
      });
    }
  }, [getAccount]);

  useEffect(() => {
    if (!account.all?.length) {
      const response = async () => {
        const injected = await getInjectedWeb3('polkadot-js');

        if (injected?.accounts) {
          const accounts = await injected.accounts.get();

          setAccountContext(prev => ({
            ...prev,
            all: accounts,
          }));
        }
      };

      response();
    }
  }, []);

  const setAccount = (account: InjectedAccount) => {
    const getDate = new Date();
    getDate.setFullYear(getDate.getFullYear() + 1);

    // update state
    setAccountContext(prev => ({ ...prev, current: account }));

    // update cookie for account
    setCookie({
      expires: getDate,
      key: INJECTED_ACCOUNT_CONNECTED,
      value: JSON.stringify({ address: account.address, name: account.name }),
    });
  };

  return {
    account,

    //
    setAccount,
    setAccountContext,
  };
};

export { AccountContextProvider, useAccountContext, AccountContext };
