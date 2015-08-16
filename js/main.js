$(document).ready(function() {

   $('#searchRegistryButton').on('click', function() {

     // BLOCKCHAIN REGISTRY SEARCH
     console.log("Searching registry for an IPFS entry...");
     $('#solidityContent').html("<img src='img/ajax-loader.gif' alt='' />");

     // BYTECODE RETRIEVAL
     console.log("Retrieving bytecode from blockchain...");
     $('#byteCodeContent').html("<img src='img/ajax-loader.gif' alt='' />");

     // ONE SECOND DELAY TO EMPHASIZE RETRIEVAL
     window.setTimeout(function() {
       getRegistryData();
       getContract();
     }, 1000);   // one second delay to emphasize retrieval
   })

   $('#compareCodeButton').on('click', function() {
     console.log("Compare code button was clicked");
     var code = $('#solidityContent').text();
     compile(code);
   })

   /* // BINDING IF YOU WANT TO AUTO-COMPARE WHEN BOTH BOXES HAVE TEXT
   $('code').bind('DOMSubtreeModified', function() {
     console.log("box changed ...");
     codeReadyCheck();
   })
   */

   /* // TOGGLE IF YOU WANT TO SHOW WHICH PAGE YOU'RE ON

   $('.toggleableButton').click(function() {
     $('.toggleableButton').attr('class','toggleableButton')
     $(event.currentTarget).attr('class','toggleableButton active')
   })
   */

   $('#registerButton').click(function() {
    showRegisterRegistry();
    $('#userModal').modal('show');
   })

   $('#loginButton').click(function() {
    showLoginRegistry();
    $('#userModal').modal('show');
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
