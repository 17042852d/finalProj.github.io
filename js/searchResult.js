var inputFile = "https://raw.githubusercontent.com/billyng7900/billyng7900.github.io/master/storage/SearchResultCriteria.txt";
const jsonFile = 'https://raw.githubusercontent.com/billyng7900/billyng7900.github.io/master/storage/game.json';

$(document).ready(function(){
	var searchKeyword = getUrlParameter("search");
	loadContent();
	if(searchKeyword)
	{
		$("#searchBox").val(searchKeyword);
	}
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

function loadContent(){
	$.getJSON(jsonFile, function(data) {
		var innerHTML = ""
		$(data.products).each(function(index,json){
			var url = window.location.href;
			if(url.indexOf('?')>=0) {
				var url = url.replace('searchResult.html','detail.html')+"&id="+json.productID;
			}else{
				var url = url.replace('searchResult.html','detail.html')+"?id="+json.productID;
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