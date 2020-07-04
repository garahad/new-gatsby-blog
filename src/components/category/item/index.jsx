import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import { useTheme } from 'emotion-theming';
import { hoverCss } from '../../../styles/emotions';

export const Item = ({
  title,
  categoryObj,
  posts,
  location,
  isListPage,
  setCategoryToggle,
}) => {
  const theme = useTheme();

  let locationName = location.pathname;
  if (location.pathname[location.pathname.length - 1] === '/') {
    locationName = location.pathname.slice(0, -1);
  }
  let nowCategory = locationName.split('/')[1];
  let nowSubCategory;

  if (
    (isListPage && locationName.split('/').length === 3) ||
    (!isListPage && locationName.split('/').length >= 4)
  ) {
    nowSubCategory = locationName.split('/')[2];
  }

  const subCategories =
    categoryObj &&
    _.uniq(
      categoryObj
        .filter((oneObj) => Object.keys(oneObj)[0] === title)
        .map((Obj) => Object.values(Obj)[0]),
    );

  const subCategoryList =
    subCategories &&
    subCategories.map((oneSub) => {
      const subCategoryBlogNumber =
        posts &&
        posts.filter(
          (elm) =>
            elm.node.frontmatter.category === title &&
            (elm.node.frontmatter.subcategory
              ? elm.node.frontmatter.subcategory === oneSub
              : false),
        ).length;

      return (
        <div key={oneSub}>
          <Link
            to={`/${title}/${oneSub}`}
            style={{
              color:
                nowSubCategory &&
                nowSubCategory === oneSub &&
                nowCategory === title
                  ? theme.colors.primary
                  : 'silver',
            }}
            css={hoverCss}
            onClick={() => setCategoryToggle(false)}
          >
            - {oneSub} ({subCategoryBlogNumber})
          </Link>
        </div>
      );
    });

  const categoryBlogNumber =
    posts &&
    posts.filter((elm) => elm.node.frontmatter.category === title).length;

  return (
    <div style={{ marginBottom: '1.5em', fontSize: '0.9rem' }}>
      <li>
        <Link
          to={`/${title}`}
          style={{
            color:
              !nowSubCategory && nowCategory === title
                ? theme.colors.primary
                : 'silver',
          }}
          css={hoverCss}
          onClick={() => setCategoryToggle(false)}
        >
          {title} ({categoryBlogNumber})
        </Link>
      </li>
      {subCategories && subCategories.length > 0 ? (
        <div style={{ marginLeft: '1em' }}>{subCategoryList}</div>
      ) : null}
    </div>
  );
};
