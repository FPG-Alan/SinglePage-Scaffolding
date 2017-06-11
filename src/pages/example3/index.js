import store from '../../store';

export default class example3 {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example3');
            this.offsetTop = this.$dom.offset().top;
            this.height = this.$dom.height();
            this.inViewport = false;


            console.log('st3: ' + this.offsetTop);

            resolve();
        });
    }

    onScroll(bottomLine) {
        // console.log(st);

        if(this.offsetTop < bottomLine && this.offsetTop+this.height > bottomLine ){
            if(!this.inViewport){
                console.log('example3 into view');
                store.changeCurrentPage(this);
                this.inViewport = true
            }
        }else{
            if(this.inViewport){
                console.log('example3 out of view');
                this.inViewport = false;
            }
        }
    }

    onResize(w,h) {
        console.log(w,h);
        this.offsetTop = this.$dom.offset().top;
        this.height = this.$dom.height();
        console.log('st3: ' + this.offsetTop);
    }
}
example3.pageName = 'example3';
