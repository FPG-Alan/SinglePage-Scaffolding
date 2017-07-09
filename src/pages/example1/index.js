import store from '../../store';

import cssAni from '../../libs/CssAni';

export default class example1 {
    constructor() {

    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.example1');
            this.setLocalAttr();
            this.inViewport = false;

            let singleCssAni = new cssAni(
				$('.test1'),
				{
					'opacity': 0.5,
					'transform': 'translate3d(100px,0px,0px)'
				},
				1000, 0, '0.31, 0.19, 0.16, 1', null
			);

			$('.play-btn').on('click', ()=>{
                singleCssAni.play();
            })


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
        if(this.$dom.length > 0){
            this.topLine = this.$dom.offset().top;
            this.bottomLine = this.topLine + this.$dom.height();

            console.log('get example1 local attr');
        }
        
    }
}
example1.pageName = 'example1';