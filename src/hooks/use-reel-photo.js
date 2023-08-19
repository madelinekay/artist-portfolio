import useCarousel from './use-carousel';

const useReelPhoto = (activePhoto) => {
  const photos = useCarousel("carousel");
  if (activePhoto) {
    const photo = photos.find(p => p.name === activePhoto.name.slice(0, activePhoto.name.indexOf('-thumbnail')))
    return photo
  } else {
    return null
  }
};

export default useReelPhoto;

