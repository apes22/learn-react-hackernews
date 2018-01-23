//App.js contains the a React ES6 class component with the name App, which is  A COMPONENT DECLARATION.
//After a component is declared, you can use it as element everywhere in your app. 
//The element the component declaration returns is specfiied in the render method. Elements are what components are made of.

//Note: The App component is not yet instantiated, it is only declared in this file. The instantiation of the component would take
//place somehwere in our JSX with  <App /> (clue: index.js)

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

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
      list,
      helloWorld: 'Welcome to the Road to learn React',
      comment: "This is coming form the local state of this component woooo!",
      searchTerm: "",
    };
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
  //When using a handler in your element, you get access to the "synthetic" React
  //event in your callback function's signature
  onSearchChange(event){
    console.log(event.target.value)
    this.setState({ searchTerm: event.target.value})
  }
  onDismiss(id){
    const isNotId =  item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list: updatedList});
  }
  render() {

    //Destructuring (extracting values from objects and arrays)
    //ES5
    // const searchTerm = this.state.searchTerm
    //const list = this.state.list
    
    //ES6
    const {searchTerm, list} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.helloWorld}</h1>
        </header>
        <p className="App-intro">
       
        <Search 
          value={searchTerm} 
          onChange={this.onSearchChange}
        > 
        <span>Search by title: </span>
       
        </Search>
        <h4> Below is your predefined list:</h4> 
       
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        </p>  
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
  <div>
    {list.filter(isSearched(pattern)).map(item => 
    <div key = {item.objectID}>
    <span>
      <a href={item.url}>{item.title} </a>
    </span>
    <span>{item.author} </span>
    <span>{item.num_comments} </span>
    <span>{item.points}</span>
    <span>  
    <Button onClick={() => onDismiss(item.objectID)}>
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