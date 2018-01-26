//App.js contains the a React ES6 class component with the name App, which is  A COMPONENT DECLARATION.
//After a component is declared, you can use it as element everywhere in your app. 
//The element the component declaration returns is specfiied in the render method. Elements are what components are made of.

//Note: The App component is not yet instantiated, it is only declared in this file. The instantiation of the component would take
//place somehwere in our JSX with  <App /> (clue: index.js)

import React, { Component } from 'react';
import logo from './logo.svg';
import fetch from 'isomorphic-fetch';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//higher order function does at least one of the following
//1) takes one or more functions as arguments
//2) returns a function as its result
//ES5
/*
function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
}
*/
//higher order components. take in a component as an argument and 
//returns a component as output
const withLoading = (Component) => ({isLoading, ...rest}) =>
  isLoading
  ? <Loading />
  : <Component {...rest} />

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
 };


//Declaring the App component, but it extends from another "component" class called Component 
//extends is like inheritance in OOP. Used to pass over functionalities from one class to another class.
//The Component class encapsulates all the implementation details of a React component. It enables developers to use classes as components in React
class App extends Component {

    //The construct is called only once when the component is initialized
    //initialize internal component state
    //mandatory to call the super method because this "App" component is a subclass of Component
  constructor(props){
    super(props);
    //The state is bound to the class using the this object. You can acess the local state in your whole component
    //the list is part of the component now
    this.state = {
      //Since the property name is the same of the variable name in this object, we can shorten the following line
      //list: list,
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.doSomething = this.doSomething.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSort = this.onSort.bind(this);
    //avoid defining the business logic inside the constructor because it makes it messy
   /* this.onClick = () =>{
      console.log(this);
    }
    */
  }
  onSort(sortKey){
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({sortKey});
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }
  doSomething(){
    console.log(this);
  }
  setSearchTopStories(result) {
    const {hits, page} = result;
    const {searchKey, results} = this.state;
    const oldHits = (results && results[searchKey]) 
      ? results[searchKey].hits 
      : [];
    

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({ 
      results: {
        ...results, 
        [searchKey]: {hits: updatedHits, page}
      },
      isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page=0) {
    this.setState({isLoading: true});
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(e => this.setState({ error: e}));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  //When using a handler in your element, you get access to the "synthetic" React
  //event in your callback function's signature
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value})
  }
  onDismiss(id){
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId =  item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      //result: Object.assign({}, this.state.result, { hits: updatedHits })
      //use  spread operator
    
      
      results: {...results, [searchKey]: {hits: updatedHits, page}
    }
    });
  }
  render() {
    //Destructuring (extracting values from objects and arrays)
    //ES5
    // const searchTerm = this.state.searchTerm
    //const list = this.state.list
    
    //ES6
    const {
      searchTerm, 
      results,
      searchKey,
      error,
      isLoading,
      sortKey,
      isSortReverse
    } = this.state;

    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
    ) || 0;


    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.helloWorld}</h1>
        </header>
        <div className="page">
      <div className="interactions">
        <Search 
          value={searchTerm} 
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        > 
        <span>Search</span> 
        </Search>
        </div>
        { error
          ? <div className="interactions">
            <p>Something went wrong :(</p>
              </div>
            :
          <Table 
            list={list}
            sortKey={sortKey}
            onSort={this.onSort}
            isSortReverse={isSortReverse}
            onDismiss={this.onDismiss}
          />
        }
          <ButtonWithLoading 
           isLoading={isLoading}
           onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
            </ButtonWithLoading> 
        </div>
       </div>
    );
  }
}

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

const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
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
  {children}
</Button>
);
}




//Create a Table component (declaring)
//Stateless functional component
const Table = ({
  list, 
  sortKey, 
  isSortReverse,
  onSort, 
  onDismiss
}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse
  ? sortedList.reverse()
  : sortedList;

  return(
  <div className="table">
  <div className="table-header">
    <span style={{ width: '40%' }}>
    <Sort
    sortKey={'TITLE'}
    onSort={onSort}
    activeSortKey={sortKey}
    >
    Title
    </Sort>
    </span>
    <span style={{ width: '30%' }}>
    <Sort
    sortKey={'AUTHOR'}
    onSort={onSort}
    activeSortKey={sortKey}
    >
    Author
    </Sort>
    </span>
    <span style={{ width: '10%' }}>
    <Sort
    sortKey={'COMMENTS'}
    onSort={onSort}
    activeSortKey={sortKey}
    >
    Comments
    </Sort>
    </span>
    <span style={{ width: '10%' }}>
    <Sort
    sortKey={'POINTS'}
    onSort={onSort}
    activeSortKey={sortKey}
    >
    Points
    </Sort>
    </span>
    <span style={{ width: '10%' }}>
    Archive
    </span>
    </div>
    {reverseSortedList.map(item =>
    <div key={item.objectID} className="table-row">
    <span style={{ width: '40%' }}>
    <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>
    {item.author}
    </span>
    <span style={{ width: '10%' }}>
    {item.num_comments}
    </span>
    <span style={{ width: '10%' }}>
    {item.points}
    </span>
    <span style={{ width: '10%' }}>

    
    <Button
    onClick={() => onDismiss(item.objectID)}
    className="button-inline"
    >
    Dismiss
    </Button>
    </span>
    </div>
  )}
</div>
  );
}

//Define a PropType interface for the Table component
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
    objectID: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    num_comments: PropTypes.number,
    points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

//Stateless functional compoent
const Button = ({onClick, className = '', children}) =>
<button
  onClick = {onClick}
  className = {className}
  type="button"
  >
  {children}
</button>

const Loading = () => 
//<div>Loading...</div>
<div>
<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
<span className="sr-only">Loading...</span>
</div>

const ButtonWithLoading = withLoading(Button);

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

export default App;

export{
  Button,
  Search,
  Table,
};