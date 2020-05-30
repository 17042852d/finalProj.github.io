$(document).ready(function(){
    loadCartFromCookie();
});

function loadCartFromCookie(){
    if (!!$.cookie('cart_list')) {//has cookie
        var cart_list = $.parseJSON($.cookie('cart_list'));//get current cartList
        var itemHTML = "";
        var totalPrice = 0;
        for(var i=0;i<cart_list.cart.length;i++){
            var subTotalPrice = calSubPrice(cart_list.cart[i].productPrice,cart_list.cart[i].productQuantity);
            itemHTML +='<li class="list-group-item d-flex justify-content-between lh-condensed">';
            itemHTML +='<div>';
            itemHTML +='<h6 class="my-0">'+cart_list.cart[i].productName+'</h6>';
            itemHTML +='</div>';
            itemHTML +='<span class="text-muted">HK$'+subTotalPrice+'</span>';
            itemHTML +='</li>';
            totalPrice += subTotalPrice;
        }
        itemHTML +='<li class="list-group-item d-flex justify-content-between">';
        itemHTML +='<span>Total (HKD)</span>';
        itemHTML +='<strong id="totalPrice">HK$'+totalPrice+'</strong>';
        itemHTML +='</li>';
        $("#checkout_cart").html(itemHTML);
        $('#cart_item').html(cart_list.cart.length);
    } else{//don't have cookie
        window.location.replace("index.html");
    }
}

function calSubPrice(productPrice,productQuantity){
    var price = parseFloat(productPrice);
    var quantity = parseFloat(productQuantity);
    var subTotal = price * quantity;
    return subTotal;
}

function showCCPayment(elem){
    $("#cc-name").prop("required","true");
    $("#cc-number").prop('required','true');
    $("#cc-expiration").prop('required','true');
    $("#cc-cvv").prop('required','true');
    
    $("#cc_payment").show();
}

function hideCCPPayment(elem){
    $("#cc-name").removeAttr("required");
    $("#cc-number").removeAttr("required");
    $("#cc-expiration").removeAttr("required");
    $("#cc-cvv").removeAttr("required");
    $("#cc_payment").hide();
}