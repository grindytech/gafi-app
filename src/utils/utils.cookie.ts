export const getCookie = (key: string) => {
  const match =
    typeof window !== 'undefined'
      ? document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`))
      : undefined;

  return match?.[2];
};

// (1, "Password", "123456789") that's mean 1s for Cookie 'Password' And Key '123..N9'
export const setCookie = ({
  expires,
  key,
  value,
}: {
  expires: string | number | Date;
  key: string;
  value: string;
}) => {
  return (document.cookie = `${key}=${value}; expires=${expires}; path=/`);
};

export const deleteCookie = (key: string) => {
  return (document.cookie = `${key}=; expires=${new Date(1)}; path=/`);
};
