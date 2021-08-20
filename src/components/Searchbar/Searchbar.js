import { Component } from 'react';
import s from './Searchbar.module.css';
export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  addInputSearch = e => {
    this.setState({ inputValue: e.currentTarget.value.trim() });
  };

  onSubmitInput = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmitInput}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.addInputSearch}
          />
        </form>
      </header>
    );
  }
}
