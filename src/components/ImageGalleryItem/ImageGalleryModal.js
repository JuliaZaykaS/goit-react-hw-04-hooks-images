import PropTypes from 'prop-types';


export default function ModalImage({ url, name }) {
    return (
        <img src={url} alt={name} />
    )
}

ModalImage.propTypes = {
    url: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
}
