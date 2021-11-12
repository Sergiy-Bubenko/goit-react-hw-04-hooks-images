import PropTypes from 'prop-types'

export default function ImageGalleryItem({ arrImages, givLinkForModal }) {
  return arrImages.map((obj) => {
    return (
      <li
        className="ImageGalleryItem"
        key={obj.id}
        id={obj.id}
        onClick={givLinkForModal}
      >
        <img className="ImageGalleryItem-image" src={obj.webformatURL} alt="" />
      </li>
    )
  })
}

ImageGalleryItem.propTypes = {
  givLinkForModal: PropTypes.func,
  arrImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
    }),
  ),
}
