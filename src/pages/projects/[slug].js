import React from 'react';
import Layout from '../../components/layout';
import Carousel from '../../components/carousel';
import useCarousel from '../../hooks/use-carousel';

const projects = [
  {
    slug: 'borjomi',
    blurb:
      'Photos en route to Borjomi, Georgia. Black and white 35mm film, 200 speed.',
  },
];

const ProjectLayout = (props) => {
  const { slug } = props.params;
  const project = projects.find((p) => p.slug === slug);
  const photos = useCarousel(slug);
  if (!project) {
    return null;
  }

  return (
    <Layout>
      <Carousel slug={project.slug} blurb={project.blurb} photos={photos} />
    </Layout>
  );
};

export default ProjectLayout;
