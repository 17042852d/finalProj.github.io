var inputFile = "https://raw.githubusercontent.com/billyng7900/billyng7900.github.io/master/storage/user.txt";

$(document).ready(function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var filterList = "";
            var lines = this.responseText.split("\n");
            var content = lines[0].split("\t");
            var username = content[1];
            var password = content[2];
            var firstName = content[3];
            var lastName = content[4];
            var email = content[5];
            var phoneNo = content[6];

            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#email").val(email);
            $("#phoneNo").val(phoneNo);
            $("#userName").val(username);
            $("#password1").val(password);
            $("#password2").val(password);

		}
	};
	xhttp.open("GET", inputFile, true);
	xhttp.send();
});