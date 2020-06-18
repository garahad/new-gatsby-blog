/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import _ from 'lodash'

import { Layout } from '../layout'
import { Contents } from '../components/contents'
import Bio from '../components/bio'

const h1Css = css`
  margin-bottom: 0.5em;
  margin-top: 0;
`

export default function IndexPage({
  location,
  isListPage,
  siteMetadata,
  posts,
  countOfInitialPost,
  count,
  initialCategory,
  indexTitle,
  bio,
}) {
  return (
    <Layout {...{ location, isListPage }} title={siteMetadata.title}>
      {bio ? <Bio /> : null}
      <h1 css={h1Css}>{indexTitle}</h1>
      <Contents
        {...{ posts, countOfInitialPost, count }}
        category={initialCategory}
      />
    </Layout>
  )
}
