import React from 'react';
import Button from './button';
import classNames from 'classnames';

const Arrow = ({isReversed}) => isReversed 
? <span className="fa fa-angle-up"></span>
: <span className="fa fa-angle-down"></span>

const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  isSortReverse,
  children,
  }) => {
  
    const isActiveSortKey = (sortKey === activeSortKey);
    const sortClass = classNames(
      'button-inline',
      { 'button-active': isActiveSortKey }
    );
    
    return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
      >
      {children}
      { isActiveSortKey ? 
      <Arrow isReversed={isSortReverse} />
      : null
      }
    </Button>
    )
}

/*
const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  isSortReverse,
  children
  }) => {
  const sortClass = classNames(
  'button-inline',
  { 'button-active': sortKey === activeSortKey }
  );
return (
  <Button
  onClick={() => onSort(sortKey)}
  className={sortClass}
  >
  <Arrow isReversed={isSortReverse} />
  {children}
  </Button>
);
}
*/

export default Sort;