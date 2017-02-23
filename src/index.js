import 'pubsub-js';

import router from './router';
import utils from './utils';

import Example from './pages/example';

import imgLoader from './libs/imgLoader';

var env = PRODUCTION?'prod':'dev';
var pageInstanceArr, allInstanceArr;

window.routerInstance = new router(env);
routerInstance.routerUrl(window.location.href);

PubSub.subscribe('html_injection_complete', ()=>{
    console.log('page assemble done.');
    allInstanceArr = [].concat(initPages());
    loadAll();
});
function postInit(){
    console.log('------all done, ready for use.------');
}
function loadAll(){
    let dtdArr = [];
    for(let i = 0,l = pageInstanceArr.length;i<l;i++){
        if(pageInstanceArr[i].init){
            let singleDtd = $.Deferred();
            pageInstanceArr[i].init(singleDtd);
            dtdArr.push(singleDtd);
        }
    }
    let imgDtd = $.Deferred();
    imgLoader.preloadImgs($('body'), routerInstance.baseUrl, imgDtd, null);
    dtdArr.push(imgDtd);
    $.when.apply($, dtdArr).done(postInit.bind(this));
}
function initPages(){
    platform.isMobile&&($('body').addClass('mobile'));
    (!platform.isAndroid&&!platform.isiPad&&!platform.isiPhone)&&($('body').addClass('no-touch'));
    platform.isTablet&&($('body').addClass('tablet'));

    var example = new Example($('section.example'),'Example');
    pageInstanceArr = [example];
    return pageInstanceArr;
}