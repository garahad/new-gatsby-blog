/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import _ from 'lodash'

import { Top } from '../components/top'
import { Header } from '../components/header'
// import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'
import * as Dom from '../utils/dom'
import * as Storage from '../utils/storage'
import * as ScrollManager from '../utils/scroll'

import './index.scss'
import { THEME, CATEGORY_TYPE } from '../constants'
import { Category } from '../components/category'

const containerCss = css`
  display: grid;
  padding-top: 60px;
  grid-template-columns: 15em 1fr 15em;
  width: 100%;
  @media (max-width: 1000px) {
    display: block;
  }
`
// 왜 이 100%표시가 안 붙으면 100%가 다 안 찰까?

// 왜 실제 변화는 880 px 에서 일어나지?? box-sizing 때문인듯.
const categoryCss = css`
  border-right: 0.1px solid gray;
  position: fixed;
  width: 15em;
  height: 100%;
  @media (max-width: 1000px) {
    display: none;
    border-right: none;
  }
`

const indexBarCss = css`
  @media (max-width: 1000px) {
    display: none;
  }
`

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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          # excerpt(pruneLength: 200, truncate: true)
          # fields {
          #   slug
          # }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            # title
            category
            # draft
          }
        }
      }
    }
  }
`

export const Layout = ({
  location,
  title,
  children,
  // data,
  // categories,
  // category,
  // selectCategory,
}) => {
  const isListPage = location.pathname.slice(1).split('/').length < 3

  const rootPath = `${__PATH_PREFIX__}/`

  const data = useStaticQuery(categoryQuery)
  const posts = data.allMarkdownRemark.edges
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category))

  const initialCategory = Storage.getCategory(CATEGORY_TYPE.ALL)
  const [category, setCategory] = useState(initialCategory)

  // const DEST_POS = 316

  // const selectCategory = (category) => {
  //   setCategory(category)
  //   ScrollManager.go(DEST_POS)
  // }

  Dom.addClassToBody(THEME.DARK)
  Dom.removeClassToBody(THEME.LIGHT)

  return (
    <React.Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      {/* <ThemeSwitch /> */}
      {/* <Header title={title} location={location} rootPath={rootPath} /> */}
      <div
        css={containerCss}
        style={{
          gridTemplateColumns: isListPage ? '15em 1fr' : '15em 1fr 15em',
        }}
      >
        <div
          // className="category-sidebar"
          // style={{
          //   borderRight: '0.1px solid gray',
          // }}
          css={categoryCss}
        >
          {/* 카테고리 */}
          <Category
            categories={categories}
            category={category}
            selectCategory={setCategory}
          />
        </div>
        <div></div>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </div>
      </div>
      {isListPage ? null : <div css={indexBarCss}></div>}

      <Footer />
    </React.Fragment>
  )
}
