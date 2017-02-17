export default class Render{
	static render_y(dom, value){
		dom.css({
	        'transform':'translate3d(0px,'+value+'px,0px)'
	    });
	}

	static render_box(dom, value){
		dom.css({
	        'width': value.width + 'px',
	        'height': value.height + 'px',
	        'top': value.top + 'px',
	        'left': value.left + 'px'
	    });
	}
}
