import { autorun } from 'mobx';
import store from './store';
import utils from './utils';
import router from './router';
import imgLoader from './libs/imgLoader';


// require all pages
// -----------------------------------------------------------------------------------
const req = require.context("./pages", true, /^(.*\.(js$))[^.]*$/igm);
const allPages = [];
let currentPages = [];
req.keys().forEach(function (key) {
    allPages.push(req(key));
});
// -----------------------------------------------------------------------------------
let $body, $window;
let nowWW, nowWH;
let routerIns;

// -----------------------------------------------------------------------------------
if (module.hot) {
  module.hot.accept();
}
// -----------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------
routerIns = new router().resolveURL(window.location.href).then((modules) => {
    if (modules) {
        for (let i = 0, l = modules.length; i < l; i++) {
            for (let j = 0, k = allPages.length; j < k; j++) {
                if (allPages[j].default.pageName === modules[i]) {
                    currentPages.push(allPages[j].default);
                    break;
                }
            }
        }
        $body = $('body');
        initDom();
        initPages().then(() => {
            loadAll();
        });
    }

});
function initDom() {
    if (utils.platform.isMobile) {
        $body.addClass('mobile');
    }
    if (!utils.platform.isAndroid && !utils.platform.isiPad && !utils.platform.isiPhone) {
        $body.addClass('no-touch');
    }
    if (utils.platform.isTablet) {
        $body.addClass('tablet');
    }
    if (utils.platform.isDesktop) {
        $body.addClass('tablet');
    }
}
function loadAll() {
    new Promise((resolve) => {
        imgLoader.preloadImgs($body, routerIns.baseURL, resolve, null);
    }).then(postInit);
}
function postInit() {
    console.log('--------All Done, ready for use.--------');

    $window = $(window);
    nowWW = $window.width();
    nowWH = $window.height();
    $window.on('scroll',()=>{
        let tmpST = $window.scrollTop();
        currentPages.map((page)=>{
            page.onScroll(tmpST+nowWH);
        });
    });

    $window.on('resize',()=>{
        nowWW = $window.width();
        nowWH = $window.height();
        currentPages.map((page)=>{
            page.onResize(nowWW,nowWH);
        });
    });


    autorun(()=>{
        console.log('auto run');
        console.log(store.currentPage);
    });
}
async function initPages() {
    for (let i = 0, l = currentPages.length; i < l; i++) {
        currentPages[i] = new currentPages[i]();
        await currentPages[i].init();
    }
}