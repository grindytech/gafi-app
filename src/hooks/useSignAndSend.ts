import useTxCallback from './useTxCallback';

export default function useSignAndSend(onSucess: () => void) {
  const txCallback = useTxCallback(onSucess);

  return txCallback;
}
