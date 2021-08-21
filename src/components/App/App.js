import { useState, useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import ModalImage from "../ImageGalleryItem/ImageGalleryModal";
import s from "./App.module.css";
import ImagesAPIService from "../services/images-api";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

const imagesAPIService = new ImagesAPIService();

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [largeImg, setLargeImg] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchValue === "") return;
    imagesAPIService.query = searchValue;

    const loadImages = () => {
      setStatus(Status.PENDING);

      imagesAPIService
        .fetchImages()
        .then((result) => {
          if (result.hits.length !== 0) {
            setImages((prevImages) => [...prevImages, ...result.hits]);
            setStatus(Status.RESOLVED);
          }
        })
        .catch((error) => {
          setError(error);
          setStatus(Status.REJECTED);
        })
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        });
    };

    loadImages();
  }, [searchValue, page]);

  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);
    setImages([]);
    imagesAPIService.resetPage();
    setPage(1);
  };

  const clearModalData = () => {
    setLargeImg({});
  };

  const toggleModal = (e) => {
    setShowModal((showModal) => !showModal);
  };

  const loadMoreImages = () => {
    imagesAPIService.incrementPage();
    setPage(imagesAPIService.page);
  };

  const openModalImg = (e) => {
    const largeImage = images.find((img) => img.webformatURL === e.target.src);
    setLargeImg(largeImage);
    toggleModal();
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={getSearchValue} />
      {status === Status.IDLE && null}
      {status === Status.REJECTED && <div>{error.message}</div>}
      {status === Status.RESOLVED && images.length === 0 && (
        <div className={s.notFound}>Images not found</div>
      )}
      <ImageGallery onImgClick={openModalImg} images={images} />
      {status === Status.PENDING && <Loader />}
      {images.length !== 0 && <Button onClickBtn={loadMoreImages} />}

      {showModal && (
        <Modal onClose={toggleModal} clearModal={clearModalData}>
          <ModalImage url={largeImg.largeImageURL} name={largeImg.user} />
        </Modal>
      )}
    </div>
  );
}

export default App;

// import { Component } from 'react';
// import Searchbar from '../Searchbar/Searchbar';
// import ImageGallery from '../ImageGallery/ImageGallery';
// import Modal from '../Modal/Modal';
// import ModalImage from '../ImageGalleryItem/ImageGalleryModal';
// import s from './App.module.css';
// import ImagesAPIService from '../services/images-api';
// import Loader from '../Loader/Loader';
// import Button from '../Button/Button';

// const imagesAPIService = new ImagesAPIService();
// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };
// class App extends Component {
//   state = {
//     searchValue: '',
//     largeImg: {},
//     showModal: false,
//     error: null,
//     images: [],
//     status: Status.IDLE,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.searchValue;
//     const nextName = this.state.searchValue;

//     if (prevName !== nextName) {
//       this.setState({images:[]})
//       imagesAPIService.resetPage();
//       this.loadImages(nextName);
//     }
//   }

//   getSearchValue = searchValue => {
//     this.setState({ searchValue });
//   };

//   clearModalData = () => {
//     this.setState({ largeImg: {} });
//   };

//   toggleModal = e => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   loadMoreImages = () => {
//     imagesAPIService.incrementPage();
//     this.loadImages(this.state.searchValue);
//   };

//   openModalImg = e => {

//     const largeImage = this.state.images.find(
//       img => img.webformatURL === e.target.src,
//     );
//     this.setState({ largeImg: largeImage });
//     this.toggleModal();
//   };

//   loadImages = value => {
//     this.setState({ status: Status.PENDING });
//     imagesAPIService.query = value;

//     imagesAPIService
//       .fetchImages()
//       .then(images => {
//         images.hits.length !== 0
//           ? this.setState({
//               images: [...this.state.images, ...images.hits],
//               status: Status.RESOLVED,
//             })
//           : this.setState({ status: Status.RESOLVED });
//       })
//       .catch(error => this.setState({ error, status: Status.REJECTED }))
//       .finally(() => {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       });
//   };

//   render() {
//     const { largeImg, searchValue, showModal, images, status } = this.state;
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.getSearchValue} />
//         {status === Status.IDLE && null}
//         {status === Status.REJECTED && <div>{this.error.message}</div>}
//         {status === Status.RESOLVED && images.length === 0 && <div className={s.notFound}>Images not found</div>}
//         <ImageGallery
//           onImgClick={this.openModalImg}
//           images={images}
//         />
//         {status === Status.PENDING && <Loader />}
//         {images.length !== 0 && (
//           <Button onClickBtn={() => this.loadMoreImages(searchValue)} />
//         )}

//         {showModal && (
//           <Modal onClose={this.toggleModal} clearModal={this.clearModalData}>
//             <ModalImage url={largeImg.largeImageURL} name={largeImg.user} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
