import React from 'react';
import PropTypes from 'prop-types';
//Create a Search component
//Stateless functional component
const Search = ({value, onChange, onSubmit, children}) =>{
  let input;
  return(
  <form onSubmit={onSubmit}>
    {children}
    <input 
    type="text" 
    //The internal component state is the single source of truth for the input field.
    //The unidirectional data flow loop for the input field is self-contained now
    value={value}
    onChange={onChange}     
    ref={(node) => input = node}
    />
  <button type="submit">
    {children}
  </button>
  </form>
  )
}

Search.propTypes = {
  value: PropTypes.string, 
  onChange: PropTypes.func.isRequired, 
  onSubmit: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired,
};

export default Search;