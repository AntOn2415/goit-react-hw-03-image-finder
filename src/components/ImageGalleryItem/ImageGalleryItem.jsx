// import React from 'react';
// import { GalleryLi } from './ImageGalleryItem.styled';

// const ImageGalleryItem = ({ webformatURL, tags, onClickImg }) => {
//   const handleClick = () => {
//     onClickImg(webformatURL);
//   };

//   return (
//     <GalleryLi>
//       <img onClick={handleClick} src={webformatURL} alt={tags} />
//     </GalleryLi>
//   );
// };

// export default ImageGalleryItem;

import React from 'react';
import { GalleryLi } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <GalleryLi>
      <img onClick={onClick} src={webformatURL} alt={tags} />
    </GalleryLi>
  );
};

export default ImageGalleryItem;