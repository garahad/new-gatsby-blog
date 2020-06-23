import React from 'react';
import { graphql } from 'gatsby';
import SubCategoryIndex from '../../../templates/SubCategoryIndex';

export default ({ data, location }) => {
  return <SubCategoryIndex {...{ data, location }} />;
};

export const categoryQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
            subcategory
            draft
          }
        }
      }
    }
  }
`;
