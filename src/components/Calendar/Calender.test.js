//HW File3
import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

let stubCalendar={
    year: 2020,
    month: 3,
    todos: [
        {
            id: 1,
            year: 2020,
            month: 2,
            date: 1,
            done: false,
        },
    ]
};

describe('<Calendar />', () => {
  afterEach(() => jest.clearAllMocks());   
  it('should render without errors', () => {
    const component = shallow(<Calendar year={stubCalendar.year} 
        month={stubCalendar.month} todos={stubCalendar.todos}/>);
    const wrapper = component.find(".cell");
    expect(wrapper.length).toBe(31);
  });

  it('should render todo as done if done=true ', () => {
    stubCalendar.todos[0].done=true;
    const component = shallow(<Calendar year={stubCalendar.year}
        month={stubCalendar.month} todos={stubCalendar.todos}/>);
    const wrapper = component.find(".done");
    expect(wrapper.length).toBe(1);
  });

  it('should handle todo clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={stubCalendar.year} 
            month={stubCalendar.month} todos={stubCalendar.todos} 
            clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
}); 