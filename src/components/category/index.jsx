import React from 'react';
import { Item } from './item';
import './index.scss';
import { UL } from '../../styles/emotions';

export const Category = ({
  categories,
  categoryObj,
  posts,
  location,
  isListPage,
  setCategoryToggle,
}) => {
  return (
    <UL>
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
    </UL>
  );
};
