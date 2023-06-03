import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContainerDiv } from './App.styled';
import SearchbarHeader from '../searchbar';
import ImageGallery from '../imageGallery';
import Button from 'components/button/Button';
class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {

    return (
      <ContainerDiv>
        <SearchbarHeader onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchQuery={this.state.searchQuery}
        />
<Button></Button>
        <ToastContainer autoClose={2000} />
      </ContainerDiv>
    );
  }
}

export default App;
