/* eslint-disable */
var _lib = {}, _img = {}, _cjs = createjs, _ss = {};
var anifun = function (lib, img, cjs, ss){
	var p; // shortcut to reference prototypes
	lib.webFontTxtInst = {}; 
	var loadedTypekitCount = 0;
	var loadedGoogleCount = 0;
	var gFontsUpdateCacheList = [];
	var tFontsUpdateCacheList = [];
	lib.ssMetadata = [];



	lib.updateListCache = function (cacheList) {		
		for(var i = 0; i < cacheList.length; i++) {		
			if(cacheList[i].cacheCanvas)		
				cacheList[i].updateCache();		
		}		
	};		

	lib.addElementsToCache = function (textInst, cacheList) {		
		var cur = textInst;		
		while(cur != exportRoot) {		
			if(cacheList.indexOf(cur) != -1)		
				break;		
			cur = cur.parent;		
		}		
		if(cur != exportRoot) {		
			var cur2 = textInst;		
			var index = cacheList.indexOf(cur);		
			while(cur2 != cur) {		
				cacheList.splice(index, 0, cur2);		
				cur2 = cur2.parent;		
				index++;		
			}		
		}		
		else {		
			cur = textInst;		
			while(cur != exportRoot) {		
				cacheList.push(cur);		
				cur = cur.parent;		
			}		
		}		
	};		

	lib.gfontAvailable = function(family, totalGoogleCount) {		
		lib.properties.webfonts[family] = true;		
		var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
		for(var f = 0; f < txtInst.length; ++f)		
			lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

		loadedGoogleCount++;		
		if(loadedGoogleCount == totalGoogleCount) {		
			lib.updateListCache(gFontsUpdateCacheList);		
		}		
	};		

	lib.tfontAvailable = function(family, totalTypekitCount) {		
		lib.properties.webfonts[family] = true;		
		var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
		for(var f = 0; f < txtInst.length; ++f)		
			lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

		loadedTypekitCount++;		
		if(loadedTypekitCount == totalTypekitCount) {		
			lib.updateListCache(tFontsUpdateCacheList);		
		}		
	};
	// symbols:
	// helper functions:

	function mc_symbol_clone() {
		var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
		clone.gotoAndStop(this.currentFrame);
		clone.paused = this.paused;
		clone.framerate = this.framerate;
		return clone;
	}

	function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
		var prototype = cjs.extend(symbol, cjs.MovieClip);
		prototype.clone = mc_symbol_clone;
		prototype.nominalBounds = nominalBounds;
		prototype.frameBounds = frameBounds;
		return prototype;
		}


	(lib.Symbol4 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer 1
		this.shape = new cjs.Shape();
		this.shape.graphics.f("#FFFFFF").s().p("AE8CpQgDgDAAgEQAAgdgEgaQgBgEADgDQACgEAEAAQAEgBADADQAEACAAAEQAFAcAAAeQAAAEgDADQgDACgEABQgEgBgDgCgAlJCpQgDgDAAgEQAAggAFgdQABgEADgDQAEgCAEABQAEAAACAEQADADgBAEQgFAcAAAeQAAAEgDADQgDACgEABQgEgBgDgCgAErA4QgEgCgBgDQgKgcgQgYQgCgDABgEQABgEADgDQAEgCAEABQAEABACAEQAQAaALAdQACADgCAEQgCAEgEABIgDABIgEgBgAkxA2QgEgBgBgEQgCgEABgDQALgdARgZQACgEAEgBQAEgBADACQAEADABAEQABAEgCADQgQAYgKAaQgCAEgEACIgEABIgDgBgADwgsQgFAAgCgDIgLgMQgQgPgQgNQgDgCgBgEQgBgEADgDQADgEAEgBQAEAAADACQASAOAQAQIALAMQADADAAAFQAAAEgDACQgDADgEAAIAAAAgAj0gvQgDgDAAgEQgBgFADgDIAKgLIAAAAQARgRASgOQAEgDAEABQAEABADADQACADAAAEQgBAEgEADQgQANgQAQIAAAAIgKALQgDADgEAAIgBAAQgDAAgDgCgACMh2QgZgNgcgIQgEgBgCgDQgCgEABgEQABgEAEgCQADgCAEABQAeAIAcAOQADACACAEQABAEgCADQgCAEgEACIgDAAIgFgBgAiSh2QgEgCgCgEQgCgDABgEQACgEAEgCQAbgOAegIQAEgBAEACQAEACABAEQABAEgCAEQgCADgEABQgcAIgaANIgFABIgDAAgAAeiVIgegCIgZABQgEABgDgDQgEgDAAgEQAAgEADgDQACgDAEAAIAbgBQAQgBAQACQAEAAACAEQADADAAAEQgBAEgDADQgDACgDAAIgBAAg");
		this.shape.setTransform(32.3,16.1);

		this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-1,-1,66.6,34.3), null);


	(lib.Symbol2 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer 1
		this.shape = new cjs.Shape();
		this.shape.graphics.f("#FFFFFF").s().p("AkmCgIAAgUIAAgFQAAh7BWhVQBXhWB5AAQB7AABVBWQBXBVAAB7IAAAFIAAAUgAjBg6QhRBOAABzIAAAFIIlAAIAAgFQAAhzhQhOQhRhRhyAAQhxAAhQBRg");
		this.shape.setTransform(29.5,16);

		this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,59,32), null);


	(lib.Symbol1 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer 1
		this.shape = new cjs.Shape();
		this.shape.graphics.f("#FFFFFF").s().p("AgJBfIAAi9IATAAIAAC9g");
		this.shape.setTransform(1,9.5);

		this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,2,19), null);


	(lib.Symbol5 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer 2 (mask)
		var mask = new cjs.Shape();
		mask._off = true;
		mask.graphics.p("AjpB4IAAjvIHTAAQgKB/AHBwg");
		mask.setTransform(37.1,23);

		// Layer 9
		this.instance = new lib.Symbol1();
		this.instance.parent = this;
		this.instance.setTransform(35.1,36.4,1,1,-89.5,0,0,1.2,19);

		var maskedShapeInstanceList = [this.instance];

		for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
			maskedShapeInstanceList[shapedInstanceItr].mask = mask;
		}

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({regX:1,regY:9.5,rotation:-87,x:25.6,y:36.1},0).wait(1).to({rotation:-81.4,x:25.7,y:35.1},0).wait(1).to({rotation:-72.2,x:26,y:33.6},0).wait(1).to({rotation:-58.9,x:26.8,y:31.6},0).wait(1).to({rotation:-42.2,x:28.5,y:29.4},0).wait(1).to({rotation:-23.3,x:31.1,y:27.6},0).wait(1).to({rotation:-4.6,x:34.1,y:26.7},0).wait(1).to({rotation:12.2,x:36.9,y:26.8},0).wait(1).to({rotation:26.3,x:39.1,y:27.5},0).wait(1).to({rotation:37.6,x:40.7,y:28.5},0).wait(1).to({rotation:46.4,x:41.7,y:29.4},0).wait(1).to({rotation:53,x:42.4,y:30.2},0).wait(1).to({rotation:57.6,x:43,y:30.8},0).wait(1).to({rotation:60.7,x:43.2,y:31.2},0).wait(1).to({rotation:62.5,x:43.3,y:31.5},0).wait(1).to({regX:1.1,regY:18.9,rotation:63,x:35.1,y:36.1},0).to({rotation:45},8).wait(1).to({regX:1,regY:9.5,rotation:44.9,x:41.6,y:29.4},0).wait(1).to({rotation:44.5,y:29.3},0).wait(1).to({rotation:43.8,x:41.5,y:29.2},0).wait(1).to({rotation:42.8,x:41.4,y:29.1},0).wait(1).to({rotation:41.6,x:41.2,y:29},0).wait(1).to({rotation:40.3,x:41,y:28.9},0).wait(1).to({rotation:38.8,x:40.9,y:28.7},0).wait(1).to({rotation:37.2,x:40.7,y:28.5},0).wait(1).to({rotation:35.7,x:40.4,y:28.4},0).wait(1).to({rotation:34.3,x:40.3,y:28.2},0).wait(1).to({rotation:33,x:40.1,y:28.1},0).wait(1).to({rotation:32,x:39.9},0).wait(1).to({rotation:31.1,x:39.8,y:28},0).wait(1).to({rotation:30.5,x:39.7,y:27.9},0).wait(1).to({rotation:30.1},0).wait(1).to({regX:1.1,regY:18.9,rotation:30,x:35.1,y:36},0).wait(1).to({regX:1,regY:9.5,rotation:30.1,x:39.7,y:27.8},0).wait(1).to({rotation:30.5,y:27.9},0).wait(1).to({rotation:31.1,x:39.8},0).wait(1).to({rotation:31.9,x:40,y:28},0).wait(1).to({rotation:33,x:40.1,y:28.1},0).wait(1).to({rotation:34.3,x:40.3,y:28.2},0).wait(1).to({rotation:35.8,x:40.5,y:28.4},0).wait(1).to({rotation:37.4,x:40.7,y:28.6},0).wait(1).to({rotation:39.1,x:41,y:28.7},0).wait(1).to({rotation:40.9,x:41.2,y:29},0).wait(1).to({rotation:42.7,x:41.4,y:29.2},0).wait(1).to({rotation:44.4,x:41.6,y:29.4},0).wait(1).to({rotation:46,x:41.8,y:29.6},0).wait(1).to({rotation:47.6,x:42,y:29.8},0).wait(1).to({rotation:48.9,x:42.1,y:29.9},0).wait(1).to({rotation:50.1,x:42.3,y:30.1},0).wait(1).to({rotation:51,x:42.4,y:30.3},0).wait(1).to({rotation:51.8,y:30.4},0).wait(1).to({rotation:52.3,x:42.5},0).wait(1).to({rotation:52.7},0).wait(1).to({regX:1.2,regY:18.9,rotation:52.8,x:35.2,y:36.3},0).to({rotation:37.8,x:35.1},16).to({regY:19,rotation:45.5},14).wait(1));

		// Layer 7
		this.instance_1 = new lib.Symbol4();
		this.instance_1.parent = this;
		this.instance_1.setTransform(34.3,21.9,0.671,0.671,0,0,0,32.4,16.2);

		this.instance_2 = new lib.Symbol2();
		this.instance_2.parent = this;
		this.instance_2.setTransform(34.5,21,1,1,0,0,0,29.5,16);

		this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(93));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(5,5,59,32);


	// stage content:
	(lib.root = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer 2
		this.instance = new lib.Symbol5("synched",0);
		this.instance.parent = this;
		this.instance.setTransform(3.1,17.6,1,1,0,0,0,2.1,1.6);
		this.instance.alpha = 0.699;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(93));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(41,51,59,32);
	// library properties:
	lib.properties = {
		width: 70,
		height: 60,
		fps: 60,
		color: "#000000",
		opacity: 1.00,
		webfonts: {},
		manifest: [],
		preloads: []
	};
}

anifun(_lib,_img,_cjs,_ss);

export const lib = _lib;
export const img = _img;
export const ss = _ss;