var apiURL = "http://stablenet.blockapps.net"

// Adapted code from the tutorial at http://stablenet.blockapps.net/static/tutorial.html
function compile(code) {
   var oReq = new XMLHttpRequest();
   oReq.open("POST", apiURL + "/solc", true);

   var params = "src=" + encodeURIComponent(code);
   oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

   oReq.onload = function () {
     if (oReq.readyState == 4 && oReq.status == 200) {
       compilerData = JSON.parse(this.responseText);
       if (compilerData.error != null) {
         console.log("ERROR: " + compilerData.error);
       } else if (compilerData.contracts.length == 0) {
         console.log("Blank");
       } else {
         console.log(JSON.stringify(compilerData));
       }
     } else {
       outputEl.value = "ERROR!\n" + this.responseText;
     }
   }
   oReq.send(params);
 };

 $(document).ready(function() {
   $('#compileButton').on('click', function() {
     console.log("Compile button was clicked");
     var code = $('#solidityContent').text();
     compile(code);
   })

   $('#searchRegistryButton').on('click', function() {
     console.log("Search registry button was clicked");
     console.log("THIS IS ONLY A MOCK UP");

     var contractAddress = $('#contractAddressInput').val();
     $('#byteCodeContent').text(data[0].code);


     /*$.ajax('http://hacknet.blockapps.net/eth/v1.0/account?address=' + contractAddress, {
       type: 'GET'
     }).done(function(data) {
     })*/
   })

   $('#getContractButton').on('click', function() {
     console.log("Get contract button was clicked");
     var contractAddress = $('#contractAddressInput').val();
     $.ajax('http://hacknet.blockapps.net/eth/v1.0/account?address=' + contractAddress, {
       type: 'GET'
     }).done(function(data) {
       $('#byteCodeContent').text(data[0].code);
     })
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
