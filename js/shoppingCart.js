$(document).ready(function(){
    loadCartFromCookie();
});

function loadCartFromCookie(){
    if (!!$.cookie('cart_list')) {//has cookie
        var cart_list = $.parseJSON($.cookie('cart_list'));//get current cartList
        var itemHTML = "";
        for(var i=0;i<cart_list.cart.length;i++){
            var subTotalPrice = calSubPrice(cart_list.cart[i].productPrice,cart_list.cart[i].productQuantity);
            itemHTML += '<tr class="productItem" id="'+cart_list.cart[i].productID+'">';
            itemHTML += '<td data-th="Product">';
            itemHTML += '<div class="row">';
            itemHTML += '<div class="d-none d-sm-block col-sm-3"> <!--Only hidden when it is mobile-->';
            itemHTML += '<img src='+cart_list.cart[i].productImg+' class="img-thumbnail" id="product_img"/>';
            itemHTML += '</div>';
            itemHTML += '<div class="col">';
            itemHTML += '<h4 class="nomargin" id="product_name">'+cart_list.cart[i].productName+'</h4>';
            itemHTML += '<p id="product_Description">'+cart_list.cart[i].productDescription.substring(0,200)+'...</p>';
            itemHTML += '<p class="d-none" id="product_Id">'+cart_list.cart[i].productID+'</p>';
            itemHTML += '</div>';
            itemHTML += '</div>';
            itemHTML += '</td>';
            itemHTML += '<td data-th="Price">HK$<span class="product_Price">'+cart_list.cart[i].productPrice+'</td>';
            itemHTML += '<td data-th="Quantity">';
            itemHTML += '<input type="number" class="form-control text-center" id="product_Quantity" value="'+cart_list.cart[i].productQuantity+'" onChange="recalPrice('+cart_list.cart[i].productID+')">';
            itemHTML += '</td>';
            itemHTML += '<td data-th="Subtotal" class="text-center">HK$<span class="subTotalPrice">'+subTotalPrice+'</span></td>';
            itemHTML +=  '<td class="actions align-middle" data-th="">';
            itemHTML += '<button class="btn btn-danger" onclick="removeShoppingItem('+cart_list.cart[i].productID+')"><i class="fas fa-trash"></i></button>';
            itemHTML += '</td>';
            itemHTML += '</tr>';
        }
        $("#product_List").html(itemHTML);
        changeTotalPrice();
    } else{//don't have cookie
        $("#message").html("<h3>You don't have anything in the Cart</h3>");
        $("#cart").hide();
    }
}

function recalPrice(productId){
    var price = parseFloat($("#"+productId).find(".product_Price").html());
    var quantity = parseFloat($("#"+productId).find("#product_Quantity").val());
    var subTotal = price * quantity;
    $("#"+productId).find(".subTotalPrice").html(subTotal);
    changeTotalPrice();
    refreshCookieCart();
}

function calSubPrice(productPrice,productQuantity){
    var price = parseFloat(productPrice);
    var quantity = parseFloat(productQuantity);
    var subTotal = price * quantity;
    return subTotal;
}

function changeTotalPrice(){
    var totalPrice = 0;
    $(".productItem").each(function(index,product){
        var price = parseFloat($(product).find(".product_Price").html());
        var quantity = parseFloat($(product).find("#product_Quantity").val());
        var subTotal = price * quantity;
        totalPrice += subTotal;
    });

    $(".totalPrice").html(totalPrice);
}

function removeShoppingItem(eleId){
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
    }
    alert("complete");
    loadCartFromCookie();
}


function refreshCookieCart(){
    var cart_list = {
        "cart":[]
    }
    $(".productItem").each(function(index,product){
        var productJson = {
            "productID":$(product).find('#product_Id').html(),
			"productName":$(product).find('#product_name').html(),
			"productPrice":$(product).find(".product_Price").html(),
			"productQuantity":$(product).find("#product_Quantity").val(),
			"productImg":$(product).find("#product_img").attr('src'),
			"productDescription":$(product).find("#product_Description").html()
        };
        cart_list.cart.push(productJson);
    });
    $.cookie('cart_list',JSON.stringify(cart_list),{path:'/'});
}
