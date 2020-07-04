/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'gatsby';

import { TARGET_CLASS } from '../../utils/visible';
import './index.scss';
import { readingTimeCss } from '../../styles/emotions';

export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  let bowls = 0;
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`;
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`;
  }
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date, lang) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [
    lang,
    { day: 'numeric', month: 'long', year: 'numeric' },
  ].filter(Boolean);
  return date.toLocaleDateString(...args);
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export const ThumbnailItem = ({ node }) => (
  // <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
  <div key={node.fields.slug} style={{ marginBottom: '2em' }}>
    <h3 style={{ display: 'inline-block' }}>
      <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
        {node.frontmatter.title || node.fields.slug}
      </Link>
    </h3>
    <div css={readingTimeCss}>
      {formatDate(node.frontmatter.date)} &nbsp;| &nbsp;
      {formatReadingTime(node.timeToRead)}
    </div>
    <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
  </div>
);
