/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import _ from 'lodash'

import './index.scss'
import { Category } from '../category'
import { CATEGORY_TYPE } from '../../constants'
import * as Storage from '../../utils/storage'

const categoryMark = css`
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: none;
  background: linear-gradient(to bottom, #282c35, #282c35) no-repeat center;
  background-size: 100% 20%;
  transition: background-size 0.3s ease-in-out;
  cursor: pointer;
  outline: none;
  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 20%;
    background-color: #282c35;
    transition: transform 0.3s ease-in-out;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
  &.active {
    background-size: 0 0;
    &:before {
      transform: translateY(200%) rotate(45deg);
    }
    &:after {
      transform: translateY(-200%) rotate(-45deg);
    }
  }

  @media (min-width: 1000px) {
    display: none;
  }
`

const toggleCategoryCss = css`
  background-color: black;
  z-index: 2;
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

export const Top = ({ title, location, rootPath }) => {
  // const isRoot = location.pathname === rootPath
  const data = useStaticQuery(categoryQuery)
  const posts = data.allMarkdownRemark.edges
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category))
  const initialCategory = Storage.getCategory(CATEGORY_TYPE.ALL)
  const [category, setCategory] = useState(initialCategory)

  const [isCategoryOpen, setCategoryToggle] = useState(false)

  return (
    <div className="top" style={{ position: 'fixed' }}>
      {/* {!isRoot && ( */}
      <button
        css={categoryMark}
        className={isCategoryOpen ? 'active' : ''}
        onClick={() => {
          setCategoryToggle(!isCategoryOpen)
        }}
      ></button>
      <Link to={`/`} className="link">
        {title}
      </Link>
      {/* )} */}
      <GitHubIcon />
      <div
        style={{
          display: isCategoryOpen ? 'block' : 'none',
        }}
        css={toggleCategoryCss}
      >
        <Category
          categories={categories}
          category={category}
          selectCategory={setCategory}
        />
      </div>
    </div>
  )
}
