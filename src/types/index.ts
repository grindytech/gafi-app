import React from 'react';

export type TypeReturnJSXElement = {
  [key: string]: () => React.JSX.Element;
};

// substrate
export type TypeMetadataOfCollection = {
  title: string;
  description: string;
  external_url: string;
  avatar: string;
  banner?: string;
  cover?: string;
};

export type TypeMetadataOfGame = {
  title: string;
  categories: string;
  description: string;
  website: string;
  twitter: string;
  discord: string;
  avatar: string;
  banner: string;
  cover: string;
};

export type TypeMetadataOfItem = {
  title: string;
  description: string;
  external_url: string;
  avatar: string;
};

export type TypeMetadataOfPool = {
  title: string;
  description: string;
};
