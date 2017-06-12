import store from '../../store';

export default class example1 {
    constructor() {

    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example1');
            this.setLocalAttr();
            this.inViewport = false;

            this.$dom.find('h1').html('one');
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
        this.topLine = this.$dom.offset().top;
        this.bottomLine = this.topLine + this.$dom.height();
    }
}
example1.pageName = 'example1';