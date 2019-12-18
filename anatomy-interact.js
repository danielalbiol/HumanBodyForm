﻿// Quick feature detection
function isTouchEnabled() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

var array_zonas = [];

jQuery(document).ready(function(){
	jQuery('#anatomybaseback').hide().animate({'opacity':'0'}, 1000);

	jQuery('.go_bck').on('click', function(){
		jQuery('#anatomybase').hide().animate({'opacity':'0'}, 1000);
		jQuery('#anatomybaseback').show().animate({'opacity':'1'}, 1000);
	});
	jQuery('.go_frt').on('click', function(){
		jQuery('#anatomybaseback').hide().animate({'opacity':'0'}, 1000);
		jQuery('#anatomybase').show().animate({'opacity':'1'}, 1000);
	});
});


jQuery(function(){
	frt_addEvent('frt_1');frt_addEvent('frt_2');frt_addEvent('frt_3');frt_addEvent('frt_4');frt_addEvent('frt_5');frt_addEvent('frt_6');frt_addEvent('frt_7');frt_addEvent('frt_8');frt_addEvent('frt_9');frt_addEvent('frt_10');frt_addEvent('frt_11');frt_addEvent('frt_12');frt_addEvent('frt_13');frt_addEvent('frt_14');frt_addEvent('frt_15');frt_addEvent('frt_16');frt_addEvent('frt_17');frt_addEvent('frt_18');frt_addEvent('frt_19');frt_addEvent('frt_20');frt_addEvent('frt_21');frt_addEvent('frt_22');frt_addEvent('frt_23');frt_addEvent('frt_24');frt_addEvent('frt_25');frt_addEvent('frt_26');frt_addEvent('frt_27');frt_addEvent('frt_28');
	bck_addEvent('bck_1');bck_addEvent('bck_2');bck_addEvent('bck_3');bck_addEvent('bck_4');bck_addEvent('bck_5');bck_addEvent('bck_6');bck_addEvent('bck_7');bck_addEvent('bck_8');bck_addEvent('bck_9');bck_addEvent('bck_10');bck_addEvent('bck_11');bck_addEvent('bck_12');bck_addEvent('bck_13');bck_addEvent('bck_14');bck_addEvent('bck_15');bck_addEvent('bck_16');bck_addEvent('bck_17');bck_addEvent('bck_18');bck_addEvent('bck_19');bck_addEvent('bck_20');bck_addEvent('bck_21');bck_addEvent('bck_22');bck_addEvent('bck_23');bck_addEvent('bck_24');bck_addEvent('bck_25');bck_addEvent('bck_26');bck_addEvent('bck_27');bck_addEvent('bck_28');bck_addEvent('bck_29');
})

function frt_addEvent(id,relationId){
	var _obj = jQuery('#'+id);
	var created = true;
	_obj.attr({'fill':frt_config[id]['upColor'],'fill-opacity':frt_config[id]['upOpacity'],'stroke':frt_config[id]['outlineUpColor'],'stroke-opacity':frt_config[id]['outlineUpOpacity']});
	_obj.attr({'cursor':'default'});
	if(frt_config[id]['enable'] == true){
		if (isTouchEnabled()) {
			_obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=jQuery('#tipanatomy').outerWidth(), tiph=jQuery('#tipanatomy').outerHeight(), 
				x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
				jQuery('#'+id).css({'fill':frt_config[id]['overColor'],'fill-opacity':frt_config[id]['downOpacity'],'stroke':frt_config[id]['outlineDownColor'],'stroke-opacity':frt_config[id]['outlineDownOpacity']});
				jQuery('#tipanatomy').show().html(frt_config[id]['hover']);
				jQuery('#tipanatomy').css({left:x, top:y})
			})
			_obj.on('touchend', function(){
				jQuery('#'+id).css({'fill':frt_config[id]['upColor'],'fill-opacity':frt_config[id]['upOpacity'],'stroke':frt_config[id]['outlineUpColor'],'stroke-opacity':frt_config[id]['outlineUpOpacity']});
				if(frt_config[id]['target'] == 'new_window'){
					window.open(frt_config[id]['url']);	
				}else if(frt_config[id]['target'] == 'same_window'){
					window.parent.location.href=frt_config[id]['url'];
				}
			})
		}
		
		_obj.attr({'cursor':'pointer'});
		 _obj.hover(function(){
			jQuery('#tipanatomy').show().html(frt_config[id]['hover']);
			//_obj.css({'fill':frt_config[id]['overColor'],'fill-opacity':frt_config[id]['overOpacity'],'stroke':frt_config[id]['outlineOverColor'],'stroke-opacity':frt_config[id]['outlineOverOpacity']})
		},function(){
			jQuery('#tipanatomy').hide();
			//jQuery('#'+id).css({'fill':frt_config[id]['upColor'],'fill-opacity':frt_config[id]['upOpacity'],'stroke':frt_config[id]['outlineUpColor'],'stroke-opacity':frt_config[id]['outlineUpOpacity']});
		}) 
		_obj.mousedown(function(){
			//Comprobar si la parte del cuerpo se ha seleccionado o no
			 if(created) {
				jQuery('#'+id).css({'fill':frt_config[id]['overColor'],'fill-opacity':frt_config[id]['overOpacity'],'stroke':frt_config[id]['outlineOverColor'],'stroke-opacity':frt_config[id]['outlineOverOpacity']})
				created = false;

				//Añadir las zonas seleccionadas al array para mostrarlas 
				array_zonas.push(frt_config[id]['hover']);
				var str = "";
				array_zonas.forEach(zona => {
					str = str  + " " + zona;
				});
				jQuery('#zona-tatuaje').val(str);
			} else {
				jQuery('#'+id).css({'fill':frt_config[id]['upColor'],'fill-opacity':frt_config[id]['upOpacity'],'stroke':frt_config[id]['outlineUpColor'],'stroke-opacity':frt_config[id]['outlineUpOpacity']});
				created = true;

				//Eliminar las zonas seleccionadas al array para mostrarlas 
				array_zonas.splice( array_zonas.indexOf(frt_config[id]['hover']), 1 );
				var str = "";
				array_zonas.forEach(zona => {
					str = str  + " " + zona;
				});
				jQuery('#zona-tatuaje').val(str);
			} 
		})
		_obj.mousemove(function(e){
			var x=e.pageX+10, y=e.pageY+15;
			var tipw=jQuery('#tipanatomy').outerWidth(), tiph=jQuery('#tipanatomy').outerHeight(), 
			x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
			y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
			jQuery('#tipanatomy').css({left:x, top:y})
		})
	}	
}

