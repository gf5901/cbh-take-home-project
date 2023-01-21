const { deterministicPartitionKey, hashData } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the partition key when given a partition key in the event", () => {
    const partitionKey = "test";
    const event = { partitionKey };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(partitionKey);
  });
  it("Returns a stringified version of the partition key when given a partition key in the event that is not a string", () => {
    const partitionKey = 1;
    const event = { partitionKey };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(partitionKey));
  });
  it("Returns a hashed version of the partition key when given a partition key in the event that is not a string with a length greater than the max partition key length", () => {
    const partitionKey =
      "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    const hashedPartitionKey = hashData(partitionKey);
    const event = { partitionKey };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(hashedPartitionKey);
  });
  it("Returns hashed value if there is an event but not partition key", () => {
    const event = "test";
    const hashedEvent = hashData(JSON.stringify(event));
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(hashedEvent);
  });
});
