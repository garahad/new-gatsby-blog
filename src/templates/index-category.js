import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import useIndexHooks from '../hooks/useIndexHooks';
import IndexPage from '../layout/IndexPage';

export default ({ data, location, pageContext }) => {
  const posts =
    data &&
    data.allMarkdownRemark.edges.filter(
      (el) => el.node.frontmatter.category === pageContext.nowCategory,
    );

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
        indexTitle: pageContext.nowCategory,
        bio: false,
      }}
    />
  );
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
          excerpt(pruneLength: 100, truncate: true)
          fields {
            slug
          }
          frontmatter {
            # date(formatString: "MMMM DD, YYYY")
            date(formatString: "YYYY-MM-DD")
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
