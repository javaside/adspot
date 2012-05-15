
(function() {
	var wbCode = window['__adspot_wb_code'];
	var resHost = window['__adspot_res_host'];
	
	/**
	 * 获取字母数字随机数。
	 */
	var genRandomStr = function(l)  {
		  var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
		  var  tmp = "";
		  for(var  i=0;i<  l;i++)  {
			  tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		  }
		  return  tmp;
	}
	
	var startAdspot =  function($){	
		
		/**
		 * 构建增加spot表单DIV
		 */
		var getAddEditSpotFormDiv = function(){
			var spotForm = '<div class="adspot_layer_info">' +
						   '<div class="adspot_layer_inner">' +
						   '<div class="adspot_tab"><a class="adspot_tab1 adspot_tab_selected"><i></i>商品锚点</a><a class="adspot_tab2"><i class="adspot_i2"></i>链接锚点</a></div>' + 
						   '<div class="adspot_tab_con tab_con_product">' +
						   '<label>请输入你要链接的商品关键字</label>' +
						   '<input type="text" placeholder="比如：婚纱、地毯等"><a class="adspot_search_btn"></a></div>' +
						   '<div class="adspot_tab_con tab_con_link" style="display:none;">' +
						   '<label>链接地址：</label>' +
						   '<input type="text" placeholder="请输入链接地址">' +
						   '<label>特色图片：</label>' +
						   '<input type="text" placeholder="输入图片的URL">' +
						   '<label>一句话描述：</label>' +
						   '<textarea placeholder="请输入描述" type="text"></textarea></div>' +
						   '</div>' +
						   '<div style="display: block; opacity: 1;" class="adspot_search_box">' +
						   '<div style="display: none;" class="adspot_search_noresult"><p>你要寻找的商品不存在，请试试其他关键字 </p>' +
						   '或者 <a href="#" class="adspot_edit_btn adspot_add_btn"><i></i> 添加商品</a></div>' +
						   '<div style="display: none;" class="adspot_search_loader">' +
						   '<img src="res/spinner-white.gif" alt="ajax spinner" class="adspot_search_spinner">' +
						   '</div>' +
						   '<ul style="display: block;" class="adspot_search_items">' +
						   '<li class="adspot_search_item"><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_item"><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_item"><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_item"><img src="res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '</ul>' +
						   '</div>'	+
						   '<div class="adspot_tab_action"><a title="取消" class="adspot_edit_btn cancel">取 消</a><a title="确定" class="adspot_edit_btn adspot_green_btn submit">确 定</a></div>' +
						   '</div>';
			return spotForm;
			
		}
		
		/**
		 * 链接广告DIV
		 */
		var getLinkSpotDiv = function(spot){
			var div = '<div style="left:170px;top:40px" class="adspot_layer_info adspot_link" spot-div-id=' + spot.id +'>' +
					  '<div class="adspot_layer_inner1">' +
					  '<img class="adspot_link_pic" src="res/pro.jpg">' +
					  '<a class="adspot_link_info" href="#"><p>这个真心不错，很简洁的，就是盒子的颜色太淡了。用在婚礼上我觉得还不够喜庆，平时见了真是我的菜啊。淡淡地珠光很漂亮啊，在这个和另一款粉色薰衣草中犹豫好久的</p></a>' + 
					  '<div class="adspot_edit_area"><a title="编辑信息" class="adspot_edit_btn adspot_edit_"><i></i></a><a title="删除锚点" class="adspot_edit_btn adspot_edit_edit adspot_edit_delete"><i></i></a></div>' +
					  '</div>' +
					  '</div>';
			return div;
		}
		
		/**
		 * 产品类型广告DIV
		 */
		var getProductSpotDiv = function(spot){
			var div = '<div style="left:20px;top:230px" class="adspot_layer_info" spot-div-id=' + spot.id +'>' + 
					  '<div class="adspot_layer_inner1">' +
					  '<div class="adspot_layer_left"><img alt="产品图片" src="res/pro.jpg"></div>' +
					  '<div class="adspot_layer_right"><h1>珠光纸婚礼鸾凤和鸣喜糖盒</h1>' +
					  '<div class="adspot_layer_price"><label>购买价格：</label>￥35.2</div>' +
					  '<div class="adspot_layer_source"><label>信息来源：</label>淘宝网</div>' +
					  '<div class="adspot_layer_shop"><a href="#" class="adspot_edit_btn adspot_buy_btn adspot_green_btn"><i></i>购买</a></div>' +
					  '</div><div class="clear"></div>' + 
					  '<div class="adspot_edit_area"><a title="编辑信息" class="adspot_edit_btn adspot_edit_"><i></i></a><a title="删除锚点" class="adspot_edit_btn adspot_edit_edit adspot_edit_delete"><i></i></a></div>' +
					  '</div></div>';
			
			return div;
		}
		
		/**
		 * 确定DIV
		 */
		var confirmDiv = function(){
			var div = '<div class="adspot_layer_info confirm_div">' +
					  '<div class="adspot_layer_inner">' +
					  '<p style="text-align:center">你确定你要删除该锚点嘛？</p>' +
					  '</div><div class="adspot_tab_action"><a title="取消" class="adspot_edit_btn" href="#">取 消</a><a title="确定" class="adspot_edit_btn" href="#">确 定</a></div></div>';
			
			return div;
		}
		
		/**
		 * 悬浮广告DIV
		 */
		var getSpotDiv = function(spot){
			if(spot.type === "LINK"){
				return getLinkSpotDiv(spot);
			}else{
				return getProductSpotDiv(spot);
			}
		}
		
		
		//获取该图的锚点
		var getProductDots = function(img){
			return {dots:[{id:1,left:20,top:30,type:'LINK'},{id:2,left:10,top:80,type:'PDCT'},{id:3,left:90,top:100,type:'LINK'}]};
		}
		
		var addDotImgDiv = function(spot, show){
			var display = (show) ? "display:block;" : "display:none;";
			var clas = (spot.type === "LINK") ? "adspot_icon_link" : ((spot.type === "PDCT") ? "adspot_icon_product" : "adspot_icon_space");
			return "<div class='adspot_icon " + clas + "' style='" + display + "left:" + spot.left + "px;top:" + spot.top + "px;opacity:0.7;' adsopt-product-id='" + spot.id + "'></div>";
		}
		
		/**
		 * 绑定展示广告的删除按钮事件。
		 */
		var bindAdspotDeleteButtonClick = function(){
			
			$(".adspot_layer_info .adspot_edit_area .adspot_edit_delete").click(function(){
				var offset = $(this).parent().parent().parent().offset();
				
				var cdiv = $(".confirm_div");
				
				var top  = offset.top;
				top = (top + top/2);
				
				cdiv.css({left: offset.left, top: top});
				//cdiv.show();
			});
		}
		
		//包装图片的锚点
		var wrapperProductDots = function(img){
			var dotObjs = getProductDots(img);
			
			if(dotObjs.dots){
				$.each(dotObjs.dots, function(i, spot){
					var dotImg = addDotImgDiv(spot, false);
					img.after(dotImg);
					
					$(document.body).append(getSpotDiv(spot));
				});
			}
			
			bindAdspotDeleteButtonClick();
		}
		
		/**
		 * 绑定选择商品事件
		 */
		var bindSoptSelectedProductEvent = function(img){
			var wraDiv = img.parent();
			wraDiv.find(".adspot_layer_info .adspot_search_box .adspot_search_items li").click(function(){
				var _self = $(this);
				var isSelected = _self.hasClass("adspot_search_item_selected");
				
				if(isSelected){
					_self.removeClass("adspot_search_item_selected");
					_self.addClass("adspot_search_item");
				}else{
					var lis = _self.parent().find("li");
					lis.removeClass("adspot_search_item_selected");
					lis.addClass("adspot_search_item");
					
					_self.removeClass("adspot_search_item");
					_self.addClass("adspot_search_item_selected");
				}
			});
		}
		
		/**
		 *  重置商品选择CSS
		 */
		var restAdspotSearchItemClass = function(warDiv){
			var items = warDiv.find(".adspot_layer_info .adspot_search_box .adspot_search_items li");
			items.removeClass("adspot_search_item");
			items.removeClass("adspot_search_item_selected");
			items.addClass("adspot_search_item");
		}
		
		/**
		 * 绑定锚点新增、编辑DIV的取消和提交按钮事件
		 */
		var bindSoptEditDivButEvent = function(img){
			var warDiv = img.parent();
			
			warDiv.find(".adspot_tab_action .cancel").click(function(){
				var warDiv = $(this).parent().parent().parent();
				warDiv.find("div.adspot_layer_info").hide();
				warDiv.find(".adspot_icon_space").remove();
				bindCreateAdspotEvent(warDiv.find("img.adSpotImgWrap"));
				restAdspotSearchItemClass(warDiv);
			});
			
			warDiv.find(".adspot_tab_action .submit").click(function(){
				var warDiv = $(this).parent().parent().parent();
				var adTab = warDiv.find(".adspot_layer_info .adspot_layer_inner .adspot_tab .adspot_tab_selected");
				var adspotType = adTab.hasClass("adspot_tab2") ? "adspot_icon_link" : "adspot_icon_product";
				
				var pid = genRandomStr(7);
				var adType = adspotType === "adspot_icon_link" ? "LINK" : "PDCT";
				var spot = {id: pid, type: adType};
				
				var adDot = warDiv.find(".adspot_icon_space")
				adDot.attr("adsopt-product-id", pid);
				adDot.attr("class", "adspot_icon " + adspotType);
				
				$(document.body).append(getSpotDiv(spot));
				
				warDiv.find("div.adspot_layer_info").hide();

				bindCreateAdspotEvent(warDiv.find("img.adSpotImgWrap"));
				//bindSpotHoverEvent(warDiv.find("img.adSpotImgWrap"));
				restAdspotSearchItemClass(warDiv);
			});
		}
		
		/**
		 * 绑定左上角处于编辑状态时的事件。 
		 */
		var bindCreateAdspotEvent = function(img){
			img.click(function(e){
				var left = e.pageX - img.offset().left -12;
			    var top  = e.pageY - img.offset().top -12;
			    
			    var spot = {};
			    spot.left = left;
			    spot.top = top;
			    spot.type = "SPACE";
			    
			    var dotImg = addDotImgDiv(spot, true);
			    img.after(dotImg);
			    
			    var addDiv = img.parent().find(".adspot_layer_info");
			    addDiv.css({left: (left + 25),top: (top +  12)});
			    
			    unbindCreateAdspotEvent(img);
				
			    addDiv.show();
			    
			    bindSoptEditDivButEvent(img);
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
		 * 绑定打点时product,link类型切换
		 */
		var bindAddSpotDivTabClick = function(img){
			var wraDiv = img.parent();
			
			wraDiv.find("div.adspot_layer_info .adspot_layer_inner .adspot_tab .adspot_tab1").click(function(){
				var layerInfoDiv = $(this).parent().parent().parent();
				
				layerInfoDiv.find(".adspot_layer_inner .adspot_tab2").removeClass("adspot_tab_selected");
				layerInfoDiv.find(".adspot_layer_inner .tab_con_link").hide();
				
				$(this).addClass("adspot_tab_selected");
				layerInfoDiv.find(".adspot_layer_inner .tab_con_product").show();
				layerInfoDiv.find(".adspot_search_box").show();
			});
			
			wraDiv.find("div.adspot_layer_info .adspot_layer_inner .adspot_tab .adspot_tab2").click(function(){
				var layerInfoDiv = $(this).parent().parent().parent();
				
				layerInfoDiv.find(".adspot_layer_inner .adspot_tab1").removeClass("adspot_tab_selected");
				layerInfoDiv.find(".adspot_layer_inner .tab_con_product").hide();
				layerInfoDiv.find(".adspot_search_box").hide();
				
				$(this).addClass("adspot_tab_selected");
				layerInfoDiv.find(".adspot_layer_inner .tab_con_link").show();
			});
		}
		
		/**
		 * 绑定展示广告事件
		 */
		var bindShowSpotEvent = function(pId){
			pId.hover(
					function(){
						//show-flag = 1表示，该DIV真正显示
						pId.attr("show-flag", "1");
					},
					function(){
						//show-flag = 0表示，该DIV已隐藏
						pId.attr("show-flag","0");
						pId.fadeOut(200);
					}
			);
		}
		
		/**
		 * 取消绑定锚点悬浮
		 */
		var unbindSpotHoverEvent = function(img){
			var wraDiv = img.parent();
			wraDiv.find("div.adspot_icon").unbind("hover");
		}
		/**
		 * 绑定锚点悬浮事件
		 */
		var bindSpotHoverEvent = function(img){
			var wraDiv = img.parent();
			wraDiv.find("div.adspot_icon").hover(
					function(){
						$(this).css("opacity", "1");
						
						var offset = $(this).offset();
						var id = $(this).attr("adsopt-product-id");
						var pIdDiv = $("div[spot-div-id=" + id + "]");
						
						bindShowSpotEvent(pIdDiv);
						
						pIdDiv.css({left:offset.left + 20, top:offset.top + 20}).fadeIn(600);		
					}
					,
					function(){
						$(this).css("opacity", "0.7");
						
						var id = $(this).attr("adsopt-product-id");
						var pIdDiv = $("div[spot-div-id=" + id + "]");
						
						setTimeout(function(){
							var pIdDiv = $("div[spot-div-id=" + id + "]");

							if(pIdDiv.attr("show-flag") !== "1"){
								pIdDiv.attr("show-flag","0");
								pIdDiv.fadeOut(200);
							}
						},200);
					}
				);
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
					bindSpotHoverEvent(img);
				}else{
					_self.addClass("adspot_btn_add_clicked")
					bindCreateAdspotEvent(img);
					unbindSpotHoverEvent(img);
				}
				
			});
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
			bindSpotHoverEvent(img);
			bindAddSpotDivTabClick(img);
			bindSoptSelectedProductEvent(img);
			//
			$(document.body).append(confirmDiv());
		}
		
		//显示图片锚点和编辑点。
		var showAdSpot =  function(img){
			var p = img.parent();
			p.find(".adspot_btn_logo").show();
			p.find(".adspot_icon").show();
			p.find(".adspot_btn_add_dot").show();
		}
		
		//隐藏图片锚点和编辑点
		var hideAdSpot = function(img){
			var p = img.parent();
			p.find(".adspot_btn_logo").hide();
			p.find(".adspot_icon").hide();
			p.find(".adspot_btn_add_dot").hide();
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
