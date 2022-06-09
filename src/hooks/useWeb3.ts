import { useWallet } from 'use-wallet';
import Web3 from 'web3';

const useWeb3 = () => {
  const { ethereum } = useWallet();
  return new Web3(ethereum);
};
export default useWeb3;
