/*jgn edit at 2014-12-22 12:00*/
$.afui.autoLaunch=true;
$.afui.useOSThemes=false;
LocalData.prototype.setUser=function(user){
    localStorage.setItem("_USER", user + "");  
}
LocalData.prototype.getUser=function(){
    return localStorage.getItem("_USER");
}
LocalData.prototype.removeUser=function(){
	localStorage.removeItem("_USER");
	localStorage.removeItem("_USERID");
	localStorage.removeItem("_USERAUTH");
}
var localData=new LocalData();
function slideShow(wrap_id,bullets_id){
	var bullets=document.getElementById(bullets_id).getElementsByTagName('li');
	var wrap=document.getElementById(wrap_id);
	window.mySwipe=Swipe(wrap,{
		auto:3000,
		continuous:true,
		startSlide:0,
		stopPropagation:true,
		disableScroll:false,
		callback:function(pos){
			var i=bullets.length;
			while(i--){
				bullets[i].className=' ';
			}
			bullets[pos].className='on';
		}
	});
}
function popup3(){
	$.afui.popup({
		id:"share",
		title:"百度分享",
		message:$("#sharepanel").html(),
		cancelText:"关闭",
		cancelCallback: function(){},
		doneText:"提交",
		doneCallback:function(){},
		cancelOnly:false,
		onShow:function(){
			$("#share").not("footer").find("a").each(function(){
				$(this).on("tap",function(){
					var cname=$(this).attr("class");
					$("#sharepanel").find('.'+cname).trigger("click");
					$("#cancel").trigger("tap");
				})				
			})
		}
	});
}
function baiduShare(){
	window._bd_share_config={
		"common":{
			"bdSnsKey":{},
			"bdText":"",
			"bdUrl":'',
			"bdMini":"2",
			"bdMiniList":false,
			"bdPic":"",
			"bdStyle":"0",
			"bdSize":"32",
			"bdSign":'normal'
		},
		"share":{}
	};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}
