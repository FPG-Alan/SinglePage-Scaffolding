import React, { Component } from 'react';
import { observer } from 'mobx-react';
@observer
export default class TestReact extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className='test-react'>
                <p>this is react!</p>
                <p>this is also react!</p>
            </div>
        );
    }
}
