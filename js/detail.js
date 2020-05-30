var inputFile = "https://raw.githubusercontent.com/billyng7900/billyng7900.github.io/master/storage/SearchResultCriteria.txt";
var jsonFile = 'https://raw.githubusercontent.com/billyng7900/billyng7900.github.io/master/storage/game.json';
$(document).ready(function(){
	var searchKeyword = getUrlParameter("search");
	if(searchKeyword)
	{
		$("#searchBox").val(searchKeyword);
	}
	//retrieve filter
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var filterList = "";
			var lines = this.responseText.split("\n");
			for (var i = 0, len = lines.length; i < len; i++) {
				var content = lines[i].split("\t");
				var html = "";
				html += "<li href='#' class='list-group-item d-flex justify-content-between align-items-center' data-toggle='list' href='#' role='tab'>";
				html += content[0];
				html += "<span class='badge badge-primary badge-pill'>"+content[1]+"</span>"
				html += "</li>"
				filterList += html;
			}
			$("#sortList").append(filterList);
		}
	};
	xhttp.open("GET", inputFile, true);
	xhttp.send();

	//retrieveProduct
	var productId = getUrlParameter("id");
	$.getJSON(jsonFile, function(data) {
		$(data.products).each(function(index,json){
			if(json.productID == productId){//get the corresponding product
				$("#product_title").html(json.productName);
				$("#product_price").html(json.productPrice);
				$("#product_description").html(json.productDescription)
				$('#product_id').html(json.productID);
				var productImgs = json.productImg;
				var imgList = "";
				for(var i=0;i<productImgs.length;i++){
					var imgSrc = "img/" + productImgs[i];
					if(i==0){
						
						$("#product_img").attr('src',imgSrc)
					}
					imgList += '<div class="card small_thumbnail float-none" style = "display: inline-block;" onclick="changeImageContent(this)">';
					imgList	+= '<img class="card-img-top small_thumbnail_img" src="'+imgSrc+'" alt="Card image cap">';
					imgList	+= '</div>';
				}
				$("#product_small_img").html(imgList);
			}
		});
	})

	//show img preview modal
	$(".thumbnail_img").on("click", function() {
		$(".imagepreview").attr("src", $(this).find("img").attr("src"));
		$("#imagemodal").modal("show");
	});
	//plus minus button function
	$('.btn_minus').click(function(){
		var quantity = parseInt($("#product_quantity").val());
		if(quantity > 0)
		{
			quantity -= 1;
			$("#product_quantity").val(quantity);
		}
	});
	$('.btn_plus').click(function(){
		var quantity = parseInt($("#product_quantity").val());
		quantity += 1;
		$("#product_quantity").val(quantity);
	});
	
	$("#add_to_cart").click(function() {
		var productQuantity = $("#product_quantity").val();
		if (!!$.cookie('cart_list')) {//has cookie
			var cart_list = $.parseJSON($.cookie('cart_list'));//get current cartList
			var hasItemAlready = false;
			$(cart_list.cart).each(function(index,product){
				if(product.productID == $('#product_id').html()){
					var finalQuantity = parseInt(product.productQuantity)
					finalQuantity += parseInt(productQuantity);
					product.productQuantity = finalQuantity;
					hasItemAlready = true;
				}
			});
			if (!hasItemAlready){
				var itemJson = {
					"productID":$('#product_id').html(),
					"productName":$('#product_title').html(),
					"productPrice":$("#product_price").html(),
					"productQuantity":$("#product_quantity").val(),
					"productImg":$("#product_img").attr('src'),
					"productDescription":$("#product_description").html()
				}
				cart_list['cart'].push(itemJson);
			}
			$.cookie('cart_list',JSON.stringify(cart_list),{path:'/'});
		} else {//don't have cookie
			var cart_list = {
				"cart":[
					{
						"productID":$('#product_id').html(),
						"productName":$('#product_title').html(),
						"productPrice":$("#product_price").html(),
						"productQuantity":$("#product_quantity").val(),
						"productImg":$("#product_img").attr('src'),
						"productDescription":$("#product_description").html()
					}
				]
			}
			$.cookie('cart_list',JSON.stringify(cart_list),{ expires:30, path: '/' });
		}
		loadCart();
		alert("Item has been added to Cart!");
	});
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function changeImageContent(ele){
	$("#product_img").find("img").attr("src", $(ele).find("img").attr("src")); 
}

