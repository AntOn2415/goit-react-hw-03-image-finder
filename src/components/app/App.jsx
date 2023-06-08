import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContainerDiv } from './App.styled';
import SearchbarHeader from '../searchbar';
import ImageGallery from '../imageGallery';
import Button from '../button/Button';
import Modal from '../modal';
import LoaderReact from '../loader';

class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    selectedImage: '',
    gallery: [],
    page: 1,
    showLoadMoreBtn: false,
    status: 'idle',
  };

  handleFormSubmit = searchQuery => {
    const { searchQuery: prevSearchQuery } = this.state;
    if (prevSearchQuery !== searchQuery) {
      this.setState({
        searchQuery,
        page: 1,
        gallery: [],
        showLoadMoreBtn: false,
        status: 'pending',
      });
    }
  };

  handleImageClick = (imageUrl, tags) => {
    this.setState({
      selectedImage: { url: imageUrl, alt: tags },
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleLoadMoreBtnStatusChange = status => {
    this.setState({ showLoadMoreBtn: status });
  };

  handleGalleryStatusChange = status => {
    this.setState({ status });
  };

  render() {
    const {
      searchQuery,
      selectedImage,
      showModal,
      gallery,
      showLoadMoreBtn,
      page,
      status,
    } = this.state;

    return (
      <ContainerDiv>
        <SearchbarHeader onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchQuery={searchQuery}
          handleImageClick={this.handleImageClick}
          gallery={gallery}
          page={page}
          onLoadMoreBtnStatusChange={this.handleLoadMoreBtnStatusChange}
          onGalleryStatusChange={this.handleGalleryStatusChange}
        />

        {status === 'pending' && <LoaderReact />}

        {showModal && (
          <Modal onClose={this.handleCloseModal}>
            <img src={selectedImage.url} alt={selectedImage.alt} />
          </Modal>
        )}

        <ToastContainer autoClose={2000} />

        {showLoadMoreBtn && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
      </ContainerDiv>
    );
  }
}

export default App;