function bck_addEvent(id,relationId){
	var _obj = jQuery('#'+id);
	var created = true;
	_obj.attr({'fill':bck_config[id]['upColor'],'fill-opacity':bck_config[id]['upOpacity'],'stroke':bck_config[id]['outlineUpColor'],'stroke-opacity':bck_config[id]['outlineUpOpacity']});
	_obj.attr({'cursor':'default'});
	if(bck_config[id]['enable'] == true){
		if (isTouchEnabled()) {
			_obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=jQuery('#tipanatomy').outerWidth(), tiph=jQuery('#tipanatomy').outerHeight(), 
				x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
				jQuery('#'+id).css({'fill':bck_config[id]['overColor'],'fill-opacity':bck_config[id]['downOpacity'],'stroke':bck_config[id]['outlineDownColor'],'stroke-opacity':bck_config[id]['outlineDownOpacity']});
				jQuery('#tipanatomy').show().html(bck_config[id]['hover']);
				jQuery('#tipanatomy').css({left:x, top:y})
			})
			_obj.on('touchend', function(){
				jQuery('#'+id).css({'fill':bck_config[id]['upColor'],'fill-opacity':bck_config[id]['upOpacity'],'stroke':bck_config[id]['outlineUpColor'],'stroke-opacity':bck_config[id]['outlineUpOpacity']});
				if(bck_config[id]['target'] == 'new_window'){
					window.open(bck_config[id]['url']);	
				}else if(bck_config[id]['target'] == 'same_window'){
					window.parent.location.href=bck_config[id]['url'];
				}
			})
		}
		_obj.attr({'cursor':'pointer'});
		_obj.hover(function(){
			jQuery('#tipanatomy').show().html(bck_config[id]['hover']);
			//_obj.css({'fill':bck_config[id]['overColor'],'fill-opacity':bck_config[id]['overOpacity'],'stroke':bck_config[id]['outlineOverColor'],'stroke-opacity':bck_config[id]['outlineOverOpacity']})
		},function(){
			jQuery('#tipanatomy').hide();
			//jQuery('#'+id).css({'fill':bck_config[id]['upColor'],'fill-opacity':bck_config[id]['upOpacity'],'stroke':bck_config[id]['outlineUpColor'],'stroke-opacity':bck_config[id]['outlineUpOpacity']});
		})
		_obj.mousedown(function(){
			//Comprobar si la parte del cuerpo se ha seleccionado o no
			 if(created) {
				jQuery('#'+id).css({'fill':bck_config[id]['overColor'],'fill-opacity':bck_config[id]['overOpacity'],'stroke':bck_config[id]['outlineOverColor'],'stroke-opacity':bck_config[id]['outlineOverOpacity']})
				created = false;

				//Añadir las zonas seleccionadas al array para mostrarlas 
				array_zonas.push(bck_config[id]['hover']);
				var str = "";
				array_zonas.forEach(zona => {
					str = str  + " " + zona;
				});
				jQuery('#zona-tatuaje').val(str);
			} else {
				jQuery('#'+id).css({'fill':bck_config[id]['upColor'],'fill-opacity':bck_config[id]['upOpacity'],'stroke':bck_config[id]['outlineUpColor'],'stroke-opacity':bck_config[id]['outlineUpOpacity']});
				created = true;

				//Eliminar las zonas seleccionadas al array para mostrarlas 
				array_zonas.splice( array_zonas.indexOf(bck_config[id]['hover']), 1 );
				var str = "";
				array_zonas.forEach(zona => {
					str = str  + " " + zona;
				});
				jQuery('#zona-tatuaje').val(str);
			} 
		})
		_obj.mousemove(function(e){
			var x=e.pageX+10, y=e.pageY+15;
			var tipw=jQuery('#tipanatomy').outerWidth(), tiph=jQuery('#tipanatomy').outerHeight(), 
			x=(x+tipw>jQuery(document).scrollLeft()+jQuery(window).width())? x-tipw-(20*2) : x
			y=(y+tiph>jQuery(document).scrollTop()+jQuery(window).height())? jQuery(document).scrollTop()+jQuery(window).height()-tiph-10 : y
			jQuery('#tipanatomy').css({left:x, top:y})
		})
	}	
}
