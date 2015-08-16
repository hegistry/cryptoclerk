var apiURL = "http://stablenet.blockapps.net";

var appCode = {
  compareCode: function() {
    if (this.compiledSolidity && this.byteCode) {
      if (this.compiledSolidity === this.byteCode) { return true } else { return false };
    }
  }
}

// Adapted code from the tutorial at http://stablenet.blockapps.net/static/tutorial.html
function compile(code) {
   var oReq = new XMLHttpRequest();
   oReq.open("POST", apiURL + "/eth/v1.0/solc", true);

   var params = "src=" + encodeURIComponent(code.replace(/(\r\n|\n|\r)/gm,""));
   oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

   oReq.onload = function () {
     if (oReq.readyState == 4 && oReq.status == 200) {
       compilerData = JSON.parse(this.responseText);
       console.log(compilerData);
       if (compilerData.error != null) {
         console.log("ERROR: " + compilerData.error);
       } else if (compilerData.contracts.length == 0) {
         console.log("No contracts were compiled.");
       } else {
         appCode.compiledSolidity = compilerData.contracts[0].bin;
         $('#solidityContentCompiled').text(appCode.compiledSolidity);
         codeReadyCheck();
       }
     } else {
       outputEl.value = "ERROR!\n" + this.responseText;
     }
   }
   oReq.send(params);
 };

  var getContract = function() {
   var contractAddress = $('#getHash_contractAddress').val();
   $.ajax('http://hacknet.blockapps.net/eth/v1.0/account?address=' + contractAddress, {
     type: 'GET'
   }).done(function(data) {
     appCode.byteCode = data[0].code;
     $('#byteCodeContent').text(appCode.byteCode);
   })
  }

  var getRegistryData = function() {

    // THEORETICALLY WE WOULD CALL A CONTRACT HERE TO GET THE IPFS HASH
    var ipfsGateway = "http://localhost:8080/ipfs/";
    var ipfsHash = "QmRwMoQRjDxQHrqkqkixHkWXhijw2gAh6afhVkiqDYckFC"
    $('#ipfsHashContent').attr("value",ipfsHash);

    // BUT WE'RE HAVING ISSUE WITH CORS AND OUR IPFS NODE

        // LOAD FROM IPFS
        /*
        regReq.open('GET', ipfsGateway + ipfsHash);
        regReq.onreadystatechange = function() {
          appCode.rawSolidity = regReq.responseText;
          $('#solidityContent').text(appCode.rawSolidity);
        }
        regReq.send();
        */

    // IN REALITY WE'RE LOADING FROM OUR OWN DIRECTORY
    var regReq = new XMLHttpRequest();

    regReq.open('GET', 'SolidityRegistry.sol');
    regReq.onreadystatechange = function() {
      appCode.rawSolidity = regReq.responseText;
      $('#solidityContent').text(appCode.rawSolidity);
    }
    regReq.send();
  }

  var codeReadyCheck = function() {
    if (!!appCode.compiledSolidity && !!appCode.byteCode) {
      console.log("... and there's something to compare");
      $('#compareModal').modal('show');
      var compareResult = appCode.compareCode();
      var timeout = window.setTimeout(function() {
        if (compareResult) {
          $('#spinner-results').html("<span class='glyphicon glyphicon-thumbs-up glyphicon-custom-size'></span>");
          $('#check-code-status').html("The registered Solidity code <b>matches</b> the compiled bytecode on the blockchain.")
        } else {
          $('#spinner-results').html("<span class='glyphicon glyphicon-thumbs-down glyphicon-custom-size'></span>");
          $('#check-code-status').html("The registered Solidity code <b>does not match</b> the compiled bytecode on the blockchain.")

        }
        //$('#compareModal').modal('hide');

      }, 2000)
    }
  }
