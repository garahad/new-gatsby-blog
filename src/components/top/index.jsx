/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

import './index.scss'
import { Category } from '../category'

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

export const Top = ({ title, location, posts, categories, categoryObj }) => {
  const [isCategoryOpen, setCategoryToggle] = useState(false)

  return (
    <div className="top" style={{ position: 'fixed' }}>
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
      {/* <GitHubIcon /> */}
      <div
        style={{
          display: isCategoryOpen ? 'block' : 'none',
        }}
        css={toggleCategoryCss}
      >
        <Category
          categories={categories}
          categoryObj={categoryObj}
          posts={posts}
          location={location}
        />
      </div>
    </div>
  )
}
