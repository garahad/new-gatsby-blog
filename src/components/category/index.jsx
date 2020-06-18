import React from 'react'

import { Item } from './item'
import { rhythm } from '../../utils/typography'

import './index.scss'

export const Category = ({
  categories,
  categoryObj,
  posts,
  location,
  isListPage,
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
          {...{ categoryObj, posts, location, isListPage }}
          key={idx}
          title={item}
        />
      ))}
    </ul>
  )
}
