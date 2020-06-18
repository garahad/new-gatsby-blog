/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React, { useState, useEffect } from 'react'
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
            subcategory
            # draft
          }
        }
      }
    }
  }
`

export const Layout = ({ location, title, children, isListPage }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const data = useStaticQuery(categoryQuery)
  const posts = data.allMarkdownRemark.edges
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category))
  const categoryObj = posts
    .filter(({ node }) => node.frontmatter.subcategory)
    .map(({ node }) => {
      return { [node.frontmatter.category]: node.frontmatter.subcategory }
    })

  const initialCategory = Storage.getCategory(CATEGORY_TYPE.ALL)
  const [category, setCategory] = useState(initialCategory)

  useEffect(() => {
    Dom.addClassToBody(THEME.DARK)
    Dom.removeClassToBody(THEME.LIGHT)
  }, [])

  return (
    <React.Fragment>
      <Top
        title={title}
        location={location}
        rootPath={rootPath}
        posts={posts}
        categories={categories}
        categoryObj={categoryObj}
      />
      <div
        css={containerCss}
        style={{
          gridTemplateColumns: isListPage ? '15em 1fr' : '15em 1fr 15em',
        }}
      >
        <div css={categoryCss}>
          <Category
            categories={categories}
            categoryObj={categoryObj}
            posts={posts}
            location={location}
            isListPage={isListPage}
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
