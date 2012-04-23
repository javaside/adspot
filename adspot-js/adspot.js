
(function() {
	var wbCode = window['__asspot_wb_code'];
	var imgHost = "http://js.adspot.com/";
	
	var startAdspot =  function($){	
		
		//显示图片锚点和编辑点。
		var showAdSpot =  function(img){
			var p = img.parent();
			p.find(".adSpotBeaconImg").show();
			p.find(".adSpotProductDot").show();
		}
		
		//隐藏图片锚点和编辑点
		var hideAdSpot = function(img){
			var p = img.parent();
			p.find(".adSpotBeaconImg").hide();
			p.find(".adSpotProductDot").hide();
		}
		
		//获取该图的锚点
		var getProductDots = function(img){
			return {dots:[{left:20,top:30},{left:10,top:80},{left:90,top:100}]};
		}
		
		var addDotImgHtml = function(left, top, show){
			var display = (show) ? "display:inline;" : "display:none;";
			return "<img class='adSpotProductDot' style='" + display + "z-index:1699;position:absolute;margin:0px;padding:0px;left:" + left + "px;top:" + top + "px;' src='" + imgHost + "res/product.png'>";
		}
		
		//包装图片的锚点
		var wrapperProductDots = function(img){
			var dotObjs = getProductDots(img);
			
			if(dotObjs.dots){
				$.each(dotObjs.dots, function(i, addot){
					var left = addot.left;
					var top = addot.top;
					var dotImg = addDotImgHtml(left, top, false);
					img.after(dotImg);
				});
			}
		}
		
		//包装图片
		var wrapperImg = function(img){
			var width = img.width();
			var height = img.height();
			
			var divWrap = "<div class='adSpotImgWrap' style='width:" + width + "px;height:" + height + "px;position: relative; margin:0px;float: none; padding:0px'></div>";
		    var beaconImg = "<img class='adSpotBeaconImg' style='display:none;z-index:1700;position:absolute;margin:0px;padding:0px;top:5px;right:5px;' src='" + imgHost +"res/metadata-beacon.png'>";
		    
			img.wrap(divWrap);
			wrapperProductDots(img);
			img.after(beaconImg);
		}
	
		var addCreateAdspotEvent = function(img){
			img.click(function(e){
				var left = e.pageX - img.offset().left -12;//e.originalEvent.x - img.offset().left || e.originalEvent.layerX - img.offset().left || 0;//获取当前鼠标相对img的x坐标
			    var top  = e.pageY - img.offset().top -12;//e.originalEvent.y - img.offset().top  || e.originalEvent.layerY - img.offset().top  || 0;//获取当前鼠标相对img的y坐标
			    
			    var dotImg = addDotImgHtml(left, top, true);
			    
			    img.after(dotImg);
			});
		}
		
		//初始化图的锚点
		var initImg = function(img){
			wrapperImg(img);
			
			img.parent().hover(
					function(){
						showAdSpot(img);
					},
					
					function(){
						hideAdSpot(img);
					}
			);
			
			addCreateAdspotEvent(img);
		};
		
		//查找所有图片(img),过滤不符合尺寸的图片
		(function(){
			$("img").each(function(i){
				var _self = $(this);
				var width = _self.width();
				var height = _self.height();
				
				if(width >= 100 && width <= 800 && height >= 50 && height <= 800){
					initImg(_self);
				}
			});
		})();
	};
	
	(function() {
		if(!wbCode || wbCode.length != 8){return;};
		
		var jqueryScript, clearFn;
		if(typeof jQuery !== "undefined" && jQuery.fn.jquery === "1.7.1"){
			startAdspot(jQuery);
		}else{
			jqueryScript = document.createElement("script");
			jqueryScript.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
			document.documentElement.getElementsByTagName("HEAD")[0].appendChild(jqueryScript);
			clearFn = setInterval(
				function() {
					if(typeof jQuery !== "undefined" && jQuery.fn.jquery === "1.7.1"){
						clearInterval(clearFn);
						startAdspot(jQuery);
					}
				}, 25);
		}
	})();
})();
