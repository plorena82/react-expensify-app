import React from 'react';
import {shallow} from 'enzyme';
//import toJSON from 'enzyme-to-json'; put in jest.config.json
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import {Header} from '../../components/Header';


test('should load the header component correctly', ()=>{
    
    const wrapper = shallow(<Header startLogout={()=>{}}/>);//shallow rendering of a component to test
    expect(wrapper).toMatchSnapshot();
    //expect(toJSON(wrapper)).toMatchSnapshot(); toJSON no longer needed as it was added into jest.config.json as snapshotSerializer
    //expect(wrapper.find('h1').text()).toBe('Expensify');

    /*
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);//loads the JSX component 
    expect(renderer.getRenderOutput()).toMatchSnapshot();
    */
} );

test('should call startLogout on Logout button Click ', ()=>{
    const startLogoutSpy = jest.fn();
    const wrapper = shallow (<Header startLogout={startLogoutSpy}/>);
    wrapper.find('button').simulate('click');
    expect(startLogoutSpy).toHaveBeenCalled();
});