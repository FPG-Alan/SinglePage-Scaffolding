import cssAni from '../../libs/CssAni';
import vivus from 'vivus';

export default class example {
	constructor() {
	}
	init(dtd) {
		console.log('example init');
		console.log(vivus);

		/*new vivus('svg-test', {
			file: '../../assets/icon1.svg',
			onReady: function (myVivus) {
				// `el` property is the SVG element
				// myVivus.el.setAttribute('height', 'auto');
				myVivus.stop().reset().play(2);
			}
		});*/

		

		var singleCssAni = new cssAni(
			$('.test1'),
			{
				'opacity': 0.5,
				'transform': 'translate3d(100px,0px,0px)'
			},
			1000, 0, '0.31, 0.19, 0.16, 1', null
		);


		$('.play-btn').on('click', function () {
			singleCssAni.play();
		});

		$('.cancel-btn').on('click', function () {
			singleCssAni.cancel();
		});


		dtd.resolve();
	}
}