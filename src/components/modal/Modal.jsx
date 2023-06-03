import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import {ModalOverlay, ModalContent} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount(){
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    if(e.code === 'Escape') {
    this.props.onClose();
    }
  };

  handelModalOverlayClick = e => {
if(e.currentTarget === e.target) {
  this.props.onClose();
}
  }

  render(){
    return createPortal(<ModalOverlay onClick={this.handelModalOverlayClick}>
      <ModalContent>
        {this.props.children}
      </ModalContent>
      </ModalOverlay>, modalRoot,)
  }
}

export default Modal;

