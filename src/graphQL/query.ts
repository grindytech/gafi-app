import { gql } from 'graphql-request';

// Query list sponsored pools for codegen
const sponsoredPoolQuery = gql`
  query SponsoredPools {
    sponsoredPools(first: 5) {
      nodes {
        id
        amount
        poolOwner
        discount
        txLimit
        createdAt
      }
      totalCount
    }
  }
`;

// Example query for transfer.
const transferQuery = gql`
  query Transfers {
    transfers(first: 5) {
      nodes {
        id
        amount
        from
      }
      totalCount
    }
  }
`;
