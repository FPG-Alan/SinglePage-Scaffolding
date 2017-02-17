// var moduleArr = ['intro','landscape','scenes','lives','contact'];
var currentUrl, rootUrl, baseUrl;
var currentModuleName = '';
var currentDom;
var currentIndex = 0;

import 'pubsub-js';

export default class router {
	constructor(env) {
		this.env = env;
		this.moduleArr = ['example'];
		this.initIndex = 0;
	}
	routerUrl(url){
		rootUrl = (this.env==='prod')?"":"";
		currentUrl = url;
		currentModuleName = this.getModuleName(url,rootUrl);

		console.log('currentModuleName:  '+currentModuleName);

		if (currentModuleName == '') {
			baseUrl = './';
		} else {
			baseUrl = '../';
		}
		currentDom = $('<div>').addClass('fullpage').prependTo($('body'));
		this.loadModules();
	}

	getModuleName(_url,_rootUrl){
		var tmpModuleName = '';
		var parser = document.createElement('a');
		parser.href = _url;

		tmpModuleName = parser.pathname.substr(_rootUrl.length).replace(/[\/]/g,'');

		return tmpModuleName;
	}

	loadModules(){
		var self = this;
		if(currentModuleName!=this.moduleArr[currentIndex]){
			$.get(baseUrl+this.moduleArr[currentIndex]+'/index.html').done(function(html){
				html = html.substr(html.indexOf('<section'),html.indexOf('</section>') - html.indexOf('<section')+ 10);
				html = html.replace(/\.+\//g,baseUrl);
				if(currentIndex == 0){
					currentDom.prepend(html);
				}else{
					currentDom.after(html);
				}
				requestAnimationFrame(function(){
					if(currentIndex<self.moduleArr.length-1){
						currentDom = $('section.'+self.moduleArr[currentIndex]);
						currentIndex = currentIndex+1;
						self.loadModules();
					}else{
						PubSub.publish('html_injection_complete');
					}
				});
			}).fail(function() {
				console.log('ajax error');
			});
		}else{
			this.initIndex = currentIndex;
			var tmpSelfDom = $('section.'+this.moduleArr[currentIndex]);
			if(currentIndex == 0){
				currentDom.prepend(tmpSelfDom);
			}else{
				currentDom.after(tmpSelfDom);
			}
			currentDom = tmpSelfDom;
			if(currentIndex<this.moduleArr.length-1){
				currentIndex = currentIndex+1;
				self.loadModules();
			}else{
				PubSub.publish('html_injection_complete');
			}


		}
	}

	get baseUrl() {
		return baseUrl;
	}
	get rootUrl() {
		return rootUrl;
	}
}