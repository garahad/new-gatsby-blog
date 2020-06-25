import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import useIndexHooks from '../hooks/useIndexHooks';
import IndexPage from '../layout/IndexPage';

export default ({ data, location }) => {
  let nowCategory = location.pathname.slice(1);
  if (nowCategory[nowCategory.length - 1] === '/') {
    nowCategory = nowCategory.slice(0, -1);
  }

  const posts =
    data &&
    data.allMarkdownRemark.edges.filter(
      (el) => el.node.frontmatter.category === nowCategory,
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
        indexTitle: nowCategory,
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
        }
      }
    }
  }
`;
