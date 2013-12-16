var App = function(){
	var o = this;
	o.subMenuOpen = false;
	o.once = false;
};
App.prototype = {
	init : function( ){
		var o = this;
		window.onresize = function(){
			if(o.subMenuOpen === false){
				$("#main-content").css('width', $(window).width() - $("#main-menu").width()+12);
				$("#main-content").css('left', $("#main-menu").position().left + $("#main-menu").width()+12);
			}else{
				$("#main-content").css('width', $(window).width() - $(".sub-menu").width());
				$("#main-content").css('left', $(".sub-menu").position().left + $(".sub-menu").width());
			}
		};
		$('#main-menu').find('.menu-item').each(function(i, obj) {
			$(this).attr('data-ns-menu', 'sub-'+i);
		});
		$('#hidden').find('.menu-wrap').each(function(i, obj) {
			$(this).attr('id', 'sub-'+i);
		});
		$("#main-content").css('width', $(window).width() - $(".sub-menu").width());
		$("#main-content").css('left', $(".sub-menu").position().left + $(".sub-menu").width());
		o.setInteractions();
		o.setHeights();
		$('#main-content').load("content/logo.html");
	},
	setHeights : function( ){
		$("#main-content").css('height', $(window).height() - $('#header').height());
		$("#main-menu").css('height', $(window).height() - $('#header').height());
		$(".sub-menu").css('height', $(window).height() - $('#header').height());
	},
	setInteractions : function( ){
		var o = this;
		// MouseOver
		$('.clickable').mouseover(function() {
			$(this).css('cursor', 'pointer');
		});
		$('.menu-item').click(function() {
			o.once = false;
			o.showSubMenu($('#'+$(this).attr('data-ns-menu')).html());
			o.makeActive($(this));
		});
		$("#overlay-wrap").click(function() {
			$(this).css('display', 'none');
			$('#main-content').load("content/logo.html");
		});
	},
	showSubMenu : function( menu ){
		var o = this;
		$('#sub-menu-holder').html(menu);
		if(o.once === false){
			o.once = true;
			$('.clickable').mouseover(function() {
				$(this).css('cursor', 'pointer');
			});
			$(".sub-menu-item").click(function() {
				if($(this).attr('data-rel') === "lightbox"){
					$('#overlay-wrap').css('display', 'block');
					$('#message').fadeTo(0, 1);
					$("#bg-color").fadeTo(0, 0.7);
					$('#main-content').empty();
					$('#overlay').load("content/"+$(this).attr('data-ns-page'));
					$('#message').css('left', $(window).width()/2 - 250);
					$('#message').css('top', $(window).height()/2 - 50);
					$('#message').delay(1000).fadeTo(2000, 0);
				}else{
					$('#main-content').load("content/"+$(this).attr('data-ns-page'));
					o.closeSubMenu();
				}
				o.makeSubAvtive($(this));
			});
			$('.hide-sub-menu').click(function() {
				if(o.subMenuOpen === true){
					o.closeSubMenu();
				}else{
					o.showSubMenu();
				}
			});
		}
		$('.sub-menu').animate({left: $("#main-menu").position().left + 250}, 400, "easeOutQuad", function() {
			o.subMenuOpen = true;
			$('.hide-sub-menu').html('<img src="images/close_arrow.jpg">');
		});
		$('#main-content').animate({width: $(window).width()-500, left: 500}, 400, "easeOutQuad", function() {
			// Animation complete.
		});
	},
	closeSubMenu : function( menu ){
		var o = this;
		$('.sub-menu').animate({left: $("#main-menu").position().left + 50}, 400, "easeOutQuad", function() {
			o.subMenuOpen = false;
			$('.hide-sub-menu').html('<img src="images/open_arrow.jpg">');
		});
		$('#main-content').animate({width: $(window).width()-300, left: 300}, 400, "easeOutQuad", function() {
			// Animation complete.
		});
	},
	makeActive : function( el ){
		$('#main-menu').find('.menu-item').each(function(i, obj) {
			$(this).css('font-weight', '100');
		});
		el.css('font-weight', '400');
	},
	makeSubAvtive : function( el ){
		$('#sub-menu-holder').find('.sub-menu-item').each(function(i, obj) {
			$(this).css('font-weight', '100');
		});
		el.css('font-weight', '400');
	}
}

$(document).ready(function () {
	var app = window.app = new App();
	app.init();
});