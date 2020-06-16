import React, { useState } from 'react'

import { Item } from './item'
import { rhythm } from '../../utils/typography'

import './index.scss'

export const Category = ({
  categories,
  category,
  selectCategory,
  categoryObj,
  posts,
  location,
}) => {
  return (
    <ul
      id="category"
      style={{
        listStyleType: 'none',
        padding: `${rhythm(1.5)} ${rhythm(1 / 4)}`,
      }}
    >
      {categories.map((item, idx) => (
        <Item
          key={idx}
          title={item}
          category={category}
          selectCategory={selectCategory}
          categoryObj={categoryObj}
          posts={posts}
          location={location}
        />
      ))}
    </ul>
  )
}
