/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import _ from 'lodash';

import { Top } from '../components/top';
import { Footer } from '../components/footer';
import { rhythm } from '../utils/typography';
import * as Dom from '../utils/dom';

import './index.scss';
import { THEME } from '../constants';
import { Category } from '../components/category';
// import Headroom from 'react-headroom';
import Headroom from 'headroom.js';

const homeTitleLinkCss = css`
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 800;
  color: #d8cd8d;
`;

const containerCss = css`
  display: grid;
  grid-template-columns: 16em 1fr 16em;
  width: 100%;
  @media (max-width: 1000px) {
    display: block;
  }
`;

const toggleCategoryCss = css`
  background-color: black;
  z-index: 2;
  position: fixed;
  margin-top: 60px;
  width: 100%;
`;
// 왜 이 100%표시가 안 붙으면 100%가 다 안 찰까?

const toggleCategoryContent = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
`;

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
        color: silver;
      }
    }
  }
  border-left: 5px solid #43464d;
`;

const tapWrapperCss = css`
  max-width: ${rhythm(30)};
  padding: 0 ${rhythm(2)};
`;

// padding: ${rhythm(1.5)} ${rhythm(2)};

const childrenWrapper = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
  padding: 60px ${rhythm(2)};
  margin-top: 0.5em;
`;

export const categoryQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___category], order: ASC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          frontmatter {
            # date(formatString: "MMMM DD, YYYY")
            date(formatString: "YYYY-MM-DD")
            category
            subcategory
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

  const refHeader = useRef();
  const headroom = useRef();

  useEffect(() => {
    headroom.current = new Headroom(refHeader.current);
    headroom.current.init();

    return () => headroom.current.destroy();
  }, []);

  useEffect(() => {
    Dom.addClassToBody(THEME.DARK);
    Dom.removeClassToBody(THEME.LIGHT);
  }, []);

  return (
    <React.Fragment>
      <div css={containerCss}>
        <div css={categoryCss}>
          <div style={{ marginBottom: '1em' }}>
            <Link to="/" css={homeTitleLinkCss}>
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
          <div
            style={{ backgroundColor: 'black' }}
            ref={refHeader}
            className="header"
          >
            <div css={tapWrapperCss}>
              {/* <Headroom> */}
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
              {/* </Headroom> */}
            </div>
            <div
              style={{
                display: isCategoryOpen ? 'block' : 'none',
              }}
              css={toggleCategoryCss}
            >
              <div css={toggleCategoryContent}>
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

          <div css={childrenWrapper}>{children}</div>
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
