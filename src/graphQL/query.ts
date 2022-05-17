import { gql } from 'graphql-request';

export const sponsoredPoolQuery = gql`
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
