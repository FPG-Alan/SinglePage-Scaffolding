class utils {
    constructor() {
        this.setPlatformDetect();
        this.setRequestAnimation();

        this.setGaTracking();

        this.videoNeedCheck = [];
        this.videoCheckEngineRunning = false;

        this.nowStep = 0;
        this.throttling = 20;
    }
    setPlatformDetect() {
        var ua = window.navigator.userAgent.toLowerCase();

        this.platform = {
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
            isEdge: ua.indexOf('edge/') > 0,
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
        this.platform.isMobile = this.platform.isiPhone || this.platform.isAndroid;
        this.platform.ios_webview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        this.platform.isTablet = this.platform.isiPad;
        this.platform.isDesktop = !(this.platform.isMobile || this.platform.isTablet);
        this.platform.isIE = this.platform.isIE10 || this.platform.isIE11 || this.platform.isEdge;
        this.platform.isIos = this.platform.isiPhone || this.platform.isiPad;

        this.platform.isRetina = (window.devicePixelRatio > 1);
        function getChromeVersion() {
            var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            return raw ? parseInt(raw[2], 10) : false;
        }
        var chromeVersion = getChromeVersion();

        this.platform.BgVideo = true;
        if (chromeVersion) {
            if (chromeVersion < 53 && this.platform.isMobile) {
                this.platform.BgVideo = false;
            }
        }
        if (this.platform.isIOS9) {
            this.platform.BgVideo = false;
        }
        if (this.platform.ios_webview) {
            this.platform.BgVideo = false;
        }



        // workaround for IE10.
        // window.location.origin is not defined under IE10, but we need this const when push state.
        // ------------------------------------------
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        // this.platform.BgVideo = true;
    }
    setRequestAnimation() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }
    setGaTracking() {
        var G = G || {};
        G.event = function (cat, action, label) {
            if (typeof window.ga !== "undefined") {
                // window.ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
                window.ga("send", "event", cat, action, label);
            }
        };

        G.pageview = function (page) {
            if (typeof window.ga !== "undefined") {
                window.ga('send', 'pageview', page);
            }
        };

        window.G = G;
    }

    videoCheck(video, container, tag) {

        // console.log(tag);
        let needProcess = true;
        for (let i = 0, l = this.videoNeedCheck.length; i < l; i++) {
            if (tag == this.videoNeedCheck[i].tag) {
                needProcess = false;
                break;
            }
        }

        if (needProcess) {
            let tmpObj = {
                'video': video,
                'container': container,
                'lastTime': 0,
                'tag': tag,
                'active': false
            }
            this.videoNeedCheck.push(tmpObj);
            // console.log(this.videoNeedCheck);

            container.classList.add("loading");
            if (!this.videoCheckEngineRunning) {
                this.videoCheckEngineRunning = true;
                this.nowStep = 0;
                requestAnimationFrame(this.check.bind(this));
            }
        }

    }

    check() {
        if (this.videoNeedCheck.length > 0) {
            if (this.nowStep == this.throttling) {
                // console.log('hit!');
                for (let i = 0, l = this.videoNeedCheck.length; i < l; i++) {
                    if (!this.videoNeedCheck[i].video.paused) {
                        let tmpCurrentT = this.videoNeedCheck[i].video.currentTime;

                        if (tmpCurrentT == this.videoNeedCheck[i].video.lastTime && !this.videoNeedCheck[i].loading || !this.videoNeedCheck[i].active && !this.videoNeedCheck[i].loading) {
                            // console.log('add');

                            this.videoNeedCheck[i].container.classList.add("loading");
                            this.videoNeedCheck[i].loading = true;
                        }
                        if (tmpCurrentT !== this.videoNeedCheck[i].video.lastTime) {
                            this.videoNeedCheck[i].video.lastTime = tmpCurrentT;
                            if (this.videoNeedCheck[i].loading && this.videoNeedCheck[i].active) {
                                // console.log('remove');
                                this.videoNeedCheck[i].container.classList.remove("loading");
                                this.videoNeedCheck[i].loading = false;
                            }
                        }

                        if (tmpCurrentT >= 0.1 && !this.videoNeedCheck[i].active) {
                            this.videoNeedCheck[i].active = true;
                            this.videoNeedCheck[i].container.classList.add('active');
                        }

                        if (this.videoNeedCheck[i].container.classList.contains('paused')) {
                            this.videoNeedCheck[i].container.classList.remove("paused");
                        }
                    } else {
                        if (this.videoNeedCheck[i].loading) {
                            this.videoNeedCheck[i].container.classList.remove("loading");
                            this.videoNeedCheck[i].loading = false;
                        }

                        if (!this.videoNeedCheck[i].container.classList.contains('paused')) {

                            this.videoNeedCheck[i].container.classList.add("paused");
                        }
                    }

                }
                this.nowStep = 0;
            }
            this.nowStep = this.nowStep + 1;
            requestAnimationFrame(this.check.bind(this));
        } else {
            this.videoCheckEngineRunning = false;
        }
    }
    removeVideoCheck(tag) {
        console.log('is removing tag: ' + tag);
        for (var i = 0; i < this.videoNeedCheck.length; i++) {
            console.log('now index ' + i);
            if (tag == this.videoNeedCheck[i].tag) {
                this.videoNeedCheck.splice(i, 1);
            }
        }
    }

    mobileVideoCheck(video, container) {
        video.addEventListener('timeupdate', function check() {
            if (video.currentTime >= 0.1) {
                container.classList.add('active');
                container.classList.remove('loading');
                video.removeEventListener('timeupdate', check);
            }
        });
    }

    toTitleCase(str) {
        if (str) {
            return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        }

    }

    videoResize(holder, videoBlock, video, poster, radioClass, videoRadio) {
        // ---------------------------------------------------------
        // define all needed parameters
        if (videoBlock) {
            let blockW, blockH, videoW, videoH, videoLeft, videoTop;
            let blockRect = videoBlock.getBoundingClientRect();
            let maxHeight;


            // ---------------------------------------------------------
            // start caculate all parameters
            blockW = blockRect.width;
            if (radioClass == 'vertical') {
                blockH = (blockW * 16) / 9;
                if (!this.platform.isMobile) {
                    maxHeight = (holder.getBoundingClientRect().height / this.phoneVideoAreaRadio) - 1;
                    if (blockH > maxHeight) {
                        blockH = maxHeight;
                    }
                }
                if (videoRadio <= (9 / 16)) {
                    // full width
                    videoW = blockW;
                    videoH = videoW / videoRadio;

                    videoLeft = 0;
                    videoTop = (blockH - videoH) / 2;
                } else {
                    // full height
                    videoH = blockH;
                    videoW = videoH * videoRadio;
                    videoTop = 0;
                    videoLeft = (blockW - videoW) / 2;
                }
            }
            if (radioClass == 'square') {
                blockH = blockW;
                // always full width
                videoW = blockW;
                videoH = videoW / videoRadio;
                videoLeft = 0;
                videoTop = (blockH - videoH) / 2;
            }
            if (radioClass == 'normal') {
                blockH = (blockW * 3) / 4;

                videoW = blockW;
                videoH = videoW / videoRadio;
                videoLeft = 0;
                videoTop = (blockH - videoH) / 2;
            }
            if (radioClass == 'horizontal') {
                blockH = (blockW * 9) / 16;

                videoW = blockW;
                videoH = videoW / videoRadio;
                videoLeft = 0;
                videoTop = (blockH - videoH) / 2;
            }
            // ---------------------------------------------------------
            // apply all parameters to dom
            // this.videoBlock.style.width = blockW + "px";
            videoBlock.style.height = Math.floor(blockH) + "px";

            if (video) {
                video.style.width = Math.floor(videoW) + "px";
                video.style.height = Math.floor(videoH) + "px";
                video.style.top = Math.floor(videoTop) + "px";
                video.style.left = Math.floor(videoLeft) + "px";
            }
            if (poster) {
                poster.style.width = Math.floor(videoW) + "px";
                poster.style.height = Math.floor(videoH) + "px";
                poster.style.top = Math.floor(videoTop) + "px";
                poster.style.left = Math.floor(videoLeft) + "px";
            }

            return {
                'videoBlock': {
                    'width': blockW,
                    'height': blockH
                },
                'video': {
                    'width': videoW,
                    'height': videoH,
                    'top': videoTop,
                    'left': videoLeft
                }
            }
        }
    }
}
export default new utils;