import 'whatwg-fetch';

class router {
	constructor() {
		this._baseURL = './';
		this.currentMoudle = '';
		this.currentIndex = 0;

		this.rootUrl = PRODUCTION ? "/build" : "";

		this.rules = [{
			path: '/',
			initPage: 'example1',
			pages: ['example1', 'example2', 'example3']
		}, {
			path: '/example',
			initPage: 'example1',
			pages: ['example1', 'example2', 'example3']
		}, {
			path: '/example1',
			initPage: 'example1',
			pages: ['example1', 'example2', 'example3']
		}, {
			path: '/example2',
			initPage: 'example2',
			pages: ['example1', 'example2', 'example3']
		}, {
			path: '/example3',
			initPage: 'example3',
			pages: ['example1', 'example2', 'example3']
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
		let rule;
		for (let i = 0, l = this.rules.length; i < l; i++) {
			if (this.rules[i].path === path) {
				rule = this.rules[i];
				let allPromises = this.loadPages(rule.pages, rule.skip_id);
				for (let promise of allPromises) {
					await promise;
				}
			}
		}


		return rule;
	}
	loadPages(_pages, _skip_id) {
		// let mainStory = document.getElementsByClassName('main-story')[0];

		let allPromises = [];
		let currentHtml = '';
		// let preHtml = '';
		// let postHtml = '';

		let local = this;
		_pages.map((item, index) => {
			if (index != _skip_id) {
				let tmpPromise = new Promise((resolve, reject) => {
					try {
						console.log('begin load page -- ' + item);
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
								// if (_skip_id === -1 && index == _pages.length - 1 
								// 	|| _skip_id!==_pages.length - 1 && index === _pages.length - 1
								// 	|| _skip_id === _pages.length - 1 && index === _pages.length - 2) {
								// 	currentHtml = preHtml+currentHtml+postHtml;
								// 	document.getElementsByClassName('main-story')[0].innerHTML = currentHtml;
								// }

								if (index === _pages.length - 1) {
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

	get baseURL() {
		return this._baseURL;
	}
}

export default new router();