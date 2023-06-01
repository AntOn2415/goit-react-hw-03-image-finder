import React, { Component } from 'react';
import {GalleryLi} from './ImageGalleryItem.styled';
class ImageGalleryItem extends Component {

  render(){
    const { webformatURL, tags } = this.props;
    return (
      <GalleryLi>
        <img src={webformatURL} alt={tags} />
    </GalleryLi>
    )
  }
}

export default ImageGalleryItem;