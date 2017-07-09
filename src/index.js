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
req.keys().forEach((key) => { allPages.push(req(key)); });
// -----------------------------------------------------------------------------------
let $body, $window;
let nowWW, nowWH;
let routerIns;

let initPage;

// -----------------------------------------------------------------------------------
!PRODUCTION && (module.hot) && module.hot.accept();
// -----------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------
routerIns = router.resolveURL(window.location.href).then((rule) => {
    if (rule) {
        for (let i = 0, l = rule.pages.length; i < l; i++) {
            for (let j = 0, k = allPages.length; j < k; j++) {
                if (allPages[j].default.pageName === rule.pages[i]) {
                    currentPages.push({
                        page: allPages[j].default,
                        initPage: (allPages[j].default.pageName === rule.initPage)
                    });
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
    // console.log('--------All Done, ready for use.--------');

    $window = $(window);
    nowWW = $window.width();
    nowWH = $window.height();
    
    store.changeCurrentPage(initPage);

    $window.on('scroll', () => {
        let tmpBottomLine = $window.scrollTop()+nowWH;
        currentPages.map((item) => {
            item.page.onScroll(tmpBottomLine);
        });
    });

    $window.on('resize', () => {
        nowWW = $window.width();
        nowWH = $window.height();
        currentPages.map((item) => {
            item.page.onResize(nowWW, nowWH);
        });
    });


    autorun(() => {
        if(store.currentPage){
            if(!store.initScrollTop){
                setTimeout(()=>{
                    $window.scrollTop(store.currentPage.topLine);
                    $body.removeClass('initing');
                    console.log('--------All Done, ready for use.--------');
                },800);
                store.changeInitScrollTop(true);
            }
        }
    });
}
async function initPages() {
    for (let i = 0, l = currentPages.length; i < l; i++) {
        currentPages[i].page = new currentPages[i].page();

        if(currentPages[i].initPage){
            initPage = currentPages[i].page;
        }
        await currentPages[i].page.init();
    }
}