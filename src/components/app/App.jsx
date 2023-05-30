import React, { Component } from "react";
import {Container} from './App.styled'
import Modal  from '../modal';
import SearchbarImg from '../searchbar';
import ImageGallery from '../imageGallery';
class App extends Component{
  state = {
    showModal: false
  };
toggleModal = () => {
  this.setState(({showModal}) => ({
    showModal: !showModal
  }))
};

  render () {
    const {showModal} = this.state;
  
    return (
      <Container>
<ImageGallery></ImageGallery>
      <SearchbarImg></SearchbarImg>
{showModal && <Modal></Modal>}
      </Container>
  
      );
  }

};

export default App;
