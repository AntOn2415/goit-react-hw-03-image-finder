
import React from 'react';
import { LoadMoreBtn } from './Button.styled';

const Button = () => {
  return (
    <LoadMoreBtn type='button'>
Load more
    </LoadMoreBtn>
  );
};

export default Button;
// class LoadMoreBtn {
//   constructor({ selector, hidden = false }) {
//     this.refs = this.getRefs(selector);


//   enable() {
//     this.refs.button.disabled = false;
//     this.refs.label.textContent = 'Load more';
//     this.refs.spinner.classList.add('is-hidden');
//   }

//   disabled() {
//     this.refs.button.disabled = true;
//     this.refs.label.textContent = 'Loading';
//     this.refs.spinner.classList.remove('is-hidden');
//   }

//   show() {
//     this.refs.button.classList.remove('is-hidden');
//   }

//   hide() {
//     this.refs.button.classList.add('is-hidden');
//   }
// }

// export { LoadMoreBtn };
