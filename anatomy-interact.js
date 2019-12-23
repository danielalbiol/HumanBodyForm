﻿// Quick feature detection
function isTouchEnabled() {
    return (('ontouchstart' in window) ||
        (navigator.MaxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

var array_zonas = [];

jQuery(document).ready(function() {
    jQuery("#anatomybaseback").hide().animate({ "opacity": "0" }, 1000);

    //Ocultar la segunda fase del formulario y el botón de enviar al crear el documento
    jQuery("#segunda-fase").hide().animate({ "opacity": "0" }, 1000);
    jQuery(".wpcf7-submit").hide().animate({ "opacity": "0" }, 1000);
    jQuery("#atras-form").hide().animate({ "opacity": "0" }, 1000);

    jQuery(".gob").on("click", function() {
        jQuery("#anatomybase").hide().animate({ "opacity": "0" }, 1000);
        jQuery("#anatomybaseback").show().animate({ "opacity": "1" }, 1000);
    });
    jQuery(".goa").on("click", function() {
        jQuery("#anatomybaseback").hide().animate({ "opacity": "0" }, 1000);
        jQuery("#anatomybase").show().animate({ "opacity": "1" }, 1000);
    });

    //Seleccionamos siguiente
    jQuery("#avanzar-form").on("click", function() {
        //Ocultar todos los elementos del primer formulario
        jQuery("#primera-fase").hide().animate({ "opacity": "0" }, 1000);
        jQuery("#anatomywrapper").hide().animate({ "opacity": "0" }, 1000);
        jQuery(".imagen-zona-tatuaje").hide().animate({ "opacity": "0" }, 1000);
        jQuery("#avanzar-form").hide().animate({ "opacity": "0" }, 1000);

        //Ocultar las fechas del tatuaje, solamente se mostrarán si el usuario selecciona la opción Entre dos fechas
        jQuery(".fecha-desde").hide().animate({ "opacity": "0" }, 1000);
        jQuery(".fecha-hasta").hide().animate({ "opacity": "0" }, 1000);

        //Mostrar la segunda parte del formulario y el botón de enviar
        jQuery("#segunda-fase").show().animate({ "opacity": "1" }, 1000);
        jQuery(".wpcf7-submit").show().animate({ "opacity": "1" }, 1000);
        jQuery(".wpcf7-submit").css({ 'float': 'right' });
        jQuery("#atras-form").show().animate({ "opacity": "1" }, 1000);
    });

    //Seleccionamos siguiente
    jQuery("#atras-form").on("click", function() {
        //Ocultar todos los elementos del primer formulario
        jQuery("#segunda-fase").hide().animate({ "opacity": "0" }, 1000);
        jQuery("#atras-form").hide().animate({ "opacity": "0" }, 1000);
        jQuery(".wpcf7-submit").hide().animate({ "opacity": "0" }, 1000);

        //Mostrar la segunda parte del formulario y el botón de enviar
        jQuery("#primera-fase").show().animate({ "opacity": "1" }, 1000);
        jQuery("#anatomywrapper").show().animate({ "opacity": "1" }, 1000);
        jQuery(".imagen-zona-tatuaje").show().animate({ "opacity": "1" }, 1000);
        jQuery("#avanzar-form").show().animate({ "opacity": "1" }, 1000);
    });
});

jQuery(function() {
    jQuery("path[id^=ana]").each(function(i, e) {
        anaaddEvent(jQuery(e).attr("id"));
    });
});

function anaaddEvent(id, relationId) {
    var arr = id.split("");
    var created = true;
    var _obj = jQuery("#" + id + "," + arr.slice().join(""));
    _obj.attr({ "fill": "rgba(255, 0, 0, 0)", "stroke": anaconfig.default.outlineColor });
    _obj.attr({ "cursor": "default" });
    if (anaconfig[id].enabled === true) {
        _obj.attr({ "cursor": "pointer" });
        _obj.hover(function() {
            jQuery("#tipanatomy").show().html(anaconfig[id].hover);
            //_obj.css({ "fill": "rgba(255, 0, 0, 0.3)" });
        }, function() {
            jQuery("#tipanatomy").hide();
            //jQuery("#" + id).css({ "fill": "rgba(255, 0, 0, 0)" });
        });
        if (anaconfig[id].target !== "none") {
            _obj.mousedown(function() {
                jQuery("#" + id).css({ "fill": "rgba(255, 0, 0, 0.7)" });
            });
        }
        _obj.mouseup(function() {
            //Comprobar si la parte del cuerpo se ha seleccionado o no
            if (created) {
                jQuery('#' + id).css({ "fill": "rgba(255, 0, 0, 0.5)" });
                created = false;

                //Añadir las zonas seleccionadas al array para mostrarlas 
                array_zonas.push(anaconfig[id]['hover']);
                var str = "";
                array_zonas.forEach(zona => {
                    str = str + " " + zona;
                });

                var desiredOutput = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(str));
                jQuery('#zona-tatuaje').val(desiredOutput);

                //Si no esta seleccionada 
            } else {
                jQuery("#" + id).css({ "fill": "rgba(255, 0, 0, 0)" });
                created = true;

                //Eliminar las zonas seleccionadas al array para mostrarlas 
                array_zonas.splice(array_zonas.indexOf(anaconfig[id]['hover']), 1);
                var str = "";
                array_zonas.forEach(zona => {
                    str = str + " " + zona;
                });
                var desiredOutput = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(str));
                jQuery('#zona-tatuaje').val(desiredOutput);
            }
        });
        _obj.mousemove(function(e) {
            var x = e.pageX + 10,
                y = e.pageY + 15;
            var tipw = jQuery("#tipanatomy").outerWidth(),
                tiph = jQuery("#tipanatomy").outerHeight(),
                x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
            y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
            jQuery("#tipanatomy").css({ left: x, top: y });
        });
        if (isTouchEnabled()) {
            _obj.on("touchstart", function(e) {
                var touch = e.originalEvent.touches[0];
                var x = touch.pageX + 10,
                    y = touch.pageY + 15;
                var tipw = jQuery("#tipanatomy").outerWidth(),
                    tiph = jQuery("#tipanatomy").outerHeight(),
                    x = (x + tipw > jQuery(document).scrollLeft() + jQuery(window).width()) ? x - tipw - (20 * 2) : x;
                y = (y + tiph > jQuery(document).scrollTop() + jQuery(window).height()) ? jQuery(document).scrollTop() + jQuery(window).height() - tiph - 10 : y;
                jQuery("#" + id).css({ "fill": "rgba(255, 0, 0, 0.7)" });
                jQuery("#tipanatomy").show().html(anaconfig[id].hover);
                jQuery("#tipanatomy").css({ left: x, top: y });
            });
            _obj.on("touchend", function() {
                jQuery("#" + id).css({ "fill": "rgba(255, 0, 0, 0)" });
                if (anaconfig[id].target === "new_window") {
                    window.open(anaconfig[id].url);
                } else if (anaconfig[id].target === "same_window") {
                    window.parent.location.href = anaconfig[id].url;
                } else if (anaconfig[id].target === "modal") {
                    jQuery(anaconfig[id].url).modal("show");
                }
            });
        }
    }
}

function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\w\S*/g, function(word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}