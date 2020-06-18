import React from 'react'
import _ from 'lodash'

import useIndexHooks from '../hooks/useIndexHooks'
import IndexPage from '../layout/IndexPage'

export default function CategoryIndex({ data, location }) {
  let nowCategory = location.pathname.slice(1)
  if (nowCategory[nowCategory.length - 1] === '/') {
    nowCategory = nowCategory.slice(0, -1)
  }
  const posts = data.allMarkdownRemark.edges.filter(
    (el) => el.node.frontmatter.category === nowCategory,
  )

  const {
    isListPage,
    siteMetadata,
    countOfInitialPost,
    count,
    initialCategory,
  } = useIndexHooks({ data, posts })

  return (
    <IndexPage
      {...{
        location,
        isListPage,
        siteMetadata,
        posts,
        countOfInitialPost,
        count,
        initialCategory,
        indexTitle: nowCategory,
        bio: false,
      }}
    />
  )
}
