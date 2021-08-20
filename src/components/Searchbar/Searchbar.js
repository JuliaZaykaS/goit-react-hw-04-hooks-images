// import { Component } from 'react';
import { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
  const [inputValue, setInputValue] = useState('');


  const addInputSearch = e => {
setInputValue(e.currentTarget.value.trim())
    // this.setState({ inputValue: e.currentTarget.value.trim() });
  };

  const onSubmitInput = e => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
    // this.setState({ inputValue: '' });
  };

  // render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={onSubmitInput}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={addInputSearch}
          />
        </form>
      </header>
    );
  // }
}

// Классы
// export default class Searchbar extends Component {
//   state = {
//     inputValue: '',
//   };

//   addInputSearch = e => {
//     this.setState({ inputValue: e.currentTarget.value.trim() });
//   };

//   onSubmitInput = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.inputValue);
//     this.setState({ inputValue: '' });
//   };

//   render() {
//     return (
//       <header className={s.Searchbar}>
//         <form className={s.SearchForm} onSubmit={this.onSubmitInput}>
//           <button type="submit" className={s.SearchFormButton}>
//             <span className={s.SearchFormButtonLabel}>Search</span>
//           </button>
//           <input
//             className={s.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.inputValue}
//             onChange={this.addInputSearch}
//           />
//         </form>
//       </header>
//     );
//   }
// }
