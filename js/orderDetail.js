$(document).ready(function(){
    var totalPrice = 0;
    $(".productItem").each(function(){
        totalPrice += calSubPrice($(this));
    });
    $(".totalPrice").html(totalPrice);
});

function calSubPrice(productItem){
    var price = parseFloat(productItem.find(".itemPrice").html());
    var quantity = parseFloat(productItem.find(".itemQuantity").html());
    var subTotal = price * quantity;
    productItem.find(".subTotalPrice").html(subTotal);
    return subTotal;
}