import { useState, useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import ModalImage from "../ImageGalleryItem/ImageGalleryModal";
import s from "./App.module.css";
// import ImagesAPIService from "../services/images-api";
import PexelsAPIService from "../services/pexels-api";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

// const imagesAPIService = new ImagesAPIService();
const pexelsAPIService = new PexelsAPIService();

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
  const [page, setPage] = useState(pexelsAPIService.page);
  // console.log(page);

  useEffect(() => {
      setImages([]);
    if (searchValue === "") return;
    //   // imagesAPIService.resetPage();
    pexelsAPIService.resetPage();

    //   // imagesAPIService.query = searchValue;
    pexelsAPIService.query = searchValue;
    console.log(page);
    // pexelsAPIService.incrementPage();
    //   setStatus(Status.PENDING);

    const loadImages = () => {
      setStatus(Status.PENDING);

      //   // imagesAPIService
      pexelsAPIService
        .fetchImages()
        .then((result) => {
          //       // if (result.hits.length !== 0) {
          if (result.photos.length !== 0) {
            //         // setImages([...images, ...result.hits]);
            //         // setImages([...images, ...result.photos]);
            //         // setImages(prevImages=>[...prevImages, ...result.hits]);
            setImages((prevImages) => [...prevImages, ...result.photos]);
            setStatus(Status.RESOLVED);
            // pexelsAPIService.incrementPage();
            //       } else {
            //         setStatus(Status.RESOLVED);
            //       }
          }
        })
        .catch((error) => {
          setError(error);
          setStatus(Status.REJECTED);
          //       // this.setState({ error, status: Status.REJECTED }))
        });
      // .finally(() => {
      //       window.scrollTo({
      //         top: document.documentElement.scrollHeight,
      //         behavior: "smooth",
      //       });
      //     });
    };
    //   // const loadImages = (value) => {
    //   // this.setState({ status: Status.PENDING });
    //   // imagesAPIService.query = value;

    //   // imagesAPIService
    //   //   .fetchImages()
    //   //   .then((result) => {
    //   //     // result.hits.length !== 0
    //   //     //   ?

    //   //     //     setImages([...images, ...result.hits])
    //   //     // setStatus(Status.RESOLVED)

    //   //     //   // this.setState({
    //   //     //   //     images: [...this.state.images, ...images.hits],
    //   //     //   //     status: Status.RESOLVED,
    //   //     //     // })
    //   //     //   // : this.setState({ status: Status.RESOLVED });
    //   //     //   :  (setStatus(Status.RESOLVED));
    //   //     if (result.hits.length !== 0) {
    //   //       setImages([...images, ...result.hits]);
    //   //       setStatus(Status.RESOLVED);
    //   //     } else {
    //   //       setStatus(Status.RESOLVED);
    //   //     }
    //   //   })
    //   //   .catch((error) => {
    //   //     setError(error);
    //   //     setStatus(Status.REJECTED);
    //   //     // this.setState({ error, status: Status.REJECTED }))
    //   //   })
    //   //   .finally(() => {
    //   //     window.scrollTo({
    //   //       top: document.documentElement.scrollHeight,
    //   //       behavior: "smooth",
    //   //     });
    //   //   });
    // // };

    //   // loadImages(searchValue);
    loadImages();
    console.log(pexelsAPIService.page);
    // pexelsAPIService.incrementPage();
    // return loadImages;


  }, [searchValue, page]);
  // useEffect(() => {
  //   // setImages([]);
  //   if (searchValue === '') return;
  //   imagesAPIService.resetPage();

  //   imagesAPIService.query = searchValue;
  //   setStatus(Status.PENDING);
  //   // const loadImages = (value) => {
  //   // this.setState({ status: Status.PENDING });
  //   // imagesAPIService.query = value;

  //   imagesAPIService
  //     .fetchImages()
  //     .then((result) => {
  //       // result.hits.length !== 0
  //       //   ?

  //       //     setImages([...images, ...result.hits])
  //       // setStatus(Status.RESOLVED)

  //       //   // this.setState({
  //       //   //     images: [...this.state.images, ...images.hits],
  //       //   //     status: Status.RESOLVED,
  //       //     // })
  //       //   // : this.setState({ status: Status.RESOLVED });
  //       //   :  (setStatus(Status.RESOLVED));
  //       if (result.hits.length !== 0) {
  //         setImages([...images, ...result.hits]);
  //         setStatus(Status.RESOLVED);
  //       } else {
  //         setStatus(Status.RESOLVED);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setStatus(Status.REJECTED);
  //       // this.setState({ error, status: Status.REJECTED }))
  //     })
  //     .finally(() => {
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     });
  // // };

  //   // loadImages(searchValue);
  // // eslint-disable-next-line no-use-before-define
  // },[images, searchValue])
  // componentDidUpdate(prevProps, prevState) {
  //   const prevName = prevState.searchValue;
  //   const nextName = this.state.searchValue;

  //   if (prevName !== nextName) {
  //     this.setState({ images: [] });
  //     imagesAPIService.resetPage();
  //     this.loadImages(nextName);
  //   }
  // }

  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);
    // this.setState({ searchValue });
  };

  const clearModalData = () => {
    setLargeImg({});
    // this.setState({ largeImg: {} });
  };

  const toggleModal = (e) => {
    setShowModal((showModal) => !showModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };

  const loadMoreImages = () => {
    // imagesAPIService.incrementPage();
    console.log(pexelsAPIService.page);
    // pexelsAPIService.incrementPage();
    setPage(pexelsAPIService.incrementPage());
    // setStatus(Status.PENDING);
    // console.log(pexelsAPIService.page);

    // loadImages(searchValue);
    // loadImages();
    // this.loadImages(this.state.searchValue);
  };

  const openModalImg = (e) => {
    // const largeImage = images.find((img) => img.webformatURL === e.target.src);
    const largeImage = images.find((img) => img.src.original === e.target.src);
    setLargeImg(largeImage);
    // this.setState({ largeImg: largeImage });
    toggleModal();
  };

  // const loadImages = (value) => {
  //   setStatus(Status.PENDING);
  //   // this.setState({ status: Status.PENDING });
  //   imagesAPIService.query = value;

  //   imagesAPIService
  //     .fetchImages()
  //     .then((result) => {
  //       // result.hits.length !== 0
  //       //   ?

  //       //     setImages([...images, ...result.hits])
  //       // setStatus(Status.RESOLVED)

  //       //   // this.setState({
  //       //   //     images: [...this.state.images, ...images.hits],
  //       //   //     status: Status.RESOLVED,
  //       //     // })
  //       //   // : this.setState({ status: Status.RESOLVED });
  //       //   :  (setStatus(Status.RESOLVED));
  //       if (result.hits.length !== 0) {
  //         setImages([...images, ...result.hits]);
  //         setStatus(Status.RESOLVED);
  //       } else {
  //         setStatus(Status.RESOLVED);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setStatus(Status.REJECTED);
  //       // this.setState({ error, status: Status.REJECTED }))
  //     })
  //     .finally(() => {
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     });
  // };

  // render() {
  // const { largeImg, searchValue, showModal, images, status } = this.state;
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
      {images.length !== 0 && (
        <Button onClickBtn={loadMoreImages} />
        // <Button onClickBtn={() => loadMoreImages(searchValue)} />
        // <Button  />
      )}

      {showModal && (
        <Modal onClose={toggleModal} clearModal={clearModalData}>
          {/* <ModalImage url={largeImg.largeImageURL} name={largeImg.user} /> */}
          <ModalImage url={largeImg.src.large} name={largeImg.photographer} />
        </Modal>
      )}
    </div>
  );
  // }
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
