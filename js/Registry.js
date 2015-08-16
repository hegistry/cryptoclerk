var Contract = require("Contract");

var globalKeystore;

var apiURL = "http://hacknet.blockapps.net";
function submitRegistry() {
  var userObj = {
    app: appCreateUser.value,
    email: emailCreateUser.value,
    loginpass: loginpassCreateUser.value,
    address: addressCreateUser.value,
    enckey: enckeyCreateUser.value
 };

  submitUser(userObj, function (res) {
    data = JSON.parse(res);
    createUserRegistryDiv.style.display = "none";
    var para = document.createElement("P");
    para.setAttribute("id","walletCreateMessage");
    var t = document.createTextNode("Confirm in your email. This is your new wallet file: \n\n" + res);
    para.appendChild(t);
    document.body.appendChild(para);
    console.log("wallet: " + data.encryptedWallet);
    console.log("addresses: " + JSON.parse(data.encryptedWallet).addresses);
    var faucetAddr = JSON.parse(data.encryptedWallet).addresses;
    var oReq = new XMLHttpRequest();
    oReq.open("POST", apiURL + "/eth/v1.0/faucet", true);
    var params = "address=" + encodeURIComponent(faucetAddr);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function () {
      if (oReq.readyState == 4 && oReq.status == 200) {
        console.log("faucet should have worked");
      } else {
        console.log("error");
      }
    }
    console.log("sending faucet request");
    oReq.send(params);
    console.log("faucet request sent");
    $('#confirmReminderDiv').attr('style','display:block');
  });
}


function showRegisterRegistry() {
  keygenRegistryDiv.style.display = "table";
  loginRegistryDiv.style.display = "none";
  $('#confirmReminderDiv').attr('style','display:none');
  $('#loginRegistryDiv').attr('style','display:none');
}


function showLoginRegistry() {
  createUserRegistryDiv.style.display = "none";
  if (typeof walletCreateMessage !== "undefined") walletCreateMessage.style.display = "none";
  keygenRegistryDiv.style.display = "none";
  loginRegistryDiv.style.display = "table";
  walletRegistryDiv.style.display="none";
  $('#confirmReminderDiv').attr('style','display:none');
}


function hideOnLoadRegistry() {
  createUserRegistryDiv.style.display = "none";
  walletRegistryDiv.style.display = "none";
  loginRegistryDiv.style.display = "none";
  // functionsRegistryDiv.style.display = "none";
  keygenRegistryDiv.style.display = "none";
  $('#confirmReminderDiv').attr('style','display:none');
}


function retrieveRegistry() {
  var userObj = {
    app : appLogin.value,
    email : emailLogin.value,
    loginpass : loginpassLogin.value,
    address : addressLogin.value
  };

  retrieveUser(userObj,function (keystore) {
    loginRegistryDiv.style.display = "none";
    var para = document.createElement("P");
    var t = document.createTextNode("Retrieved your wallet. Enter your password, and you can sign transactions: ");
    para.appendChild(t);
    var input = document.createElement("input");
    var itemLabel = document.createElement("Label");
    input.type = "password";
    input.setAttribute("id","walletDecrypt");
    itemLabel.setAttribute("for", "walletDecrypt");
    itemLabel.innerHTML = "Enter Password: ";
    para.appendChild(input);
    document.body.appendChild(para);
    walletaddress.value=keystore.addresses[0];
    walletRegistryDiv.style.display="table";
    loginRegistryDiv.style.display = "none";
    globalKeystore = keystore;
    // functionsRegistryDiv.style.display = "table";
    toAccount = Contract({"address":"fc0a13c07bea65c471518e54f72ad941b73b8a76", "symtab":{"Registry":{"kill":{"functionDomain":[],"functionArgs":[],"functionHash":"41c0e1b5","bytesUsed":"0","jsType":"Function","solidityType":"function() returns ()"},"ipfsHashes":{"atStorageKey":"0","mappingKey":{"bytesUsed":"14","jsType":"Address","solidityType":"address"},"bytesUsed":"20","jsType":"Mapping","mappingValue":{"bytesUsed":"20","jsType":"Bytes","solidityType":"bytes32"},"solidityType":"mapping (address => bytes32)"},"setHash":{"functionDomain":[{"atStorageKey":"0","bytesUsed":"14","jsType":"Address","solidityType":"address"},{"atStorageKey":"1","bytesUsed":"20","jsType":"Bytes","solidityType":"bytes32"}],"functionArgs":["_contractAddress","_hash"],"functionHash":"e84b8169","bytesUsed":"0","jsType":"Function","solidityType":"function(address,bytes32) returns ()"},"owner":{"atStorageKey":"1","bytesUsed":"14","jsType":"Address","solidityType":"address"},"getHash":{"functionDomain":[{"atStorageKey":"0","bytesUsed":"14","jsType":"Address","solidityType":"address"}],"functionArgs":["_contractAddress"],"functionHash":"1da0b8fc","bytesUsed":"0","jsType":"Function","functionReturns":{"atStorageKey":"0","bytesUsed":"20","jsType":"Bytes","solidityType":"bytes32"},"solidityType":"function(address) returns (bytes32)"}}}});
    $('#userModal').modal('hide');  
  })
};

