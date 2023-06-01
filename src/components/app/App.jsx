import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContainerDiv } from './App.styled';
import Modal from '../modal';
import SearchbarHeader from '../searchbar';
import ImageGallery from '../imageGallery';

class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
  };

// componentDidMount() {
//   }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handelFormSubmit = searchQuery => {
    console.log(searchQuery);
    this.setState({ searchQuery });
  };

  render() {
    const { showModal } = this.state;

    return (
      <ContainerDiv>
        <SearchbarHeader onSubmit={this.handelFormSubmit}></SearchbarHeader>
  
    
          <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
    

        <button type="button" onClick={this.toggleModal}>
          відкрити М
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={2000}></ToastContainer>
      </ContainerDiv>
    );
  }
}

export default App;
