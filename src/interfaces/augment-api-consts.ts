// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Vec, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { Codec } from '@polkadot/types-codec/types';
import type { Permill } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportWeightsRuntimeDbWeight, FrameSupportWeightsWeightToFeeCoefficient, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, SpVersionRuntimeVersion } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/consts' {
  export interface AugmentedConsts<ApiType extends ApiTypes> {
    balances: {
      /**
       * The minimum amount required to keep an account open.
       **/
      existentialDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * The maximum number of locks that should exist on an account.
       * Not strictly enforced, but used for weight estimation.
       **/
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of named reserves that can exist on an account.
       **/
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    faucet: {
      /**
       * Number of accounts that will send the tokens for user.
       **/
      maxGenesisAccount: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    gameCreator: {
      /**
       * A maximum number of contracts can be owned
       **/
      maxContractOwned: u32 & AugmentedConst<ApiType>;
      /**
       * Balance reserve for the claim of ownership
       **/
      reservationFee: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    grandpa: {
      /**
       * Max Authorities in use
       **/
      maxAuthorities: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    poolName: {
      /**
       * The maximum length a name may be.
       **/
      maxLength: u32 & AugmentedConst<ApiType>;
      /**
       * The minimum length a name may be.
       **/
      minLength: u32 & AugmentedConst<ApiType>;
      /**
       * Reservation fee.
       **/
      reservationFee: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    proofAddressMapping: {
      /**
       * Message Prefix for signing messages using ecdsa signature
       **/
      messagePrefix: Bytes & AugmentedConst<ApiType>;
      reservationFee: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    sponsoredPool: {
      /**
       * The maximum discount percent when creating the pool
       **/
      maxDiscountPercent: Permill & AugmentedConst<ApiType>;
      /**
       * The maximum number of pool that sponsor can create
       **/
      maxPoolOwned: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of contract address can added to the pool
       **/
      maxPoolTarget: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum tx limit when creating the pool
       **/
      maxTxLimit: u32 & AugmentedConst<ApiType>;
      /**
       * The minimum discount percent when creating the pool
       **/
      minDiscountPercent: Permill & AugmentedConst<ApiType>;
      /**
       * The minimum balance owner have to deposit when creating the pool
       **/
      minPoolBalance: u128 & AugmentedConst<ApiType>;
      /**
       * The minimum tx limit when creating the pool
       **/
      minTxLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    system: {
      /**
       * Maximum number of block number to block hash mappings to keep (oldest pruned first).
       **/
      blockHashCount: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum length of a block (in bytes).
       **/
      blockLength: FrameSystemLimitsBlockLength & AugmentedConst<ApiType>;
      /**
       * Block & extrinsics weights: base values and limits.
       **/
      blockWeights: FrameSystemLimitsBlockWeights & AugmentedConst<ApiType>;
      /**
       * The weight of runtime database operations the runtime can invoke.
       **/
      dbWeight: FrameSupportWeightsRuntimeDbWeight & AugmentedConst<ApiType>;
      /**
       * The designated SS85 prefix of this chain.
       * 
       * This replaces the "ss58Format" property declared in the chain spec. Reason is
       * that the runtime should know about the prefix in order to make use of it as
       * an identifier of the chain.
       **/
      ss58Prefix: u16 & AugmentedConst<ApiType>;
      /**
       * Get the chain's current version.
       **/
      version: SpVersionRuntimeVersion & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    timestamp: {
      /**
       * The minimum period between blocks. Beware that this is different to the *expected*
       * period that the block production apparatus provides. Your chosen consensus system will
       * generally work with this to determine a sensible block time. e.g. For Aura, it will be
       * double this period on default settings.
       **/
      minimumPeriod: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    transactionPayment: {
      /**
       * The polynomial that is applied in order to derive fee from length.
       **/
      lengthToFee: Vec<FrameSupportWeightsWeightToFeeCoefficient> & AugmentedConst<ApiType>;
      /**
       * A fee mulitplier for `Operational` extrinsics to compute "virtual tip" to boost their
       * `priority`
       * 
       * This value is multipled by the `final_fee` to obtain a "virtual tip" that is later
       * added to a tip component in regular `priority` calculations.
       * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
       * extrinsic (with no tip), by including a tip value greater than the virtual tip.
       * 
       * ```rust,ignore
       * // For `Normal`
       * let priority = priority_calc(tip);
       * 
       * // For `Operational`
       * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
       * let priority = priority_calc(tip + virtual_tip);
       * ```
       * 
       * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
       * sent with the transaction. So, not only does the transaction get a priority bump based
       * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
       * transactions.
       **/
      operationalFeeMultiplier: u8 & AugmentedConst<ApiType>;
      /**
       * The polynomial that is applied in order to derive fee from weight.
       **/
      weightToFee: Vec<FrameSupportWeightsWeightToFeeCoefficient> & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    txHandler: {
      /**
       * percentage of transaction fee reward to game-creator
       **/
      gameCreatorReward: Permill & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    upfrontPool: {
      /**
       * Max number of player can join the Upfront Pool
       **/
      maxPlayerStorage: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts
} // declare module
