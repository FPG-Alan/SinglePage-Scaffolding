import React from 'react';
import ReactDOM from 'react-dom';

import store from '../../store';
import App from '../../components/TestReact';

export default class example2 {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example2');
            this.setLocalAttr();
            this.inViewport = false;

            this.$dom.find('h1').html('OK');


            ReactDOM.render(
                <App />, 
                this.$dom.find('.react-component')[0]
            );
            resolve();
        });
    }
    onScroll(nowLine) {
        if(this.topLine < nowLine && this.bottomLine > nowLine ){
            if(!this.inViewport){
                store.changeCurrentPage(this);
                this.inViewport = true
            }
        }else{
            if(this.inViewport){
                this.inViewport = false;
            }
        }
    }

    onResize() {
        this.setLocalAttr();
    }

    setLocalAttr() {
        console.log(this.$dom);
        if(this.$dom.length > 0){
            this.topLine = this.$dom.offset().top;
            this.bottomLine = this.topLine + this.$dom.height();
            console.log('get example2 local attr');
        }
        
    }
}
example2.pageName = 'example2';
