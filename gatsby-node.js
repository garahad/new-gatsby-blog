const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;

//   if (page.path.match(/^\/+/)) {
//     // page.matchPath = '/+';
//     createPage(page);
//     createPage({
//       // path: `/${page.path}`,
//       ...page,
//       matchPath: '/+',
//       // component: path.resolve('./src/templates/catSelected.js'),
//     });
//   }
// };

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                subcategory
                draft
              }
            }
          }
        }
      }
    `,
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => !node.frontmatter.draft && !!node.frontmatter.category,
    );

    const categories = new Set(
      posts.map((post) => post.node.frontmatter.category),
    );

    let pairs = posts
      .map((post) => [
        post.node.frontmatter.category,
        post.node.frontmatter.subcategory,
      ])
      .filter((onePair) => onePair[1]);

    pairs = Array.from(new Set(pairs.map(JSON.stringify)), JSON.parse);

    pairs.forEach((onePair) => {
      createPage({
        path: `/${onePair[0]}/${onePair[1]}/`,
        component: path.resolve(`./src/templates/index-subcategory.js`),
      });
    });

    categories.forEach((oneCate) => {
      createPage({
        path: `/${oneCate}/`,
        component: path.resolve(`./src/templates/index-category.js`),
      });
    });

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
