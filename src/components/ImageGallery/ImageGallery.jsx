import React, { Component } from 'react';
import axios from 'axios';
import { GalleryUl } from './ImageGallery.styled';
import ImageGalleryItem from '../imageGalleryItem';

const BASE_URL = `https://pixabay.com/api/`;
const apiKey = '35375960-33ece11f0993b514084206b61';
class ImageGallery extends Component {
  state = {
    page: 1,
    loading: false,
    gallery: null,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    if (prevQuery !== nextQuery) {
      this.resetPage();

      this.setState({ loading: true });
      try {
        const response = await axios.get(
          `${BASE_URL}?key=${apiKey}&q=${nextQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
        );
        const gallery = response.data.hits;
        this.setState({ gallery });
        this.incrementPage();
      } catch (error) {
        this.setState({error});
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  incrementPage() {
    this.setState(({ page }) => ({ page: (page += 1) }));
  }

  resetPage() {
    this.setState({ page: 1 });
  }

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl });
    this.toggleModal();
  };

  render() {
    const { loading, gallery } = this.state;
    const { searchQuery } = this.props;
    return (
      <GalleryUl>
        {loading && <h2>Загруз...</h2>}
        {gallery && gallery.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            tags={image.tags}
            searchQuery={searchQuery}
            onClick={() => this.handleImageClick(image.largeImageURL)}
          />
        ))}
      </GalleryUl>
    );
  }
}

export default ImageGallery;
