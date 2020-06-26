import React from 'react';

import { Item } from './item';
import { rhythm } from '../../utils/typography';

import './index.scss';

export const Category = ({
  categories,
  categoryObj,
  posts,
  location,
  isListPage,
  setCategoryToggle,
}) => {
  return (
    <ul
      id="category"
      style={{
        listStyleType: 'none',
        padding: `${rhythm(0.5)} 0`,
        marginLeft: 0,
      }}
    >
      {categories.map((item, idx) => (
        <Item
          {...{
            categoryObj,
            posts,
            location,
            isListPage,
            setCategoryToggle,
          }}
          key={idx}
          title={item}
        />
      ))}
    </ul>
  );
};
