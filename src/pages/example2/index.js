import store from '../../store';

export default class example2 {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example2');
            this.setLocalAttr();
            this.inViewport = false;

            this.$dom.find('h1').html('22');
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
example2.pageName = 'example2';
