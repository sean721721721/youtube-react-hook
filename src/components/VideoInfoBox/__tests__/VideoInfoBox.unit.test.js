import React from 'react';
import {shallow} from 'enzyme';
import VideoInfoBox from '../VideoInfoBox';

describe('VideoInfoBox', () => {
    test('renders collapsed', () => {
        const wrapper = shallow(<VideoInfoBox collapsed={true}/>);
        expect(wrapper).toMatchSnapshot();
    });
    
    test('renders expanded', () => {
        React.useState = jest.fn().mockReturnValue([false, {}]);
        const wrapper = shallow(<VideoInfoBox collapsed={false}/>);
        expect(wrapper).toMatchSnapshot();
    });
        
});
