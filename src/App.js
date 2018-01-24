//App.js contains the a React ES6 class component with the name App, which is  A COMPONENT DECLARATION.
//After a component is declared, you can use it as element everywhere in your app. 
//The element the component declaration returns is specfiied in the render method. Elements are what components are made of.

//Note: The App component is not yet instantiated, it is only declared in this file. The instantiation of the component would take
//place somehwere in our JSX with  <App /> (clue: index.js)

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

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
//ES6
const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());
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
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.doSomething = this.doSomething.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    //avoid defining the business logic inside the constructor because it makes it messy
   /* this.onClick = () =>{
      console.log(this);
    }
    */
  }
  doSomething(){
    console.log(this);
  }
  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  //When using a handler in your element, you get access to the "synthetic" React
  //event in your callback function's signature
  onSearchChange(event){
    console.log(event.target.value)
    this.setState({ searchTerm: event.target.value})
  }
  onDismiss(id){
    const isNotId =  item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      //result: Object.assign({}, this.state.result, { hits: updatedHits })
      //use  spread operator
    
      
      result: {...this.state.result, hits:updatedHits}
    });
  }
  render() {

    //Destructuring (extracting values from objects and arrays)
    //ES5
    // const searchTerm = this.state.searchTerm
    //const list = this.state.list
    
    //ES6
    const {searchTerm, result} = this.state;
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
        > 
        <span>Search by title: </span> 
        </Search>
        </div>
        { result ?
          <Table 
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
          : null
        }
       </div>
       </div>
    );
  }
}

//Create a Search component
//Stateless functional component
const Search = ({value, onChange, children}) =>
<form>
  {children}
  <input 
  type="text" 
  //The internal component state is the single source of truth for the input field.
  //The unidirectional data flow loop for the input field is self-contained now
  value={value}
  onChange={onChange}     
  />
  </form>

//Create a Table component (declaring)
//Stateless functional component
const Table = ({list, pattern, onDismiss}) => 
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => 
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

//Stateless functional compoent
const Button = ({onClick, className = '', children}) =>
<button
  onClick = {onClick}
  className = {className}
  type="button"
  >
  {children}
</button>

export default App;