/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import _ from 'lodash';
// import * as Scroll from 'react-scroll';
// import {
//   Link,
//   Element,
//   Events,
//   animateScroll as scroll,
//   scrollSpy,
//   scroller,
// } from 'react-scroll';

import { Top } from '../components/top';
import { Footer } from '../components/footer';
import { rhythm } from '../utils/typography';
import * as Dom from '../utils/dom';

import './index.scss';
import { THEME } from '../constants';
import { Category } from '../components/category';

const homeTitleCss = css`
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 800;
  color: #d8cd8d;
`;

const containerCss = css`
  display: grid;
  width: 100%;
  @media (max-width: 1000px) {
    display: block;
  }
`;

const toggleCategoryCss = css`
  background-color: black;
  z-index: 2;
`;

// 왜 이 100%표시가 안 붙으면 100%가 다 안 찰까?

// 왜 실제 변화는 880 px 에서 일어나지?? box-sizing 때문인듯.
const categoryCss = css`
  padding-top: ${rhythm(1.5)};
  margin-left: ${rhythm(2)};
  position: fixed;
  width: 12em;
  height: 100%;
  @media (max-width: 1000px) {
    display: none;
    border-right: none;
  }
`;

const indexBarCss = css`
  position: fixed;
  top: 60px;
  margin-top: ${rhythm(1.5)};
  @media (max-width: 1000px) {
    display: none;
  }
  white-space: nowrap;
  font-size: 0.9em;
  width: calc((100vw - 228px - 49rem) / 2 - 2.03125rem);

  ol,
  ul {
    list-style: none;
    margin-left: 1.015625rem;
    margin-bottom: 0;
    li {
      margin-bottom: 0.2em;
      a {
        color: inherit;
      }
    }
  }
  border-left: 5px solid #43464d;
`;

export const categoryQuery = graphql`
  query {
    # site {
    #   siteMetadata {
    #     title
    #     configs {
    #       countOfInitialPost
    #     }
    #   }
    # }
    allMarkdownRemark(
      sort: { fields: [frontmatter___category], order: ASC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          # excerpt(pruneLength: 200, truncate: true)
          # fields {
          #   slug
          # }
          frontmatter {
            # date(formatString: "MMMM DD, YYYY")
            date(formatString: "YYYY-MM-DD")
            # title
            category
            subcategory
            # draft
          }
        }
      }
    }
  }
`;

export const Layout = ({
  location,
  title,
  children,
  isListPage,
  tableOfContents,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  const data = useStaticQuery(categoryQuery);
  const posts = data.allMarkdownRemark.edges;
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category));
  const categoryObj = posts
    .filter(({ node }) => node.frontmatter.subcategory)
    .map(({ node }) => {
      return {
        [node.frontmatter.category]: node.frontmatter.subcategory,
      };
    });

  const [isCategoryOpen, setCategoryToggle] = useState(false);

  useEffect(() => {
    Dom.addClassToBody(THEME.DARK);
    Dom.removeClassToBody(THEME.LIGHT);
  }, []);

  return (
    <React.Fragment>
      <div
        css={containerCss}
        style={{
          gridTemplateColumns: '16em 1fr 16em',
        }}
      >
        <div css={categoryCss}>
          <div style={{ marginBottom: '1em' }}>
            <Link to="/" css={homeTitleCss}>
              코딩과 투자
            </Link>
          </div>
          <Category
            {...{ categories, categoryObj, posts, location, isListPage }}
            setCategoryToggle={() => null}
          />
        </div>
        <div></div>
        {/* position fixed는 grid안에 포함이 안돼서 위의 빈 div를 만들어서 그것 대신하게 함  */}
        <div>
          <div style={{ backgroundColor: 'black' }}>
            <div
              style={{
                marginLeft: `auto`,
                marginRight: `auto`,
                maxWidth: rhythm(30),
                padding: `0 ${rhythm(2)}`,
              }}
            >
              <Top
                {...{
                  title,
                  location,
                  rootPath,
                  posts,
                  categories,
                  categoryObj,
                  isCategoryOpen,
                  setCategoryToggle,
                }}
              />
            </div>
            <div
              style={{
                display: isCategoryOpen ? 'block' : 'none',
                position: 'fixed',
                width: '100%',
                // marginTop: '60px',
              }}
              css={toggleCategoryCss}
            >
              <div
                style={{
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  maxWidth: rhythm(30),
                  padding: `0 ${rhythm(2)}`,
                }}
              >
                <Category
                  {...{
                    categories,
                    categoryObj,
                    posts,
                    location,
                    setCategoryToggle,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(30),
              padding: `${rhythm(1.5)} ${rhythm(2)}`,
            }}
          >
            {children}
          </div>
        </div>

        {isListPage ? (
          <div></div>
        ) : (
          <div css={{ position: 'relative' }}>
            <div
              css={indexBarCss}
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
              onClick={() => {
                // document.getElementById('me').scrollTo(0, 60);
                // setTimeout(() => {
                //   scroll.scrollTo(600);
                // }, 100);
              }}
            ></div>
          </div>
        )}
      </div>

      <Footer />
    </React.Fragment>
  );
};
