import React from 'react';

import { SponsoredPool } from 'graphQL/generates';

export interface ISponsoredPool {
  id: string | undefined;
  amount: string | undefined;
  owner: string | undefined;
  discount: number | undefined;
  limit: number | undefined;
}

export interface TableCaption {
  label: string;
  fieldName: string;
  display: boolean;
}

export interface ISponsoredPoolTableProps {
  captions: TableCaption[];
  sponsoredPools: SponsoredPool[];
  children: React.ReactNode;
  limitRow: number;
  isLoading: boolean;
}
