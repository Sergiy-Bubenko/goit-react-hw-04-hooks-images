import { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import ImageGalleryItem from '../ImageGalleryItem'
import Button from '../Button'
import Modal from '../Modal'
import PropTypes from 'prop-types'

const MY_API_KEY = '23246580-47279d47050c78840bfc8f048'

export default function ImageGallery({ requestValue }) {
  const [pageNumber, setPageNumber] = useState(1)
  const [arrImages, setArrImages] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [modalImage, setModalImage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [stopFetchOfRequest, setStopFetchOfRequest] = useState(true)
  const [stopFetchOfPages, setStopFetchOfPages] = useState(true)

  const onRequest = () => {
    setStatus('pending')
    fetch(
      `https://pixabay.com/api/?q=${requestValue}&page=${pageNumber}&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(new Error(`Ошибка по запросу ${requestValue}`))
      })
      .then((arr) => {
        setArrImages((prevArrImages) => {
          if (prevArrImages.length > 0) {
            return [...prevArrImages, ...arr.hits]
          }
          return arr.hits
        })
        setStatus('resolved')
      })
      .catch((error) => {
        setError(error)
        setStatus('rejected')
      })
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      })

    return () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (stopFetchOfRequest) {
      return setStopFetchOfRequest(false)
    }

    onRequest()
    setArrImages([])
    setPageNumber(1)
  }, [requestValue])

  useEffect(() => {
    if (stopFetchOfPages) {
      return setStopFetchOfPages(false)
    }
    onRequest()
  }, [pageNumber])

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const givLinkForModal = (e) => {
    const objId = arrImages.find((obj) => obj.id === Number(e.currentTarget.id))

    setModalImage(objId.largeImageURL)
    toggleModal()
  }

  const onLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  if (status === 'idle') {
    return <div>The result of your request will be posted here</div>
  }

  if (status === 'pending') {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    )
  }

  if (status === 'rejected') {
    return <div>{error}</div>
  }

  if (arrImages.length === 0) {
    return (
      <div>
        There are no results for this request: "{requestValue}" Сhange request.
      </div>
    )
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem
            arrImages={arrImages}
            givLinkForModal={givLinkForModal}
          />
        </ul>
        {arrImages.length > 0 && <Button onLoadMore={onLoadMore} />}
        {showModal && (
          <Modal onClose={toggleModal} showModal={showModal}>
            <img src={modalImage} alt="" />
          </Modal>
        )}
      </>
    )
  }
}

ImageGallery.propTypes = {
  requestValue: PropTypes.string,
}
