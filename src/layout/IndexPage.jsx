import React from 'react';
import _ from 'lodash';

import { Layout } from '../layout';
import { Contents } from '../components/contents';
import Bio from '../components/bio';
import { H1 } from '../styles/emotions';

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
      <H1 bio={bio}>{indexTitle}</H1>
      <Contents
        {...{ posts, countOfInitialPost, count }}
        category={initialCategory}
      />
    </Layout>
  );
}
