import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, className = '', children}) =>
<button
  onClick = {onClick}
  className = {className}
  type="button"
  >
  {children}
</button>

//Assign a props interface to a component
//How to create a prop interface to a component
//You take every argument from the function signature 
//and assign a PropType to it!
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
};

export default Button;