import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({url, name, onClickImg}){
    return (

        <li className={s.ImageGalleryItem} onClick={onClickImg}>
            <img src={url} alt={name} className={s.ImageGalleryItemImage} />
</li>
    )
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}
