import { graphql, useStaticQuery } from 'gatsby';

const usePhotos = () => {
  const data = useStaticQuery(graphql`{
  allFile(filter: {
      extension: { eq: "jpg" },
      relativeDirectory: { eq: "carousel" },
      absolutePath: { glob: "**/*thumbnail.jpg" }
  }) {
    nodes {
      id
      name
      relativeDirectory
      childImageSharp {
        gatsbyImageData(width: 480, height: 480, quality: 80, layout: CONSTRAINED)
      }
    }
  }
}
`);


  const getPosition = (string) => {
    let strings = string.split("-")
    return Number(strings[strings.length - 2])
  }
  const sortedNodes = data?.allFile?.nodes.sort((a, b) => {
    return getPosition(a.name) - getPosition(b.name)
  })

  return sortedNodes.map((node) => ({
    ...node.childImageSharp,
    id: node.id,
    name: node.name,
    directory: node.relativeDirectory,
  }));
};

export default usePhotos;

