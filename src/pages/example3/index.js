import store from '../../store';

import CjsAni from '../../libs/CjsAni';
import * as icon1 from '../../libs/icon1';

export default class example3 {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example3');
            this.setLocalAttr();
            this.inViewport = false;


            let cjsAniLoader = new CjsAni();
            cjsAniLoader.load('icon1', icon1, $('.ani-container')[0], (cjsAniController)=> {
                this.aniController = cjsAniController;
                this.aniController.play(1, 30);
            });

            resolve();
        });
    }
    onScroll(nowLine) {
        if (this.topLine < nowLine && this.bottomLine > nowLine) {
            if (!this.inViewport) {
                store.changeCurrentPage(this);
                this.inViewport = true
            }
        } else {
            if (this.inViewport) {
                this.inViewport = false;
            }
        }
    }

    onResize() {
        this.setLocalAttr();
    }

    setLocalAttr() {
        if (this.$dom.length > 0) {
            this.topLine = this.$dom.offset().top;
            this.bottomLine = this.topLine + this.$dom.height();
            console.log('get example3 local attr');
        }
    }
}
example3.pageName = 'example3';