function genKeyUser() {
  console.log("moving from keygen to create user");
  createUserRegistryDiv.style.display = "table";
  keygenRegistryDiv.style.display = "none";
  genKey(keypass.value, function (keystore) {
    addressCreateUser.value = keystore.addresses[0];
    enckeyCreateUser.value = keystore.serialize();
  });
}

function afterTX(result) {
  var afterTXstring =
    "TX returned: " + ((result === undefined) ? "(nothing)":result) +
    "\n\n" +
    "Contract storage state:\n"
    "\n";

  function f() {
    for (var svar in toAccount.get) {
      afterTXstring += "  " + svar + " = " + toAccount.get[svar] + "\n";
    }
    document.getElementById("afterTXarea").textContent = afterTXstring;
  }
  toAccount.sync("http://hacknet.blockapps.net", f);
}

function callkill() {
  var args = [];
  var fArgs = {};
  console.log("globalKeystore: " + JSON.stringify(globalKeystore));
  console.log("privkey: " + globalKeystore.exportPrivateKey(walletaddress.value, walletDecrypt.value));
  var fromAccount = Contract({"privkey": globalKeystore.exportPrivateKey(walletaddress.value,walletDecrypt.value) });
  console.log("fromAccount: " + JSON.stringify(fromAccount));
  args.forEach(function(arg) {
    fArgs[arg] = document.getElementById("kill" + arg).value;
  });
  toAccount.call("http://hacknet.blockapps.net", afterTX, {
    "funcName" : "kill",
    "fromAccount" : fromAccount,
    "value" : 0,
    "gasPrice" : 1,
    "gasLimit" : 3141592
  }, fArgs);
}
function callsetHash() {
  var args = ["_contractAddress","_hash"];
  var fArgs = {};
  console.log("globalKeystore: " + JSON.stringify(globalKeystore));
  console.log("privkey: " + globalKeystore.exportPrivateKey(walletaddress.value, walletDecrypt.value));
  var fromAccount = Contract({"privkey": globalKeystore.exportPrivateKey(walletaddress.value,walletDecrypt.value) });
  console.log("fromAccount: " + JSON.stringify(fromAccount));
  args.forEach(function(arg) {
    fArgs[arg] = document.getElementById("setHash" + arg).value;
  });
  toAccount.call("http://hacknet.blockapps.net", afterTX, {
    "funcName" : "setHash",
    "fromAccount" : fromAccount,
    "value" : 0,
    "gasPrice" : 1,
    "gasLimit" : 3141592
  }, fArgs);
}
function callgetHash() {
  var args = ["_contractAddress"];
  var fArgs = {};
  console.log("globalKeystore: " + JSON.stringify(globalKeystore));
  console.log("privkey: " + globalKeystore.exportPrivateKey(walletaddress.value, walletDecrypt.value));
  var fromAccount = Contract({"privkey": globalKeystore.exportPrivateKey(walletaddress.value,walletDecrypt.value) });
  console.log("fromAccount: " + JSON.stringify(fromAccount));
  args.forEach(function(arg) {
    fArgs[arg] = document.getElementById("getHash" + arg).value;
  });
  toAccount.call("http://hacknet.blockapps.net", afterTX, {
    "funcName" : "getHash",
    "fromAccount" : fromAccount,
    "value" : 0,
    "gasPrice" : 1,
    "gasLimit" : 3141592
  }, fArgs);
}
