import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import useIndexHooks from '../hooks/useIndexHooks';
import IndexPage from '../layout/IndexPage';

export default ({ data, location }) => {
  let locationName = location.pathname;
  if (location.pathname[location.pathname.length - 1] === '/') {
    locationName = location.pathname.slice(0, -1);
  }
  let nowCategory = locationName.slice(1);
  let nowSubCategory;
  if (nowCategory.indexOf('/') !== -1) {
    let array = nowCategory.split('/');
    nowCategory = array[0];
    nowSubCategory = array[array.length - 1];
  }

  let posts = data.allMarkdownRemark.edges.filter(
    (el) => el.node.frontmatter.category === nowCategory,
  );
  if (nowSubCategory) {
    posts = posts.filter(
      (el) => el.node.frontmatter.subcategory === nowSubCategory,
    );
  }
  const {
    isListPage,
    siteMetadata,
    countOfInitialPost,
    count,
    initialCategory,
  } = useIndexHooks({ data, posts });

  const indexTitle = nowSubCategory ? nowSubCategory : nowCategory;

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
        indexTitle,
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
            subcategory
            draft
          }
        }
      }
    }
  }
`;
