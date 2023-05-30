import React, { Component } from 'react';
import {Overlay, ModalImg} from './Modal.styled';
class Modal extends Component {
  render(){
    return (<Overlay>
    <ModalImg>
      <img src="" alt="" />
    </ModalImg>
    </Overlay>)
  }
}

export default Modal;

