
(function() {
	var wbCode = window['__adspot_wb_code'];
	var resHost = "http://js.adspot.com/";
	
	var startAdspot =  function($){	
		
		/**
		 * 构建增加spot表单DIV
		 */
		var getAddEditSpotFormDiv = function(){
			var spotForm = '<div class="adspot_layer_info">' +
						   '<div class="adspot_layer_inner">' +
						   '<div class="adspot_tab"><a class="adspot_tab1 adspot_tab_selected" href="#"><i></i>商品锚点</a><a class="adspot_tab2" href="#"><i class="adspot_i2"></i>链接锚点</a></div>' + 
						   '<div class="adspot_tab_con">' +
						   '<label>请输入你要链接的商品关键字</label>' +
						   '<input type="text" placeholder="比如：婚纱、地毯等"></div></div>' +
						   '<div style="display: block; opacity: 1;" class="adspot_search_box">' +
						   '<div style="display: none;" class="adspot_search_noresult"><p>你要寻找的商品不存在，请试试其他关键字 </p>' +
						   '或者 <a href="#" class="adspot_edit_btn adspot_add_btn"><i></i> 添加商品</a></div>' +
						   '<div style="display: none;" class="adspot_search_loader">' +
						   '<img src="res/spinner-white.gif" alt="ajax spinner" class="adspot_search_spinner">' +
						   '</div>' +
						   '<ul style="display: block;" class="adspot_search_items">' +
						   '<li><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_addproduct"><p>找不到你需要的商品?</p> <a href="#" class="adspot_edit_btn adspot_add_btn"><i></i> 添加商品</a></li>' +
						   '</ul>' +
						   '</div>'	+
						   '<div class="adspot_tab_action"><a title="取消" class="adspot_edit_btn cancel">取 消</a><a title="确定" class="adspot_edit_btn submit">确 定</a></div>' +
						   '</div>';
			return spotForm;
			
		}
		
		/**
		 * 链接广告DIV
		 */
		var getLinkSpotDiv = function(){
			var div = '<div style="left:170px;top:40px" class="adspot_layer_info adspot_link">' +
					  '<div class="adspot_layer_inner1">' +
					  '<img class="adspot_link_pic" src="pro.jpg">' +
					  '<a class="adspot_link_info" href="#"><p>这个真心不错，很简洁的，就是盒子的颜色太淡了。用在婚礼上我觉得还不够喜庆，平时见了真是我的菜啊。淡淡地珠光很漂亮啊，在这个和另一款粉色薰衣草中犹豫好久的</p></a></div>' +
					  '</div>';
			return div;
		}
		
		//显示图片锚点和编辑点。
		var showAdSpot =  function(img){
			var p = img.parent();
			p.find(".adspot_btn_logo").show();
			p.find(".adspot_icon_link").show();
			p.find(".adspot_btn_add_dot").show();
		}
		
		//隐藏图片锚点和编辑点
		var hideAdSpot = function(img){
			var p = img.parent();
			p.find(".adspot_btn_logo").hide();
			p.find(".adspot_icon_link").hide();
			p.find(".adspot_btn_add_dot").hide();
		}
		
		//获取该图的锚点
		var getProductDots = function(img){
			return {dots:[{left:20,top:30},{left:10,top:80},{left:90,top:100}]};
		}
		
		var addDotImgDiv = function(left, top, clas, show){
			var display = (show) ? "display:block;" : "display:none;";
			return "<div class='" + clas + "' style='" + display + "left:" + left + "px;top:" + top + "px;opacity:0.7;'></div>";
		}
		
		//包装图片的锚点
		var wrapperProductDots = function(img){
			var dotObjs = getProductDots(img);
			
			if(dotObjs.dots){
				$.each(dotObjs.dots, function(i, addot){
					var left = addot.left;
					var top = addot.top;
					var dotImg = addDotImgDiv(left, top, "adspot_icon_link", false);
					img.after(dotImg);
				});
			}
		}
		
		/**
		 * 绑定sopt编辑DIV的取消和提交按钮事件
		 */
		var bindSoptDivButEvent = function(img){
			var warDiv = img.parent();
			
			warDiv.find(".adspot_tab_action .cancel").click(function(){
				var warDiv = $(this).parent().parent().parent();
				warDiv.find("div.adspot_layer_info").hide();
				warDiv.find(".adspot_icon_space").remove();
				bindCreateAdspotEvent(warDiv.find("img.adSpotImgWrap"));
			});
			
			warDiv.find(".adspot_tab_action .submit").click(function(){
				var warDiv = $(this).parent().parent().parent();
				warDiv.find(".adspot_icon_space").attr("class", "adspot_icon_link");
				warDiv.find("div.adspot_layer_info").hide();
				bindCreateAdspotEvent(warDiv.find("img.adSpotImgWrap"));
				bindSoptHoverEvent(warDiv.find("img.adSpotImgWrap"));
			});
		}
		
		/**
		 * 绑定左上角处于编辑状态时的事件。 
		 */
		var bindCreateAdspotEvent = function(img){
			img.click(function(e){
				var left = e.pageX - img.offset().left -12;//e.originalEvent.x - img.offset().left || e.originalEvent.layerX - img.offset().left || 0;//获取当前鼠标相对img的x坐标
			    var top  = e.pageY - img.offset().top -12;//e.originalEvent.y - img.offset().top  || e.originalEvent.layerY - img.offset().top  || 0;//获取当前鼠标相对img的y坐标
			    
			    var dotImg = addDotImgDiv(left, top, "adspot_icon_space", true);
			    img.after(dotImg);
			    
			    var addDiv = img.parent().find(".adspot_layer_info");
			    addDiv.css("left", (left + 25) + "px");
			    addDiv.css("top", (top + 12) + "px");
			    
			    unbindCreateAdspotEvent(img);
				
			    addDiv.show();
			    
			    bindSoptDivButEvent(img);
			});
			
			img.css('cursor','crosshair');
		}
		
		/**
		 * 取消spot编辑状态
		 */
		var unbindCreateAdspotEvent = function(img){
			img.css('cursor','default');
			img.unbind('click');
			img.parent().find(".adspot_layer_info").hide();
		}

		
		/**
		 * 绑定左上角的编辑按钮事件。
		 */
		var bindAddSpotDivClick = function(img){
			img.parent().find(".adspot_btn_add_dot").click(function(e){
				var _self = $(this);
				
				if(_self.hasClass("adspot_btn_add_clicked")){
					_self.removeClass("adspot_btn_add_clicked");
					unbindCreateAdspotEvent(img);
				}else{
					_self.addClass("adspot_btn_add_clicked")
					bindCreateAdspotEvent(img);
				}
				
			});
		}
		
		/**
		 * 绑定锚点悬浮事件
		 */
		var bindSoptHoverEvent = function(img){
			var wraDiv = img.parent();
			wraDiv.find("div.adspot_icon_link").hover(
					function(){
						$(this).css("opacity", "1");
					}
					,
					function(){
						$(this).css("opacity", "0.7");
					}
				);
		}
		
		
		//包装图片
		var wrapperImg = function(img){
			var width = img.width();
			var height = img.height();
			
			var divWrap = "<div class='adspot_wrapper' style='width:" + width + "px;height:" + height + "px;'></div>";
		    var logoDiv = "<div class='adspot_btn_logo'><a href='http://www.adspot.cn' target='_blank'>访问Adpot</a> </div>";
		    var addDotSpotDiv = "<div class='adspot_btn_add_dot'><a>添加锚点</a></div>";
		    var addEditSpotFormDiv = getAddEditSpotFormDiv();
		    
		    img.addClass("adSpotImgWrap");
			img.wrap(divWrap);
			wrapperProductDots(img);
			
			img.after(logoDiv);
			img.after(addDotSpotDiv);
			img.after(addEditSpotFormDiv);
			
			bindAddSpotDivClick(img);
			bindSoptHoverEvent(img);
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
				if(width >= 200 && width <= 800 && height >= 200 && height <= 800){
					
					initImg(_self);
				}
			});
		})();
	};
	
	(function() {
		if(!wbCode || wbCode.length != 8){return;};
		
		var cssLink, jqueryScript, clearFn;
		
		//添加css
		cssLink = document.createElement("link");
		cssLink.rel = "stylesheet";
		cssLink.type = "text/css";
		cssLink.href = resHost + "adspot.css";
		cssLink.media = "all";
		
		document.documentElement.getElementsByTagName("HEAD")[0].appendChild(cssLink);
		
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
