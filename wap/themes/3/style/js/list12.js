$("#one").tap(function(){
	$(this).addClass("on").siblings().removeClass("on");
	$("#add").addClass("one");
	$("#add .ppro-son").each(function(){
		var _img=$(this).find("img");
		var bigimg=_img.data("big");
		var img=_img.attr("src");
		_img.attr("src",bigimg);
		_img.data("big",img);
	})
	md.big=true;
	myScroll.refresh();
})
$("#two").tap(function(){
	$(this).addClass("on").siblings().removeClass("on");
	$("#add").removeClass("one");
	$("#add .ppro-son").each(function(){
		var _img=$(this).find("img");
		var bigimg=_img.data("big");
		var img=_img.attr("src");
		_img.attr("src",bigimg);
		_img.data("big",img);
	})
	md.big=false;
	myScroll.refresh();
})