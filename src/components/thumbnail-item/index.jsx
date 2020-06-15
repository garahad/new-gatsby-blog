import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => (
  // <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
  <div
    key={node.fields.slug}
    style={{
      marginBottom: '2em',
    }}
  >
    <h3
      style={{
        display: 'inline-block',
      }}
    >
      <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
        {node.frontmatter.title || node.fields.slug}
      </Link>
    </h3>
    <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
  </div>
)
