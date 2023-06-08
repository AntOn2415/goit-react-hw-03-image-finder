import React, { Component, createRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import LoaderReact from '../Loaders';
import { GalleryUl } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItems';
import galleryApi from '../../servise/GalleryApi';

class ImageGallery extends Component {
  galleryRef = createRef();

  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onLoadMoreBtnStatusChange: PropTypes.func.isRequired,
    handleImageClick: PropTypes.func.isRequired,
    onGalleryStatusChange: PropTypes.func.isRequired,
  };

  state = {
    gallery: [],
    error: null,
    status: 'idle',
    prevQuery: '',
    prevPage: 0,
  };

  async componentDidUpdate(prevProps) {
    const { searchQuery, page } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ gallery: [], status: 'idle', prevPage: 0 });
    }

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.setState({ status: 'pending' });
      this.props.onLoadMoreBtnStatusChange(false);

      try {
        const newGallery = await galleryApi.fetchGallery(searchQuery, page);

        if (newGallery.length === 0) {
          this.setState({ status: 'pending' });
          this.props.onGalleryStatusChange('idle');
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState(
            prevState => ({
              gallery: [...prevState.gallery, ...newGallery],
              status: 'resolved',
            }),
            () => {
              if (newGallery.length < 12) {
                this.props.onLoadMoreBtnStatusChange(false);
                toast.info(
                  "We're sorry, but you've reached the end of search results."
                );
              } else {
                this.props.onLoadMoreBtnStatusChange(true);
              }
              this.scrollToOldGallery();
              this.props.onGalleryStatusChange('resolved');
            }
          );
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error(
          'An error occurred while loading images. Please check your internet connection'
        );
        this.props.onGalleryStatusChange('idle');
      }
    }
  }

  scrollToOldGallery = () => {
    const galleryElement = this.galleryRef.current;
    const imageElements = galleryElement.querySelectorAll('li');

    if (imageElements.length >= 12) {
      const targetImage = imageElements[imageElements.length - 6];

      if (targetImage) {
        targetImage.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  };

  render() {
    const { gallery, status } = this.state;

    if (status === 'idle' || gallery.length === 0) {
      return null;
    }

    if (status === 'pending') {
      return <LoaderReact />;
    }

    if (status === 'rejected') {
      return <div>Error occurred while loading images.</div>;
    }

    if (status === 'resolved') {
      return (
        <GalleryUl ref={this.galleryRef}>
          {gallery.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              onClick={() =>
                this.props.handleImageClick(image.largeImageURL, image.tags)
              }
            />
          ))}
          <li name="oldGallery" />
        </GalleryUl>
      );
    }

    return null;
  }
}

export default ImageGallery;
