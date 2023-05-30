import React, { Component } from 'react';
import { SearchbarImg, SearchForm, SearchFormButton, ButtonLabel, Input} from './Searchbar.styled';
class Searchbar extends Component {
  render(){
    return (
    <SearchbarImg>
    <SearchForm>
      <SearchFormButton type="submit">
        <ButtonLabel>Search</ButtonLabel>
      </SearchFormButton>
  
      <Input
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </SearchForm>
  </SearchbarImg>)
  }
}

export default Searchbar;