function shuaxin(divid){
	$("#"+divid).attr("src",'../../valid.php?rand='+Math.random()*5);
}
function popup1(){	
	var ppid=$("#ppid").val();
	var all;
	var li='';
	$.ajax({
		type:"GET",
		url:"json/pages/product_0.php",
		error:function(err){
			$.afui.toast({
				message:"订购数据加载失败",
				position:"tc",
				delay:2000,
				type:"error"
			});
		},
		success:function(msg){
			all=$.parseJSON(msg);
			for(var i=0;i<all.length;i++){
				if(ppid==all[i].id)
				li+="<option value='"+all[i].id+"' selected='selected'>"+all[i].title+"</option>";
				else
				li+="<option value='"+all[i].id+"'>"+all[i].title+"</option>";
			}			
			var cc=$.afui.popup({
				title: "订购信息",
				message: "<form class='m-form'><div class='m-son clear-fix'><label for='m-tl'>课程</label><select placeholder='' id='m-pid' class='m-tl' name='pid'>"+li+"</select></div><div class='m-son clear-fix'><label for='m-tl'><span class='red'>*</span>手机</label><input type='text' name='tel' placeholder='您的手机号码' id='m-tl' class='m-tl'/></div><div class='m-son clear-fix'><label for='m-tl'>称呼</label><input type='text' placeholder='您的称呼' id='m-name' class='m-tl'/></div><div class='m-son clear-fix'><label for='m-con'>备注</label><textarea id='m-con' placeholder='您的备注信息' class='m-con'/></textarea></div><div class='m-son clear-fix'><label for='m-yzm'>验证码</label><input type='text' name='yzm' placeholder='' id='m-yzm' class='m-yzm'/><span class='m_yzm-pic'><img id='msg_verify' src='../../valid.php' alt='看不清？点击一下！' title='看不清？点击一下！' style='cursor:pointer;' onclick='shuaxin(\"msg_verify\");' /></span></div></form>",
				cancelText: "关闭",
				cancelCallback:function(){},
				doneText: "确认提交",
				doneCallback:function(){
							var str=$("select[name='pid']").val();
							var tel=$("input[name='tel']").val();
							var yzm=$("input[name='yzm']").val();
							if(str=="" || str==undefined){
								$.afui.toast({
									message:"请选择课程",
									position:"tc",
									delay:2000,
									type:"warning"
								});
								return false;
							}else if (!/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18)\d{9}$/.test(tel)){
								$.afui.toast({
									message:"手机号码格式错误",
									position:"tc",
									delay:2000,
									type:"error"
								});
								$("#m-tl").focus();
								return false;
							}else if(yzm==''){
								$.afui.toast({
									message:"验证码不能为空",
									position:"tc",
									delay:2000,
									type:"warning"
								});
							  $("#m-yzm").focus();
							  return false;
							}else{
								var data;
								data += "&act=msg&pid="+str+"&name="+$("#m-name").val()+"&tel="+tel+"&yzm="+yzm+"&content="+$("#m-con").val();
								var ret = getAjaxData("../ajax/msg.php?r="+Math.random(),data);
								if(ret == 'yzmErr' ){
									$.afui.toast({
										message:"验证码错误",
										position:"tc",
										delay:2000,
										type:"error"
									});
									$("#msg_verify").attr("src",'../../valid.php?rand='+Math.random()*5);
									return false;
								}else if(ret == 'ok'){
									$.afui.toast({
										message:"订购成功",
										position:"tc",
										delay:2000,
										type:"success"
									});
									cc.hide();
									return true;
								}else if(ret == 'defeat'){
									$.afui.toast({
										message:"订购失败",
										position:"tc",
										delay:2000,
										type:"error"
									});
									return false;
								}else{
									$.afui.toast({
										message:ret,
										position:"tc",
										delay:2000,
										type:"error"
									});
									return false;
								}
							}
						},
				cancelOnly:false,
				autoCloseDone:false
			});
		}
	})
}
function getAjaxData(url,data){
	var ret = '';
	$.ajax({
		type:"POST", 
		url:url,
		data:data, 
		dataType:"html",
		async:false,
		error:function(err){
			$.afui.toast({
				message:"加载错误",
				position:"tc",
				delay:2000,
				type:"error"
			});
		},
		success:function(msg){		
			if (msg){
				ret = msg;
			}else{
				ret = 0;
			}
	}});
	return ret;
}
function searchpage(){
	localData.removeItem("keys");
	var keys=$("#keys").val();
	if (!keys||keys=="请输入搜索关键字..."){
		$.afui.toast({
			message:"请输入搜索关键字...",
			position:"tc",
			delay:2000,
			type:"warning"
		});
		$("#keys").focus();
		return false;
	}else{
		localData.putString("keys",keys);
		return true;
	}
}
function getApp(obj){
	var u = '';
	var d = '';
	var a = location.href;
	var b = a.toLowerCase();
	var bIsPhp = b.match(/.php/i) == ".php";  
	if(bIsPhp){ 
		u = "ajax/down.php?r=" + Math.random();
	}else{
		u = "../ajax/down.php?r=" + Math.random();
	}
	d = "did="+obj;
	$.ajax({
		type:"POST",
		url:u,
		data:d, 
		dataType:"text",
		async:false,
		error:function(err){
			$.afui.toast({
				message:err,
				position:"tc",
				delay:2000,
				type:"error"
			});
		},
		success:function (msg){
			if(msg=="ok"){
				return true;
			}else if (msg=="defeat"){
				$.afui.toast({
					message:'下载失败，请点击有效的下载链接',
					position:"tc",
					delay:2000,
					type:"error"
				});
				return false;
			} 
		}
	});
}
//app function
function popup2(){
	if (/android/i.test(navigator.userAgent)){
		var str="<div class='down-wrap'><div class='down-son'><a href='../app/m2.apk' data-ignore='true' onclick='getApp(1);'><span class='iconfont fr'>&#xe60a;</span>下载安卓版客户端</a></div></div>";
	}else{
		var str="<div class='down-wrap'><div class='down-son'><a href='#' data-ignore='true' onclick='downweb();getApp(2);'><span class='iconfont fr'>&#xe60a;</span>下载iOS客户端</a></div></div>";
	}
	$.afui.popup({
		id:"download",
		title:"下载APP",
		message:str,
		cancelText:"关闭",
		cancelCallback: function(){},
		doneText:"提交",
		doneCallback:function(){},
		cancelOnly:false
	});
}
function downweb(){
	//下载后台管理  http://024f76.pg024.com:8888/3g/apk/down.myapp.com/home.ipa
   openurl('itms-services://?action=download-manifest&url=https://app.pangu.us/sy/jg/ceshi.plist');
}
function downHome(){
	//下载后台管理  http://024f76.pg024.com:8888/3g/apk/down.myapp.com/home.ipa
   openurl('itms-services://?action=download-manifest&url=https://app.pangu.us/sy/jg/ceshihome1.plist');
}
function openurl(url){
	window.self.location=url;
}
function visitCount(){
	if(sessionStorage['_PAGECOUNT']){
		sessionStorage['_PAGECOUNT'] = Number(sessionStorage['_PAGECOUNT'])+1;
		console.log('加载：'+sessionStorage['_PAGECOUNT']+'次');
	}else{
		$.ajax({
			type:"get",
			url:"../ajax/statistics.php?r="+Math.random(),
			error:function(err){console.log('离线状态');},
			success:function(suc){console.log(suc);}
		});
		sessionStorage['_PAGECOUNT'] = 1;
	}
}
function goToTop(){
	$(".cbtn-top").hide();
	document.getElementsByClassName("panel")[0].onscroll=function(){
		if(this.scrollTop > window.innerHeight/10){
			$(".cbtn-top").show();
		}else{
			$(".cbtn-top").hide();
		}
	}
	$(".cbtn-top").tap(function(){
		$(".panel").scrollTop(0);
		try{
			if(myScroll){
				myScroll.scrollTo(0, 0);
				setTimeout(function(){
					$(".cbtn-top").hide();			
				},1000);
			}
		}catch(e){};
	})
}
$.afui.ready(function(){
	$.afui.setBackButtonVisibility(false);
	$(".cla-sub").on("tap",function(){
		var a=$(this).parent().next();
		a.toggle();
		if(a.is(":visible")){
			$(this).addClass("reverse").parent().addClass("on");
		}else{
			$(this).removeClass("reverse").parent().removeClass("on");
		}	
	})	
	visitCount();
//	$(".one-order").on("tap",function(){
//		popup1();
//	})
	$(".btn-order").on("tap",function(){
		popup1();
	})
	$(".one-share").on("tap",function(){
		popup3();
	})
	var baiduM={
		flag:true,
		map:function(){
			if(this.flag){
				var x=$("input[name='map_x']").val();
				var y=$("input[name='map_y']").val();
				var r=$("input[name='map_r']").val();
				var wx=parseInt($("input[name='map_width']").val()?$("input[name='map_width']").val():240);
				var hx=parseInt($("input[name='map_height']").val()?$("input[name='map_height']").val():32);
				var sheight=$("#afui").height();
				var map=new BMap.Map("allmap");
				var point=new BMap.Point(x, y);
				var opts={width:wx,height:hx};
				var marker=new BMap.Marker(point);
				var infoWindow=new BMap.InfoWindow(r,opts);	
				map.centerAndZoom(point,15);
				map.addControl(new BMap.ScaleControl());
				map.addControl(new BMap.ZoomControl());
				map.openInfoWindow(infoWindow, marker.getPosition());
			}
		}
	}
	$("#mappanel").on("panelload",function(){
		baiduM.map();
	})
	//baiduShare();
	goToTop();
	try{
		baiduM.map();
		baiduShare();
	}catch(e){
		$.afui.toast({
			message:"",
			position:"bc",
			delay:3000,
			type:"error"
		});
	}

	$(".cdtl-txt").find("img").css("height","auto");
	//alert("aa");
});