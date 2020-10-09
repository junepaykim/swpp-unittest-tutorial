import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        {props.year}.{props.month}
        <button className="toggleButton" onClick={props.clickDone} />
      </div>
    );
  });
});

const stubtodos = [
  { //start year month
    id: 1,
    title: 'TODO_TEST_TITLE_1',
    done: false,
    content: 'TODO_TEST_CONTENT_1',
    year: 2020,
    month: 10,
    date: 8,
  },
  {
    id: 2,
    title: 'TODO_TEST_TITLE_2',
    done: true,
    content: 'TODO_TEST_CONTENT_2',
    year: 2020,
    month: 10,
    date: 5,
  },
];

const stubInitialState = {
  todos: stubtodos,
  selectedTodo: null,
};
const mockClickDone = jest.fn();

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <TodoCalendar
                  year="2020"
                  month="10"
                  storedTodos={stubtodos}
                  onToggleTodo={mockClickDone}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetTodos = jest
      .spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it('render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.TodoCalendar');
    expect(wrapper.length).toBe(1);
  });

  it(`handle Click Prev`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prev');

    const TodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    
    for(let i=0; i<9; i++){
        wrapper.simulate('click');
        expect(TodoCalendarInstance.state.year).toEqual(2019);
        expect(TodoCalendarInstance.state.month).toEqual(i);
    }
  });

  it(`andle Click Next`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.next');

    const TodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    
    //10 -> 11 -> 12 -> 1
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(11);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(12);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2020);
    expect(TodoCalendarInstance.state.month).toEqual(1);
    wrapper.simulate('click');

    
  });

  it(`have good 'clickDone'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo').mockImplementation((id) => {return (dispatch) => {}; });
    const component = mount(todoCalendar);
    const myWraa = component.find('.spyCalendar .toggleButton').at(0);
    myWraa.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});