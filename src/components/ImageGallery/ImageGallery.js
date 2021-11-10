import { Component } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Modal from "../Modal";
import PropTypes from "prop-types";

const MY_API_KEY = "23246580-47279d47050c78840bfc8f048";

class ImageGallery extends Component {
  state = {
    pageNumber: 1,
    arrImages: [],
    error: null,
    status: "idle",
    modalImage: "",
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.requestValue !== this.props.requestValue) {
      this.setState({
        status: "pending",
        pageNumber: 1,
      });

      this.onRequest()
        .then((arr) =>
          this.setState({
            arrImages: arr.hits,
            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error: error, status: "rejected" }));
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      this.setState({
        status: "pending",
      });
      this.onRequest()
        .then((arr) =>
          this.setState({
            arrImages: [...prevState.arrImages, ...arr.hits],
            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error: error, status: "rejected" }));
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  onRequest = () => {
    const { requestValue } = this.props;
    return fetch(
      `https://pixabay.com/api/?q=${requestValue}&page=${this.state.pageNumber}&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Ошибка по запросу ${requestValue}`));
    });
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  givLinkForModal = (e) => {
    const objId = this.state.arrImages.find(
      (obj) => obj.id === Number(e.currentTarget.id)
    );

    this.setState({
      modalImage: objId.largeImageURL,
    });

    this.toggleModal();
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { status, error, arrImages, showModal, modalImage } = this.state;
    if (status === "idle") {
      return <div>The result of your request will be posted here</div>;
    }

    if (status === "pending") {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }

    if (status === "rejected") {
      return <div>{error}</div>;
    }

    if (arrImages.length === 0) {
      return (
        <div>
          There are no results for this request: "{this.props.requestValue}"
          Сhange request.
        </div>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem
              arrImages={arrImages}
              givLinkForModal={this.givLinkForModal}
            />
          </ul>
          {arrImages.length > 0 && <Button onLoadMore={this.onLoadMore} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImage} alt="" />
            </Modal>
          )}
        </>
      );
    }
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  requestValue: PropTypes.string,
};
