﻿$(document).ready(function(){
	//global variables
	var inputUser = $("#nick");
	var inputMessage = $("#message");
	var loading = $("#loading");
	var messageList = $(".content > p");
	
	
	//functions
	function updateShoutbox(){
		//fade effect
		messageList.hide();
		loading.fadeIn();
		//send the post to shoutbox.php
		$.ajax({
			type: "POST", 
			url: "shoutbox.php", 
			data: "action=update", 
			complete: function(data){
				loading.fadeOut();
				messageList.html(data.responseText);
				messageList.fadeIn("fast");
			}
		});
	}
	//check if all fields are filled
	function checkForm(){
		if(inputUser.val() && inputMessage.val())
			return true;
		else
			return false;
	}

	//Load for the first time the shoutbox data
	updateShoutbox();
	
	
	//on submit event
	$("#form").submit(function(){
		if(checkForm()){
			var nick = inputUser.val();
			var message = inputMessage.val();  //inputMessage.attr("value");
			//deactivate submit button while sending
			$("#send").attr({ disabled:true, value:"Sending..." });
			$("#send").blur(); //https://learn.javascript.ru/focus-blur

			//send the post to shoutbox.php
			$.ajax({
				type: "POST", 
				url: "shoutbox.php", 
				data: "action=insert&nick=" + nick + "&message=" + message,
				complete: function(data){
					messageList.html(data.responseText);
					var message_clear = inputMessage.val("");
					updateShoutbox();
					//reactivate the send button
					$("#send").attr({ disabled:false, value:"Send" });
				}
			 });
		}
		else alert("Please, write your name and message");
		//we prevent the refresh of the page after submitting the form
		return false;
	});
});