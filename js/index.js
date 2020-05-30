const dynamicLoadCount = 6; //number of item will load when user scroll to the bottom;
const jsonFile = 'https://raw.githubusercontent.com/billyng7900/billyng7900.github.io/master/storage/game.json';

$(document).ready(function(){
	loadContent();
	//When scrolldown show more
	$(window).scroll(function() {
		if($(window).scrollTop() == $(document).height() - $(window).height()) {
			var rowcount = $(".product").length/3;
			if(rowcount < 10){//only up to 10 rows of item will be shown
				var innerHTML = "";
				$.getJSON(jsonFile, function(data) {
					for(var i=0;i < dynamicLoadCount;i++){
						var url = window.location.href;
						if(url.indexOf('?')>=0) {
							var url = url.replace('index.html','detail.html')+"&id="+data.products[i].productID;
						}else{
							var url = url.replace('index.html','detail.html')+"?id="+data.products[i].productID;
						}
						innerHTML += '<div class="col-sm-6 col-md-4 product border-0">';
						innerHTML += '<div class="thumbnail">';
						innerHTML += '<a href="'+url+'">';
						innerHTML += '<div class="thumbnail_img">';
						innerHTML += '<img src="img/'+data.products[i].productImg[0]+'" class="img-responsive" alt="">';
						innerHTML += '</div>';
						innerHTML += '<h5 class="thumbnail_title">';
						innerHTML += data.products[i].productName;
						innerHTML += '</h5>';
						innerHTML += '<div class="thumbnail_price">';
						innerHTML += '<span class="shop-thumb-price_old">HK$'+data.products[i].productPrice+'</span>';
						innerHTML += '</div>';
						innerHTML += '</a>';
						innerHTML += '</div>';
						innerHTML += '</div>';
					}
					$("#product_list").append(innerHTML);
				});
			}
		}
	});
});


function loadContent(){
	$.getJSON(jsonFile, function(data) {
		var innerHTML = "";
		$(data.products).each(function(index,json){
			var url = window.location.href;
			if(url.indexOf('?')>=0) {
				var url = url.replace('index.html','detail.html')+"&id="+json.productID;
			}else{
				var url = url.replace('index.html','detail.html')+"?id="+json.productID;
			}
			innerHTML += '<div class="col-sm-6 col-md-4 product border-0">';
			innerHTML += '<div class="thumbnail">';
            innerHTML += '<a href="'+url+'">';
            innerHTML += '<div class="thumbnail_img">';
            innerHTML += '<img src="img/'+json.productImg[0]+'" class="img-responsive" alt="">';
            innerHTML += '</div>';
            innerHTML += '<h5 class="thumbnail_title">';
            innerHTML += json.productName;
            innerHTML += '</h5>';
            innerHTML += '<div class="thumbnail_price">';
            innerHTML += '<span class="shop-thumb-price_old">HK$'+json.productPrice+'</span>';
            innerHTML += '</div>';
            innerHTML += '</a>';
			innerHTML += '</div>';
			innerHTML += '</div>';
		});
		$("#product_list").html(innerHTML);
	});
	
}