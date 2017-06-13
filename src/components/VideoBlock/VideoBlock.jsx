import React, { Component } from 'react';
import { observer } from 'mobx-react';

import phoneVertical from '../../assets/images/phone-vertical.png';
@observer
export default class VideoBlock extends Component {
    componentWillMount() {
        this.allInited = false;
        this.videoState = {
            loaded: false,
            playing: false,
            shown: false,
            requestPlay: false,
            pauseLock: false,
        };   
    }

    render() {
        return (
            <div className='video-block'>
                <p>this is react!</p>
                <p>this is also react!</p>
                <img className="holder" src={phoneVertical} ref={(ref) => { this.holder = ref; }} />
            </div>
        );
    }
}
