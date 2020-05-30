$(document).ready(function(){
    loadCart();
    loadLogin();
});

function loadCart(){
    if (!!$.cookie('cart_list')) {//has cookie
        var cart_list = $.parseJSON($.cookie('cart_list'));//get current cartList
        var itemHtml = "";
        for(var i=0;i<cart_list.cart.length;i++){
            itemHtml += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start shopping_item">';
            itemHtml += '<div class="w-50 float-left" id="'+cart_list.cart[i].productID+'">';
            itemHtml += '<img src="'+cart_list.cart[i].productImg+'" class="float-left mr-2" alt="...">';
            itemHtml += '<h5 class="mb-1 shopping_item_name">'+cart_list.cart[i].productName+'</h5>';
            itemHtml += '<p class="mb-1 text-info">Quantity: '+cart_list.cart[i].productQuantity+'</span>';
            itemHtml += '<p class="text-success">HK$'+cart_list.cart[i].productPrice+'</p>';
            itemHtml += '</div>';
            itemHtml += '<div class="float-right mt-3">';
            itemHtml += '<button type="button" class="btn btn-danger" onClick="removeCartItem('+cart_list.cart[i].productID+')">';
            itemHtml += '<i class="fas fa-trash"></i>';
            itemHtml += '</button>';
            itemHtml += '</div>';
            itemHtml += '</a>';
        }
        $("#cart_list").html(itemHtml);
        $("#item_in_cart").html(cart_list.cart.length);
    } else{//don't have cookie
        $("#cart_list").html("<h5>You don't have anything in the Cart</h5>");
        $("#checkout_cart").hide();
        $("#item_in_cart").html(0);
    }
}

function loadLogin(){
    if(!!$.cookie('login')) {
        if($.cookie('login') == "yes"){
            $("#login_page").hide();
            $("#login_icon").show();
        }else{
            $("#login_page").show();
            $("#login_icon").hide();
        }
    }else{
        $("#login_page").show();
        $("#login_icon").hide();
    }
}

function removeCartItem(eleId){
    if (!!$.cookie('cart_list')) {//has cookie
        var cart_list = $.parseJSON($.cookie('cart_list'));//get current cartList
        $(cart_list.cart).each(function(index,product){
            if(product.productID == eleId){
                delete cart_list.cart[index];
            }
        });
        cart_list.cart = cart_list.cart.filter(function(x) { return x !== null }); 
        if(cart_list.cart.length == 0){
            $.cookie('cart_list', null,{path:'/'});
            $.removeCookie('cart_list',{path:'/'});
        }else{
            $.cookie('cart_list',JSON.stringify(cart_list));
        }
        loadCart();
    }
}

function logout(){
    $.removeCookie('login',{path:'/'});
    window.location.reload();
}


function setUrl() {
    window.location.href = 'searchResult.html?search=' + $("#searchBox").val();
};