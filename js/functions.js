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
   oReq.open("POST", apiURL + "/solc", true);

   var params = "src=" + encodeURIComponent(code);
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
         codeReadyCheck();
       }
     } else {
       outputEl.value = "ERROR!\n" + this.responseText;
     }
   }
   oReq.send(params);
 };

  var getContract = function() {
   var contractAddress = $('#contractAddressInput').val();
   $.ajax('http://hacknet.blockapps.net/eth/v1.0/account?address=' + contractAddress, {
     type: 'GET'
   }).done(function(data) {
     appCode.byteCode = data[0].code;
     $('#byteCodeContent').text(appCode.byteCode);
   })
  }

  var getRegistryData = function() {
    var regReq = new XMLHttpRequest();
    regReq.open('GET', 'SimpleStorage.sol');
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
      console.log("COMPARISON RESULT: " + appCode.compareCode());
      var timeout = window.setTimeout(function() {
        $('#compareModal').modal('hide');
      }, 2000)
    }
  }
