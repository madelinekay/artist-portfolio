import { graphql, useStaticQuery } from 'gatsby';

const useCarousel = (directory) => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { eq: "jpg" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        nodes {
          id
          name
          relativeDirectory
          childImageSharp {
            gatsbyImageData(quality: 100, height: 500, layout: CONSTRAINED)
          }
        }
      }
    }
  `);

  // const data = useStaticQuery(graphql`{
  //   allFile(filter: {sourceInstanceName: {eq: "images"}, ext: {eq: ".jpg"}}) {
  //     nodes {
  //       id
  //       name
  //       relativeDirectory
  //       childImageSharp {
  //         original {
  //           height
  //           width
  //         }
  //         gatsbyImageData(quality: 100, layout: CONSTRAINED)
  //       }
  //     }
  //   }
  // }
  // `);

  const filteredNodes = data?.allFile?.nodes.filter(
    (node) => node.relativeDirectory === directory,
  );
  const getPosition = (string) => {
    let strings = string.split('-');
    return Number(strings[1]);
  };
  const sortedNodes = filteredNodes.sort((a, b) => {
    return getPosition(a.name) - getPosition(b.name);
  });

  return sortedNodes.map((node) => ({
    ...node.childImageSharp,
    id: node.id,
    name: node.name,
    directory: node.relativeDirectory,
    // aspectRatio:
    //   node.childImageSharp.original.width /
    //   node.childImageSharp.original.height,
  }));
};

export default useCarousel;
