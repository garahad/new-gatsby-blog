import React, { useState } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

export const Item = ({
  title,
  category,
  selectCategory,
  categoryObj,
  posts,
  location,
}) => {
  let nowCategory = location && location.pathname.slice(1)
  let nowSubCategory
  if (nowCategory && nowCategory.indexOf('/') !== -1) {
    let array = nowCategory.split('/')
    nowCategory = array[0]
    nowSubCategory = array[array.length - 1]
  }

  const subCategories =
    categoryObj &&
    _.uniq(
      categoryObj
        .filter((oneObj) => Object.keys(oneObj)[0] === title)
        .map((Obj) => Object.values(Obj)[0]),
    )

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
        ).length
      // console.log('active', active)
      // console.log('oneSub', oneSub)
      return (
        <div key={oneSub}>
          <div
            onClick={() => {
              selectCategory(title)
            }}
          >
            <Link
              to={`/${title}/${oneSub}`}
              style={{
                color:
                  nowSubCategory && nowSubCategory === oneSub
                    ? '#d8cd8d'
                    : 'white',
              }}
            >
              - {oneSub} ({subCategoryBlogNumber})
            </Link>
          </div>
        </div>
      )
    })

  const categoryBlogNumber =
    posts &&
    posts.filter((elm) => elm.node.frontmatter.category === title).length

  return (
    <div style={{ marginBottom: '1.5em', fontSize: '0.9rem' }}>
      <li
        // className="item"
        // role="tab"
        aria-selected={category === title ? 'true' : 'false'}
      >
        <div
          onClick={() => {
            selectCategory(title)
          }}
        >
          <Link
            to={`/${title}`}
            style={{
              color:
                !nowSubCategory && nowCategory === title ? '#d8cd8d' : 'white',
            }}
          >
            {title} ({categoryBlogNumber})
          </Link>
        </div>
      </li>
      {subCategories && subCategories.length > 0 ? (
        <div style={{ marginLeft: '1em' }}>{subCategoryList}</div>
      ) : null}
    </div>
  )
}
