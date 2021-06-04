import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getSearch } from '../actions';
import '../assets/styles/components/Search.scss';

const Search = (props) => {
  const { isHome, getSearch } = props;
  const inputStyle = classNames('input', {
    isHome,
  });

  const handleInput = (event) => {
    getSearch(event.target.value);
  };

  return (
    <section className='main'>
      <h2 className='main__title'>What do you want to see?</h2>
      <input type='text' className={inputStyle} placeholder='Buscar...' onKeyUp={handleInput} />
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
  };
};

const mapDispatchToProps = {
  getSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
