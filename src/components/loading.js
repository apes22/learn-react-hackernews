import React from 'react';

const Loading = () => 
//<div>Loading...</div>
<div>
<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
<span className="sr-only">Loading...</span>
</div>

//higher order components. take in a component as an argument and 
//returns a component as output
const withLoading = (Component) => ({isLoading, ...rest}) =>
  isLoading
  ? <Loading />
  : <Component {...rest} />

export default Loading;

export {withLoading};