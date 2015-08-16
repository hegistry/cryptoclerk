contract SolidityRegistry {

  address[] addresses;
  bytes32[] hashes;
  uint lastIndex;

  function register (address _address, bytes32 _hash) {
  		addresses.length += 1;
  		addresses[lastIndex] = _address;
  		hashes.length += 1;
  		hashes[lastIndex] = _hash;
  		lastIndex++;
  }

  function getHash(address _address) constant returns (bytes32) {
    for (uint i = 0; i < addresses.length; i++)
    {
    	if (addresses[i] == _address)
    	{
    		return hashes[i];
    	}
    }
    return "notFound";
  }
}
