import utils from '../utils';

export default class imgLoader {
	constructor() {
	}

	static preloadImgs($targetdom, baseURL, resolve, progressBar) {
		var imgs;
		if ($targetdom.hasClass('preload')) {
			imgs = $targetdom;
		} else {
			imgs = $targetdom.find('.preload');
		}
		if (imgs.length !== 0) {
			startPreload(imgs);
		} else {
			resolve();
		}
		function startPreload(arr) {
			var newimages = [],
				loadedimages = 0,
				imgLen = 0,
				ratio = 0;
			arr = (typeof arr !== "object") ? [arr] : arr;
			imgLen = arr.length;
			function imageloadpost() {
				loadedimages++;
				ratio = loadedimages / imgLen;
				if (arr[loadedimages - 1] === null) {
					//console.log('nothing here');
				}
				if (loadedimages === imgLen) {
					ratio = 1;
					for (var j = 0, len = imgLen; j < len; j++) {
						$(arr[j]).append(newimages[j]);
					}
				}
				updateLoading(ratio);
			}
			var img;
			for (var i = 0, len = imgLen; i < len; i++) {
				img = new Image();
				newimages.push(img);
				img.addEventListener("load", imageloadpost);
				img.addEventListener("error", imageloadpost);
				if (arr[i].getAttribute('data-src') !== null) {
					let url = arr[i].getAttribute('data-src');
					// console.log(url);
					img.src = url;
				}
				if (arr[i].getAttribute('data-srcset') !== null) {
					let url = arr[i].getAttribute('data-srcset');
					// console.log(url);
					img.srcset = url;
				}

				if (arr[i].getAttribute('data-mobile-src') !== null) {

					if (!utils.platform.isDesktop) {
						let url = arr[i].getAttribute('data-mobile-src');
						img.src = url;
					}
				}
				img.alt = "";
			}
		}
		function updateLoading(r) {
			if (progressBar) {
				progressBar.animateTo(360 * r, 200);
			}
			if (r >= 1) {
				resolve();
			}
		}
	}
}
