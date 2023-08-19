import React, { useEffect, useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import chunk from 'lodash/chunk';
import Modal from 'react-modal';
import styled from 'styled-components';

import usePhotos from '../hooks/use-photos';
import useReelPhoto from '../hooks/use-reel-photo';

Modal.setAppElement('#___gatsby');

const ChevronLeftIcon = ({ size = 20 }) => (
  <svg
    style={{ width: size, height: size }}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ size = 20 }) => (
  <svg
    style={{ width: size, height: size }}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const IconButton = styled.button`
  background: none;
  border: 0;
  padding: 10px;
  margin: 0;
  line-height: 1;
  user-select: none;
  visibility: ${({ disabled }) => (disabled ? `hidden` : `visible`)};
`;

const ReelCarousel = ({ activePhoto, onPrevPhoto, onNextPhoto, onClose }) => {
  const photo = useReelPhoto(activePhoto);

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      background: 'none',
      border: 'none',
      width: '65vw',
      height: '65vh',
      transform: 'translate(-50%, -50%)',
      padding: 0,
    },
  };

  return (
    <Modal isOpen={!!photo} onRequestClose={() => onClose()} style={modalStyle}>
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <IconButton
          type="button"
          disabled={!onPrevPhoto}
          onClick={() => onPrevPhoto()}
        >
          <ChevronLeftIcon size={60} />
        </IconButton>

        <div style={{ flex: 1, maxHeight: '100%', textAlign: 'center' }}>
          {photo !== null ? (
            <GatsbyImage image={getImage(photo)} alt="" />
          ) : null}
        </div>

        <IconButton
          type="button"
          disabled={!onNextPhoto}
          onClick={() => onNextPhoto()}
        >
          <ChevronRightIcon size={60} />
        </IconButton>
      </div>
    </Modal>
  );
};

const PhotoReel = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null); // number (index) or null
  const photos = usePhotos('carousel');
  const padders = Array.from(Array(3 - (photos.length % 3)));

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code == 'ArrowLeft') {
        if (activePhotoIndex !== null && activePhotoIndex > 0) {
          setActivePhotoIndex(activePhotoIndex - 1);
        }
      }
      if (e.code == 'ArrowRight') {
        if (activePhotoIndex !== null && activePhotoIndex < photos.length - 1) {
          setActivePhotoIndex(activePhotoIndex + 1);
        }
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [activePhotoIndex]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 25,
          margin: '0 auto',
        }}
      >
        {chunk([...photos, ...padders], 3).map((rowPhotos, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 25,
              justifyContent: 'space-evenly',
            }}
          >
            {rowPhotos.map((photo, index) =>
              photo ? (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(rowIndex * 3 + index)}
                  style={{ flex: 1, cursor: 'pointer' }}
                >
                  <GatsbyImage
                    placeholder="tracedSVG"
                    image={photo.gatsbyImageData}
                    alt=""
                  />
                </div>
              ) : (
                <div key={index} style={{ flex: 1 }} />
              ),
            )}
          </div>
        ))}
      </div>

      <ReelCarousel
        activePhoto={photos[activePhotoIndex]}
        onPrevPhoto={
          activePhotoIndex > 0
            ? () => setActivePhotoIndex(activePhotoIndex - 1)
            : null
        }
        onNextPhoto={
          activePhotoIndex < photos.length - 1
            ? () => setActivePhotoIndex(activePhotoIndex + 1)
            : null
        }
        onClose={() => setActivePhotoIndex(null)}
      />

      <footer
        css={`
          padding: 120px 0 40px;
          text-align: center;
        `}
      >
        <div>All images copyright &copy; 2022 Madeline Undis</div>
      </footer>
    </>
  );
};

export default PhotoReel;
