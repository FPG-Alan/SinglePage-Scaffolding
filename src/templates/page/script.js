exports.getTemplate = (name) => 
`import store from '../../store';

export default class ${name} {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {
            this.$dom = $('.${name}');
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

    onResize(w,h) {
        this.setLocalAttr();
    }

    setLocalAttr() {
        this.topLine = this.$dom.offset().top;
        this.bottomLine = this.topLine + this.$dom.height();
    }
}
${name}.pageName = '${name}';
`;