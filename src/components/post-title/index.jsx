import React from 'react';

export const PostTitle = ({ title }) => (
  <h1
    style={{
      color: '#d8cd8d',
      marginTop: '0',
      // fontSize: '1.5rem',
      // lineHeight: '1.5rem',
      marginBottom: '0.5em',
      fontSize: '1.5rem',
      lineHeight: '2rem',
    }}
  >
    {title}
  </h1>
);
