var apiURL = "http://stablenet.blockapps.net"

// Adapted code from the tutorial at http://stablenet.blockapps.net/static/tutorial.html
function compile(code) {
   var oReq = new XMLHttpRequest();
   oReq.open("POST", apiURL + "/solc", true);

   var params = "src=" + encodeURIComponent(code);
   oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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
     console.log("Button was clicked");
     var code = $('#solidityContent').text();
     compile(code);
   })
 });
