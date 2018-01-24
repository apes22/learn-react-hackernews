import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, {Search, Button, Table} from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  });
  test('has a valid snapshot', () => {
  const component = renderer.create(
  <App />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });
  });

  describe('Search', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    });
    test('has a valid snapshot', () => {
    const component = renderer.create(
    <Search>Search</Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
});

describe('Button', () => {

  const props = {
    onClick: function (){
      console.log("Hello");
    },
    className: "button-class-test",
    children: <span>Dismiss</span>,
  };

  it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button {...props}>Give Me More</Button>, div);
  });

  it('it contains button-class-test name ', () => {
    const element = shallow(
    <Button { ...props } />
    );
    expect(element.find('.button-class-test').length).toBe(1);
    });
  test('has a valid snapshot', () => {
  const component = renderer.create(
  <Button  { ...props }>Give Me More</Button>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });
});

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    onDismiss: () => alert("Will Delete!"),
  };

  it('shows two items in list', () => {
    const element = shallow(
    <Table { ...props } />
    );
    expect(element.find('.table-row').length).toBe(2);
    });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
    <Table { ...props } />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });
});