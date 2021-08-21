import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
export default function ImageGallery({ images, onImgClick }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map((item) => (
          <ImageGalleryItem
            key={item.id}
            url={item.webformatURL}
            name={item.user}
            onClickImg={onImgClick}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
