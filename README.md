# SPA-Boilerplate

A boilerplate to help you start a single page application project.

Use gulp, browsersync, webpack to make up a high-efficiency development environment, inclue live reloads, URL pushing, replication, click mirroring, Hot Module Replacement.

Use eslint as quality assurance.

Use History api and a folder structure to achive deeplink without config a server, also we get a simple router which has not bad SEO result.

Use template engine, the pug, to be precise, to divide each logic pages into independent modules.

Use mobx to take care of all state.

You may also create component with react(or vue in the coming version), this boilerplate has a good compatibility with them.


### Installing
```
yarn
```

### Getting Started
Create a new page:

```
npm run np
```
This will generate a new page under /src/pages/ with completely structure.(js,pug,scss,data.json...)


Run a dev-serve:

```
gulp serve
```
Start a browsersync, it will come up with webpack-dev-middleware as a middleware to use webpack build the script.
Also include webpack-hot-middleware to integrated Hot Module Replacement.
Note: The webpack be only used to handle js/jsx files.


Build all file:

```
gulp build
```

### Set router
Exapmle:
```
this.rules = [{
		path: '/',
		initPage: 'example1',
		pages: ['example1','example2','example3']
	},{
		path: '/example',
		initPage: 'example1',
		pages: ['example1','example2','example3']
	},{
		path: '/example1',
		initPage: 'example1',
		pages: ['example1','example2','example3']
	},{
		path: '/example2',
		initPage: 'example2',
		pages: ['example1','example2','example3']
	},{
		path: '/example3',
		initPage: 'example3',
		pages: ['example1','example2','example3']
	}
];
```

### Add css animation
Example:
```
let singleCssAni = new cssAni(
    $('.test1'),
    {
        'opacity': 0.5,
        'transform': 'translate3d(100px,0px,0px)'
    },
    1000, 0, '0.31, 0.19, 0.16, 1', null
);
$('.play-btn').on('click', ()=>{singleCssAni.play();})
```

### Add createjs animation
Example:
```
let cjsAniLoader = new CjsAni();
cjsAniLoader.load('icon1', icon1, $('.ani-container')[0], (cjsAniController)=> {
    this.aniController = cjsAniController;
    this.aniController.play(1, 30);
});
```

### Deployment

Before run build command, you mey need to modify the route.rootUrl depends on deploy environment:
```
this.rootUrl = PRODUCTION?"/root_path_on_deploy":"";
```

## Built With

* [Gulp](http://gulpjs.com/)
* [Browsersync](https://browsersync.io/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [eslint](http://eslint.org/)
* [scss](http://sass-lang.com/)
* [mobx](https://mobx.js.org/)


## Authors

* **Alan Yang** 


## License

This project is licensed under the MIT License