import { useReducer } from 'react';

export default function useForceMount() {
  const [mounting, setMounting] = useReducer(x => x + 1, 0);

  return { mounting, setMounting };
}
