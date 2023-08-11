import React from 'react';

export type TypeReturnJSXElement = {
  [key: string]: () => React.JSX.Element;
};

// substrate
export type TypeMetadataOfCollection =
  | {
      // description: string;
      external_url: string;
      image: string;
      title: string;
      collection_id: number;
    }
  | undefined;

export type TypeMetadataOfItem =
  | {
      image: string;
      title: string;
      collection_id: number;
      nft_id: number;
    }
  | undefined;
