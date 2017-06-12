import 'whatwg-fetch';

export default class router {
	constructor() {
		this._baseURL = './';
		this.currentMoudle = '';
		this.currentIndex = 0;

		this.rootUrl = PRODUCTION?"/build":"";
		this.rules = [{
			path: '/',
			// skip_id: -1,
			modules: ['example1','example2','example3']
		},{
			path: '/example',
			// skip_id: 0,
			modules: ['example1','example2','example3']
		},{
			path: '/example1',
			// skip_id: 1,
			modules: ['example1','example2','example3']
		},{
			path: '/example2',
			// skip_id: 1,
			modules: ['example1','example2','example3']
		},{
			path: '/example3',
			// skip_id: 1,
			modules: ['example1','example2','example3']
		}
		];
	}
	async resolveURL(_url) {
		let path = this.getPath(_url);

		if (path === '/' || path === '/index') {
			this._baseURL = './';
		} else {
			this._baseURL = '../';
		}
		let modules;
		for (let i = 0, l = this.rules.length; i < l; i++) {
			if (this.rules[i].path === path) {
				modules = this.rules[i].modules;
				let allPromises = this.loadModules(modules, this.rules[i].skip_id);
				for (let promise of allPromises) {
					await promise;
				}
			}
		}


		return modules;
	}
	loadModules(_modules, _skip_id) {
		// let mainStory = document.getElementsByClassName('main-story')[0];

		let allPromises = [];
		let currentHtml = '';
		// let preHtml = '';
		// let postHtml = '';

		let local = this;
		_modules.map((item, index) => {
			if (index != _skip_id) {
				let tmpPromise = new Promise((resolve, reject) => {
					try {
						console.log('begin load module -- '+item);
						fetch(`${local._baseURL}${item}/index.html`).then((response) => {
							if (response.ok) {
								return response.text();
							} else {
								reject();
							}
						}).then((html) => {
							if (html) {
								html = html.substr(html.indexOf('<section'), html.indexOf('</section>') - html.indexOf('<section') + 10);

								// if(index<_skip_id){
								// 	preHtml = preHtml+html;
								// }else{
								// 	postHtml = postHtml+html
								// }

								currentHtml = currentHtml + html;
								// if (_skip_id === -1 && index == _modules.length - 1 
								// 	|| _skip_id!==_modules.length - 1 && index === _modules.length - 1
								// 	|| _skip_id === _modules.length - 1 && index === _modules.length - 2) {
								// 	currentHtml = preHtml+currentHtml+postHtml;
								// 	document.getElementsByClassName('main-story')[0].innerHTML = currentHtml;
								// }

								if(index === _modules.length - 1){
									document.getElementsByClassName('main-story')[0].innerHTML = currentHtml;
								}
								resolve();
							} else {
								reject();
							}
						}).catch((e) => {
							console.log(e);
							reject();
						});
					} catch (e) {
						console.log(e);
					}
				});

				allPromises.push(tmpPromise);
			}
		});
		return allPromises;
	}
	getPath(_url) {
		let parser = document.createElement('a');
		parser.href = _url;
		return `/${parser.pathname.substr(this.rootUrl.length).replace(/[\/]/g, '')}`;
	}

	get baseURL(){
		return this._baseURL;
	}
}