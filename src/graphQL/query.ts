import { gql } from 'graphql-request';

// Query list sponsored pools for codegen
const sponsoredPoolQuery = gql`
  query SponsoredPools($first: Int!, $offset: Int!) {
    sponsoredPools(first: $first, offset: $offset){
      nodes {
        id
        amount
        poolOwner
        discount
        txLimit
        createdAt
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
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
