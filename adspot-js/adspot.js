
(function() {
	var dataHost = "http://www.adspot.com/";
	var wbCode = window['__adspot_wb_code'];
	var resHost = window['__adspot_res_host'];
	
	var adspotData = {};
	
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
	
	/**
	 * 把相对路径转换成URL绝对路径
	 */
	var getAbsolutUrl = function(src){
		if(/^((https?):\/\/)/i.test(src)){
			return src;
		}
		
		if(src.indexOf("/") == 0){
			return location.protocol + "//" + location.host + src;
		}
		
		var dt = location.href.split("?")[0].split("/");
		dt.length--;
		while(src.indexOf("../") == 0){
			src = src.slice(3);
		    dt.length--;
		}
		
		return (dt.join("/") + "/" + src);
	}
	
	var startAdspot =  function($){	
		
		/**
		 * 构建增加spot表单DIV
		 */
		var getAddEditSpotFormDiv = function(){
			var spotForm = '<div class="adspot_layer_info add-edit-adspot">' +
						   '<div class="adspot_layer_inner">' +
						   '<div class="adspot_tab"><a class="adspot_tab1 adspot_tab_selected"><i></i>商品锚点</a><a class="adspot_tab2"><i class="adspot_i2"></i>链接锚点</a></div>' + 
						   '<div class="adspot_tab_con tab_con_product">' +
						   '<label>请输入你要链接的商品关键字</label>' +
						   '<input type="text" placeholder="比如：婚纱、地毯等"><a class="adspot_search_btn"></a></div>' +
						   '<div class="adspot_tab_con tab_con_link" style="display:none;">' +
						   '<label>链接地址：</label>' +
						   '<input type="text" class="link_addr" placeholder="请输入链接地址">' +
						   '<label>特色图片：</label>' +
						   '<input type="text" class="link_thumb" placeholder="输入图片的URL">' +
						   '<label>一句话描述：</label>' +
						   '<textarea class="link_desc" placeholder="请输入描述" type="text"></textarea></div>' +
						   '</div>' +
						   '<div style="display: block; opacity: 1;" class="adspot_search_box">' +
						   '<div style="display: none;" class="adspot_search_noresult"><p>你要寻找的商品不存在，请试试其他关键字 </p>' +
						   '或者 <a href="#" class="adspot_edit_btn adspot_add_btn"><i></i> 添加商品</a></div>' +
						   '<div style="display: none;" class="adspot_search_loader">' +
						   '<img src="' + resHost + 'res/spinner-white.gif" alt="ajax spinner" class="adspot_search_spinner">' +
						   '</div>' +
						   '<ul style="display: block;" class="adspot_search_items">' +
						   '<li class="adspot_search_item"><img src="' + resHost + 'res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_item"><img src="' + resHost + 'res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_item"><img src="' + resHost + 'res/pro.jpg" class="adspot_search_image">' +
						   '<div class="adspot_search_info"><h2>珠光纸婚礼鸾凤</h2><p>￥35.2</p><p>淘宝网</p></div></li>' +
						   '<li class="adspot_search_item"><img src="' + resHost + 'res/pro.jpg" class="adspot_search_image">' +
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
			var div = '<div style="left:170px;top:40px" class="adspot_layer_info adspot_info_detail" spot-div-id=' + spot.id +'>' +
					  '<div class="adspot_layer_inner1">' +
					  '<img class="adspot_link_pic" src="' + resHost + 'res/pro.jpg">' +
					  '<a class="adspot_link_info" href="' + spot.link_addr + '"><p>' + spot.link_desc + '</p></a>' + 
					  '<div class="adspot_edit_area"><a title="编辑信息" class="adspot_edit_btn adspot_edit_button"><i></i></a><a title="删除锚点" class="adspot_edit_btn adspot_edit_edit adspot_edit_delete"><i></i></a></div>' +
					  '</div>' +
					  '</div>';
			return div;
		}
		
		/**
		 * 产品类型广告DIV
		 */
		var getProductSpotDiv = function(spot){
			var div = '<div style="left:20px;top:230px" class="adspot_layer_info adspot_info_detail" spot-div-id=' + spot.id +'>' + 
					  '<div class="adspot_layer_inner1">' +
					  '<div class="adspot_layer_left"><img alt="产品图片" src="' + resHost + 'res/pro.jpg"></div>' +
					  '<div class="adspot_layer_right"><h1>珠光纸婚礼鸾凤和鸣喜糖盒</h1>' +
					  '<div class="adspot_layer_price"><label>购买价格：</label>￥35.2</div>' +
					  '<div class="adspot_layer_source"><label>信息来源：</label>淘宝网</div>' +
					  '<div class="adspot_layer_shop"><a class="adspot_edit_btn adspot_buy_btn adspot_green_btn"><i></i> 购买</a></div>' +
					  '</div><div class="clear"></div>' + 
					  '<div class="adspot_edit_area"><a title="编辑信息" class="adspot_edit_btn adspot_edit_button"><i></i></a><a title="删除锚点" class="adspot_edit_btn adspot_edit_edit adspot_edit_delete"><i></i></a></div>' +
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
					  '</div><div class="adspot_tab_action"><a title="取消" class="adspot_edit_btn adspot_edit_btn_cancel">取 消</a><a title="确定" class="adspot_edit_btn adspot_edit_btn_submit">确 定</a></div></div>';
			
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
		 * 删除页面覆盖
		 */
		var removeOverlay = function(){
			$(document.body).css('overflow', 'auto')
			$("body div.adspot-overlay").remove();
		}
		
		/**
		 * 创建页面覆盖
		 */
		var createOverlay = function(){
		    var iTop = 0;
		    if($.browser.mozilla) {
		      iTop = $('html').scrollTop();
		    } else {
		      iTop = $(document.body).scrollTop();
		    } 

		  var overlay = $('<div></div>').addClass("adspot-overlay");

	      overlay
	        .css({
	          background: '#000000',
	          opacity: 0.5,
	          top: iTop,
	          left: 0,
	          width: '100%',
	          height: '100%',
	          position: 'absolute',
	          zIndex: 1998,
	          display: 'none',
	          overflow: 'hidden'
	        });

			$(document.body).append(overlay);
			$(document.body).css('overflow', 'hidden')
			$("body div.adspot-overlay").show();
		}
		
		/**
		 * 绑定confirm事件
		 */
		var bindConfirmDivEvent = function(confirmDiv){
			confirmDiv.find(".adspot_edit_btn_cancel").click(function(){
				var cfDiv = $(this).parent().parent();
				var spotId = cfDiv.attr("edit-adspot-id");
				var pIdDiv = $("div[spot-div-id=" + spotId + "]"); //商品的详细DIV
				
				cfDiv.hide();
				bindShowSpotEvent(pIdDiv);
				removeOverlay();
			});
			
			confirmDiv.find(".adspot_edit_btn_submit").click(function(){
				var cfDiv = $(this).parent().parent();
				var spotId = cfDiv.attr("edit-adspot-id");
				var pIdDiv = $("div[spot-div-id=" + spotId + "]"); //商品的详细DIV
				
				var adSpotIcon = cfDiv.parent().find(".adspot_icon[adsopt-product-id='" + spotId + "']")
				adSpotIcon.remove(); //删除对应的锚点
				
				cfDiv.hide();
				pIdDiv.hide();
				bindShowSpotEvent(pIdDiv);
				removeOverlay();
			});
		}
		
		/**
		 * 绑定展示广告的删除按钮事件。
		 */
		var bindAdspotDeleteButtonClick = function(){
			var delBtn = $(".adspot_layer_info .adspot_edit_area .adspot_edit_delete");
			delBtn.unbind("click");
			delBtn.click(function(evt){
				evt.preventDefault();
				 
				var adspotDetailDiv = $(this).parent().parent().parent();
				var spotId = adspotDetailDiv.attr("spot-div-id");
				
				//获取当前广告层是属于那个图片的
				var adSpotImgIndex = adspotDetailDiv.attr("adspot-img-index");
				var wraDiv = $(".adspot_wrapper[adspot-img-index='" + adSpotImgIndex + "']");
				
				var cdiv = wraDiv.find(".confirm_div");
				
				var adSpotIcon = wraDiv.find(".adspot_icon[adsopt-product-id='" + spotId + "']")
				
				var left = parseInt(adSpotIcon.css("left")) + 20;
				var top =  parseInt(adSpotIcon.css("top"));
				
				var h =  adspotDetailDiv.height();
				cdiv.css({left: left, top: (top + h/2)});
				cdiv.attr("edit-adspot-id", spotId); //设置要操作的ID，方便以后处理
				
				createOverlay();
				cdiv.show();
				
				var pIdDiv = $("div[spot-div-id=" + spotId + "]");
				pIdDiv.unbind("hover");
				
				bindConfirmDivEvent(cdiv); //绑定确定，取消事件。
				
			});
		}
		
		/**
		 * 绑定展示广告的编辑按钮事件
		 */
		var bindAdspotEditButtonClick = function(){
			var editBtn = $(".adspot_layer_info .adspot_edit_area .adspot_edit_button");
			editBtn.unbind("click");
			editBtn.click(function(){
				var adspotDetailDiv = $(this).parent().parent().parent();
				var spotId = adspotDetailDiv.attr("spot-div-id");
				
				//获取当前广告层是属于那个图片的
				var adSpotImgIndex = adspotDetailDiv.attr("adspot-img-index");
				var wraDiv = $(".adspot_wrapper[adspot-img-index='" + adSpotImgIndex + "']");
				
				var addEditSpotDiv = wraDiv.find(".add-edit-adspot");
				var adSpotIcon = wraDiv.find(".adspot_icon[adsopt-product-id='" + spotId + "']")
				
				var left = adSpotIcon.css("left");
				var top =  adSpotIcon.css("top");
				
				adspotDetailDiv.hide();
				
				addEditSpotDiv.css({left: left, top: top});
				addEditSpotDiv.attr("adspot_edit_pdct_id", spotId);
				addEditSpotDiv.show(600);
			});
		}
		
		//包装图片的锚点
		var wrapperProductDots = function(img){
			if(adspotData){
				$.each(adspotData, function(i, spot){
					if(spot.type){
						var dotImg = addDotImgDiv(spot, false);
						img.after(dotImg);
						
						if(!$(document.body).find("div.adspot_info_detail").is("div[spot-div-id=" + spot.id + "]")){
							$(document.body).append(getSpotDiv(spot));
						}
					}
				});
			}
			
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
				var addEditAdspotDiv = warDiv.find("div.add-edit-adspot");
				
				warDiv.find(".adspot_icon_space").remove();
				
				var editSpotId = addEditAdspotDiv.attr("adspot_edit_pdct_id");
				
				if(!editSpotId){
					bindCreateAdspotEvent(warDiv.find("img.adSpotImgWrap"));
				}
				
				addEditAdspotDiv.removeAttr("adspot_edit_pdct_id");
				
				addEditAdspotDiv.hide();
				restAdspotSearchItemClass(warDiv);
			});
			
			warDiv.find(".adspot_tab_action .submit").click(function(){
				var warDiv = $(this).parent().parent().parent();
				var imgWra = warDiv.find("img.adSpotImgWrap");
				
				restAdspotSearchItemClass(warDiv);
				
				var adTab = warDiv.find(".adspot_layer_info .adspot_layer_inner .adspot_tab .adspot_tab_selected");
				var adspotType = adTab.hasClass("adspot_tab2") ? "adspot_icon_link" : "adspot_icon_product";
				
				var addEditAdspotDiv = warDiv.find("div.add-edit-adspot");
				
				var editSpotId = addEditAdspotDiv.attr("adspot_edit_pdct_id");
				addEditAdspotDiv.removeAttr("adspot_edit_pdct_id");
				
				if(editSpotId){
					addEditAdspotDiv.hide();
					return;
				}
				
				var pid = genRandomStr(7);
				var adType = adspotType === "adspot_icon_link" ? "LINK" : "PDCT";
				var spot = {id: pid, type: adType};
				
				if(adType === "LINK"){
					spot.link_addr = addEditAdspotDiv.find(".tab_con_link input.link_addr").val();
					spot.link_thumb = addEditAdspotDiv.find(".tab_con_link input.link_thumb").val();
					spot.link_desc = addEditAdspotDiv.find(".tab_con_link textarea.link_desc").val();
				}
				
				spot.wbcode = wbCode;
				
				var adDot = warDiv.find(".adspot_icon_space")
				spot.left = adDot.css("left").replace("px","");
				spot.top  = adDot.css("left").replace("px","");
				spot.imgWidth = imgWra.width();
				spot.imgHeight = imgWra.height();
				spot.imgTitle = imgWra.attr("title") ? imgWra.attr("title") : (imgWra.attr("alt") ? imgWra.attr("alt") : "");
				spot.imgSrc  = getAbsolutUrl(imgWra.attr("src"));
				
				var saveUrl = dataHost + "data/spot-save-update.php";
				$.post(saveUrl, spot, function(d){
					alert(d);
				});
				
				
				adDot.attr("adsopt-product-id", pid);
				adDot.attr("class", "adspot_icon " + adspotType);
				
				$(document.body).append(getSpotDiv(spot));
				
				addEditAdspotDiv.hide();
				bindCreateAdspotEvent(warDiv.find("img.adSpotImgWrap"));
				bindAdspotEditButtonClick(); // 绑定展示广告，右下脚的编辑按钮事件。
				bindAdspotDeleteButtonClick(); //绑定展示广告，右下角的删除按钮事件。
			});
		}
		
		/**
		 * 绑定左上角处于编辑状态时的事件。 
		 */
		var bindCreateAdspotEvent = function(img){
			img.click(function(e){
				var left = e.pageX - img.offset().left - 12;
			    var top  = e.pageY - img.offset().top  - 12;
			    
			    var spot = {};
			    spot.left = left;
			    spot.top = top;
			    spot.type = "SPACE";
			    
			    var dotImg = addDotImgDiv(spot, true);
			    img.after(dotImg);
			    
			    var addDiv = img.parent().find(".add-edit-adspot");
			    addDiv.css({left: (left + 25),top: (top +  12)});
			    
			    unbindCreateAdspotEvent(img);
				
			    addDiv.show();
			    
			});
			
			img.css('cursor','crosshair');
		}
		
		/**
		 * 取消spot编辑状态
		 */
		var unbindCreateAdspotEvent = function(img){
			img.css('cursor','default');
			img.unbind('click');
			img.parent().find(".add-edit-adspot").hide();
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
						
						//获取该点属于那个图片
						var spotImgIndex = $(this).parent().attr("adspot-img-index");
						//设置显示的spot是由那个图片下的锚点触发。
						pIdDiv.attr("adspot-img-index", spotImgIndex);
						
						bindShowSpotEvent(pIdDiv);
						
						pIdDiv.css({left:offset.left + 20, top:offset.top + 20}).fadeIn(600);		
					}
					,
					function(){
						$(this).css("opacity", "0.7");
						
						var id = $(this).attr("adsopt-product-id");
						
						setTimeout(function(){
							var pIdDiv = $("div[spot-div-id=" + id + "]");

							if(pIdDiv.attr("show-flag") !== "1"){
								pIdDiv.attr("show-flag","0");
								pIdDiv.fadeOut(400);
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
					unbindCreateAdspotEvent(img); //取消页面点击添加锚点事件。
					bindSpotHoverEvent(img);  //绑定鼠标移到锚点，显示对应广告事件。
				}else{
					_self.addClass("adspot_btn_add_clicked");
					bindCreateAdspotEvent(img);
					unbindSpotHoverEvent(img);
				}
				
			});
		}
		
		//包装图片
		var wrapperImg = function(img, index){
			var width = img.width();
			var height = img.height();
			
			var divWrap = "<div class='adspot_wrapper' adspot-img-index='" + index + "' style='width:" + width + "px;height:" + height + "px;'></div>";
		    var logoDiv = "<div class='adspot_btn_logo'><a href='http://www.adspot.cn' target='_blank'>访问Adpot</a> </div>";
		    var addDotSpotDiv = "<div class='adspot_btn_add_dot'><a>添加锚点</a></div>";
		    var addEditSpotFormDiv = getAddEditSpotFormDiv();
		    
		    //包装图片
		    img.addClass("adSpotImgWrap");
			img.wrap(divWrap);
			wrapperProductDots(img); //所有点对应商品的层都追加在BODY最后。
			
			img.after(logoDiv); 
			img.after(addDotSpotDiv); //右上角编辑加号。
			img.after(addEditSpotFormDiv); //增加、编辑adspot层。
			img.after(confirmDiv()); //取消，确定对话框。
			
			//绑定各种事件
			bindAddSpotDivClick(img); //绑定右上角 点击 事件，以便图片处于编辑或者查看状态。
			bindSpotHoverEvent(img); //绑定鼠标移到锚点，显示对应广告事件。
			bindAddSpotDivTabClick(img); //绑定新增spot的切换事件。
			bindSoptSelectedProductEvent(img); //新增广告的选择事件。
			bindSoptEditDivButEvent(img); //新增spot层的提交，取消按钮事件。
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
		var initImg = function(img, index){
			wrapperImg(img, index);
			
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
			var imgArr = new Array(); //存储符合规则的图片img对象。
			var imgIndex = 0;
			var imgArrJson = ""; //把符合规则的图片数据包装成josn数据格式字符串。
			
			$("img").each(function(i){
				var _self = $(this);
				var width = _self.width();
				var height = _self.height();
				
				if(width >= 200 && height >= 200){
					imgArr[imgIndex] = _self;
					
					var src  = getAbsolutUrl(_self.attr("src"));
					
					if(imgArrJson.indexOf(src) < 0){
						var title = _self.attr("title") ? _self.attr("title") : (_self.attr("alt") ? _self.attr("alt") : "");
						var w = _self.width();
						var h = _self.height();
						
						var strVal = "";
						
						if(imgIndex > 0){
							strVal = ",";
						}
						
						strVal += '{"title":"' + title + '","src":"' + src + '","width":' + w + ',"height":' + h +'}';
						
						imgArrJson += strVal;
					}
					imgIndex++;
				}
			});
			
			var length = imgArr.length;
			
			if(length > 0){
				imgArrJson = "[" + imgArrJson + "]";
				
				var dataUrl = dataHost + "data/spot-data.php";
				
				$.post(dataUrl, {wbcode:wbCode, imgs:imgArrJson}, function(imgJson){
					adspotData = imgJson;
					for(var i=0; i < length; i++){
						initImg(imgArr[i], i);
					}
				});
				
			}
			
			bindAdspotEditButtonClick(); //绑定展示广告层右下角的编辑点击事件
			bindAdspotDeleteButtonClick(); //绑定展示广告层右下角的删除点击事件
			
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
