import React from 'react';
import { useTheme } from 'emotion-theming';
import { H1TITLE } from '../../styles/emotions';

export const PostTitle = ({ title }) => {
  const theme = useTheme();
  return <H1TITLE theme={theme}>{title}</H1TITLE>;
};
