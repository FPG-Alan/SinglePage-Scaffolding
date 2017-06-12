import React, { Component } from 'react';
import { observer } from 'mobx-react';
/* eslint-disable no-unused-vars*/
import style from './style.scss';
/* eslint-enable no-unused-vars*/
// import store from '../../store/index';


// import phoneVertical from '../../assets/images/phone-vertical.png';
// import phoneSquare from '../../assets/images/phone-square.png';
// import phoneNormal from '../../assets/images/phone-normal.png';
// import phoneHorizontal from '../../assets/images/phone-horizontal.png';
// import playImg from '../../assets/images/play.png';
// import playImg2x from '../../assets/images/play@2x.png';

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
        // this.videoRadio = this.props.data.video.width / this.props.data.video.height;
        // if (this.videoRadio < 1) {
        //     // 9/16
        //     // console.log('choose 9/16');
        //     this.radioClass = 'vertical';
        //     this.phoneImg = phoneVertical;
        // } else if (this.videoRadio < 1.3) {
        //     // 1
        //     // console.log('choose 1/1');
        //     this.radioClass = 'square';
        //     this.phoneImg = phoneSquare;
        // } else if (this.videoRadio < 1.7) {
        //     // 4/3
        //     // console.log('choose 4/3');
        //     this.radioClass = 'normal';
        //     this.phoneImg = phoneNormal;
        // } else {
        //     // 16/9
        //     // console.log('choose 16/9');
        //     this.radioClass = 'horizontal';
        //     this.phoneImg = phoneHorizontal;
        // }
    }
    // resizeHandle() {
    //     this.rectData = utils.videoResize(
    //         this.holder,
    //         this.videoBlock,
    //         this.video,
    //         this.poster,
    //         this.radioClass,
    //         this.videoRadio,
    //     );
    // }

    // setBtnPosition() {
    //     const local = this;
    //     setTimeout(() => {
    //         // let tmpData = window.innerHeight - window.innerWidth * 0.135 - 66;
    //         if (local.loadingWrapper) {
    //             if (utils.platform.BgVideo) {
    //                 if (utils.platform.BgVideo) {
    //                     local.loadingWrapper.style.maxHeight = `${window.innerHeight}px`;
    //                 } else {
    //                     local.loadingWrapper.style.maxHeight = `${window.innerHeight}px`;
    //                 }
    //             }
    //         }
    //         if (local.videoBlock && local.radioClass === 'vertical') {
    //             if (utils.platform.BgVideo) {
    //                 local.videoBlock.style.maxHeight = `${window.innerHeight}px`;
    //             } else {
    //                 local.videoBlock.style.maxHeight = `${window.innerHeight}px`;
    //             }
    //         }
    //     }, 1000);
    // }

    // initAll() {
        // const local = this;
        // requestAnimationFrame(() => {
        //     local.allInited = true;
        //     if (local.video) {
        //         if (!utils.platform.isMobile) window.addEventListener('resize', local.resizeHandle.bind(local));


        //         setTimeout(() => { local.resizeHandle(); }, 500);

        //         // ployfill for ios9/safari
        //         // when video play by user action, it enter fullscreen, and once user
        //         // choose exit from fullscreen state, the video will pause automatic
        //         // at local condition, class on videoBlock need be removed by hand

        //         local.video.addEventListener('webkitendfullscreen', () => {
        //             local.videoBlock.classList.remove('active');
        //             local.videoBlock.classList.remove('loading');
        //         }, false);

        //         if (local.videoState.requestPlay) {
        //             local.videoState.requestPlay = false;
        //             local.requestPlay();
        //         }
        //         local.setBtnPosition();
        //     }
        // });

        // document.addEventListener('visibilitychange', () => {
        //     if (!document.hidden) {
        //         if (local.videoState.playing) {
        //             local.videoState.playing = false;
        //             local.requestPlay();
        //         }
        //     }
        // });
    // }

    // onClick(e) {
    //     if (!e.srcElement.classList.contains('fa')) {
    //         if (utils.platform.isMobile && utils.platform.BgVideo && this.radioClass === 'vertical') {
    //             store.mobileToolbar = !store.mobileToolbar;
    //             store.mobileTitle = !store.mobileTitle;
    //         }
    //     }
    // }

    // requestPlay(force = false) {
    //     if (!this.videoState.pauseLock || force) {
    //         if (this.allInited) {
    //             const tmpVideo = this.video;
    //             if (tmpVideo) {
    //                 if (!this.videoState.playing) {
    //                     this.playVideo(tmpVideo);
    //                 }
    //             }
    //         } else if (!this.videoState.requestPlay) {
    //             this.videoState.requestPlay = true;
    //         }
    //     }
    // }
    // requestPause() {
    //     if (this.allInited) {
    //         const tmpVideo = this.video;
    //         if (tmpVideo) {
    //             if (this.videoState.playing) {
    //                 this.videoState.playing = false;
    //             }
    //             this.pauseVideo(tmpVideo);
    //         }
    //     }
    // }
    // playPause(justPlay = false, forcePause = false) {
    //     if (this.allInited) {
    //         const tmpVideo = this.video;
    //         if (tmpVideo) {
    //             if (forcePause) {
    //                 this.pauseVideo(tmpVideo);
    //             } else if (this.videoState.playing) {
    //                 if (!justPlay) {
    //                     this.pauseVideo(tmpVideo);
    //                 }
    //             } else if (this.props.flatID === 101 || this.props.flatID === 102) {
    //                 if (store.needStopCreative && !utils.platform.BgVideo) {
    //                     store.needStopCreative.requestPause();
    //                     store.needStopCreative = null;
    //                 }
    //             } else {
    //                 this.playVideo(tmpVideo);
    //                 store.needStopCreative = this;
    //             }
    //         }
    //     } else if (!this.videoState.requestPlay) {
    //         this.videoState.requestPlay = true;
    //     }
    // }
    // pauseVideo(video) {
    //     const tmpVideo = video;
    //     this.pause(tmpVideo);
    //     tmpVideo.currentTime = 0;

    //     this.videoBlock.classList.remove('active');
    //     this.videoBlock.classList.remove('loading');

    //     utils.removeVideoCheck(tmpVideo.id);
    // }
    // playVideo(video) {
    //     const tmpVideo = video;
    //     this.play(tmpVideo);
    //     utils.videoCheck(tmpVideo, this.videoBlock, tmpVideo.id);

    //     if (!utils.platform.BgVideo) {
    //         store.currentCreativeObj = this;
    //     }
    // }

    // toggleVideo() {
    //     const tmpVideo = this.video;
    //     if (this.videoState.playing) {
    //         this.videoState.pauseLock = true;
    //         this.pause(tmpVideo);
    //     } else {
    //         this.videoState.pauseLock = false;
    //         this.play(tmpVideo);
    //     }
    // }
    // play(video) {
    //     if (!this.videoState.loaded) {
    //         video.load();
    //         this.videoState.loaded = true;
    //     }
    //     video.play();
    //     this.videoState.playing = true;
    // }
    // pause(video) {
    //     video.pause();
    //     this.videoState.playing = false;
    // }

    render() {
        return (
            <div>
                <p>come from React~</p>
            </div>
        );
    }
}
