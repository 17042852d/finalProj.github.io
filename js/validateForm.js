function showInvalid(inputId,feedbackId,message){
    $(inputId).css({
        "border-color" : "#dc3545",
        "background-image" : "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\")"
    });
    $(feedbackId).html(message);
    $(inputId).addClass("is-invalid");
    
}

function checkValid(){
    var valid = true;
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    var phoneNo = $("#phoneNo").val();
    var phoneRex = /^([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})+$/;
    if(password1 != password2)
    {
        valid = false;
        showInvalid("#password1","#password1_inv","Please input the same password");
        showInvalid("#password2","#password2_inv","Please input the same password");
    }
    if(phoneNo.length != 8 || phoneRex.test(phoneNo))
    {
        valid = false;
        showInvalid("#phoneNo","#phone_inv","Please input a valid phone number");
    }

    return valid;
}