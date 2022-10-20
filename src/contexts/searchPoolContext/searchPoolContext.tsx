import React, { createContext, useContext, useState } from 'react';

interface ISearchPoolProps {
  text?: string;
  submit?: string;
}

const SearchPoolContext = createContext<{
  searchPoolValue: ISearchPoolProps;
  setSearchPool: React.Dispatch<React.SetStateAction<ISearchPoolProps>>;
}>({
  searchPoolValue: {},
  setSearchPool: () => {},
});

const SearchPoolProvider: React.FC = ({ children }) => {
  const [searchPoolValue, setSearchPool] = useState<ISearchPoolProps>({
    text: '',
  });

  return (
    <SearchPoolContext.Provider value={{ searchPoolValue, setSearchPool }}>
      {children}
    </SearchPoolContext.Provider>
  );
};

const useSearchPoolContext = () => {
  const { searchPoolValue, setSearchPool } = useContext(SearchPoolContext);

  return {
    searchPoolValue,
    setSearchPool,
  };
};

export { SearchPoolProvider, useSearchPoolContext };
