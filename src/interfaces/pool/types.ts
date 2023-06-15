import { GafiPrimitivesPoolService } from '@polkadot/types/lookup';

export interface PoolInfo {
  basic: GafiPrimitivesPoolService;
  medium: GafiPrimitivesPoolService;
  advance: GafiPrimitivesPoolService;
}
