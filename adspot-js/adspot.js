
(function() {
	var wbCode = window['__asspot_wb_code'];
	var imgHost = "http://js.adspot.com/";
	
	var startAdspot =  function($){	
		
		//显示图片锚点和编辑点。
		var showAdSpot =  function(img){
			var p = img.parent();
			p.find(".adSpotLogoTag").show();
			p.find(".adSpotProductDot").show();
			p.find(".editSpotDiv").show();
		}
		
		//隐藏图片锚点和编辑点
		var hideAdSpot = function(img){
			var p = img.parent();
			p.find(".adSpotLogoTag").hide();
			p.find(".adSpotProductDot").hide();
			p.find(".editSpotDiv").hide();
		}
		
		//获取该图的锚点
		var getProductDots = function(img){
			return {dots:[{left:20,top:30},{left:10,top:80},{left:90,top:100}]};
		}
		
		var addDotImgHtml = function(left, top, show){
			var display = (show) ? "display:inline;" : "display:none;";
			return "<img class='adSpotProductDot' style='" + display + "z-index:1699;position:absolute;margin:0px;padding:0px;left:" + left + "px;top:" + top + "px;' src='" + imgHost + "res/icon_shop.png'>";
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
		
		var bindCreateAdspotEvent = function(img){
			img.click(function(e){
				var left = e.pageX - img.offset().left - 12;//e.originalEvent.x - img.offset().left || e.originalEvent.layerX - img.offset().left || 0;//获取当前鼠标相对img的x坐标
			    var top  = e.pageY - img.offset().top - 12;//e.originalEvent.y - img.offset().top  || e.originalEvent.layerY - img.offset().top  || 0;//获取当前鼠标相对img的y坐标
			    
			    var dotImg = addDotImgHtml(left, top, true);
			    
			    img.after(dotImg);
			});
			
			img.css('cursor','crosshair');
			console.log('bind');
		}
		
		var unbindCreateAdspotEvent = function(img){
			img.css('cursor','default');
			img.unbind('click');
			console.log('unbind.');
		}

		
		/**
		 * 绑定左上角的编辑按钮事件。
		 */
		var bindEditSpotDivClick = function(img){
			img.parent().find(".editSpotDiv").click(function(e){
				var _self = $(this);
				var name = _self.attr("name");
				
				console.log('click.');
				console.log('name:' + name);
				
				if(name == 'un-eidt-sopt'){
					_self.attr("name",'eidting-spot');
					_self.find('span').text('打点');
					
					bindCreateAdspotEvent(img);
				}else{
					_self.attr("name",'un-eidt-sopt');
					_self.find('span').text('锚点');
					
					unbindCreateAdspotEvent(img);
				}
			});
		}
		
		
		//包装图片
		var wrapperImg = function(img){
			var width = img.width();
			var height = img.height();
			
			var divWrap = "<div class='adSpotImgWrap' style='width:" + width + "px;height:" + height + "px;position: relative; margin:0px;float: none; padding:0px;display:inline-block;'></div>";
		    var logoTagImg = "<img class='adSpotLogoTag' style='display:none;z-index:1700;position:absolute;margin:0px;padding:0px;top:5px;right:5px;' src='" + imgHost +"res/logo_tag.png'>";
		    var editSpotDiv = "<div class='editSpotDiv' name='un-eidt-sopt' style='cursor:pointer;display:none;z-index:1700;position:absolute;margin:0px;padding:0px;top:5px;left:5px;width:63px;height:26px;text-align:center;backgroud-repeat:no-repeat;background-position:center;background-image:url(" + imgHost + "res/btn_tag.png)'><span style='line-width:63px;line-height:26px;color:#FFFFFF;'>锚点</span></div>";
		    
			img.wrap(divWrap);
			wrapperProductDots(img);
			
			img.after(logoTagImg);
			img.after(editSpotDiv);
			
			bindEditSpotDivClick(img);
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
