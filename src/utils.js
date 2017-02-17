// devices inspect
// ------------------------------------------
var ua = window.navigator.userAgent.toLowerCase();
window.platform = {
    isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
    isDuos: ua.match(/gt\-s7562/i) !== null,
    isI9300: ua.match(/gt\-i9300/i) !== null,
    isI9500: ua.match(/gt\-i9500/i) !== null,
    hasTouch: ('ontouchstart' in window),
    isiPod: ua.match(/ipod/i) !== null,
    isiPad: ua.match(/ipad/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
    isIE: window.navigator.appName.indexOf("Microsoft") != -1,
    isIE10: ua.match(/msie 10/) !== null,
    isIE11: ua.match(/trident.*rv\:11\./) !== null,
    isEdge: ua.indexOf('edge/')>0,
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    isSafari: ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,
    isWebkit: ua.match(/webkit/gi) !== null,
    isGecko: ua.match(/gecko/gi) !== null,
    isOpera: ua.match(/opera/gi) !== null,
    isMac: ua.match('mac') !== null,
    isIOS8: ua.match(/(iphone|ipod|ipad).* os 8_/) !== null,
    isIOS9: ua.match(/(iphone|ipod|ipad).* os 9_/) !== null,

    supportsSvg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
}
platform.isMobile = platform.isiPhone || platform.isAndroid;
platform.isTablet = platform.isiPad;
platform.isDesktop = !(platform.isMobile || platform.isTablet);
platform.isIE = platform.isIE10 || platform.isIE11 || platform.isEdge;
platform.isIos = platform.isiPhone || platform.isiPad;

platform.isRetina = (window.devicePixelRatio > 1);
function getChromeVersion () {     
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
}
var chromeVersion = getChromeVersion();

platform.BgVideo = true;
if(chromeVersion){
    if(chromeVersion< 53 && platform.isMobile){
        platform.BgVideo = false;
    }
}
if(platform.isIOS9){
    platform.BgVideo = false;
}
// ------------------------------------------
// tracking...
// ------------------------------------------
var G = G || {};
G.event = function(cat, action, label) {
    if(typeof window.ga !== "undefined") {
        // window.ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
        window.ga("send", "event", cat, action, label);
    }
};

G.pageview = function(page) {
    if(typeof window.ga !== "undefined") {
        window.ga('send', 'pageview', page);
    }
};

window.G = G;

// workaround for IE10.
// window.location.origin is not defined under IE10, but we need this const when push state.
// ------------------------------------------
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
// ------------------------------------------

// requestAnimationFrame cross browser workaround.
// ------------------------------------------
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
// ------------------------------------------

// utils
// ------------------------------------------
var utils = {};
var tmpDelta;
utils.getDelta = function(e){
    if(e.originalEvent.deltaY){
        tmpDelta = e.originalEvent.deltaY
        if(platform.isMac){
            if(platform.isChrome){
                if(Math.abs(tmpDelta)>=4){
                    tmpDelta = tmpDelta/4;
                }
            }
            if(platform.isFirefox){
                if(e.originalEvent.deltaMode == 1){
                    // use mousewheel
                    tmpDelta = tmpDelta * 3;

                }else{
                    // use trackpad
                }
            }
            if(platform.isSafari){
                if(Math.abs(tmpDelta)>=4){
                    tmpDelta = tmpDelta/4;
                }
            }

        }else{
            if(platform.isChrome){
                tmpDelta = (tmpDelta/100) * 30;
            }
            if(platform.isFirefox){
                tmpDelta = (tmpDelta/3) * 20;
            }
            if(platform.isIE){
                if(e.originalEvent.wheelDeltaY){
                    tmpDelta = e.originalEvent.wheelDeltaY;
                }
                tmpDelta = tmpDelta/8;
            }
        }
        return tmpDelta * -1;
    }
};

utils.getResponsiveLayout = function(parentW, parentH, childRatio){
    let targetValue = {
        'width':0,
        'height':0,
        'top':0,
        'left':0
    };
    let parentRatio = parentW/parentH;

    if(childRatio<parentRatio){
        targetValue.width = parentW;
        targetValue.height = parentW/childRatio;
        targetValue.top = (parentH - targetValue.height)/2;
        targetValue.left = 0;
    }else{
        targetValue.height = parentH;
        targetValue.width = parentH*childRatio;
        targetValue.top = 0;
        targetValue.left = (parentW - targetValue.width)/2;
    }

    return targetValue;
}

utils.startCssAni = function($dom, propertys, durtions, delays, ease){
    //'transition': 'opacity 1000ms cubic-bezier(0.31, 0.19, 0.16, 1) '+((dir>0?i:l-i)*40+this.baseTime)+'ms, -webkit-transform 1000ms cubic-bezier(0.31, 0.19, 0.16, 1) '+((dir>0?i:l-i)*40+this.baseTime)+'ms'
    let transitionStr = '';
    for(let i = 0, l = propertys.length; i<l; i++){
        transitionStr += propertys[i] + ' ' + durtions[i] + 'ms ' + 'cubic-bezier('+ease+') ' + delays[i] + 'ms ';
    }
    $dom.css(
        'transition' , transitionStr
    );
}

utils.removeTransition = function($dom){
    $dom.css('transition', ' ');
}
// ------------------------------------------

export default utils;