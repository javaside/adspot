
(function() {
	var wbCode = window['__asspot_wb_code'];
	
	var startAdspot =  function($){	
		
		var showAdSpot =  function(img){
			
		}
		
		var hideAdSpot = function(img){
			
		}
		
		//初始化图的锚点
		var initImg = function(img){
			img.hover(
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
		if(!wbCode){return;};
		
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
