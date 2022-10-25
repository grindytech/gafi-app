import React, {
  KeyboardEvent,
  MutableRefObject,
  useRef,
  useState,
} from 'react';

interface IStatePoolProps {
  text: string;
  submit?: string;
}

interface IUseSearchPoolNameProps {
  setQueryValue: React.Dispatch<React.SetStateAction<string>>;
  delay: number;
}

export default function useSearchPoolName({
  setQueryValue,
  delay,
}: IUseSearchPoolNameProps) {
  const [searchQuery, setSearchQuery] = useState<IStatePoolProps>({ text: '' });

  const debounceRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  const handlePressKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setQueryValue(searchQuery.text);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    setSearchQuery(prev => ({
      ...prev,
      text: value,
    }));

    // unsubscribe for ref
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // subscribe
    debounceRef.current = setTimeout(
      () => setSearchQuery(prev => ({ ...prev, submit: value })),
      delay
    );
  };

  return {
    handlePressKey,
    handleInputChange,
    setSearchQuery,
    searchQuery,
  };
}
