$(document).ready(function() {

   $('#searchRegistryButton').on('click', function() {
     console.log("Search registry button was clicked");
     console.log("THIS IS ONLY A MOCK UP");
     getRegistryData();

     //$('#byteCodeContent').text(data[0].code);
     /*$.ajax('http://hacknet.blockapps.net/eth/v1.0/account?address=' + contractAddress, {
       type: 'GET'
     }).done(function(data) {
     })*/
   })

   $('#getContractButton').on('click', function() {
     console.log("Get contract button was clicked");
     getContract();
   })

   $('#compareCodeButton').on('click', function() {
     console.log("Compare code button was clicked");
     var code = $('#solidityContent').text();
     compile(code);
   })

   $('code').bind('DOMSubtreeModified', function() {
     console.log("box changed ...");
     codeReadyCheck();
   })

   $('.toggleableButton').click(function() {
     $('.toggleableButton').attr('class','toggleableButton')
     $(event.currentTarget).attr('class','toggleableButton active')
   })

   $('#registerButton').click(function() {
    showRegisterRegistry();
    $('#userModal').modal('show');
   })

   $('#loginButton').click(function() {
    showLoginRegistry();
    $('#userModal').modal('show');
   })

   $('#verifyButton').click(function() {

   })
   /*

   var ipfsHash = "QmRwMoQRjDxQHrqkqkixHkWXhijw2gAh6afhVkiqDYckFC"

   $.ajax("http://gateway.ipfs.io/ipfs/" + ipfsHash, {
     dataType: 'jsonp'
   }).done(function(data) {
     console.log(data);
   })


   var codeReq = new XMLHttpRequest();
   codeReq.open("GET", "http://gateway.ipfs.io/ipfs/" + ipfsHash, true);
   codeReq.setRequestHeader("Content-Type", "text/plain");
   codeReq.onload = function() {
     if (codeReq.readyState == 4 && codeReq.status == 200) {
       console.log(this.responseText);
     } else {
       console.log('ERROR: ' + this.responseText);
     }
   }
   codeReq.send();
   */
 });
