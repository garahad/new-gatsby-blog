/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import _ from 'lodash';
import Headroom from 'headroom.js';
// import Headroom from 'react-headroom';

import { Top } from '../components/top';
import { Footer } from '../components/footer';
import { rhythm } from '../utils/typography';
import * as Dom from '../utils/dom';
import './index.scss';
import { THEME } from '../constants';
import { Category } from '../components/category';
import {
  theme,
  childrenWrapper,
  indexBarCss,
  categoryCss,
  baseLayoutCss,
  toggleCategoryCss,
  containerCss,
  homeTitleLinkCss,
} from '../styles/emotions';

export const categoryQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___category], order: ASC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          frontmatter {
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
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <div css={containerCss}>
          <div css={categoryCss}>
            <div style={{ marginBottom: `${rhythm(1.5)}` }}>
              <Link to="/" css={homeTitleLinkCss}>
                코딩과 투자
              </Link>
            </div>
            <Category
              {...{
                categories,
                categoryObj,
                posts,
                location,
                isListPage,
                theme,
              }}
              setCategoryToggle={() => null}
            />
          </div>
          <div></div>
          {/* position fixed는 grid안에 포함이 안돼서 위의 빈 div를 만들어서 그것 대신하게 함  */}
          <div>
            <div
              ref={refHeader}
              className="header"
              style={{
                backgroundColor: 'black',
              }}
            >
              <div css={baseLayoutCss}>
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
                <div css={baseLayoutCss}>
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
    </ThemeProvider>
  );
};
