import store from '../../store';

export default class example1 {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example1');
            this.offsetTop = this.$dom.offset().top;

            this.height = this.$dom.height();
            this.inViewport = false;

            console.log('st1: '+this.offsetTop);
            resolve();
        });
    }


    onScroll(bottomLine) {
        // console.log(st);

        if(this.offsetTop < bottomLine && this.offsetTop+this.height > bottomLine ){
            if(!this.inViewport){
                this.inViewport = true
                store.changeCurrentPage(this);
            }
        }else{
            if(this.inViewport){
                console.log('example1 out of view');
                this.inViewport = false;
            }
        }
    }

    onResize(w,h) {
        console.log(w,h);
        this.offsetTop = this.$dom.offset().top;
        this.height = this.$dom.height();
        console.log('st1: ' + this.offsetTop);
    }
}
example1.pageName = 'example1';