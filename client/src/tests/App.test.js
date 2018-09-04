import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';  
import enzyme, {shallow} from 'enzyme';
enzyme.configure({ adapter: new Adapter() });

let expect =chai.expect;

describe("<App/>",() =>{
	it('renders Routes', () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.find('Route')).to.have.length(7)
	});
})	



