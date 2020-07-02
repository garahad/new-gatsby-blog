import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { rhythm } from '../../utils/typography';

const theme = {
  colors: {
    primary: '#d8cd8d',
  },
};

const homeTitleLinkCss = css`
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 800;
  color: ${theme.colors.primary};
`;

const containerCss = css`
  display: grid;
  grid-template-columns: 16em 1fr 16em;
  width: 100%;
  @media (max-width: 1000px) {
    display: block;
  }
`;

const toggleCategoryCss = css`
  background-color: black;
  z-index: 2;
  position: fixed;
  width: 100%;
`;
// 왜 이 100%표시가 안 붙으면 100%가 다 안 찰까?

const baseLayoutCss = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
  padding: 0 ${rhythm(2)};
`;

// 왜 실제 변화는 880 px 에서 일어나지?? box-sizing 때문인듯.
const categoryCss = css`
  padding-top: ${rhythm(1.5)};
  margin-left: ${rhythm(2)};
  position: fixed;
  width: 12em;
  height: 100%;
  @media (max-width: 1000px) {
    display: none;
    border-right: none;
  }
`;

const indexBarCss = css`
  position: fixed;
  margin-top: ${rhythm(1.5)};
  @media (max-width: 1000px) {
    display: none;
  }
  white-space: nowrap;
  font-size: 0.9em;
  width: calc((100vw - 228px - 49rem) / 2 - 2.03125rem);

  ol,
  ul {
    list-style: none;
    margin-left: 1.015625rem;
    margin-bottom: 0;
    li {
      margin-bottom: 0.2em;
      a {
        color: silver;
      }
    }
  }
  border-left: 5px solid #43464d;
`;

const childrenWrapper = css`
  ${baseLayoutCss}
  margin-top: ${rhythm(1.5)};
  @media (max-width: 1000px) {
    padding: 60px ${rhythm(2)};
  }
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-bottom: 0.5em;
  margin-top: ${(props) => (props.bio ? 0 : '0.5em')};
`;

const topCss = css`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const categoryMark = css`
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 1em;
  border: none;
  background: linear-gradient(to bottom, white, white) no-repeat center;
  background-size: 100% 20%;
  transition: background-size 0.3s ease-in-out;
  cursor: pointer;
  outline: none;
  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 20%;
    background-color: white;
    transition: transform 0.3s ease-in-out;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
  &.active {
    background-size: 0 0;
    &:before {
      transform: translateY(200%) rotate(45deg);
    }
    &:after {
      transform: translateY(-200%) rotate(-45deg);
    }
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

const readingTimeCss = css`
  font-size: 0.8rem;
  margin-bottom: 0.5em;
  color: silver;
`;

const H1TITLE = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  margin-top: 0;
  margin-bottom: 0.5em;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const UL = styled.ul`
  list-style-type: none;
  margin-left: 0;
  border-left: 2px solid #43464d;
  padding: 0 0 0 1em;
`;

const hoverCss = css`
  &:hover {
    text-decoration: underline;
  }
`;

export {
  H1,
  theme,
  childrenWrapper,
  indexBarCss,
  categoryCss,
  baseLayoutCss,
  toggleCategoryCss,
  containerCss,
  homeTitleLinkCss,
  topCss,
  categoryMark,
  readingTimeCss,
  H1TITLE,
  UL,
  hoverCss,
};
