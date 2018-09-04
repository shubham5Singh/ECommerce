import { shallow } from 'enzyme';

const shallowWithReduxStore = (component, reduxStore) => {
    const context = {
        store: reduxStore
    };
    return shallow(component, { context });
};

export default shallowWithReduxStore;