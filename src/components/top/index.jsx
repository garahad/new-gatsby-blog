/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

import './index.scss';
import { Category } from '../category';
import { rhythm } from '../../utils/typography';

const topCss = css`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const categoryMark = css`
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 1em;
  border: none;
  background: linear-gradient(to bottom, white, white) no-repeat center;
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
    background-color: white;
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
`;

// const toggleCategoryCss = css`
//   background-color: black;
//   z-index: 2;
// `;

export const Top = ({
  title,
  location,
  posts,
  categories,
  categoryObj,
  isCategoryOpen,
  setCategoryToggle,
}) => {
  // const [isCategoryOpen, setCategoryToggle] = useState(false);

  return (
    <div
      className="top"
      css={topCss}
      // onBlur={() => {
      //   setCategoryToggle(false);
      // }}
    >
      <button
        css={categoryMark}
        className={isCategoryOpen ? 'active' : ''}
        onClick={(e) => {
          setCategoryToggle(!isCategoryOpen);
        }}
      ></button>
      <Link to={`/`} className="link" style={{ marginLeft: 0, paddingLeft: 0 }}>
        {title}
      </Link>

      {/* )} */}
      {/* <GitHubIcon /> */}
      {/* <div
               style={{
                 display: isCategoryOpen ? 'block' : 'none',
               }}
               css={toggleCategoryCss}
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
             </div> */}
    </div>
  );
};
