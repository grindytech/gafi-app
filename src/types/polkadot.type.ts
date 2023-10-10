/* eslint-disable no-unused-vars */

import type { Signer } from '@polkadot/api/types';

export type HexString = `0x${string}`;
export type KeypairType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';
export type ExtTypes = Record<string, string>;
export type ExtInfo = {
  extrinsic: ExtTypes;
  payload: ExtTypes;
};
export type ExtDef = Record<string, ExtInfo>;

export type Unsubcall = () => void;

export interface InjectedExtensionInfo {
  name: string;
  version: string;
}

export interface Injected {
  accounts: InjectedAccounts;
  metadata?: InjectedMetadata;
  signer: Signer;
}

export interface InjectedMetadataKnown {
  genesisHash: string;
  specVersion: number;
}

export interface MetadataDefBase {
  chain: string;
  genesisHash: HexString;
  icon: string;
  ss58Format: number;
  chainType?: 'substrate' | 'ethereum';
}

export interface MetadataDef extends MetadataDefBase {
  color?: string;
  specVersion: number;
  tokenDecimals: number;
  tokenSymbol: string;
  types: Record<string, Record<string, string> | string>;
  metaCalls?: string;
  userExtensions?: ExtDef;
}

export interface InjectedMetadata {
  get: () => Promise<InjectedMetadataKnown[]>;
  provide: (definition: MetadataDef) => Promise<boolean>;
}

export interface InjectedAccounts {
  get: (anyType?: boolean) => Promise<InjectedAccount[]>;
  subscribe: (
    cb: (accounts: InjectedAccount[]) => void | Promise<void>
  ) => Unsubcall;
}

export interface InjectedAccount {
  address: string;
  genesisHash?: string | null;
  name?: string;
  type?: KeypairType;
}

export type InjectedExtension = InjectedExtensionInfo & Injected;

export interface InjectedWindowProvider {
  connect?: (origin: string) => Promise<InjectedExtension>;
  enable?: (origin: string) => Promise<Injected>;
  version?: string;
}
