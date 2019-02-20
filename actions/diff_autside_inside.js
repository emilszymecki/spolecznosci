//działa na https://jbzdy.pl

var timers = {container:0, outsideClick:0}
$.fn.clickOff = function(callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;
    
    parent.click(function() {
        clicked = true;
    });
    
    $(document).click(function(event) { 
        if (!clicked) {
            callback(parent, event);
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            //parent.off("clickOff");
        };
        clicked = false;
    });
};

$('#container').clickOff(function() {
    timers.outsideClick = $.now()
	console.log((timers.outsideClick - timers.container),timers)
});

$('#container').mousemove(function(e) {

	timers.container = $.now()
	//alert('on');
});
