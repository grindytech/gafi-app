// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type { FinalityGrandpaEquivocationPrecommit, FinalityGrandpaEquivocationPrevote, FinalityGrandpaPrecommit, FinalityGrandpaPrevote, FrameSupportDispatchDispatchClass, FrameSupportDispatchDispatchInfo, FrameSupportDispatchPays, FrameSupportDispatchPerDispatchClassU32, FrameSupportDispatchPerDispatchClassWeight, FrameSupportDispatchPerDispatchClassWeightsPerClass, FrameSupportPalletId, FrameSupportTokensMiscBalanceStatus, FrameSystemAccountInfo, FrameSystemCall, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonZeroSender, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, GafiSupportGameTypesLoot, GafiSupportGameTypesNft, GafiSupportGameTypesPackage, GafiSupportGameTypesTradeType, Game3RuntimeRuntime, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesCall, PalletBalancesError, PalletBalancesEvent, PalletBalancesIdAmount, PalletBalancesReasons, PalletBalancesReserveData, PalletCacheError, PalletCacheEvent, PalletCacheFlag, PalletCacheWrapData, PalletFaucetCall, PalletFaucetError, PalletFaucetEvent, PalletGameAuctionConfig, PalletGameCall, PalletGameError, PalletGameEvent, PalletGameGameDetails, PalletGamePoolDetails, PalletGamePoolType, PalletGameTradeConfig, PalletGameUpgradeItemConfig, PalletGrandpaCall, PalletGrandpaError, PalletGrandpaEvent, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletNftsAttributeDeposit, PalletNftsAttributeNamespace, PalletNftsCollectionConfig, PalletNftsCollectionDetails, PalletNftsCollectionMetadata, PalletNftsCollectionRole, PalletNftsCollectionSetting, PalletNftsError, PalletNftsEvent, PalletNftsItemConfig, PalletNftsItemDeposit, PalletNftsItemDetails, PalletNftsItemMetadata, PalletNftsItemMetadataDeposit, PalletNftsItemSetting, PalletNftsMintSettings, PalletNftsMintType, PalletNftsPalletAttributes, PalletNftsPalletFeature, PalletNftsPendingSwap, PalletNftsPriceDirection, PalletNftsPriceWithDirection, PalletSudoCall, PalletSudoError, PalletSudoEvent, PalletTimestampCall, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentEvent, PalletTransactionPaymentReleases, SpArithmeticArithmeticError, SpConsensusGrandpaAppPublic, SpConsensusGrandpaAppSignature, SpConsensusGrandpaEquivocation, SpConsensusGrandpaEquivocationProof, SpCoreEcdsaSignature, SpCoreEd25519Public, SpCoreEd25519Signature, SpCoreSr25519Signature, SpCoreVoid, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpVersionRuntimeVersion, SpWeightsRuntimeDbWeight, SpWeightsWeightV2Weight } from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonZeroSender: FrameSystemExtensionsCheckNonZeroSender;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    GafiSupportGameTypesLoot: GafiSupportGameTypesLoot;
    GafiSupportGameTypesNft: GafiSupportGameTypesNft;
    GafiSupportGameTypesPackage: GafiSupportGameTypesPackage;
    GafiSupportGameTypesTradeType: GafiSupportGameTypesTradeType;
    Game3RuntimeRuntime: Game3RuntimeRuntime;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesIdAmount: PalletBalancesIdAmount;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletCacheError: PalletCacheError;
    PalletCacheEvent: PalletCacheEvent;
    PalletCacheFlag: PalletCacheFlag;
    PalletCacheWrapData: PalletCacheWrapData;
    PalletFaucetCall: PalletFaucetCall;
    PalletFaucetError: PalletFaucetError;
    PalletFaucetEvent: PalletFaucetEvent;
    PalletGameAuctionConfig: PalletGameAuctionConfig;
    PalletGameCall: PalletGameCall;
    PalletGameError: PalletGameError;
    PalletGameEvent: PalletGameEvent;
    PalletGameGameDetails: PalletGameGameDetails;
    PalletGamePoolDetails: PalletGamePoolDetails;
    PalletGamePoolType: PalletGamePoolType;
    PalletGameTradeConfig: PalletGameTradeConfig;
    PalletGameUpgradeItemConfig: PalletGameUpgradeItemConfig;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletNftsAttributeDeposit: PalletNftsAttributeDeposit;
    PalletNftsAttributeNamespace: PalletNftsAttributeNamespace;
    PalletNftsCollectionConfig: PalletNftsCollectionConfig;
    PalletNftsCollectionDetails: PalletNftsCollectionDetails;
    PalletNftsCollectionMetadata: PalletNftsCollectionMetadata;
    PalletNftsCollectionRole: PalletNftsCollectionRole;
    PalletNftsCollectionSetting: PalletNftsCollectionSetting;
    PalletNftsError: PalletNftsError;
    PalletNftsEvent: PalletNftsEvent;
    PalletNftsItemConfig: PalletNftsItemConfig;
    PalletNftsItemDeposit: PalletNftsItemDeposit;
    PalletNftsItemDetails: PalletNftsItemDetails;
    PalletNftsItemMetadata: PalletNftsItemMetadata;
    PalletNftsItemMetadataDeposit: PalletNftsItemMetadataDeposit;
    PalletNftsItemSetting: PalletNftsItemSetting;
    PalletNftsMintSettings: PalletNftsMintSettings;
    PalletNftsMintType: PalletNftsMintType;
    PalletNftsPalletAttributes: PalletNftsPalletAttributes;
    PalletNftsPalletFeature: PalletNftsPalletFeature;
    PalletNftsPendingSwap: PalletNftsPendingSwap;
    PalletNftsPriceDirection: PalletNftsPriceDirection;
    PalletNftsPriceWithDirection: PalletNftsPriceWithDirection;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    SpArithmeticArithmeticError: SpArithmeticArithmeticError;
    SpConsensusGrandpaAppPublic: SpConsensusGrandpaAppPublic;
    SpConsensusGrandpaAppSignature: SpConsensusGrandpaAppSignature;
    SpConsensusGrandpaEquivocation: SpConsensusGrandpaEquivocation;
    SpConsensusGrandpaEquivocationProof: SpConsensusGrandpaEquivocationProof;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SpWeightsWeightV2Weight: SpWeightsWeightV2Weight;
  } // InterfaceTypes
} // declare module