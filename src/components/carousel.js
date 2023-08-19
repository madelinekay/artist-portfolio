import React, { useEffect, useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
// import onClickOutside from 'react-clickoutside'

const Blurb = styled.div`
  display: block;
  width: 35%;
  flex-shrink: 0;
  margin-right: 40px;
  line-height: 1.3;
  font-size: 14px;
`;

// via https://usehooks.com/useOnClickOutside/
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const Photo = ({ photo }) => (
  <div
    css={`
      display: block;
      flex-shrink: 0;
      margin-right: 30px;
    `}
  >
    <GatsbyImage
      style={{ maxHeight: '100%' }}
      image={getImage(photo)}
      // ^ is how new image plugin should work
      // image={photo.gatsbyImageData}
      key={photo.id}
      // imgStyle={{ objectFit: 'contain' }}
      //above doesn't work
    />
  </div>
);

const Carousel = ({ blurb, photos }) => {
  const scrollContainer = useRef();

  useEffect(() => {
    scrollContainer.current.scrollTo(0, 0);
    scrollContainer.current.focus();
  }, [blurb]);

  useOnClickOutside(scrollContainer, () => {
    setTimeout(() => scrollContainer.current.focus(), 0);
  });

  if (typeof window === 'undefined') return null;

  return (
    <div>
      <div
        ref={scrollContainer}
        tabIndex={0}
        css={`
          max-width: 100vw;
          overflow-x: auto;

          ::-webkit-scrollbar {
            -webkit-appearance: none;
          }
          ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.3);
            box-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
          }

          &:focus {
            outline: none;
          }
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: row;
          `}
        >
          {blurb ? (
            <Blurb>
              <div
                dangerouslySetInnerHTML={{
                  __html: blurb.replace(/\n/g, '<br /><br />'),
                }}
              ></div>
            </Blurb>
          ) : null}
          {photos.map((photo) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
      {/* <div
        css={`
          height: 300;
        `}
      >
        <GatsbyImage
          imgStyle={{ objectFit: 'contain' }}
          image={getImage(photos[0])}
        />
      </div> */}
    </div>
  );
};

export default Carousel;
