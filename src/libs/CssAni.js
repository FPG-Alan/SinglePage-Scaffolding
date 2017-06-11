import utils from '../utils';

export default class CssAni{
    constructor(_dom, _target, _duration, _delay, _ease, _complete){
        this.dom = _dom;
        this.target = _target;
        this.duration = _duration;
        this.delay = _delay;
        this.ease = _ease;
        this.complete = _complete;
        this.state = 'start';
        this._init();
    }
    _init(){

        let tmpTargetObj = {};
        let tmpTransitionStr = '';
        // attr duration ease delay
        for(let i in this.target){
            (tmpTransitionStr!=='')&&(tmpTransitionStr+=', ');
            let tmpKey = (i=='transform')?(CssAni.prefix+i):i;
            tmpTransitionStr += (tmpKey + ' ' + this.duration + 'ms ' + 'cubic-bezier(' + this.ease + ') ' + this.delay + 'ms');
            tmpTargetObj[tmpKey] = this.target[i];
        }

        this.target = tmpTargetObj;
        this.target[CssAni.prefix+'transition'] = tmpTransitionStr;

        
        this.dom.on(CssAni.events,this._onComplete.bind(this));
    }

    _onComplete(){
        if(this.state!=='complete'){
            this.state = 'complete';
            this.dom.css({
                'transition': ''
            });

            if(this.complete){
                this.complete();
            }
        }
    }

    play(){
        this.state = 'play';
        this.dom.css(this.target);
    }

    cancel(){
        this._onComplete();
    }

    static get prefix() {
      return utils.platform.isWebkit?'-webkit-':'';
    }

    static get events() {
        return 'transitionend '+
            'webkitTransitionEnd '+
            'oTransitionEnd '+
            'MSTransitionEnd '+
            'animationend '+
            'webkitAnimationEnd '+
            'oAnimationEnd '+
            'MSAnimationEnd';
    }
}