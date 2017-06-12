import store from '../../store';

export default class example3 {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example3');
            this.setLocalAttr();
            this.inViewport = false;

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
        this.topLine = this.$dom.offset().top;
        this.bottomLine = this.topLine + this.$dom.height();
    }
}
example3.pageName = 'example3';
