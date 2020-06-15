import React from 'react'
import { Link } from 'gatsby'

export const Item = ({ title, category, selectCategory }) => (
  <li
    // className="item"
    // role="tab"
    aria-selected={category === title ? 'true' : 'false'}
  >
    <Link to={`/${title}`}>
      <div
        onClick={() => {
          selectCategory(title)
          console.log(title)
        }}
        style={{ color: 'white' }}
      >
        {title}
      </div>
    </Link>
  </li>
)
