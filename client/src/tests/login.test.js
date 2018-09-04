import React from 'react';
import chai from 'chai';
import enzyme, { shallow } from 'enzyme';
import { spy } from 'sinon';
import Login from '../containers/login';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import { Input } from '../components/input';
import { setEmail, setPassword, login } from '../redux/actions/loginAction';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import shallowWithReduxStore from './shallowWithReduxStore';
import thunk from 'redux-thunk';

let expect = chai.expect;
const mockStore = configureStore([thunk]);
const store = mockStore({});

describe('<Login/>', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('calls redux action method to set the email', () => {
    store.dispatch(setEmail(''))
    const actions = store.getActions()
    const expectedPayload = { type: 'SET_EMAIL', payload: '' }
    expect(actions).to.deep.equal([expectedPayload]);
  });

  it('calls redux action method to set the password', () => {
    store.dispatch(setPassword(''))
    const actions = store.getActions()
    const expectedPayload = { type: 'SET_PASSWORD', payload: '' }
    expect(actions).to.deep.equal([expectedPayload]);
  });

  it('it render the Input component',() =>{
    const wrapper = shallow(<Provider store={store}><Login/></Provider>).dive();
    expect(wrapper.contains(<Input/>)).to.equal(true);
  })
});