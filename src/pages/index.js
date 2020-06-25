import React from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';

import useIndexHooks from '../hooks/useIndexHooks';
import IndexPage from '../layout/IndexPage';

export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const {
    isListPage,
    siteMetadata,
    countOfInitialPost,
    count,
    initialCategory,
  } = useIndexHooks({ data, posts });

  return (
    <IndexPage
      {...{
        location,
        isListPage,
        siteMetadata,
        posts,
        countOfInitialPost,
        count,
        initialCategory,
        indexTitle: 'ALL POSTS',
        bio: true,
      }}
    />
  );
};

export const pageQuery = graphql`
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
            draft
          }
          timeToRead
        }
      }
    }
  }
`;
