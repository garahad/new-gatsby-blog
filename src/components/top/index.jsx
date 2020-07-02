/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'gatsby';
import _ from 'lodash';

import './index.scss';
import { topCss, categoryMark } from '../../styles/emotions';

export const Top = ({ title, isCategoryOpen, setCategoryToggle }) => {
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
    </div>
  );
};
