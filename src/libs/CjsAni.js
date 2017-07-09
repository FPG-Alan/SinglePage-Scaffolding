/* eslint-disable */
import router from '../router';

export default class CjsAni{
	constructor(){

	}

	load(aniName, aniInstance,container,callback){
		var aniCanvas = $('<canvas>').addClass('cjsani-test').appendTo(container);
	    var tmpLoader = new createjs.LoadQueue(false, router.baseURL);

	    createjs.LoadItem.LOAD_TIMEOUT_DEFAULT = 800000;
	    if(aniInstance.lib.properties.manifest.length <= 0){
	    	handleComplete();
	    }else{
	    	tmpLoader.addEventListener("fileload", handleFileLoad);
			tmpLoader.addEventListener("complete", handleComplete);
			tmpLoader.loadManifest(aniInstance.lib.properties.manifest);
	    }

	    function handleFileLoad(evt) {
			if (evt.item.type === "image") { aniInstance.img[evt.item.id] = evt.result; }
		}

		function handleComplete(evt) {
			aniCanvas.attr({'width':aniInstance.lib.properties.width,'height':aniInstance.lib.properties.height});
			if(evt){
				var queue = evt.target;
				var ssMetadata = aniInstance.lib.ssMetadata;
				for(let m=0; m<ssMetadata.length; m++) {
					aniInstance.ss[ssMetadata[m].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[m].name)], "frames": ssMetadata[m].frames} )
				}
			}
			var tmpRoot = new aniInstance.lib['root']();
			var tmpStage = new createjs.Stage(aniCanvas[0]);
			tmpStage.addChild(tmpRoot);
			tmpStage.update();
			createjs.Ticker.setFPS(aniInstance.lib.properties.fps);

			var aniControler = new AniController(tmpRoot, tmpStage, aniCanvas, aniName);

			callback(aniControler);
		}
	}
}
/*
* cf: current frame
* ef: end frame
* cb: callback
*/
class AniController{
	constructor(aniRoot, aniStage, aniDom, aniName){
		this.root = aniRoot;
		this.stage = aniStage;
		this.aniDom = aniDom;

		this.aniName = aniName;

		this.cf = 0;
		this.tf = this.root.timeline.duration;
		this.fps = 1;
		this.halfFps = false;
		this.halfFpsFlag = true;
		this.animating = false;
	}
	playRange(range,callback){
		if(!this.animating){
			this.animating = true;
			// console.log('ani start '+range);

			this.cf = range[0];
			this.ef = range[1];

			if(callback){
				this.cb = callback;
			}
			if(this.cf<this.ef){
				this.dir = 1;
			}else{
				this.dir = -1;
			}
			if(!this.halfFps){
				this.fps = Math.round(Math.abs(this.cf - this.ef) / 100);
			}
			requestAnimationFrame(this.play.bind(this));
		}	
	}
	seek(f){
		if(f!==this.cf){
			this.cf = f;
			this.root.gotoAndStop(f);
			this.updateStage();
			// this.stage.update();
		}
	}
	play(){
		// need play forward
		if(this.halfFps){
			if(this.halfFpsFlag){
				this.halfFpsFlag = false;
				

				if(Math.abs(this.cf - this.ef) > this.fps){
					this.seek((this.cf + (this.fps * this.dir)));
					requestAnimationFrame(this.play.bind(this));
				}else{
					console.log('ani complete');
					this.animating = false;
					if(this.cb){
						this.cb(this.cf);
					}
				}
			}else{
				this.halfFpsFlag = true;
				requestAnimationFrame(this.play.bind(this));
			}
		}else{
			this.fps = Math.round(Math.abs(this.cf - this.ef) / 100);
			if(this.fps == 0){
				this.fps = 1;
			}

			if(Math.abs(this.cf - this.ef) > this.fps){
				this.seek((this.cf + (this.fps * this.dir)));
				requestAnimationFrame(this.play.bind(this));
			}else{
				this.animating = false;
				if(this.cb){
					this.cb(this.cf);
				}
			}
		}
		
	}

	updateStage(){
		// console.log('update stage');
		this.stage.update();
	}


}