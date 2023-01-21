const crypto = require("crypto");

// refactor out into separate function to reduce duplicate code
const HASH_ALGORITHM = "sha3-512";
const DIGEST_ENCODING = "hex";
const hashData = (data) => {
  return crypto.createHash(HASH_ALGORITHM).update(data).digest(DIGEST_ENCODING);
};
exports.hashData = hashData;

// pulled out constants from function since they are accessible with closure anyway
const DEFAULT_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidatePartitionKey = DEFAULT_PARTITION_KEY; // initialize candidatePartitionKey to the default partition key value

  // get partition key from event if possible
  if (event) {
    candidatePartitionKey = getPartitionKeyFromEvent(event);
  }

  // ensure that the partition key is a string
  if (typeof candidatePartitionKey !== "string") {
    candidatePartitionKey = JSON.stringify(candidatePartitionKey);
  }

  // if the partition key is too long, hash it again
  if (candidatePartitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    candidatePartitionKey = hashData(candidatePartitionKey);
  }
  return candidatePartitionKey;
};

// pulled logic into separate method for readability
const getPartitionKeyFromEvent = (event) =>
  event.partitionKey || hashData(JSON.stringify(event));
