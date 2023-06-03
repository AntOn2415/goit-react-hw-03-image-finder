import React, { Component } from 'react';
import galleryApi from '../../servise/CalleryApi';
import { toast } from 'react-toastify';
import LoaderReact from '../loader';
import { GalleryUl } from './ImageGallery.styled';
import ImageGalleryItem from '../imageGalleryItem';
import Modal from '../modal';

class ImageGallery extends Component {
  state = {
    page: 1,
    gallery: null,
    error: null,
    status: 'idle',
    selectedImage: '',
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    if (prevQuery !== nextQuery) {
      this.resetPage();

      this.setState({ status: 'pending' });
      try {
        const gallery = await galleryApi.fetchGallery(nextQuery, this.state.page);

        if (gallery.length === 0) {
          toast.error('Sorry, there are no images matching your search query. Please try again.');
        }

        this.setState({ gallery, status: 'resolved' });
        this.incrementPage();
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  incrementPage() {
    this.setState(({ page }) => ({ page: (page += 1) }));
  }

  resetPage() {
    this.setState({ page: 1 });
  }

  handleImageClick = (imageUrl, tags) => {
    this.setState({ selectedImage: { url: imageUrl, alt: tags }, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  render() {
    const { gallery, status, selectedImage, showModal } = this.state;
    if (status === 'idle') {
      return null;
    }
    if (status === 'pending') {
      return <LoaderReact />;
    }
    if (status === 'rejected') {
      return null;
    }
    if (status === 'resolved') {
      return (
        <GalleryUl>
          {gallery.map((image) => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
          {showModal && (
            <Modal onClose={this.handleCloseModal}>
              <img src={selectedImage.url} alt={selectedImage.alt} />
            </Modal>
          )}
        </GalleryUl>
      );
    }
  }
}

export default ImageGallery;
